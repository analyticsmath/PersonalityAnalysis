import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TestPage, { shouldScheduleAdaptiveQuestionPoll } from './TestPage';
import ResultPage from './ResultPage';

const h = vi.hoisted(() => ({
  refetchQuestion: vi.fn(),
  mockMachine: vi.fn(),
  mockResultQuery: vi.fn(),
  submitAnswer: vi.fn(),
  recoverSession: vi.fn(),
  generateReport: vi.fn(),
  adaptiveQuery: {
    data: {
      session: { stage: 'questionnaire', adaptiveMetrics: {} },
      waitingForNextQuestion: false,
      question: { questionId: 'q1', sequence: 1, type: 'likert', text: 'Q', category: 'gen' },
    },
    refetch: vi.fn(),
    isPending: false,
  },
}));

vi.mock('../../hooks/useAuth', () => ({ useAuth: () => ({ userId: 'u1' }) }));
vi.mock('../../hooks/useAssessmentSessionMachine', () => ({ default: () => h.mockMachine() }));
vi.mock('../../hooks/useAssessmentFlow', () => ({
  useAdaptiveQuestionQuery: () => {
    h.adaptiveQuery.refetch = h.refetchQuestion;
    return h.adaptiveQuery;
  },
  usePreviousAdaptiveQuestionMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
  useAssessmentFlowResultQuery: () => {
    const base = h.mockResultQuery();
    return {
      ...base,
      refetch: base.refetch || h.generateReport,
    };
  },
  useCareerChatMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
  useWhyNotCareerMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
  useCareerRecommendationsQuery: () => ({ data: null, isPending: false, isError: false }),
}));
vi.mock('../../components/assessment/QuestionRenderer', () => ({ default: ({ onLikertChange }) => <button onClick={() => onLikertChange(4)}>set</button> }));
vi.mock('../../components/assessment/QuestionVisualPanel', () => ({ default: () => <div/> }));
vi.mock('../../components/charts/TraitRadarChart', () => ({ default: () => <div/> }));
vi.mock('../../components/charts/CareerAlignmentChart', () => ({ default: () => <div/> }));
vi.mock('../../components/charts/MetricBarChart', () => ({ default: () => <div/> }));
vi.mock('../../components/charts/InsightHeatmapChart', () => ({ default: () => <div/> }));
vi.mock('../../components/3d/TraitSphere', () => ({ default: () => <div/> }));
vi.mock('framer-motion', () => {
  const MotionStub = ({ children }) => <div>{children}</div>;
  return { useReducedMotion: () => true, motion: new Proxy({}, { get: () => MotionStub }) };
});
vi.mock('../../utils/assessmentFlowStorage', () => ({ readAssessmentFlowState: () => ({ sessionId: 's1' }), saveAssessmentFlowState: vi.fn(), saveQuestionDraft: vi.fn(), readQuestionDraft: () => null, clearQuestionDraft: vi.fn(), clearAssessmentFlowState: vi.fn() }));
vi.mock('../../components/avatar/AvatarEvents', () => ({ AVATAR_EVENTS: {}, useAvatarEvents: () => ({ emit: vi.fn() }) }));
vi.mock('gsap', () => ({ gsap: { registerPlugin: vi.fn(), timeline: () => ({ fromTo: () => {}, kill: () => {} }), to: () => ({ kill: () => {} }), fromTo: () => ({ kill: () => {}, scrollTrigger: { kill: () => {} } }) } }));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));

describe('phase1e page states', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    h.adaptiveQuery.data = {
      session: { stage: 'questionnaire', adaptiveMetrics: {} },
      waitingForNextQuestion: false,
      question: { questionId: 'q1', sequence: 1, type: 'likert', text: 'Q', category: 'gen' },
    };
    h.adaptiveQuery.isPending = false;
    h.refetchQuestion.mockClear();
    h.mockMachine.mockReturnValue({
      stage: 'ASSESSMENT_IN_PROGRESS',
      shouldPoll: true,
      isMutating: false,
      canSubmitAnswer: true,
      submitAnswer: h.submitAnswer,
      recoverSession: h.recoverSession,
      progress: { answeredCount: 1 },
      session: { sessionId: 's1' },
    });
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: { trait_scores: {}, career_recommendations: [], meta: {} },
        state: { reportStatus: { status: 'scoring_required' } },
      },
      refetch: h.generateReport,
    });
  });

  it('disables submit while mutation pending and shows recovery states', async () => {
    h.mockMachine.mockReturnValueOnce({
      stage: 'ASSESSMENT_IN_PROGRESS',
      shouldPoll: true,
      isMutating: true,
      canSubmitAnswer: true,
      submitAnswer: h.submitAnswer,
      recoverSession: h.recoverSession,
      progress: { answeredCount: 1 },
      session: { sessionId: 's1' },
    });
    render(
      <MemoryRouter>
        <TestPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(screen.getByText(/recovered/i)).toBeInTheDocument();
  });

  it('double click submit triggers submit handler (hook enforces dedupe)', async () => {
    render(
      <MemoryRouter>
        <TestPage />
      </MemoryRouter>
    );
    await act(async () => {
      fireEvent.click(screen.getByText('set'));
    });
    const next = screen.getByRole('button', { name: /next/i });
    await act(async () => {
      fireEvent.click(next);
      fireEvent.click(next);
    });
    expect(h.submitAnswer).toHaveBeenCalledTimes(2);
  });

  it('shows recovery failure copy and retry; retry calls recoverSession again', async () => {
    h.recoverSession.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce(undefined);
    render(
      <MemoryRouter>
        <TestPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('assessment-recover-session'));
    await waitFor(() => {
      expect(screen.getByText('We could not recover your assessment safely.')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /retry recovery/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /retry recovery/i }));
    await waitFor(() => {
      expect(h.recoverSession).toHaveBeenCalledTimes(2);
    });
  });

  it('does not poll while assessment machine is mutating (no interval when mutating)', () => {
    vi.useFakeTimers();
    h.adaptiveQuery.data = {
      session: { stage: 'questionnaire', adaptiveMetrics: {} },
      waitingForNextQuestion: true,
      question: null,
    };
    h.mockMachine.mockReturnValue({
      stage: 'ASSESSMENT_IN_PROGRESS',
      shouldPoll: true,
      isMutating: true,
      canSubmitAnswer: true,
      submitAnswer: h.submitAnswer,
      recoverSession: h.recoverSession,
      progress: { answeredCount: 1 },
      session: { sessionId: 's1' },
    });
    expect(
      shouldScheduleAdaptiveQuestionPoll({
        questionQueryWaiting: true,
        question: null,
        sessionId: 's1',
        shouldPoll: true,
        isMutating: true,
      })
    ).toBe(false);

    render(
      <MemoryRouter>
        <TestPage />
      </MemoryRouter>
    );
    vi.advanceTimersByTime(5000);
    expect(h.refetchQuestion).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('result page report states render', () => {
    const { rerender } = render(
      <MemoryRouter>
        <ResultPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Scoring is required/i)).toBeInTheDocument();
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: { trait_scores: {}, career_recommendations: [], meta: {} },
        state: { reportStatus: { status: 'generating' } },
      },
      refetch: h.generateReport,
    });
    rerender(
      <MemoryRouter>
        <ResultPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Your optional AI narrative may still be generating/i)).toBeInTheDocument();
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: { trait_scores: {}, career_recommendations: [], meta: {} },
        state: { reportStatus: { status: 'failed' } },
      },
      refetch: h.generateReport,
    });
    rerender(
      <MemoryRouter>
        <ResultPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/optional AI narrative step failed/i)).toBeInTheDocument();
  });

  it('does not auto-generate report repeatedly on rerender', () => {
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: {
          personality_type: 'Analyst',
          personality_type_label: 'Analyst',
          trait_scores: { O: 50, C: 50, E: 50, A: 50, N: 50 },
          career_recommendations: [{ career: 'Engineer', score: 80 }],
          meta: { generated_at: 't1', scoreValidity: 'valid', scoreSource: 'deterministic' },
          narrative_summary: 'Summary',
          confidence_band: 'high',
          confidence_score: 80,
          confidence_gap: 1,
          cognitive_scores: {},
          behavior_vector: {},
        },
        state: { reportStatus: { status: 'ready', available: true } },
      },
      refetch: h.generateReport,
    });
    const { rerender } = render(
      <MemoryRouter>
        <ResultPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/AI Career Intelligence Report/i)).toBeInTheDocument();
    rerender(
      <MemoryRouter>
        <ResultPage />
      </MemoryRouter>
    );
    rerender(
      <MemoryRouter>
        <ResultPage />
      </MemoryRouter>
    );
    expect(h.generateReport).not.toHaveBeenCalled();
  });

  it('result page shows Career Intelligence when Phase 4 bundle is embedded', () => {
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: {
          personality_type: 'Analyst',
          personality_type_label: 'Analyst',
          trait_scores: { O: 50, C: 50, E: 50, A: 50, N: 50 },
          career_recommendations: [{ career: 'Engineer', score: 80 }],
          meta: { generated_at: 't1', scoreValidity: 'valid', scoreSource: 'deterministic' },
          narrative_summary: 'Summary',
          confidence_band: 'high',
          confidence_score: 80,
          confidence_gap: 1,
          cognitive_scores: {},
          behavior_vector: {},
          scores: {
            bigFive: {
              openness: { score: 50, source: 'deterministic' },
              conscientiousness: { score: 50, source: 'deterministic' },
              extraversion: { score: 50, source: 'deterministic' },
              agreeableness: { score: 50, source: 'deterministic' },
              emotionalStability: { score: 50, source: 'deterministic' },
            },
            riasec: { dimensions: {} },
          },
          career_recommendations_phase4: {
            locked: false,
            preliminary: false,
            topRecommendations: [
              {
                careerId: 'software_engineer',
                title: 'Software Engineer',
                fitScore: 82,
                confidence: 0.7,
                fitType: 'bestFit',
                whyThisFits: ['Problem-solving overlap.'],
                skillGaps: { missingCriticalSkills: [] },
              },
            ],
          },
        },
        state: { reportStatus: { status: 'ready', available: true } },
      },
      refetch: h.generateReport,
    });
    render(
      <MemoryRouter initialEntries={['/assessment/result?session=s1']}>
        <ResultPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Career Intelligence' })).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
  });
});
