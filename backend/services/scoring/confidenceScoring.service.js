const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

const mean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

const computeLayerConfidence = (values = []) => {
  const nums = values.map((v) => clamp(Number(v) || 0, 0, 1));
  if (!nums.length) return 0;
  return Number(mean(nums).toFixed(4));
};

const buildGlobalConfidence = ({
  bigFive = {},
  riasec = {},
  workValues = {},
  careerSignals = {},
  evidenceLength = 0,
}) => {
  const bf = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalStability'].map(
    (k) => bigFive[k]?.confidence ?? 0
  );
  const ri = Object.values(riasec.dimensions || {}).map((d) => d.confidence || 0);
  const wv = Object.values(workValues.values || {}).map((d) => d.confidence || 0);
  const cs = Object.values(careerSignals.careerSignals || {}).map((d) => {
    const c = d.evidenceCount || 0;
    return clamp(c * 0.12, 0, 1);
  });

  const layers = [computeLayerConfidence(bf), computeLayerConfidence(ri), computeLayerConfidence(wv), computeLayerConfidence(cs)];

  const evidenceBoost = clamp(evidenceLength / 40, 0, 0.25);
  const base = computeLayerConfidence(layers);
  const global = clamp(base * 0.85 + evidenceBoost, 0, 1);

  return {
    confidence: Number(global.toFixed(4)),
    evidenceCount: evidenceLength,
    layerConfidences: {
      bigFive: layers[0],
      riasec: layers[1],
      workValues: layers[2],
      careerSignals: layers[3],
    },
  };
};

module.exports = {
  buildGlobalConfidence,
  computeLayerConfidence,
};
