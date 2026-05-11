import { useRef } from 'react';
import { useActiveFlowSessionQuery, useSubmitAdaptiveAnswerMutation } from './useAssessmentFlow';

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const LONG_RUNNING_STAGES = new Set([
  'CV_ANALYSIS_RUNNING',
  'QUESTION_PLAN_GENERATING',
  'SCORING_RUNNING',
  'REPORT_GENERATING',
]);

export const useAssessmentSessionMachine = () => {
  const submitMutation = useSubmitAdaptiveAnswerMutation();
  const actionRef = useRef('');

  const activeQuery = useActiveFlowSessionQuery(true);

  const session = activeQuery.data?.session || null;
  const normalizedState = activeQuery.data?.state || null;
  const stage = normalizedState?.stage || 'IDLE';
  const allowedActions = normalizedState?.allowedActions || [];

  const isMutating = submitMutation.isPending;
  const canSubmitAnswer = allowedActions.includes('SUBMIT_ANSWER') && !isMutating;

  const submitAnswer = async ({ sessionId, payload }) => {
    if (submitMutation.isPending || actionRef.current === 'SUBMIT_ANSWER') return null;
    const actionId = uid();
    actionRef.current = 'SUBMIT_ANSWER';
    try {
      return await submitMutation.mutateAsync({
        sessionId,
        payload: {
          ...payload,
          clientActionId: actionId,
          idempotencyKey: actionId,
          expectedStage: stage,
        },
      });
    } finally {
      actionRef.current = '';
    }
  };

  const refetchNow = () => {
    if (isMutating) return null;
    return activeQuery.refetch();
  };

  return {
    session,
    normalizedState,
    stage,
    progress: normalizedState?.progress || { currentQuestionIndex: 0, totalQuestions: 0, answeredCount: 0, percent: 0 },
    currentQuestion: activeQuery.data?.question || normalizedState?.currentQuestion || null,
    allowedActions,
    scoreStatus: normalizedState?.scoreStatus || null,
    reportStatus: normalizedState?.reportStatus || null,
    isInitialLoading: activeQuery.isPending,
    isMutating,
    currentAction: actionRef.current,
    error: activeQuery.error || submitMutation.error || null,
    canSubmitAnswer,
    canContinue: allowedActions.includes('LOAD_NEXT_QUESTION') && !isMutating,
    canCompleteAssessment: allowedActions.includes('COMPLETE_ASSESSMENT') && !isMutating,
    canRunScoring: allowedActions.includes('RUN_SCORING') && !isMutating,
    canGenerateReport: allowedActions.includes('GENERATE_REPORT') && !isMutating,
    submitAnswer,
    completeAssessment: async () => null,
    runScoring: async () => null,
    generateReport: async () => null,
    recoverSession: refetchNow,
    retryCurrentStage: refetchNow,
    shouldPoll: LONG_RUNNING_STAGES.has(stage) && !isMutating,
  };
};

export default useAssessmentSessionMachine;
