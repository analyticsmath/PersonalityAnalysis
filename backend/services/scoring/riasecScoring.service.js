const { RIASEC_KEYS } = require('./scoringTypes');
const TH = require('./scoringThresholds');

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const round = (n) => Math.round(Number(n) || 0);

const aggregateDimension = (key, evidence, baseline = 52) => {
  const items = evidence.filter((e) => e.dimension === 'riasec' && e.key === key);
  if (!items.length) {
    return {
      score: baseline,
      confidence: 0.08,
      evidenceCount: 0,
      signals: [],
      interpretation: 'Not enough targeted evidence for this interest dimension.',
    };
  }
  const weighted =
    items.reduce((sum, it) => sum + (it.direction === 'negative' ? -1 : 1) * Number(it.weight || 0.5), 0) /
    Math.max(items.length, 1);
  const score = clamp(round(baseline + weighted * 28), 0, 100);
  const confidence = clamp(items.length * TH.EVIDENCE_CONFIDENCE_CAP_PER_ITEM * 0.9, 0, 1);

  return {
    score,
    confidence: Number(confidence.toFixed(3)),
    evidenceCount: items.length,
    signals: [...new Set(items.map((i) => i.signal).filter(Boolean))].slice(0, 4),
    interpretation:
      score >= 62
        ? `${key} interests show clearly in your responses.`
        : score <= 42
        ? `${key} interests are quieter in this snapshot.`
        : `${key} interests look moderate here.`,
  };
};

const scoreRiasec = ({ evidence = [] } = {}) => {
  const dims = {};
  RIASEC_KEYS.forEach((k) => {
    dims[k] = aggregateDimension(k, evidence);
  });

  const ranked = RIASEC_KEYS.map((k) => ({ k, score: dims[k].score, c: dims[k].confidence }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const meanConfidence = RIASEC_KEYS.reduce((s, k) => s + dims[k].confidence, 0) / RIASEC_KEYS.length;
  const scoredDims = RIASEC_KEYS.filter((k) => dims[k].evidenceCount > 0).length;
  const preliminary = meanConfidence < TH.RIASEC_PRELIMINARY_MEAN_CONFIDENCE || scoredDims < TH.RIASEC_MIN_DIMENSIONS_SCORED;

  const code = ranked.map((r) => r.k.charAt(0).toUpperCase()).join('');

  return {
    dimensions: dims,
    hollandCode: code,
    hollandCodePreliminary: preliminary,
    meanConfidence: Number(meanConfidence.toFixed(4)),
    scoredDimensions: scoredDims,
  };
};

module.exports = {
  scoreRiasec,
};
