const AssessmentResult = require('../../models/AssessmentResult');
const { deriveScoreMeta } = require('../assessment/unified-contracts.service');
const { assertReadableUserId } = require('./assessmentHistory.service');
const { clamp } = require('./analyticsTypes');
const { getRoadmapProgressPercentForResult } = require('./roadmapProgress.service');

/**
 * Career readiness **indicator** (not hireability): weighted blend from latest result + Phase 4 signals.
 */
const getCareerReadinessForUser = async ({ requester, userId }) => {
  assertReadableUserId({ requester, targetUserId: userId });

  const latest = await AssessmentResult.findOne({ userId })
    .sort({ createdAt: -1 })
    .select(
      '_id scores scoreMeta evidence careerRecommendations analytics completedAt createdAt career warnings'
    )
    .lean();

  if (!latest) {
    return {
      careerReadinessScore: null,
      confidence: null,
      topCareer: '',
      skillReadiness: null,
      roadmapProgress: null,
      evidenceCompleteness: null,
      status: 'insufficient_history',
      warnings: ['No completed assessment results found.'],
    };
  }

  const sm = deriveScoreMeta(latest);
  const warnings = [...(Array.isArray(latest.warnings) ? latest.warnings : [])];

  if (String(sm.scoreValidity) === 'invalid' || String(sm.scoreValidity) === 'insufficient_data') {
    warnings.push('Career readiness indicator cannot be computed reliably until scoring validity improves.');
    return {
      careerReadinessScore: null,
      confidence: Number(sm.confidence ?? latest.analytics?.confidence ?? 0) || null,
      topCareer: '',
      skillReadiness: null,
      roadmapProgress: null,
      evidenceCompleteness: null,
      status: 'insufficient_history',
      warnings,
    };
  }

  const cr = latest.careerRecommendations || {};
  const top = Array.isArray(cr.topRecommendations) ? cr.topRecommendations[0] : null;
  const topCareer = top?.title ? String(top.title).trim() : '';
  const topFit = clamp(Number(top?.fitScore ?? 0), 0, 100);

  const skillReadiness = clamp(Number(top?.skillGaps?.skillReadinessScore ?? cr.skillGapSummary?.averageReadiness ?? 0), 0, 100);

  const roadmapPct = await getRoadmapProgressPercentForResult({
    requester,
    resultId: String(latest._id),
    careerRecommendations: cr,
  });

  const evidence = Array.isArray(latest.evidence) ? latest.evidence : [];
  const evidenceCompleteness = clamp(Math.min(100, evidence.length * 4), 0, 100);

  const conf = clamp(Number(sm.confidence ?? latest.analytics?.confidence ?? 0), 0, 1);

  const careerReadinessScore = Math.round(
    topFit * 0.35 + skillReadiness * 0.3 + conf * 100 * 0.15 + roadmapPct * 0.1 + evidenceCompleteness * 0.1
  );

  let status = 'new';
  const prev = await AssessmentResult.findOne({ userId, _id: { $ne: latest._id } })
    .sort({ createdAt: -1 })
    .select('_id careerRecommendations scoreMeta')
    .lean();

  if (prev) {
    const prevTop = prev.careerRecommendations?.topRecommendations?.[0];
    const prevFit = clamp(Number(prevTop?.fitScore ?? 0), 0, 100);
    if (Math.abs(topFit - prevFit) >= 5) status = 'improving';
    else status = 'stable';
  }

  if (String(sm.scoreValidity) === 'partial' || !sm.isFinal || cr.preliminary) {
    warnings.push('This career readiness indicator is preliminary given partial scoring or limited evidence.');
  }

  return {
    careerReadinessScore,
    confidence: conf,
    topCareer,
    skillReadiness,
    roadmapProgress: Math.round(roadmapPct),
    evidenceCompleteness,
    status,
    warnings,
  };
};

module.exports = {
  getCareerReadinessForUser,
};
