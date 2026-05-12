const mongoose = require('mongoose');
const User = require('../../models/User');
const AssessmentSession = require('../../models/AssessmentSession');
const AssessmentResult = require('../../models/AssessmentResult');
const CareerRoadmapProgress = require('../../models/CareerRoadmapProgress');
const { createHttpError } = require('../../utils/httpError');
const { normalizeCvData } = require('../assessment/unified-contracts.service');
const { assertResultOwned } = require('../analytics/roadmapProgress.service');

const EMPTY_CV = normalizeCvData({});

const assertConfirm = (body) => {
  if (!body || body.confirm !== true) {
    throw createHttpError(400, 'Request body must include { "confirm": true }.');
  }
};

const buildUserExport = async (userId) => {
  const user = await User.findById(userId).select('-password').lean();
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const [sessions, results, roadmapRows] = await Promise.all([
    AssessmentSession.find({ userId }).lean(),
    AssessmentResult.find({ userId }).lean(),
    CareerRoadmapProgress.find({ userId }).lean(),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    exportVersion: 'phase8-v1',
    user: {
      _id: String(user._id),
      name: user.name,
      email: user.email,
      provider: user.provider,
      role: user.role,
      askedQuestions: user.askedQuestions,
      preferredCareerLens: user.preferredCareerLens,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    assessmentSessions: sessions.map((s) => ({
      _id: String(s._id),
      status: s.status,
      stage: s.stage,
      userRole: s.userRole,
      profileSource: s.profileSource,
      profileConsent: s.profileConsent,
      cvData: s.cvData,
      userProfile: s.userProfile,
      manualProfileArtifact: s.manualProfileArtifact,
      resultId: s.resultId ? String(s.resultId) : null,
      chatHistory: s.chatHistory,
      progressEvents: (s.progressEvents || []).slice(-80),
      startedAt: s.startedAt,
      completedAt: s.completedAt,
      lastActiveAt: s.lastActiveAt,
    })),
    assessmentResults: results.map((r) => ({
      _id: String(r._id),
      sessionId: String(r.sessionId),
      cvData: r.cvData,
      answers: r.answers,
      behavior: r.behavior,
      personality: r.personality,
      career: r.career,
      analytics: r.analytics,
      scores: r.scores,
      scoreMeta: r.scoreMeta,
      evidence: r.evidence,
      warnings: r.warnings,
      careerRecommendations: r.careerRecommendations,
      completedAt: r.completedAt,
      createdAt: r.createdAt,
    })),
    roadmapProgress: roadmapRows.map((row) => ({
      resultId: String(row.resultId),
      careerId: row.careerId,
      completedActionKeys: row.completedActionKeys,
      updatedAt: row.updatedAt,
    })),
    aiAuditNote:
      'In-process AI audit events are not exported from this deployment; only stored session/result fields appear above.',
  };
};

const deleteProfileDataForUser = async (userId) => {
  await AssessmentSession.updateMany(
    { userId },
    {
      $set: {
        cvRawText: '',
        cvData: EMPTY_CV,
        userProfile: {},
        manualProfileArtifact: null,
        profileSource: '',
        profileConsent: null,
      },
      $unset: {
        aiProfile: 1,
        profileVector: 1,
        smartIntro: 1,
      },
    }
  ).exec();

  await AssessmentResult.updateMany(
    { userId },
    {
      $set: {
        cvData: EMPTY_CV,
        evidence: [],
        'personality.narrativeSummary': '',
      },
    }
  ).exec();

  return { ok: true };
};

const deleteAssessmentForUser = async ({ requester, resultId }) => {
  await assertResultOwned({ requester, resultId });
  const rid = new mongoose.Types.ObjectId(resultId);

  await CareerRoadmapProgress.deleteMany({ userId: requester.id, resultId: rid }).exec();
  await AssessmentSession.deleteMany({ userId: requester.id, resultId: rid }).exec();
  const del = await AssessmentResult.deleteOne({ _id: rid, userId: requester.id }).exec();
  if (!del.deletedCount) {
    throw createHttpError(404, 'Assessment result not found');
  }
  return { ok: true, deletedResultId: String(rid) };
};

const deleteAccountForUser = async ({ requester, body }) => {
  assertConfirm(body);
  const userId = requester.id;

  await CareerRoadmapProgress.deleteMany({ userId }).exec();
  await AssessmentSession.deleteMany({ userId }).exec();
  await AssessmentResult.deleteMany({ userId }).exec();
  const del = await User.deleteOne({ _id: userId }).exec();
  if (!del.deletedCount) {
    throw createHttpError(404, 'User not found');
  }

  return { ok: true, behavior: 'hard_delete_user_and_related_records' };
};

module.exports = {
  buildUserExport,
  deleteProfileDataForUser,
  deleteAssessmentForUser,
  deleteAccountForUser,
  assertConfirm,
};
