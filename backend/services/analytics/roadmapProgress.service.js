const mongoose = require('mongoose');
const CareerRoadmapProgress = require('../../models/CareerRoadmapProgress');
const AssessmentResult = require('../../models/AssessmentResult');
const { createHttpError } = require('../../utils/httpError');

const assertResultOwned = async ({ requester, resultId }) => {
  if (!mongoose.isValidObjectId(resultId)) {
    throw createHttpError(400, 'Invalid resultId');
  }
  const doc = await AssessmentResult.findById(resultId).select('userId').lean();
  if (!doc) throw createHttpError(404, 'Assessment result not found');
  if (String(doc.userId) !== String(requester.id) && requester.role !== 'admin') {
    throw createHttpError(403, 'Forbidden');
  }
};

const countRoadmapActions = (timeline = []) => {
  let n = 0;
  (Array.isArray(timeline) ? timeline : []).forEach((stage) => {
    const actions = Array.isArray(stage?.actions) ? stage.actions : [];
    n += actions.length;
  });
  return n;
};

const buildActionKeysForCareer = (careerId, timeline = []) => {
  const keys = [];
  (Array.isArray(timeline) ? timeline : []).forEach((stage, si) => {
    const actions = Array.isArray(stage?.actions) ? stage.actions : [];
    actions.forEach((_a, ai) => {
      keys.push(`${careerId}|${si}|${ai}`);
    });
  });
  return keys;
};

/**
 * Progress percent for the top recommended career on the given result (0–100).
 */
const getRoadmapProgressPercentForResult = async ({ requester, resultId, careerRecommendations }) => {
  if (!careerRecommendations || typeof careerRecommendations !== 'object') return 0;
  const top = careerRecommendations.topRecommendations?.[0];
  const careerId = top?.careerId ? String(top.careerId) : '';
  if (!careerId || !mongoose.isValidObjectId(resultId)) return 0;

  const roadmapEntry = (Array.isArray(careerRecommendations.roadmaps) ? careerRecommendations.roadmaps : []).find(
    (r) => String(r.careerId) === careerId
  );
  const timeline = roadmapEntry?.timeline || [];
  const allKeys = buildActionKeysForCareer(careerId, timeline);
  if (!allKeys.length) return 0;

  const progress = await CareerRoadmapProgress.findOne({
    userId: requester.id,
    resultId,
    careerId,
  }).lean();

  const completed = new Set(Array.isArray(progress?.completedActionKeys) ? progress.completedActionKeys : []);
  const done = allKeys.filter((k) => completed.has(k)).length;
  return Math.round((done / allKeys.length) * 100);
};

const getRoadmapProgressDoc = async ({ requester, resultId, careerId }) => {
  await assertResultOwned({ requester, resultId });
  const careerIdStr = String(careerId || '').trim();
  if (!careerIdStr) {
    throw createHttpError(400, 'Invalid careerId');
  }

  const result = await AssessmentResult.findById(resultId)
    .select('userId careerRecommendations')
    .lean();
  const roadmapEntry = (Array.isArray(result?.careerRecommendations?.roadmaps)
    ? result.careerRecommendations.roadmaps
    : []
  ).find((r) => String(r.careerId) === careerIdStr);

  const timeline = roadmapEntry?.timeline || [];
  const totalActions = countRoadmapActions(timeline);
  const allKeys = buildActionKeysForCareer(careerIdStr, timeline);

  let progress = await CareerRoadmapProgress.findOne({
    userId: result.userId,
    resultId,
    careerId: careerIdStr,
  }).lean();

  if (!progress && allKeys.length) {
    progress = {
      userId: result.userId,
      resultId,
      careerId: careerIdStr,
      completedActionKeys: [],
      updatedAt: null,
    };
  }

  const completed = new Set(Array.isArray(progress?.completedActionKeys) ? progress.completedActionKeys : []);
  const percent = allKeys.length ? Math.round((allKeys.filter((k) => completed.has(k)).length / allKeys.length) * 100) : 0;

  return {
    resultId: String(resultId),
    careerId: careerIdStr,
    totalActions,
    completedCount: allKeys.filter((k) => completed.has(k)).length,
    progressPercent: percent,
    completedActionKeys: Array.from(completed),
    validActionKeys: allKeys,
  };
};

const updateRoadmapProgressDoc = async ({ requester, resultId, careerId, completedActionKeys }) => {
  await assertResultOwned({ requester, resultId });
  const careerIdStr = String(careerId || '').trim();
  if (!careerIdStr) {
    throw createHttpError(400, 'Invalid careerId');
  }

  const result = await AssessmentResult.findById(resultId)
    .select('userId careerRecommendations')
    .lean();

  const roadmapEntry = (Array.isArray(result?.careerRecommendations?.roadmaps)
    ? result.careerRecommendations.roadmaps
    : []
  ).find((r) => String(r.careerId) === careerIdStr);

  const timeline = roadmapEntry?.timeline || [];
  const validKeys = new Set(buildActionKeysForCareer(careerIdStr, timeline));
  const incoming = Array.isArray(completedActionKeys) ? completedActionKeys.map(String) : [];
  const filtered = incoming.filter((k) => validKeys.has(k));

  const updated = await CareerRoadmapProgress.findOneAndUpdate(
    { userId: result.userId, resultId, careerId: careerIdStr },
    {
      $set: {
        userId: result.userId,
        resultId,
        careerId: careerIdStr,
        completedActionKeys: filtered,
        updatedAt: new Date(),
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  const allKeys = [...validKeys];
  const completed = new Set(updated.completedActionKeys || []);
  const percent = allKeys.length ? Math.round((allKeys.filter((k) => completed.has(k)).length / allKeys.length) * 100) : 0;

  return {
    resultId: String(resultId),
    careerId: String(careerId),
    totalActions: allKeys.length,
    completedCount: allKeys.filter((k) => completed.has(k)).length,
    progressPercent: percent,
    completedActionKeys: updated.completedActionKeys || [],
    validActionKeys: allKeys,
  };
};

module.exports = {
  getRoadmapProgressPercentForResult,
  getRoadmapProgressDoc,
  updateRoadmapProgressDoc,
  assertResultOwned,
  countRoadmapActions,
  buildActionKeysForCareer,
};
