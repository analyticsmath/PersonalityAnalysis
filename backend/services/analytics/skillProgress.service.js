const AssessmentResult = require('../../models/AssessmentResult');
const { deriveScoreMeta } = require('../assessment/unified-contracts.service');
const { assertReadableUserId } = require('./assessmentHistory.service');

const extractSkillSnapshot = (doc) => {
  const cr = doc.careerRecommendations || {};
  const top = Array.isArray(cr.topRecommendations) ? cr.topRecommendations[0] : null;
  const targetCareer = top?.title ? String(top.title).trim() : '';
  const topCareerId = top?.careerId ? String(top.careerId).trim() : '';
  const gaps = top?.skillGaps || {};
  return {
    targetCareer,
    topCareerId,
    matchedSkills: Array.isArray(gaps.matchedSkills) ? gaps.matchedSkills.map(String) : [],
    missingSkills: Array.isArray(gaps.missingCriticalSkills) ? gaps.missingCriticalSkills.map(String) : [],
    recommendedSkills: Array.isArray(gaps.recommendedSkills) ? gaps.recommendedSkills.map(String) : [],
    skillReadiness: Number(gaps.skillReadinessScore ?? 0),
    at: doc.completedAt || doc.createdAt,
    resultId: String(doc._id),
  };
};

/**
 * Baseline from latest result; progress over time only when multiple comparable snapshots exist.
 */
const getSkillProgressForUser = async ({ requester, userId }) => {
  assertReadableUserId({ requester, targetUserId: userId });

  const results = await AssessmentResult.find({ userId })
    .sort({ createdAt: -1 })
    .limit(8)
    .select('_id careerRecommendations scores scoreMeta completedAt createdAt')
    .lean();

  if (!results.length) {
    return {
      targetCareer: '',
      topCareerId: '',
      matchedSkills: [],
      missingSkills: [],
      recommendedSkills: [],
      progressItems: [],
      status: 'insufficient_history',
      warnings: ['No assessment results yet.'],
    };
  }

  const latest = results[0];
  const snap = extractSkillSnapshot(latest);
  const warnings = [];

  const progressItems = [];
  if (results.length >= 2) {
    const older = results[1];
    const prev = extractSkillSnapshot(older);
    if (snap.targetCareer && prev.targetCareer && snap.targetCareer === prev.targetCareer) {
      const gained = snap.matchedSkills.filter((s) => !prev.matchedSkills.includes(s));
      gained.forEach((skill) => {
        progressItems.push({
          type: 'skill_gained',
          skill,
          fromResultId: prev.resultId,
          toResultId: snap.resultId,
          at: snap.at,
        });
      });
    } else if (snap.targetCareer !== prev.targetCareer && prev.targetCareer) {
      warnings.push('Target career changed between assessments; skill progress is shown for the latest target only.');
    }
  }

  let status = 'baseline';
  if (results.length >= 2 && progressItems.length) status = 'improving';
  else if (results.length >= 2) status = 'baseline';

  const sm = deriveScoreMeta(latest);
  if (String(sm.scoreValidity) === 'insufficient_data') {
    warnings.push('Skill snapshot is limited because scoring data is insufficient.');
  }

  return {
    targetCareer: snap.targetCareer,
    topCareerId: snap.topCareerId || '',
    matchedSkills: snap.matchedSkills,
    missingSkills: snap.missingSkills,
    recommendedSkills: snap.recommendedSkills,
    progressItems,
    status,
    warnings,
  };
};

module.exports = {
  getSkillProgressForUser,
  extractSkillSnapshot,
};
