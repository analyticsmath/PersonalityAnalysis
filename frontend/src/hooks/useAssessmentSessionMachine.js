import { useMemo, useRef } from 'react';
import { useActiveFlowSessionQuery, useSubmitAdaptiveAnswerMutation } from './useAssessmentFlow';

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const useAssessmentSessionMachine = () => {
  const activeQuery = useActiveFlowSessionQuery(true);
  const submitMutation = useSubmitAdaptiveAnswerMutation();
  const actionRef = useRef('');

  const session = activeQuery.data?.session || null;
  const normalizedState = activeQuery.data?.state || null;
  const stage = normalizedState?.stage || 'IDLE';
  const allowedActions = normalizedState?.allowedActions || [];

  const canSubmitAnswer = allowedActions.includes('SUBMIT_ANSWER') && !submitMutation.isPending;

  const submitAnswer = async ({ sessionId, payload }) => {
    if (submitMutation.isPending) return null;
    const actionId = uid();
    actionRef.current = actionId;
    return submitMutation.mutateAsync({
      sessionId,
      payload: {
        ...payload,
        clientActionId: actionId,
        idempotencyKey: actionId,
        expectedStage: stage,
      },
    });
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
    isMutating: submitMutation.isPending,
    currentAction: actionRef.current,
    error: activeQuery.error || submitMutation.error || null,
    canSubmitAnswer,
    submitAnswer,
    recoverSession: activeQuery.refetch,
  };
};

export default useAssessmentSessionMachine;
