const { config } = require('../../config/env');
const { runOrchestratedAiCall, finalizeAiStatus } = require('../ai/aiOrchestrator.service');
const { validateCoachWithRepair } = require('../ai/aiOutputValidator.service');
const { SCHEMA_IDS } = require('../ai/aiSchemas');
const { buildStructuredCoachFallback } = require('../ai/aiFallbacks.service');
const {
  scanUserText,
  wrapUntrustedUserContent,
} = require('../ai/aiPromptInjectionGuard.service');
const {
  scanUserMessageForRisk,
  crisisSupportFallback,
  clinicalRequestFallback,
  scanOutputForSafetyFlags,
  runLocalModerationStub,
  unsafeOutputReplacement,
} = require('../ai/aiSafety.service');
const { logAiAuditEvent } = require('../ai/aiAudit.service');
const { getPromptRegistryEntry } = require('../ai/aiPromptRegistry');

const toText = (value) => String(value || '').trim();

const toCareerList = (result, session) => {
  if (Array.isArray(result?.career?.recommendations)) {
    return result.career.recommendations;
  }

  if (Array.isArray(session?.careerRecommendations)) {
    return session.careerRecommendations;
  }

  return [];
};

const toTopEntries = (source = {}, count = 3) =>
  Object.entries(source || {})
    .map(([key, value]) => ({ key, value: Number(value || 0) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, count);

const toProfileContext = ({ session, result }) => {
  const cv = result?.cvData || session?.cvData || {};
  const personality = result?.personality || {};
  const behavior = result?.behavior || {};
  const aiProfile =
    session?.aiProfile && typeof session.aiProfile === 'object' ? session.aiProfile : {};

  const skills = (Array.isArray(cv.skills) ? cv.skills : [])
    .map((entry) => toText(entry?.name || entry))
    .filter(Boolean)
    .slice(0, 12);

  const interests = (Array.isArray(cv.interests) ? cv.interests : [])
    .map((entry) => toText(entry))
    .filter(Boolean)
    .slice(0, 10);

  const careers = toCareerList(result, session).slice(0, 8).map((item) => ({
    career: item.career,
    score: Number(item.score || 0),
    confidence: Number(item.confidence || 0),
    reason: toText(item.reason || item.why_fit),
    skill_gaps: Array.isArray(item.skill_gaps) ? item.skill_gaps : [],
    growth_suggestions: Array.isArray(item.growth_suggestions)
      ? item.growth_suggestions
      : [],
  }));

  const topSkillGaps = Array.from(
    new Set(
      careers
        .flatMap((item) => (Array.isArray(item.skill_gaps) ? item.skill_gaps : []))
        .map((item) => toText(item))
        .filter(Boolean)
    )
  ).slice(0, 10);

  const phase4 = result?.careerRecommendations;
  const phase4Slim =
    phase4 && typeof phase4 === 'object'
      ? {
          version: phase4.version,
          locked: Boolean(phase4.locked),
          preliminary: Boolean(phase4.preliminary),
          topRecommendations: (phase4.topRecommendations || []).slice(0, 5).map((r) => ({
            careerId: r.careerId,
            title: r.title,
            fitScore: r.fitScore,
            confidence: r.confidence,
            fitType: r.fitType,
            whyThisFits: r.whyThisFits,
            whyThisMayBeChallenging: r.whyThisMayBeChallenging,
            skillGaps: r.skillGaps,
          })),
          warnings: (phase4.warnings || []).slice(0, 8),
        }
      : null;

  return {
    aiProfile,
    domain: toText(aiProfile.domain || cv.source_domain || 'general'),
    personalityTraits: personality?.traits || {},
    cognitiveVector: personality?.cognitiveScores || {},
    behaviorVector: behavior?.vector || {},
    topTraits: toTopEntries(personality?.traits || {}, 3),
    topCognitive: toTopEntries(personality?.cognitiveScores || {}, 3),
    topBehavior: toTopEntries(behavior?.vector || {}, 3),
    skills,
    interests,
    careers,
    topSkillGaps,
    phase4CareerIntelligence: phase4Slim,
  };
};

const buildFallbackStructured = ({ context, message }) => {
  const topCareer = context.careers?.[0] || null;
  const topTraits = (context.topTraits || [])
    .map((item) => `${item.key} ${Math.round(item.value)}%`)
    .join(', ');

  const topGaps = (context.topSkillGaps || []).slice(0, 3).join(', ');

  const hints = [];
  if (topCareer) {
    hints.push(`Top match: ${topCareer.career} (${Math.round(topCareer.score || 0)}%).`);
    hints.push(`Evidence: traits (${topTraits || 'balanced profile'}) and domain (${context.domain}).`);
    if (topGaps) hints.push(`Primary skill gaps to close: ${topGaps}.`);
  }

  const fb = buildStructuredCoachFallback({ message, contextHints: hints });
  return {
    ...fb,
    referencedCareers: topCareer ? [topCareer.career] : [],
    referencedScores: (context.topTraits || []).map((t) => t.key),
  };
};

const generateCareerChatReply = async ({ session, result, message }) => {
  const context = toProfileContext({ session, result });
  const registry = getPromptRegistryEntry('career-coach-chat');
  const userRisk = scanUserMessageForRisk(message);
  if (userRisk.level === 'crisis') {
    const coach = {
      answer: crisisSupportFallback,
      referencedScores: [],
      referencedCareers: [],
      suggestedNextSteps: ['Reach out to local emergency or crisis resources', 'Contact someone you trust'],
      uncertaintyNotes: 'Automated safety response; not a substitute for professional crisis care.',
      safetyFlags: userRisk.flags,
      shouldEscalateToHuman: true,
      version: SCHEMA_IDS.CAREER_COACH_V1,
    };
    const aiStatus = finalizeAiStatus({
      basePromptVersion: registry?.version || 'phase5',
      schemaValidated: true,
      safetyChecked: true,
      fallbackUsed: true,
      errorCode: 'USER_MESSAGE_SAFETY',
      noKey: false,
      latencyMs: 0,
      model: 'n/a',
    });
    logAiAuditEvent({
      promptId: 'career-coach-chat',
      promptVersion: registry?.version || 'phase5',
      provider: 'local_fallback',
      model: 'n/a',
      schemaId: SCHEMA_IDS.CAREER_COACH_V1,
      schemaValidated: true,
      safetyChecked: true,
      fallbackUsed: true,
      latencyMs: 0,
      errorCode: 'USER_MESSAGE_SAFETY',
    });
    return { answer: coach.answer, coach, aiStatus, safetyFlags: coach.safetyFlags };
  }
  if (userRisk.level === 'clinical_request') {
    const coach = {
      answer: clinicalRequestFallback,
      referencedScores: [],
      referencedCareers: [],
      suggestedNextSteps: ['Review your deterministic scores in the Results view'],
      uncertaintyNotes: 'Clinical requests are out of scope for this coach.',
      safetyFlags: userRisk.flags,
      shouldEscalateToHuman: false,
      version: SCHEMA_IDS.CAREER_COACH_V1,
    };
    const aiStatus = finalizeAiStatus({
      basePromptVersion: registry?.version || 'phase5',
      schemaValidated: true,
      safetyChecked: true,
      fallbackUsed: true,
      errorCode: 'CLINICAL_OUT_OF_SCOPE',
      noKey: false,
      latencyMs: 0,
      model: 'n/a',
    });
    logAiAuditEvent({
      promptId: 'career-coach-chat',
      promptVersion: registry?.version || 'phase5',
      provider: 'local_fallback',
      model: 'n/a',
      schemaId: SCHEMA_IDS.CAREER_COACH_V1,
      schemaValidated: true,
      safetyChecked: true,
      fallbackUsed: true,
      latencyMs: 0,
      errorCode: 'CLINICAL_OUT_OF_SCOPE',
    });
    return { answer: coach.answer, coach, aiStatus, safetyFlags: coach.safetyFlags };
  }

  const injectionScan = scanUserText(message);
  const contextJson = JSON.stringify(context, null, 2);
  const recentHistory = (session.chatHistory || [])
    .slice(-8)
    .map((entry) => `${entry.role}: ${entry.message}`)
    .join('\n');

  if (!config.openaiApiKey) {
    const coach = buildFallbackStructured({ context, message });
    const aiStatus = finalizeAiStatus({
      basePromptVersion: registry?.version || 'phase5',
      schemaValidated: true,
      safetyChecked: true,
      fallbackUsed: true,
      errorCode: 'NO_API_KEY',
      noKey: true,
      latencyMs: 0,
      model: 'n/a',
    });
    logAiAuditEvent({
      promptId: 'career-coach-chat',
      promptVersion: registry?.version || 'phase5',
      provider: 'none',
      model: 'n/a',
      schemaId: SCHEMA_IDS.CAREER_COACH_V1,
      schemaValidated: true,
      safetyChecked: true,
      fallbackUsed: true,
      latencyMs: 0,
      errorCode: 'NO_API_KEY',
      injectionFlags: injectionScan.patterns,
    });
    return {
      answer: coach.answer,
      coach,
      aiStatus,
      safetyFlags: [...(coach.safetyFlags || []), ...(injectionScan.suspicious ? ['user_text_injection_suspected'] : [])],
    };
  }

  const orchestration = await runOrchestratedAiCall({
    promptId: 'career-coach-chat',
    promptVersion: registry?.version || 'phase5',
    schemaId: SCHEMA_IDS.CAREER_COACH_V1,
    model: config.openaiCoachModel,
    buildInput: () => [
      {
        role: 'system',
        content: `You are a profile-grounded career assistant. Always answer using provided profile evidence. Phase 4 career intelligence (if present) is read-only: never change or invent fit scores, confidence numbers, or missing skills—explain and contextualize them only. Return JSON only with keys: answer, referencedScores, referencedCareers, suggestedNextSteps, uncertaintyNotes, safetyFlags, shouldEscalateToHuman, version="${SCHEMA_IDS.CAREER_COACH_V1}".`,
      },
      {
        role: 'user',
        content: [
          wrapUntrustedUserContent('profile_context', contextJson),
          wrapUntrustedUserContent('recent_chat', recentHistory || 'none'),
          wrapUntrustedUserContent('user_question', message),
          'Answer using JSON schema only.',
        ].join('\n\n'),
      },
    ],
    injectionMeta: injectionScan,
    timeoutMs: 45000,
    maxRetries: 1,
  });

  if (!orchestration.ok || !orchestration.text.trim()) {
    const coach = buildFallbackStructured({ context, message });
    const aiStatus = finalizeAiStatus({
      basePromptVersion: registry?.version || 'phase5',
      schemaValidated: false,
      safetyChecked: true,
      fallbackUsed: true,
      errorCode: orchestration.errorCode || 'AI_CALL_FAILED',
      noKey: false,
      latencyMs: orchestration.latencyMs,
      model: orchestration.model || config.openaiCoachModel,
    });
    logAiAuditEvent({
      promptId: 'career-coach-chat',
      promptVersion: registry?.version || 'phase5',
      provider: 'local_fallback',
      model: orchestration.model || config.openaiCoachModel,
      schemaId: SCHEMA_IDS.CAREER_COACH_V1,
      schemaValidated: false,
      safetyChecked: true,
      fallbackUsed: true,
      latencyMs: orchestration.latencyMs || 0,
      errorCode: orchestration.errorCode,
      injectionFlags: injectionScan.patterns,
    });
    return {
      answer: coach.answer,
      coach,
      aiStatus,
      safetyFlags: [...(coach.safetyFlags || []), ...(injectionScan.suspicious ? ['user_text_injection_suspected'] : [])],
    };
  }

  const vr = validateCoachWithRepair(orchestration.text);
  let coach = vr.ok && vr.result.ok ? vr.result.value : buildFallbackStructured({ context, message });
  const mod = runLocalModerationStub(coach.answer);
  const bad = scanOutputForSafetyFlags(coach.answer);
  if (mod.flagged || bad.length) {
    coach = {
      ...coach,
      answer: unsafeOutputReplacement,
      safetyFlags: Array.from(new Set([...(coach.safetyFlags || []), ...bad, 'output_safety'])),
    };
  }
  if (injectionScan.suspicious) {
    coach = {
      ...coach,
      safetyFlags: Array.from(new Set([...(coach.safetyFlags || []), 'user_text_injection_suspected'])),
    };
  }

  const aiStatus = finalizeAiStatus({
    basePromptVersion: registry?.version || 'phase5',
    schemaValidated: Boolean(vr.ok && vr.result.ok),
    safetyChecked: true,
    fallbackUsed: !(vr.ok && vr.result.ok),
    errorCode: vr.ok && vr.result.ok ? null : 'SCHEMA_VALIDATION_FAILED',
    noKey: false,
    latencyMs: orchestration.latencyMs,
    model: orchestration.model || config.openaiModel,
  });

  logAiAuditEvent({
    promptId: 'career-coach-chat',
    promptVersion: registry?.version || 'phase5',
    provider: aiStatus.provider,
    model: orchestration.model || config.openaiModel,
    schemaId: SCHEMA_IDS.CAREER_COACH_V1,
    schemaValidated: aiStatus.schemaValidated,
    safetyChecked: aiStatus.safetyChecked,
    fallbackUsed: aiStatus.fallbackUsed,
    latencyMs: orchestration.latencyMs || 0,
    tokenUsage: orchestration.usage,
    errorCode: aiStatus.errorCode,
    injectionFlags: injectionScan.patterns,
    outputSafetyFlags: coach.safetyFlags || [],
  });

  return { answer: coach.answer, coach, aiStatus, safetyFlags: coach.safetyFlags || [] };
};

module.exports = {
  generateCareerChatReply,
  toProfileContext,
};
