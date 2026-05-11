import { renderHook, act } from '@testing-library/react';
import useAssessmentSessionMachine from './useAssessmentSessionMachine';

const mutateAsync = vi.fn(async () => ({ ok: true }));

vi.mock('./useAssessmentFlow', () => ({
  useActiveFlowSessionQuery: () => ({
    data: { state: { stage: 'ASSESSMENT_IN_PROGRESS', allowedActions: ['SUBMIT_ANSWER'] }, session: { sessionId: 's1' } },
    isPending: false,
    refetch: vi.fn(),
  }),
  useSubmitAdaptiveAnswerMutation: () => ({
    isPending: false,
    mutateAsync,
  }),
}));

describe('useAssessmentSessionMachine', () => {
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
});
