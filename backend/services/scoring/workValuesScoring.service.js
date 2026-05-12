const { WORK_VALUE_KEYS } = require('./scoringTypes');
const TH = require('./scoringThresholds');

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const round = (n) => Math.round(Number(n) || 0);

const scoreWorkValues = ({ evidence = [] } = {}) => {
  const out = {};
  for (const key of WORK_VALUE_KEYS) {
    const items = evidence.filter((e) => e.dimension === 'workValues' && e.key === key);
    if (!items.length) {
      out[key] = {
        score: 45,
        confidence: 0.06,
        evidenceCount: 0,
        signals: [],
      };
      continue;
    }
    const weighted =
      items.reduce((sum, it) => sum + (it.direction === 'negative' ? -0.5 : 1) * Number(it.weight || 0.4), 0) /
      Math.max(items.length, 1);
    const score = clamp(round(48 + weighted * 32), 0, 100);
    const confidence = clamp(items.length * TH.EVIDENCE_CONFIDENCE_CAP_PER_ITEM * 0.85, 0, 1);
    out[key] = {
      score,
      confidence: Number(confidence.toFixed(3)),
      evidenceCount: items.length,
      signals: [...new Set(items.map((i) => i.signal).filter(Boolean))].slice(0, 3),
    };
  }

  const withEvidence = WORK_VALUE_KEYS.filter((k) => out[k].evidenceCount > 0).length;
  const top = [...WORK_VALUE_KEYS]
    .sort((a, b) => out[b].score - out[a].score)
    .slice(0, 5);

  return { values: out, valuesWithEvidence: withEvidence, topKeys: top };
};

module.exports = {
  scoreWorkValues,
};
