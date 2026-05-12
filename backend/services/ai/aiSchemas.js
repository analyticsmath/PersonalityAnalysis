const toTrimmed = (v) => String(v || '').trim();
const toStringList = (v, max) =>
  (Array.isArray(v) ? v : [])
    .map((x) => toTrimmed(x))
    .filter(Boolean)
    .slice(0, max);

const SCHEMA_IDS = {
  REPORT_NARRATIVE_V1: 'report-narrative-v1',
  CAREER_COACH_V1: 'career-coach-v1',
  CV_ENHANCEMENT_V1: 'cv-enhancement-v1',
  ADAPTIVE_QUESTION_V1: 'adaptive-question-v1',
};

/**
 * Validates extended report narrative (maps to persisted aiReport shape).
 */
const validateReportNarrative = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, errors: ['payload_not_object'], value: null };
  }
  const errors = [];
  const summary = toTrimmed(payload.summary);
  if (!summary) errors.push('missing_summary');

  const strengths = toStringList(payload.strengths, 8);
  const growthAreas = toStringList(payload.growthAreas || payload.weaknesses, 8);
  const communicationStyle = toTrimmed(payload.communicationStyle);
  const leadershipStyle = toTrimmed(payload.leadershipStyle);
  const workStyle = toTrimmed(payload.workStyle);
  const careerGuidanceList = Array.isArray(payload.careerGuidance)
    ? toStringList(payload.careerGuidance, 12)
    : toTrimmed(payload.careerGuidance)
      ? [toTrimmed(payload.careerGuidance)]
      : [];
  const careerGuidance = careerGuidanceList.length
    ? careerGuidanceList
    : [
        'Use deterministic scores and career intelligence as read-only context for next exploratory steps.',
      ];
  const learningRecommendations = toStringList(
    payload.learningRecommendations || payload.growthSuggestions || payload.growth_path,
    10
  );
  const confidenceNotes = toTrimmed(payload.confidenceNotes);
  const disclaimers = toStringList(payload.disclaimers, 6);
  const safetyFlags = toStringList(payload.safetyFlags, 20);
  const version = toTrimmed(payload.version) || 'report-narrative-v1';

  if (!communicationStyle) errors.push('missing_communicationStyle');
  if (!workStyle) errors.push('missing_workStyle');

  if (errors.length) {
    return { ok: false, errors, value: null };
  }

  return {
    ok: true,
    errors: [],
    value: {
      summary,
      strengths,
      growthAreas,
      communicationStyle,
      leadershipStyle: leadershipStyle || 'Context-dependent; developmental focus recommended.',
      workStyle,
      careerGuidance,
      learningRecommendations,
      confidenceNotes:
        confidenceNotes ||
        'Evidence strength varies by question coverage; treat guidance as preliminary where confidence is limited.',
      disclaimers: disclaimers.length
        ? disclaimers
        : [
            'Guidance only — not a medical, psychological, or hiring decision.',
            'Numeric scores are produced by the deterministic engine and are not modified by this narrative.',
          ],
      safetyFlags,
      version,
      _legacyWeaknesses: growthAreas,
      _legacyGrowthSuggestions: learningRecommendations,
    },
  };
};

const validateCareerCoachStructured = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, errors: ['payload_not_object'], value: null };
  }
  const answer = toTrimmed(payload.answer);
  if (!answer) {
    return { ok: false, errors: ['missing_answer'], value: null };
  }
  return {
    ok: true,
    errors: [],
    value: {
      answer,
      referencedScores: Array.isArray(payload.referencedScores) ? payload.referencedScores : [],
      referencedCareers: Array.isArray(payload.referencedCareers) ? payload.referencedCareers : [],
      suggestedNextSteps: toStringList(payload.suggestedNextSteps, 8),
      uncertaintyNotes: toTrimmed(payload.uncertaintyNotes),
      safetyFlags: toStringList(payload.safetyFlags, 20),
      shouldEscalateToHuman: Boolean(payload.shouldEscalateToHuman),
      version: toTrimmed(payload.version) || 'career-coach-v1',
    },
  };
};

const validateCvEnhancement = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, errors: ['payload_not_object'], value: null };
  }
  return {
    ok: true,
    errors: [],
    value: {
      extractedSkills: toStringList(payload.extractedSkills, 40),
      educationSignals: toStringList(payload.educationSignals, 20),
      experienceSignals: toStringList(payload.experienceSignals, 20),
      domainSignals: toStringList(payload.domainSignals, 20),
      uncertaintyNotes: toTrimmed(payload.uncertaintyNotes),
      ignoredPromptInjection: Boolean(payload.ignoredPromptInjection),
      version: toTrimmed(payload.version) || 'cv-enhancement-v1',
    },
  };
};

const validateAdaptiveQuestionBlock = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, errors: ['payload_not_object'], value: null };
  }
  const questions = Array.isArray(payload.questions) ? payload.questions : [];
  if (!questions.length) {
    return { ok: false, errors: ['no_questions'], value: null };
  }
  const normalized = [];
  for (const q of questions.slice(0, 24)) {
    if (!q || typeof q !== 'object') continue;
    const text = toTrimmed(q.text);
    if (!text) continue;
    normalized.push({
      text,
      answerType: toTrimmed(q.answerType) || 'likert',
      dimensionTargets: Array.isArray(q.dimensionTargets) ? q.dimensionTargets : [],
      scoringMetadata: q.scoringMetadata && typeof q.scoringMetadata === 'object' ? q.scoringMetadata : {},
      safetyFlags: toStringList(q.safetyFlags, 10),
      version: toTrimmed(q.version) || 'adaptive-question-v1',
    });
  }
  if (!normalized.length) {
    return { ok: false, errors: ['invalid_questions'], value: null };
  }
  return { ok: true, errors: [], value: { questions: normalized, version: toTrimmed(payload.version) || 'adaptive-question-v1' } };
};

module.exports = {
  SCHEMA_IDS,
  validateReportNarrative,
  validateCareerCoachStructured,
  validateCvEnhancement,
  validateAdaptiveQuestionBlock,
};
