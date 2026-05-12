/**
 * Clears adaptive questionnaire state after CV or manual profile ingest (before start).
 */
const resetAdaptiveBranchAfterProfileIngest = (session) => {
  session.aiProfile = undefined;
  session.profileVector = undefined;
  session.smartIntro = undefined;
  session.questionPlan = [];
  session.questionPoolBackup = [];
  session.askedQuestions = [];
  session.usedIntents = [];
  session.adaptiveMetrics = {
    answerTelemetry: [],
    fatigue: null,
    fatigueDetected: false,
    questionnaireConfidence: 0,
    shouldStopEarly: false,
    targetQuestionCount: 0,
    cvComplexity: 0,
    confidenceExtensionApplied: false,
    inconsistencyExtensionApplied: false,
    extensionReasons: [],
    prefetchedSupplementalQuestionPlan: [],
    evaluatedAt: new Date(),
  };
  session.currentQuestionIndex = 0;
  session.answers = [];
  session.answersJson = [];
  session.behaviorPrompts = [];
  session.currentBehaviorIndex = 0;
  session.behaviorAnswers = [];
  session.resultId = null;
  session.behaviorAnalysis = undefined;
  session.personalityProfile = undefined;
  session.careerRecommendations = [];
  session.careerRoadmap = [];
  session.resultSummary = undefined;
  session.completedAt = null;
  session.lastActiveAt = new Date();
};

module.exports = {
  resetAdaptiveBranchAfterProfileIngest,
};
