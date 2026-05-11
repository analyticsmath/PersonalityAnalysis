const CANONICAL_STAGES = {
  IDLE: 'IDLE',
  CV_UPLOAD_PENDING: 'CV_UPLOAD_PENDING',
  CV_UPLOADED: 'CV_UPLOADED',
  CV_ANALYSIS_RUNNING: 'CV_ANALYSIS_RUNNING',
  CV_ANALYSIS_COMPLETE: 'CV_ANALYSIS_COMPLETE',
  QUESTION_PLAN_GENERATING: 'QUESTION_PLAN_GENERATING',
  QUESTION_PLAN_READY: 'QUESTION_PLAN_READY',
  ASSESSMENT_IN_PROGRESS: 'ASSESSMENT_IN_PROGRESS',
  ANSWER_SUBMITTING: 'ANSWER_SUBMITTING',
  NEXT_QUESTION_READY: 'NEXT_QUESTION_READY',
  BEHAVIOR_PROMPTS: 'BEHAVIOR_PROMPTS',
  SCORING_RUNNING: 'SCORING_RUNNING',
  SCORING_COMPLETE: 'SCORING_COMPLETE',
  REPORT_GENERATING: 'REPORT_GENERATING',
  REPORT_READY: 'REPORT_READY',
  COMPLETED: 'COMPLETED',
  CV_ANALYSIS_FAILED: 'CV_ANALYSIS_FAILED',
  QUESTION_GENERATION_FAILED: 'QUESTION_GENERATION_FAILED',
  ANSWER_SUBMIT_FAILED: 'ANSWER_SUBMIT_FAILED',
  SCORING_FAILED: 'SCORING_FAILED',
  REPORT_GENERATION_FAILED: 'REPORT_GENERATION_FAILED',
  SESSION_RECOVERY_REQUIRED: 'SESSION_RECOVERY_REQUIRED',
};

const LEGACY_TO_CANONICAL = {
  cv_upload: CANONICAL_STAGES.CV_UPLOAD_PENDING,
  questionnaire: CANONICAL_STAGES.ASSESSMENT_IN_PROGRESS,
  behavior: CANONICAL_STAGES.BEHAVIOR_PROMPTS,
  result: CANONICAL_STAGES.COMPLETED,
};

const ACTIONS_BY_STAGE = {
  [CANONICAL_STAGES.CV_UPLOAD_PENDING]: ['UPLOAD_CV', 'START_ASSESSMENT'],
  [CANONICAL_STAGES.ASSESSMENT_IN_PROGRESS]: ['SUBMIT_ANSWER', 'PREVIOUS_QUESTION', 'PAUSE'],
  [CANONICAL_STAGES.NEXT_QUESTION_READY]: ['LOAD_NEXT_QUESTION', 'SUBMIT_ANSWER'],
  [CANONICAL_STAGES.BEHAVIOR_PROMPTS]: ['SUBMIT_BEHAVIOR_ANSWER'],
  [CANONICAL_STAGES.SCORING_COMPLETE]: ['GENERATE_REPORT'],
  [CANONICAL_STAGES.REPORT_READY]: ['VIEW_RESULTS'],
  [CANONICAL_STAGES.COMPLETED]: ['VIEW_RESULTS'],
};

const normalizeStage = (rawStage) => LEGACY_TO_CANONICAL[String(rawStage || '').trim()] || CANONICAL_STAGES.IDLE;

const getAllowedActions = (canonicalStage) => ACTIONS_BY_STAGE[canonicalStage] || [];

const toSessionState = ({ session, question, behaviorPrompt, isMutating = false, currentAction = null, scoreStatus, reportStatus, error = null }) => {
  const canonicalStage = normalizeStage(session?.stage);
  const totalQuestions = Number(session?.totalQuestions || 0);
  const answeredCount = Number(session?.answersCount || 0);
  return {
    sessionId: session?.sessionId || null,
    stage: canonicalStage,
    status: session?.status || 'inactive',
    progress: {
      currentQuestionIndex: Number(session?.currentQuestionIndex || 0),
      totalQuestions,
      answeredCount,
      percent: totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0,
    },
    currentQuestion: question || null,
    behaviorPrompt: behaviorPrompt || null,
    allowedActions: getAllowedActions(canonicalStage),
    locks: { isMutating: Boolean(isMutating), lockedByActionId: currentAction || null },
    scoreStatus: scoreStatus || { hasValidScores: false, scoreSource: 'unknown', confidence: null },
    reportStatus: reportStatus || { available: false, generating: false },
    error,
  };
};

module.exports = { CANONICAL_STAGES, normalizeStage, getAllowedActions, toSessionState };
