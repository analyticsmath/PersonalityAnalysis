const mongoose = require('mongoose');
const AssessmentResult = require('../../models/AssessmentResult');
const { deriveScoreMeta } = require('../assessment/unified-contracts.service');
const { assertReadableUserId } = require('./assessmentHistory.service');
const { BIG_FIVE_KEYS, RIASEC_KEYS, toDateKey, isTrendEligibleValidity } = require('./analyticsTypes');

const clampScore = (n) => Math.max(0, Math.min(100, n));

const trendValidityLabel = (scoreMeta) => {
  const src = String(scoreMeta?.scoreSource || '');
  if (src === 'legacy_unverified') return 'legacy_unverified';
  return String(scoreMeta?.scoreValidity || 'insufficient_data');
};

const buildBigFivePoints = (doc) => {
  const bf = doc.scores?.bigFive;
  if (!bf || typeof bf !== 'object') return [];
  const date = toDateKey(doc.completedAt || doc.createdAt);
  const resultId = String(doc._id);
  const sm = deriveScoreMeta(doc);
  const conf = Number(sm.confidence ?? doc.analytics?.confidence ?? 0);
  const validity = trendValidityLabel(sm);

  return BIG_FIVE_KEYS.map(({ dimension }) => {
    const block = bf[dimension];
    const score = Number(block?.score ?? block?.percent ?? 0);
    return {
      date,
      resultId,
      dimension,
      score: Math.round(clampScore(score)),
      confidence: conf,
      validity,
    };
  });
};

const buildRiasecPoints = (doc) => {
  const dims = doc.scores?.riasec?.dimensions || doc.scores?.riasec;
  if (!dims || typeof dims !== 'object') return [];
  const date = toDateKey(doc.completedAt || doc.createdAt);
  const resultId = String(doc._id);
  const sm = deriveScoreMeta(doc);
  const conf = Number(sm.confidence ?? doc.analytics?.confidence ?? 0);
  const validity = trendValidityLabel(sm);

  const out = [];
  RIASEC_KEYS.forEach((dimension) => {
    const block = dims[dimension];
    if (block === undefined || block === null) return;
    const score = Number(block?.score ?? block ?? 0);
    if (!Number.isFinite(score)) return;
    out.push({
      date,
      resultId,
      dimension: `riasec_${dimension.toLowerCase()}`,
      score: Math.round(clampScore(score)),
      confidence: conf,
      validity,
    });
  });
  return out;
};

const buildWorkValuesTopPoints = (doc) => {
  const wv = doc.scores?.workValues;
  if (!wv || typeof wv !== 'object') return [];
  const values = wv.values || wv.top || wv;
  if (!values || typeof values !== 'object') return [];
  const date = toDateKey(doc.completedAt || doc.createdAt);
  const resultId = String(doc._id);
  const sm = deriveScoreMeta(doc);
  const conf = Number(sm.confidence ?? doc.analytics?.confidence ?? 0);
  const validity = trendValidityLabel(sm);

  const scored = Object.entries(values)
    .map(([key, val]) => {
      const score = Number(val?.score ?? val ?? 0);
      return { key, score };
    })
    .filter((x) => Number.isFinite(x.score) && x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return scored.map(({ key, score }) => ({
    date,
    resultId,
    dimension: `work_value_${String(key).toLowerCase().replace(/\s+/g, '_')}`,
    score: Math.round(clampScore(score)),
    confidence: conf,
    validity,
  }));
};

/**
 * Chronological docs (oldest first) for trend construction.
 */
const getTraitTrendPayload = async ({ requester, userId }) => {
  assertReadableUserId({ requester, targetUserId: userId });
  if (!mongoose.isValidObjectId(userId)) {
    return { status: 'insufficient_history', message: 'Not enough history yet.', trendPoints: [], meta: {} };
  }

  const results = await AssessmentResult.find({ userId })
    .sort({ createdAt: 1 })
    .select('_id scores scoreMeta analytics completedAt createdAt personality legacyAssessmentId careerRecommendations')
    .lean();

  const eligible = results.filter((doc) => {
    const sm = deriveScoreMeta(doc);
    return isTrendEligibleValidity(sm.scoreValidity) && String(sm.scoreSource || '') !== 'legacy_unverified';
  });

  if (eligible.length < 2) {
    return {
      status: 'insufficient_history',
      message: 'Not enough history yet. Complete at least two assessments with valid or partial scores to see trends.',
      trendPoints: [],
      meta: { assessmentCount: results.length, eligibleCount: eligible.length },
    };
  }

  const trendPoints = [];
  eligible.forEach((doc) => {
    trendPoints.push(...buildBigFivePoints(doc));
    trendPoints.push(...buildRiasecPoints(doc));
    trendPoints.push(...buildWorkValuesTopPoints(doc));
  });

  return {
    status: 'ok',
    message: '',
    trendPoints,
    meta: {
      assessmentCount: results.length,
      eligibleCount: eligible.length,
      series: ['bigFive', 'riasec', 'workValuesTop'],
    },
  };
};

module.exports = {
  getTraitTrendPayload,
  buildBigFivePoints,
  buildRiasecPoints,
};
