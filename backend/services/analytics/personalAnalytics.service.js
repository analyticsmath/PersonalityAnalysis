const AssessmentResult = require('../../models/AssessmentResult');
const { deriveScoreMeta } = require('../assessment/unified-contracts.service');
const { toPublicAiReport, toAiReportMeta } = require('../assessmentResultView.service');
const { listAssessmentHistoryForUser, assertReadableUserId } = require('./assessmentHistory.service');
const { getTraitTrendPayload } = require('./traitTrends.service');
const { getCareerReadinessForUser } = require('./careerReadiness.service');
const { getSkillProgressForUser } = require('./skillProgress.service');
const { getInsightTimelineForUser } = require('./insightTimeline.service');

const buildReportHistory = async ({ requester, userId }) => {
  assertReadableUserId({ requester, targetUserId: userId });
  const results = await AssessmentResult.find({ userId })
    .sort({ createdAt: -1 })
    .limit(30)
    .select('_id analytics scoreMeta completedAt createdAt')
    .lean();

  return results.map((doc) => {
    const sm = deriveScoreMeta(doc);
    const ai = doc.analytics?.aiReport;
    const pub = toPublicAiReport(ai);
    const meta = toAiReportMeta(ai);
    return {
      resultId: String(doc._id),
      assessmentDate: doc.completedAt || doc.createdAt,
      hasReport: Boolean(pub && String(pub.summary || '').trim()),
      aiStatus: meta?.aiStatus || pub?.aiStatus || null,
      fallbackUsed: Boolean(meta?.aiStatus?.fallbackUsed || pub?.aiStatus?.fallbackUsed),
      scoreValidity: sm.scoreValidity,
      scoreSource: sm.scoreSource,
    };
  });
};

const buildGrowthRecommendations = async ({ requester, userId }) => {
  assertReadableUserId({ requester, targetUserId: userId });
  const latest = await AssessmentResult.findOne({ userId })
    .sort({ createdAt: -1 })
    .select('analytics careerRecommendations warnings')
    .lean();

  const items = [];
  const ai = latest?.analytics?.aiReport;
  if (ai && Array.isArray(ai.growthSuggestions)) {
    ai.growthSuggestions.slice(0, 8).forEach((text) => {
      if (String(text || '').trim()) items.push({ source: 'ai_report', text: String(text).trim() });
    });
  }
  const top = latest?.careerRecommendations?.topRecommendations?.[0];
  if (top?.recommendedNextSteps?.length) {
    top.recommendedNextSteps.slice(0, 5).forEach((text) => {
      if (String(text || '').trim()) items.push({ source: 'career_engine', text: String(text).trim() });
    });
  }
  if (Array.isArray(latest?.warnings)) {
    latest.warnings.slice(0, 5).forEach((w) => {
      if (String(w || '').trim()) items.push({ source: 'system', text: String(w).trim() });
    });
  }

  return { items };
};

const getPersonalAnalyticsOverview = async ({ requester, userId }) => {
  assertReadableUserId({ requester, targetUserId: userId });

  const history = await listAssessmentHistoryForUser({ requester, userId });
  const latest = history[0] || null;
  const readiness = await getCareerReadinessForUser({ requester, userId });
  const trends = await getTraitTrendPayload({ requester, userId });
  const skills = await getSkillProgressForUser({ requester, userId });
  const timeline = await getInsightTimelineForUser({ requester, userId });
  const reportHistory = await buildReportHistory({ requester, userId });
  const growth = await buildGrowthRecommendations({ requester, userId });

  const topTrait = latest?.primaryArchetype ? latest.primaryArchetype : '';

  let latestReportStatus = 'none';
  if (latest) {
    if (latest.hasAiReport) latestReportStatus = 'ready';
    else latestReportStatus = 'pending';
  }

  let nextRecommendedAction = 'Start your first adaptive assessment to unlock personal analytics.';
  if (latest) {
    if (!latest.hasAiReport) {
      nextRecommendedAction = 'Generate an AI narrative report for your latest assessment.';
    } else if (readiness.status === 'insufficient_history' || readiness.careerReadinessScore == null) {
      nextRecommendedAction = 'Complete another assessment when you are ready to unlock trend comparisons.';
    } else if (skills.missingSkills?.length) {
      nextRecommendedAction = `Focus next on building: ${skills.missingSkills.slice(0, 2).join(', ')}.`;
    } else {
      nextRecommendedAction = 'Review your insight timeline and roadmap actions for structured next steps.';
    }
  }

  const latestConfidence =
    latest && latest.confidence != null && !Number.isNaN(Number(latest.confidence))
      ? Number(latest.confidence)
      : null;

  return {
    assessmentCount: history.length,
    latestConfidence,
    topTrait,
    topCareerFit: latest?.topCareer || '',
    careerReadiness: readiness,
    traitTrendsSummary: {
      status: trends.status,
      message: trends.message,
    },
    skillProgressSummary: {
      status: skills.status,
      targetCareer: skills.targetCareer,
    },
    latestReportStatus,
    nextRecommendedAction,
    historyPreview: history.slice(0, 4),
    timelinePreview: (timeline.events || []).slice(0, 5),
    reportHistoryPreview: reportHistory.slice(0, 4),
    growthRecommendations: growth.items.slice(0, 12),
  };
};

module.exports = {
  getPersonalAnalyticsOverview,
  buildReportHistory,
  buildGrowthRecommendations,
};
