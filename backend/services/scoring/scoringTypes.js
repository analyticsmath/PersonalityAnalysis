/**
 * Shared scoring types and dimension keys (Phase 3 deterministic engine).
 * @typedef {'answer' | 'cv' | 'behavior' | 'inferred'} EvidenceSource
 * @typedef {'positive' | 'negative' | 'neutral'} EvidenceDirection
 * @typedef {'valid' | 'partial' | 'insufficient_data' | 'invalid'} ScoreValidity
 */

const SCORING_VERSION = 'phase3-v1';

const OCEAN_KEYS = ['O', 'C', 'E', 'A', 'N'];

const BIG_FIVE_KEYS = [
  'openness',
  'conscientiousness',
  'extraversion',
  'agreeableness',
  'emotionalStability',
];

const RIASEC_KEYS = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];

const WORK_VALUE_KEYS = [
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
];

const CAREER_SIGNAL_KEYS = [
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
];

module.exports = {
  SCORING_VERSION,
  OCEAN_KEYS,
  BIG_FIVE_KEYS,
  RIASEC_KEYS,
  WORK_VALUE_KEYS,
  CAREER_SIGNAL_KEYS,
};
