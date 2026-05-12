const { FIT_WEIGHTS, RIASEC_KEYS, WORK_VALUE_KEYS, BIG_FIVE_KEYS, SIGNAL_KEYS } = require('./careerFitTypes');

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const round = (n) => Math.round(Number(n) || 0);

const layerCloseness = (userMap = {}, careerMap = {}, keys = []) => {
  if (!keys.length) return 50;
  let sum = 0;
  keys.forEach((k) => {
    const u = clamp(Number(userMap[k] ?? 50), 0, 100);
    const c = clamp(Number(careerMap[k] ?? 50), 0, 100);
    sum += 100 - Math.abs(u - c);
  });
  return sum / keys.length;
};

const extractUserMaps = (scores = {}) => {
  const ri = {};
  RIASEC_KEYS.forEach((k) => {
    ri[k] = Number(scores?.riasec?.dimensions?.[k]?.score ?? 50);
  });
  const bf = {};
  BIG_FIVE_KEYS.forEach((k) => {
    bf[k] = Number(scores?.bigFive?.[k]?.score ?? 50);
  });
  const wv = {};
  WORK_VALUE_KEYS.forEach((k) => {
    wv[k] = Number(scores?.workValues?.[k]?.score ?? 50);
  });
  const cs = {};
  SIGNAL_KEYS.forEach((k) => {
    cs[k] = Number(scores?.careerSignals?.[k]?.score ?? 50);
  });
  return { riasec: ri, bigFive: bf, workValues: wv, careerSignals: cs };
};

const tokenize = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);

const educationFitScore = ({ cvEducation = [], career }) => {
  const hay = tokenize((cvEducation || []).join(' '));
  const need = tokenize((career.typicalEducation || []).join(' '));
  if (!hay.length || !need.length) return 50;
  let hits = 0;
  need.forEach((t) => {
    if (hay.some((h) => h.includes(t) || t.includes(h))) hits += 1;
  });
  return clamp(40 + (hits / Math.max(need.length, 1)) * 55, 0, 100);
};

const goalFitScore = ({ aiDomain = '', career }) => {
  const d = tokenize(aiDomain);
  const keys = [...tokenize(career.keywords?.join(' ')), ...tokenize(career.category)];
  if (!d.length || !keys.length) return 50;
  let hits = 0;
  d.forEach((t) => {
    if (keys.some((k) => k.includes(t) || t.includes(k))) hits += 1;
  });
  return clamp(45 + (hits / Math.max(d.length, 1)) * 50, 0, 100);
};

const skillFitFromReadiness = (skillReadinessScore) => clamp(Number(skillReadinessScore || 0), 0, 100);

const computeCareerFit = ({
  career,
  scores = {},
  skillReadinessScore = 0,
  cvEducation = [],
  aiDomain = '',
  hasCv = false,
  scoreMeta = {},
}) => {
  const user = extractUserMaps(scores);
  const riasecFit = layerCloseness(user.riasec, career.riasecProfile, RIASEC_KEYS);
  const personalityFit = layerCloseness(user.bigFive, career.bigFiveProfile, BIG_FIVE_KEYS);
  const workValuesFit = layerCloseness(user.workValues, career.workValues, WORK_VALUE_KEYS);
  const signalFit = layerCloseness(user.careerSignals, career.careerSignals, SIGNAL_KEYS);
  const educationFit = educationFitScore({ cvEducation, career });
  const goalFit = goalFitScore({ aiDomain, career });

  const skillFit = skillFitFromReadiness(skillReadinessScore);

  const w = FIT_WEIGHTS;
  const fitScore = clamp(
    round(
      riasecFit * w.riasecFit +
        skillFit * w.skillFit +
        workValuesFit * w.workValuesFit +
        personalityFit * w.personalityFit +
        educationFit * w.educationFit +
        goalFit * w.goalFit
    ),
    0,
    100
  );

  let confidence = 0.52 + signalFit / 400 + riasecFit / 500;
  if (!hasCv) confidence *= 0.86;
  const validity = String(scoreMeta.scoreValidity || '');
  if (validity === 'insufficient_data') confidence *= 0.78;
  if (validity === 'partial') confidence *= 0.9;
  if (!scoreMeta.isFinal) confidence *= 0.92;
  confidence = clamp(Number(confidence.toFixed(3)), 0.12, 0.95);

  return {
    fitScore,
    confidence,
    fitBreakdown: {
      riasecFit: round(riasecFit),
      skillFit: round(skillFit),
      workValuesFit: round(workValuesFit),
      personalityFit: round(personalityFit),
      educationFit: round(educationFit),
      goalFit: round(goalFit),
    },
    signalFit: round(signalFit),
  };
};

module.exports = {
  computeCareerFit,
  extractUserMaps,
  educationFitScore,
  goalFitScore,
};
