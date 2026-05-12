const { sendSuccess } = require('../utils/response');
const { getPersonalAnalyticsOverview, buildReportHistory, buildGrowthRecommendations } = require('../services/analytics/personalAnalytics.service');
const { listAssessmentHistoryForUser } = require('../services/analytics/assessmentHistory.service');
const { getTraitTrendPayload } = require('../services/analytics/traitTrends.service');
const { getCareerReadinessForUser } = require('../services/analytics/careerReadiness.service');
const { getSkillProgressForUser } = require('../services/analytics/skillProgress.service');
const { getInsightTimelineForUser } = require('../services/analytics/insightTimeline.service');
const {
  getRoadmapProgressDoc,
  updateRoadmapProgressDoc,
} = require('../services/analytics/roadmapProgress.service');

const currentUserId = (req) => String(req.user?.id || req.user?.userId || '');

const getOverview = async (req, res, next) => {
  try {
    const userId = currentUserId(req);
    const data = await getPersonalAnalyticsOverview({ requester: req.user, userId });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const userId = currentUserId(req);
    const items = await listAssessmentHistoryForUser({ requester: req.user, userId });
    return sendSuccess(res, { data: { items }, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const getTrends = async (req, res, next) => {
  try {
    const userId = currentUserId(req);
    const data = await getTraitTrendPayload({ requester: req.user, userId });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const getCareerReadiness = async (req, res, next) => {
  try {
    const userId = currentUserId(req);
    const data = await getCareerReadinessForUser({ requester: req.user, userId });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const getSkillProgress = async (req, res, next) => {
  try {
    const userId = currentUserId(req);
    const data = await getSkillProgressForUser({ requester: req.user, userId });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const getTimeline = async (req, res, next) => {
  try {
    const userId = currentUserId(req);
    const data = await getInsightTimelineForUser({ requester: req.user, userId });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const getReportHistory = async (req, res, next) => {
  try {
    const userId = currentUserId(req);
    const [items, growth] = await Promise.all([
      buildReportHistory({ requester: req.user, userId }),
      buildGrowthRecommendations({ requester: req.user, userId }),
    ]);
    return sendSuccess(res, { data: { items, growthRecommendations: growth.items }, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const getRoadmapProgress = async (req, res, next) => {
  try {
    const { resultId, careerId } = req.params;
    const data = await getRoadmapProgressDoc({ requester: req.user, resultId, careerId });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const postRoadmapProgress = async (req, res, next) => {
  try {
    const { resultId, careerId } = req.params;
    const { completedActionKeys } = req.body || {};
    const data = await updateRoadmapProgressDoc({
      requester: req.user,
      resultId,
      careerId,
      completedActionKeys,
    });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOverview,
  getHistory,
  getTrends,
  getCareerReadiness,
  getSkillProgress,
  getTimeline,
  getReportHistory,
  getRoadmapProgress,
  postRoadmapProgress,
};
