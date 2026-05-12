const mongoose = require('mongoose');
const AssessmentResult = require('../../models/AssessmentResult');
const { createHttpError } = require('../../utils/httpError');
const { deriveScoreMeta } = require('../assessment/unified-contracts.service');
const { toTraitPayload } = require('../assessmentResultView.service');

const assertReadableUserId = ({ requester, targetUserId }) => {
  if (!mongoose.isValidObjectId(targetUserId)) {
    throw createHttpError(400, 'Invalid userId');
  }
  if (String(requester.id) !== String(targetUserId) && requester.role !== 'admin') {
    throw createHttpError(403, 'Forbidden');
  }
};

const topCareerTitleFromResult = (doc) => {
  const cr = doc.careerRecommendations;
  const top = cr?.topRecommendations?.[0];
  if (top?.title) return String(top.title).trim();
  const legacy = Array.isArray(doc.career?.recommendations) ? doc.career.recommendations[0] : null;
  if (legacy?.career) return String(legacy.career).trim();
  return '';
};

const primaryArchetypeFromResult = (doc) => {
  const arch = doc.personality?.archetypes || {};
  return (
    String(arch.interpretation?.label || '').trim() ||
    String(arch.personalityType || '').trim() ||
    String(arch.dominantTrait || '').trim() ||
    ''
  );
};

const deriveHistoryStatus = ({ completedAt, scoreMeta, legacyAssessmentId }) => {
  if (legacyAssessmentId) return 'legacy';
  const src = String(scoreMeta?.scoreSource || '');
  if (src === 'legacy_unverified') return 'legacy';
  if (!completedAt) return 'partial';
  const v = String(scoreMeta?.scoreValidity || '');
  if (v === 'invalid') return 'failed';
  if (v === 'insufficient_data' || v === 'partial') return 'partial';
  return 'completed';
};

const deriveScoreValidityBucket = (scoreMeta) => {
  const v = String(scoreMeta?.scoreValidity || 'insufficient_data');
  const src = String(scoreMeta?.scoreSource || '');
  if (src === 'legacy_unverified') return 'legacy_unverified';
  if (['valid', 'partial', 'insufficient_data'].includes(v)) return v;
  return 'insufficient_data';
};

/**
 * @returns {Promise<Array<object>>}
 */
const listAssessmentHistoryForUser = async ({ requester, userId }) => {
  assertReadableUserId({ requester, targetUserId: userId });

  const results = await AssessmentResult.find({ userId })
    .sort({ createdAt: -1 })
    .select(
      '_id sessionId userId personality career careerRecommendations analytics scores scoreMeta completedAt createdAt updatedAt legacyAssessmentId'
    )
    .lean();

  return results.map((doc) => {
    const scoreMeta = deriveScoreMeta(doc);
    const traits = toTraitPayload(doc.personality?.traits || {});
    const dominant =
      String(doc.personality?.archetypes?.dominantTrait || '').trim() ||
      ['O', 'C', 'E', 'A', 'N'].reduce((best, k) => (traits[k] > traits[best] ? k : best), 'O');

    const hasAiReport = Boolean(doc.analytics?.aiReport && String(doc.analytics.aiReport.summary || '').trim());
    const hasCareerRecommendations = Boolean(
      doc.careerRecommendations &&
        typeof doc.careerRecommendations === 'object' &&
        !doc.careerRecommendations.locked &&
        Array.isArray(doc.careerRecommendations.topRecommendations) &&
        doc.careerRecommendations.topRecommendations.length > 0
    );

    return {
      assessmentId: String(doc._id),
      resultId: String(doc._id),
      createdAt: doc.createdAt,
      completedAt: doc.completedAt,
      status: deriveHistoryStatus({
        completedAt: doc.completedAt,
        scoreMeta,
        legacyAssessmentId: doc.legacyAssessmentId,
      }),
      scoreValidity: deriveScoreValidityBucket(scoreMeta),
      primaryArchetype: primaryArchetypeFromResult(doc) || dominant,
      topCareer: topCareerTitleFromResult(doc),
      confidence: Number(scoreMeta?.confidence ?? doc.analytics?.confidence ?? 0),
      hasAiReport,
      hasCareerRecommendations,
    };
  });
};

module.exports = {
  listAssessmentHistoryForUser,
  assertReadableUserId,
};
