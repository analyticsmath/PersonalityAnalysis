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

export function deriveCognitiveFromCareerSignals(careerSignals) {
  if (!careerSignals || typeof careerSignals !== 'object') {
    return { scores: null, source: 'insufficient', reason: 'no_career_signals' };
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
  return values.every((v) => v === 0 || v === 50 || v === 1);
}
