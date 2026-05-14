/**
 * Derives cognitive and behavior chart data from canonical careerSignals.
 * Used when dedicated cognitive_scores or behavior_vector are absent/empty.
 *
 * careerSignals schema (each key has { score, evidenceCount, sources }):
 *   analyticalThinking, creativity, problemSolving, planning, leadership,
 *   collaboration, riskTolerance, adaptability, technicalDepth, domainFocus,
 *   learningOrientation, communication
 */

const COGNITIVE_KEYS = ['analytical', 'creative', 'strategic', 'systematic', 'practical', 'abstract'];
const BEHAVIOR_KEYS = ['leadership', 'risk_tolerance', 'decision_speed', 'stress_tolerance', 'team_preference'];

const toScore = (signals, key) => {
  const entry = signals?.[key];
  if (!entry || typeof entry !== 'object') return null;
  const score = Number(entry.score);
  return Number.isFinite(score) ? Math.max(0, Math.min(100, score)) : null;
};

const avg = (...values) => {
  const nums = values.filter((v) => v !== null && Number.isFinite(v));
  return nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : null;
};

const hasRealEvidence = (signals, ...keys) =>
  keys.some((k) => {
    const entry = signals?.[k];
    return entry && typeof entry === 'object' && Number(entry.evidenceCount || 0) > 0;
  });

export function deriveCognitiveFromCareerSignals(careerSignals) {
  if (!careerSignals || typeof careerSignals !== 'object') {
    return { scores: null, source: 'insufficient', reason: 'no_career_signals' };
  }

  // If none of the relevant signals have any real evidence, treat as insufficient
  const cognitiveKeys = ['analyticalThinking', 'creativity', 'planning', 'problemSolving', 'technicalDepth', 'domainFocus', 'learningOrientation'];
  if (!hasRealEvidence(careerSignals, ...cognitiveKeys)) {
    return { scores: null, source: 'insufficient', reason: 'zero_evidence_count' };
  }

  const analytical = toScore(careerSignals, 'analyticalThinking');
  const creative = toScore(careerSignals, 'creativity');
  const planning = toScore(careerSignals, 'planning');
  const problemSolving = toScore(careerSignals, 'problemSolving');
  const technicalDepth = toScore(careerSignals, 'technicalDepth');
  const domainFocus = toScore(careerSignals, 'domainFocus');
  const learningOrientation = toScore(careerSignals, 'learningOrientation');

  const strategic = avg(planning, problemSolving);
  const systematic = planning;
  const practical = avg(technicalDepth, domainFocus);
  const abstract = avg(learningOrientation, creative);

  const scores = {
    analytical,
    creative,
    strategic,
    systematic,
    practical,
    abstract,
  };

  const hasAnyData = Object.values(scores).some((v) => v !== null);
  if (!hasAnyData) {
    return { scores: null, source: 'insufficient', reason: 'no_signal_data' };
  }

  const filled = {};
  COGNITIVE_KEYS.forEach((k) => {
    filled[k] = scores[k] ?? 0;
  });

  return { scores: filled, source: 'derived_from_careerSignals' };
}

export function deriveBehaviorFromCareerSignals(careerSignals) {
  if (!careerSignals || typeof careerSignals !== 'object') {
    return { scores: null, source: 'insufficient', reason: 'no_career_signals' };
  }

  const behaviorKeys = ['leadership', 'riskTolerance', 'adaptability', 'collaboration'];
  if (!hasRealEvidence(careerSignals, ...behaviorKeys)) {
    return { scores: null, source: 'insufficient', reason: 'zero_evidence_count' };
  }

  const leadership = toScore(careerSignals, 'leadership');
  const riskTolerance = toScore(careerSignals, 'riskTolerance');
  const adaptability = toScore(careerSignals, 'adaptability');
  const collaboration = toScore(careerSignals, 'collaboration');

  const scores = {
    leadership,
    risk_tolerance: riskTolerance,
    decision_speed: adaptability,
    stress_tolerance: adaptability !== null ? Math.round(adaptability * 0.9) : null,
    team_preference: collaboration,
  };

  const hasAnyData = Object.values(scores).some((v) => v !== null);
  if (!hasAnyData) {
    return { scores: null, source: 'insufficient', reason: 'no_signal_data' };
  }

  const filled = {};
  BEHAVIOR_KEYS.forEach((k) => {
    filled[k] = scores[k] ?? 0;
  });

  return { scores: filled, source: 'derived_from_careerSignals' };
}

export function getDominantBehaviorLabel(behaviorScores, labels = {}) {
  if (!behaviorScores || typeof behaviorScores !== 'object') return null;
  const entries = Object.entries(behaviorScores).filter(([, v]) => Number.isFinite(Number(v)));
  if (!entries.length) return null;
  const [topKey] = entries.sort((a, b) => Number(b[1]) - Number(a[1]))[0];
  return labels[topKey] || topKey;
}

export function isAllDefaultVector(scores) {
  if (!scores || typeof scores !== 'object') return true;
  const values = Object.values(scores).map(Number).filter(Number.isFinite);
  if (!values.length) return true;

  // Exact legacy sentinel values
  if (values.every((v) => v === 0 || v === 50 || v === 1)) return true;

  // Old cognitive fallback pattern: all values in a narrow band near neutral (44–52, spread ≤ 6)
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max - min <= 6 && min >= 43 && max <= 53) return true;

  // Old behavior scale error: most non-trivial values extremely low (< 10)
  // except stress_tolerance which may legitimately derive from emotionalStability
  const nonStress = Object.entries(scores)
    .filter(([k]) => k !== 'stress_tolerance')
    .map(([, v]) => Number(v))
    .filter(Number.isFinite);
  if (nonStress.length >= 3 && nonStress.filter((v) => v < 10).length >= nonStress.length - 1) return true;

  return false;
}
