const { CAREER_SIGNAL_KEYS } = require('./scoringTypes');

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const round = (n) => Math.round(Number(n) || 0);

const scoreCareerSignals = ({ evidence = [], aiProfile = {}, behaviorVector = {}, cognitiveVector = {} } = {}) => {
  const careerSignals = {};

  const bump = (key, amount, source) => {
    if (!careerSignals[key]) {
      careerSignals[key] = { score: 50, evidenceCount: 0, sources: new Set() };
    }
    careerSignals[key].score += amount;
    careerSignals[key].evidenceCount += 1;
    careerSignals[key].sources.add(source);
  };

  for (const item of evidence) {
    if (item.dimension !== 'careerSignal') continue;
    const key = item.key;
    if (!CAREER_SIGNAL_KEYS.includes(key)) continue;
    const delta = item.direction === 'negative' ? -4 : 6;
    bump(key, delta, 'answer');
  }

  const skills = Array.isArray(aiProfile.skills) ? aiProfile.skills : [];
  if (skills.length) {
    bump('technicalDepth', clamp(skills.length * 2.2, 4, 18), 'cv');
    bump('domainFocus', clamp(skills.length * 1.4, 2, 12), 'cv');
    bump('learningOrientation', 6, 'cv');
  }

  if (Number(behaviorVector.leadership) > 55) bump('leadership', 8, 'answer');
  if (Number(behaviorVector.collaboration) > 55) bump('collaboration', 7, 'answer');
  if (Number(behaviorVector.analysis) > 55 || Number(cognitiveVector.analytical) > 55) {
    bump('analyticalThinking', 8, 'answer');
    bump('problemSolving', 5, 'answer');
  }
  if (Number(behaviorVector.creativity) > 55 || Number(cognitiveVector.creative) > 55) bump('creativity', 7, 'answer');
  if (Number(behaviorVector.risk) > 58) bump('riskTolerance', 6, 'answer');
  if (Number(behaviorVector.execution) > 58) bump('planning', 5, 'answer');

  CAREER_SIGNAL_KEYS.forEach((key) => {
    if (!careerSignals[key]) {
      careerSignals[key] = { score: 50, evidenceCount: 0, sources: [] };
    } else {
      careerSignals[key].score = clamp(round(careerSignals[key].score), 0, 100);
      careerSignals[key].sources = [...careerSignals[key].sources];
    }
  });

  return { careerSignals };
};

module.exports = {
  scoreCareerSignals,
};
