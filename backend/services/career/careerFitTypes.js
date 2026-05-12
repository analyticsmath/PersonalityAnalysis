/**
 * Phase 4 deterministic career fit — configurable weights (sum should be 1).
 */
module.exports = {
  CAREER_PROFILE_VERSION: 'phase4-v1',
  FIT_WEIGHTS: {
    riasecFit: 0.25,
    skillFit: 0.25,
    workValuesFit: 0.2,
    personalityFit: 0.15,
    educationFit: 0.1,
    goalFit: 0.05,
  },
  RIASEC_KEYS: ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'],
  WORK_VALUE_KEYS: [
    'achievement',
    'independence',
    'recognition',
    'relationships',
    'support',
    'workingConditions',
    'security',
    'autonomy',
    'learning',
    'impact',
    'workLifeBalance',
    'compensation',
  ],
  BIG_FIVE_KEYS: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalStability'],
  SIGNAL_KEYS: [
    'technicalDepth',
    'communication',
    'leadership',
    'collaboration',
    'analyticalThinking',
    'creativity',
    'problemSolving',
    'adaptability',
    'planning',
    'riskTolerance',
    'learningOrientation',
    'domainFocus',
  ],
};
