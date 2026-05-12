import { renderHook, act } from '@testing-library/react';
import useAssessmentSessionMachine from './useAssessmentSessionMachine';

const mutateAsync = vi.fn(async () => ({ ok: true }));

const submitPendingState = { isPending: false };
const refetch = vi.fn();

vi.mock('./useAssessmentFlow', () => ({
  useActiveFlowSessionQuery: () => ({
    data: {
      state: { stage: 'ASSESSMENT_IN_PROGRESS', allowedActions: ['SUBMIT_ANSWER'] },
      session: { sessionId: 's1' },
    },
    isPending: false,
    refetch,
  }),
  useSubmitAdaptiveAnswerMutation: () => ({
    isPending: submitPendingState.isPending,
    mutateAsync,
  }),
}));

describe('useAssessmentSessionMachine', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    submitPendingState.isPending = false;
  });

  it('guards duplicate submit while current action is pending', async () => {
    const { result } = renderHook(() => useAssessmentSessionMachine());
    await act(async () => {
      await Promise.all([
        result.current.submitAnswer({ sessionId: 's1', payload: { value: 1 } }),
        result.current.submitAnswer({ sessionId: 's1', payload: { value: 1 } }),
      ]);
    });
    expect(mutateAsync).toHaveBeenCalledTimes(1);
  });

  it('does not poll while assessment machine is mutating', async () => {
    submitPendingState.isPending = true;
    const { result } = renderHook(() => useAssessmentSessionMachine());
    await act(async () => {
      const out = await result.current.recoverSession();
      expect(out).toBeNull();
    });
    expect(refetch).not.toHaveBeenCalled();
  });
});
