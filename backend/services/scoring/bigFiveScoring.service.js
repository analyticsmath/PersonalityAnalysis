const { OCEAN_KEYS } = require('./scoringTypes');
const TH = require('./scoringThresholds');

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const round = (n) => Math.round(Number(n) || 0);

const traitInterpretation = (name, score) => {
  const s = round(score);
  if (s >= 67) return `${name} shows as a relative strength in this run.`;
  if (s <= 38) return `${name} shows as a quieter signal in this run.`;
  return `${name} appears moderate in this run.`;
};

const scoreBigFive = ({ oceanScores = {}, evidence = [] } = {}) => {
  const O = clamp(round(oceanScores.O ?? 50), 0, 100);
  const C = clamp(round(oceanScores.C ?? 50), 0, 100);
  const E = clamp(round(oceanScores.E ?? 50), 0, 100);
  const A = clamp(round(oceanScores.A ?? 50), 0, 100);
  const N = clamp(round(oceanScores.N ?? 50), 0, 100);
  const emotionalStabilityScore = clamp(round(100 - N), 0, 100);

  const byOcean = OCEAN_KEYS.reduce((acc, k) => {
    acc[k] = { signals: [], contradictions: [], evidenceIds: new Set() };
    return acc;
  }, {});

  for (const item of evidence) {
    if (item.dimension !== 'bigFive') continue;
    const k = item.key;
    if (!byOcean[k]) continue;
    if (item.signal) byOcean[k].signals.push(item.signal);
    byOcean[k].evidenceIds.add(item.sourceId);
    if (item.direction === 'negative' && item.weight > 0.75) {
      byOcean[k].contradictions.push(`Mixed directional signal from ${item.sourceId}`);
    }
  }

  const buildBlock = (key, score, oceanKey) => {
    const bucket = byOcean[oceanKey];
    const evidenceCount = bucket.evidenceIds.size;
    const confidence = clamp(evidenceCount * TH.EVIDENCE_CONFIDENCE_CAP_PER_ITEM, 0, 1);
    const validity =
      evidenceCount === 0
        ? 'insufficient_data'
        : evidenceCount < 2
        ? 'partial'
        : 'valid';

    const uniqSignals = [...new Set(bucket.signals)].slice(0, 4);
    const contradictions = [...new Set(bucket.contradictions)].slice(0, 2);

    return {
      score,
      confidence: Number(confidence.toFixed(3)),
      evidenceCount,
      signals: uniqSignals,
      contradictions,
      interpretation: traitInterpretation(key, score),
      source: 'deterministic',
      validity,
    };
  };

  const openness = buildBlock('openness', O, 'O');
  const conscientiousness = buildBlock('conscientiousness', C, 'C');
  const extraversion = buildBlock('extraversion', E, 'E');
  const agreeableness = buildBlock('agreeableness', A, 'A');
  const nBlock = buildBlock('emotionalStability', emotionalStabilityScore, 'N');
  const emotionalStability = {
    score: emotionalStabilityScore,
    confidence: nBlock.confidence,
    evidenceCount: byOcean.N.evidenceIds.size,
    signals: [...new Set([...byOcean.N.signals, 'Stability view is inverse-mapped from reactivity-oriented items (not a clinical scale).'])].slice(0, 4),
    contradictions: [...new Set(byOcean.N.contradictions)].slice(0, 2),
    interpretation: traitInterpretation('Emotional stability', emotionalStabilityScore),
    source: 'deterministic',
    validity: byOcean.N.evidenceIds.size === 0 ? 'insufficient_data' : byOcean.N.evidenceIds.size < 2 ? 'partial' : 'valid',
  };

  return {
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    emotionalStability,
    _legacyOcean: { O, C, E, A, N },
  };
};

module.exports = {
  scoreBigFive,
};
