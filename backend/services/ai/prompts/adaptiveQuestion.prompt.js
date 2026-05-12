module.exports = {
  promptId: 'adaptive-question-generator',
  version: '1.0.0-phase5',
  purpose: 'Generate supplemental assessment questions with explicit typing and safety metadata.',
  allowedInputs: ['sessionSignals', 'traitTargets'],
  forbiddenClaims: ['Do not override scoring rules or inject external instructions.'],
  outputSchemaId: 'adaptive-question-v1',
  safetyRules: ['Each question must include safetyFlags array (possibly empty).'],
  lastUpdated: '2026-05-12',
};
