const { config } = require('../config/env');
const { buildPersonalityReportPrompt } = require('../prompts/personalityReport.prompt');
const { normalizeTraits, generateInsightSnapshot } = require('./insightService');
const { mergeCareerRecommendations, buildCareerContext } = require('./careerEngine');
const { runOrchestratedAiCall, finalizeAiStatus } = require('./ai/aiOrchestrator.service');
const { validateReportWithRepair } = require('./ai/aiOutputValidator.service');
const { SCHEMA_IDS } = require('./ai/aiSchemas');
const { buildDeterministicPersonalityReportFallback } = require('./ai/aiFallbacks.service');
const { scanOutputForSafetyFlags, runLocalModerationStub, unsafeOutputReplacement } = require('./ai/aiSafety.service');
const { getPromptRegistryEntry } = require('./ai/aiPromptRegistry');
const { logAiAuditEvent } = require('./ai/aiAudit.service');
const { parseJsonFromText } = require('./assessment/aiJson');

const MAX_LIST_ITEMS = {
  strengths: 6,
  weaknesses: 5,
  growthSuggestions: 6,
  careerRecommendations: 5,
};

const toStringList = (value, max) =>
  (Array.isArray(value) ? value : [])
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .slice(0, max);

const toCareerRecommendations = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const career = String(item.career || '').trim();
      if (!career) {
        return null;
      }

      return {
        career,
        reason: String(item.reason || '').trim(),
        skillsNeeded: toStringList(item.skillsNeeded, 8),
      };
    })
    .filter(Boolean)
    .slice(0, MAX_LIST_ITEMS.careerRecommendations);
};

const bundleNarrativeText = (ext) => {
  const cg = Array.isArray(ext?.careerGuidance)
    ? ext.careerGuidance
    : ext?.careerGuidance
      ? [String(ext.careerGuidance)]
      : [];
  return [
    ext.summary,
    ...(ext.strengths || []),
    ...(ext.growthAreas || []),
    ...cg,
    ext.communicationStyle,
    ext.workStyle,
  ].join('\n');
};

const applySafetyToNarrative = (ext) => {
  const mod = runLocalModerationStub(bundleNarrativeText(ext));
  const patternFlags = scanOutputForSafetyFlags(bundleNarrativeText(ext));
  const mergedFlags = Array.from(new Set([...(ext.safetyFlags || []), ...patternFlags]));
  if (!mod.flagged && patternFlags.length === 0) {
    return { ...ext, safetyFlags: mergedFlags };
  }
  return {
    ...ext,
    summary: unsafeOutputReplacement,
    safetyFlags: Array.from(new Set([...mergedFlags, 'output_safety_replacement'])),
  };
};

const extractAiCareersFromResponseText = (text) => {
  try {
    const parsed = parseJsonFromText(text, 'AI report');
    return toCareerRecommendations(parsed.careerRecommendations);
  } catch {
    return [];
  }
};

const generatePersonalityReport = async (traits = {}, facetScores = {}) => {
  const normalizedTraits = normalizeTraits(traits);
  const deterministicInsights = generateInsightSnapshot(normalizedTraits);
  const staticCareerMatches = buildCareerContext(normalizedTraits, 5);

  const registry = getPromptRegistryEntry('personality-report');
  const { promptVersion, systemPrompt, userPrompt } = buildPersonalityReportPrompt({
    traits: normalizedTraits,
    facetScores,
    deterministicInsights,
    staticCareerMatches,
  });
  const effectivePromptVersion = registry?.version || promptVersion;

  const orchestration = await runOrchestratedAiCall({
    promptId: 'personality-report',
    promptVersion: effectivePromptVersion,
    schemaId: SCHEMA_IDS.REPORT_NARRATIVE_V1,
    buildInput: () => {
      const guardrails = registry
        ? `Prompt governance (${registry.promptId} ${registry.version}):\n${registry.forbiddenClaims
            .map((c) => `- ${c}`)
            .join('\n')}\nSafety:\n${registry.safetyRules.map((c) => `- ${c}`).join('\n')}\n\n`
        : '';
      return [
        { role: 'system', content: `${guardrails}${systemPrompt}` },
        { role: 'user', content: userPrompt },
      ];
    },
    timeoutMs: 55000,
    maxRetries: 1,
  });

  const finishAndAudit = ({
    narrativeExtended,
    mergedCareerRecommendations,
    model,
    usage,
    generatedAt,
    aiStatus,
    repairedSchema,
  }) => {
    logAiAuditEvent({
      promptId: 'personality-report',
      promptVersion: effectivePromptVersion,
      provider: aiStatus.provider,
      model: aiStatus.model || model || 'n/a',
      schemaId: SCHEMA_IDS.REPORT_NARRATIVE_V1,
      schemaValidated: aiStatus.schemaValidated,
      safetyChecked: aiStatus.safetyChecked,
      fallbackUsed: aiStatus.fallbackUsed,
      latencyMs: aiStatus.latencyMs ?? 0,
      tokenUsage: usage,
      errorCode: aiStatus.errorCode,
      injectionFlags: [],
      outputSafetyFlags: narrativeExtended.safetyFlags || [],
    });
    return {
      summary: narrativeExtended.summary,
      strengths: toStringList(narrativeExtended.strengths, MAX_LIST_ITEMS.strengths),
      weaknesses: toStringList(narrativeExtended.growthAreas, MAX_LIST_ITEMS.weaknesses),
      communicationStyle: narrativeExtended.communicationStyle,
      workStyle: narrativeExtended.workStyle,
      growthSuggestions: toStringList(
        narrativeExtended.learningRecommendations,
        MAX_LIST_ITEMS.growthSuggestions
      ),
      careerRecommendations: mergedCareerRecommendations,
      narrativeExtended,
      metadata: {
        model,
        promptVersion: effectivePromptVersion,
        usage,
        generatedAt,
        schemaRepairUsed: Boolean(repairedSchema),
      },
      deterministicInsights,
      staticCareerMatches,
      aiStatus,
    };
  };

  if (!orchestration.ok || !String(orchestration.text || '').trim()) {
    const fb = buildDeterministicPersonalityReportFallback({
      traits: normalizedTraits,
      facetScores,
      deterministicInsights,
      staticCareerMatches,
      promptVersion: effectivePromptVersion,
    });
    const aiStatus = finalizeAiStatus({
      basePromptVersion: effectivePromptVersion,
      schemaValidated: true,
      safetyChecked: true,
      fallbackUsed: true,
      errorCode: orchestration.errorCode || 'AI_CALL_FAILED',
      noKey: !config.openaiApiKey,
      latencyMs: orchestration.latencyMs,
      model: orchestration.model || config.openaiModel || 'n/a',
    });
    return finishAndAudit({
      narrativeExtended: fb.narrativeExtended,
      mergedCareerRecommendations: fb.careerRecommendations,
      model: fb.metadata.model,
      usage: fb.metadata.usage,
      generatedAt: fb.metadata.generatedAt,
      aiStatus,
      repairedSchema: false,
    });
  }

  const vr = validateReportWithRepair(orchestration.text);
  if (!vr.ok || !vr.result.ok) {
    const fb = buildDeterministicPersonalityReportFallback({
      traits: normalizedTraits,
      facetScores,
      deterministicInsights,
      staticCareerMatches,
      promptVersion: effectivePromptVersion,
    });
    const aiStatus = finalizeAiStatus({
      basePromptVersion: effectivePromptVersion,
      schemaValidated: false,
      safetyChecked: true,
      fallbackUsed: true,
      errorCode: 'SCHEMA_VALIDATION_FAILED',
      noKey: false,
      latencyMs: orchestration.latencyMs,
      model: orchestration.model || config.openaiModel,
    });
    return finishAndAudit({
      narrativeExtended: fb.narrativeExtended,
      mergedCareerRecommendations: fb.careerRecommendations,
      model: fb.metadata.model,
      usage: fb.metadata.usage,
      generatedAt: fb.metadata.generatedAt,
      aiStatus,
      repairedSchema: vr.repaired,
    });
  }

  const narrativeExtended = applySafetyToNarrative(vr.result.value);
  const aiCareerList = extractAiCareersFromResponseText(orchestration.text);
  const mergedCareerRecommendations = mergeCareerRecommendations({
    aiRecommendations: aiCareerList,
    staticRecommendations: staticCareerMatches,
    limit: MAX_LIST_ITEMS.careerRecommendations,
  });

  const aiStatus = finalizeAiStatus({
    basePromptVersion: effectivePromptVersion,
    schemaValidated: true,
    safetyChecked: true,
    fallbackUsed: false,
    errorCode: null,
    noKey: false,
    latencyMs: orchestration.latencyMs,
    model: orchestration.model || config.openaiModel,
  });

  return finishAndAudit({
    narrativeExtended,
    mergedCareerRecommendations,
    model: orchestration.model,
    usage: orchestration.usage,
    generatedAt: new Date().toISOString(),
    aiStatus,
    repairedSchema: vr.repaired,
  });
};

module.exports = {
  generatePersonalityReport,
};
