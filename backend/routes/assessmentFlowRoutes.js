/**
 * Assessment API — canonical mount at `/api/assessment`.
 *
 * Core adaptive flow: cv/upload, session/active, start, :id, question, answer, result, career-recommendations, chat, pdf, events.
 * Legacy static questionnaire (compatibility): `/legacy/session/*`, `/legacy/save`.
 * Dashboard/report/analytics helpers live here so one auth gate applies; see docs/architecture/assessment-api-contract.md.
 */
const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const {
  uploadCv,
  submitManualProfile,
  startAdaptiveAssessment,
  getCurrentQuestion,
  getPreviousQuestion,
  answerAdaptiveQuestion,
  getAssessmentResult,
  downloadAssessmentResultPdf,
  getCareerRecommendations,
  getActiveFlowSession,
  getFlowSessionById,
  streamAssessmentProgress,
  careerChat,
  explainWhyNotCareerForSession,
} = require('../Controllers/assessmentFlowController');
const {
  startAssessmentSession,
  getActiveAssessmentSession,
  syncAssessmentSession,
  saveAssessment,
  getAssessmentsByUser,
  getAssessmentReport,
  getDashboardSnapshot,
} = require('../Controllers/assessmentController');
const { generateAssessmentAiReport } = require('../Controllers/aiController');
const {
  getAnalyticsTrends,
  getAssessmentComparison,
} = require('../Controllers/analyticsController');
const {
  getOverview: getPersonalAnalyticsOverview,
  getHistory: getPersonalAnalyticsHistory,
  getTrends: getPersonalTraitTrends,
  getCareerReadiness: getPersonalCareerReadiness,
  getSkillProgress: getPersonalSkillProgress,
  getTimeline: getPersonalInsightTimeline,
  getReportHistory: getPersonalReportHistory,
  getRoadmapProgress: getPersonalRoadmapProgress,
  postRoadmapProgress: postPersonalRoadmapProgress,
} = require('../Controllers/personalAnalyticsController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 6 * 1024 * 1024,
  },
});

router.use(authMiddleware);

router.post('/cv/upload', upload.single('cv'), uploadCv);
router.post('/profile/manual', submitManualProfile);
router.post('/legacy/session/start', startAssessmentSession);
router.get('/legacy/session/:userId', getActiveAssessmentSession);
router.patch('/legacy/session/:sessionId', syncAssessmentSession);
router.post('/legacy/save', saveAssessment);

router.get('/history/:userId', getAssessmentsByUser);
router.get('/report/:assessmentId', getAssessmentReport);
router.post('/report/:assessmentId/ai', generateAssessmentAiReport);
router.get('/dashboard/:userId', getDashboardSnapshot);
router.get('/analytics/trends/:userId', getAnalyticsTrends);
router.get('/analytics/compare', getAssessmentComparison);

/** Phase 7 — personal analytics (current user only; no :userId in path). */
router.get('/analytics/overview', getPersonalAnalyticsOverview);
router.get('/analytics/history', getPersonalAnalyticsHistory);
router.get('/analytics/trends', getPersonalTraitTrends);
router.get('/analytics/career-readiness', getPersonalCareerReadiness);
router.get('/analytics/skill-progress', getPersonalSkillProgress);
router.get('/analytics/timeline', getPersonalInsightTimeline);
router.get('/analytics/report-history', getPersonalReportHistory);
router.get('/analytics/roadmap-progress/:resultId/:careerId', getPersonalRoadmapProgress);
router.post('/analytics/roadmap-progress/:resultId/:careerId', postPersonalRoadmapProgress);

router.get('/session/active', getActiveFlowSession);
router.get('/:id/events', streamAssessmentProgress);
router.get('/:id', getFlowSessionById);
router.post('/start', startAdaptiveAssessment);
router.get('/:id/question', getCurrentQuestion);
router.post('/:id/question/previous', getPreviousQuestion);
router.post('/:id/answer', answerAdaptiveQuestion);
router.get('/:id/result', getAssessmentResult);
router.get('/:id/result/pdf', downloadAssessmentResultPdf);
router.get('/:id/career-recommendations', getCareerRecommendations);
router.post('/:id/chat', careerChat);
router.post('/:id/why-not', explainWhyNotCareerForSession);

module.exports = router;
