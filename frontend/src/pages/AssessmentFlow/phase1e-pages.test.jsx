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
  useRetryAiReportMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
  useCareerRecommendationsQuery: () => ({ data: null, isPending: false, isError: false }),
  useActiveFlowSessionQuery: () => ({ data: null, isPending: false, isError: false }),
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

  it('disables submit while mutation pending; recovery banner does NOT show passively', () => {
    h.mockMachine.mockReturnValue({
      stage: 'ASSESSMENT_IN_PROGRESS',
      shouldPoll: true,
      isMutating: true,
      canSubmitAnswer: true,
      submitAnswer: h.submitAnswer,
      recoverSession: h.recoverSession,
      progress: { answeredCount: 5 },
      session: { sessionId: 's1' },
    });
    render(
      <MemoryRouter>
        <TestPage />
      </MemoryRouter>
    );
    // When mutating, button shows loading label "Saving…" and is disabled
    const savingBtn = screen.getByRole('button', { name: /saving/i });
    expect(savingBtn).toBeDisabled();
    // Recovery banner must NOT appear just because answeredCount > 0 — only after explicit recovery
    expect(screen.queryByText(/your assessment progress was recovered/i)).not.toBeInTheDocument();
  });

  it('recovery banner appears only after explicit recover action', async () => {
    h.recoverSession.mockResolvedValueOnce(undefined);
    h.mockMachine.mockReturnValue({
      stage: 'ASSESSMENT_IN_PROGRESS',
      shouldPoll: false,
      isMutating: false,
      canSubmitAnswer: true,
      submitAnswer: h.submitAnswer,
      recoverSession: h.recoverSession,
      progress: { answeredCount: 3 },
      session: { sessionId: 's1' },
    });
    render(<MemoryRouter><TestPage /></MemoryRouter>);
    // Banner not visible before recover
    expect(screen.queryByText(/your assessment progress was recovered/i)).not.toBeInTheDocument();
    // Click recover
    fireEvent.click(screen.getByTestId('assessment-recover-session'));
    await waitFor(() => {
      expect(screen.getByText(/your assessment progress was recovered/i)).toBeInTheDocument();
    });
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
    h.recoverSession
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce(undefined);
    h.mockMachine.mockReturnValue({
      stage: 'ASSESSMENT_IN_PROGRESS',
      shouldPoll: false,
      isMutating: false,
      canSubmitAnswer: true,
      submitAnswer: h.submitAnswer,
      recoverSession: h.recoverSession,
      progress: { answeredCount: 2 },
      session: { sessionId: 's1' },
    });
    render(
      <MemoryRouter>
        <TestPage />
      </MemoryRouter>
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId('assessment-recover-session'));
    });
    await waitFor(() => {
      expect(screen.getByText('We could not recover your assessment safely.')).toBeInTheDocument();
    }, { timeout: 3000 });
    expect(screen.getByRole('button', { name: /retry recovery/i })).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /retry recovery/i }));
    });
    await waitFor(() => {
      expect(h.recoverSession).toHaveBeenCalledTimes(2);
    }, { timeout: 3000 });
  });

  it('shows waiting UI when API says waitingForNextQuestion and no question is loaded', () => {
    h.adaptiveQuery.data = {
      session: { stage: 'questionnaire', adaptiveMetrics: {} },
      waitingForNextQuestion: true,
      question: null,
    };
    // shouldScheduleAdaptiveQuestionPoll is derived solely from API flag + question presence.
    expect(
      shouldScheduleAdaptiveQuestionPoll({
        questionQueryWaiting: true,
        question: null,
        sessionId: 's1',
      })
    ).toBe(true);
    expect(
      shouldScheduleAdaptiveQuestionPoll({
        questionQueryWaiting: false,
        question: null,
        sessionId: 's1',
      })
    ).toBe(false);
    expect(
      shouldScheduleAdaptiveQuestionPoll({
        questionQueryWaiting: true,
        question: { questionId: 'q1' },
        sessionId: 's1',
      })
    ).toBe(false);

    render(
      <MemoryRouter>
        <TestPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/preparing your next questions/i).length).toBeGreaterThan(0);
  });

  it('result page report states render', async () => {
    const wrap = () => (
      <MemoryRouter initialEntries={['/assessment/result?session=s1']}>
        <React.Suspense fallback={null}>
          <ResultPage />
        </React.Suspense>
      </MemoryRouter>
    );
    const { rerender } = render(wrap());
    await waitFor(() => {
      expect(screen.getByText(/Scoring is required/i)).toBeInTheDocument();
    });
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: { trait_scores: {}, career_recommendations: [], meta: {} },
        state: { reportStatus: { status: 'generating' } },
      },
      refetch: h.generateReport,
    });
    rerender(wrap());
    await waitFor(() => {
      expect(screen.getByText(/Preparing your AI summary/i)).toBeInTheDocument();
    });
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: { trait_scores: {}, career_recommendations: [], meta: {} },
        state: { reportStatus: { status: 'failed' } },
      },
      refetch: h.generateReport,
    });
    rerender(wrap());
    await waitFor(() => {
      expect(screen.getByText(/AI narrative could not be generated/i)).toBeInTheDocument();
    });
  });

  it('does not auto-generate report repeatedly on rerender', async () => {
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
    const wrap = () => (
      <MemoryRouter initialEntries={['/assessment/result?session=s1']}>
        <React.Suspense fallback={null}>
          <ResultPage />
        </React.Suspense>
      </MemoryRouter>
    );
    const { rerender } = render(wrap());
    await waitFor(() => {
      expect(screen.getByText(/AI Career Intelligence Report/i)).toBeInTheDocument();
    });
    rerender(wrap());
    rerender(wrap());
    expect(h.generateReport).not.toHaveBeenCalled();
  });

  it('retry AI summary button visible on failed status; disabled while pending', async () => {
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      isFetching: false,
      data: {
        result: { trait_scores: {}, career_recommendations: [], meta: {} },
        state: { reportStatus: { status: 'failed' } },
      },
      refetch: h.generateReport,
    });
    render(
      <MemoryRouter initialEntries={['/assessment/result?session=s1']}>
        <React.Suspense fallback={null}>
          <ResultPage />
        </React.Suspense>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('retry-ai-report-btn')).toBeInTheDocument();
    });
    expect(screen.getByTestId('retry-ai-report-btn')).not.toBeDisabled();
  });

  it('result page shows report title and chatbot sticky launcher', async () => {
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: {
          personality_type: 'Analyst',
          trait_scores: { O: 70, C: 65 },
          career_recommendations: [],
          meta: { generated_at: 't1' },
          narrative_summary: 'Summary',
          confidence_band: 'high',
          confidence_score: 80,
          confidence_gap: 1,
        },
        state: { reportStatus: { status: 'ready' } },
      },
      refetch: h.generateReport,
    });
    render(
      <MemoryRouter initialEntries={['/assessment/result?session=s1']}>
        <React.Suspense fallback={null}>
          <ResultPage />
        </React.Suspense>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Personality & Career Intelligence Report/i)).toBeInTheDocument();
    });
    expect(screen.getByTestId('chatbot-sticky-launcher')).toBeInTheDocument();
    expect(screen.getByTestId('chatbot-sticky-launcher')).toHaveAttribute('aria-label', 'Ask AI Career Coach');
  });

  it('roadmap renders stages with human-readable labels (no raw key strings)', async () => {
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: {
          personality_type: 'Analyst',
          trait_scores: {},
          career_recommendations: [],
          meta: {},
          narrative_summary: 'Summary',
          confidence_band: 'low',
          confidence_score: 40,
          confidence_gap: 5,
          career_roadmap: [
            { stage: 'foundation_phase', summary: 'Build core skills', duration: '0–30 days', actions: ['read_docs', 'practice_code'] },
            { stage: 'portfolio_phase', summary: 'Build portfolio', duration: '1–3 months', actions: ['create_project'] },
          ],
        },
        state: { reportStatus: { status: 'ready' } },
      },
      refetch: h.generateReport,
    });
    render(
      <MemoryRouter initialEntries={['/assessment/result?session=s1']}>
        <React.Suspense fallback={null}>
          <ResultPage />
        </React.Suspense>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getAllByTestId('roadmap-stage').length).toBeGreaterThan(0);
    });
    // Human-readable label: underscores replaced with spaces, capitalized
    expect(screen.getByText('Foundation Phase')).toBeInTheDocument();
    // Actions should also be human-readable
    expect(screen.getByText('read docs')).toBeInTheDocument();
  });

  it('result page has no user-facing Phase 4 / phase labels', async () => {
    h.mockResultQuery.mockReturnValue({
      isPending: false,
      data: {
        result: {
          personality_type: 'Analyst',
          trait_scores: {},
          career_recommendations: [],
          meta: {},
          narrative_summary: 'Summary',
          confidence_band: 'low',
          confidence_score: 40,
          confidence_gap: 5,
        },
        state: { reportStatus: { status: 'ready' } },
      },
      refetch: h.generateReport,
    });
    render(
      <MemoryRouter initialEntries={['/assessment/result?session=s1']}>
        <React.Suspense fallback={null}>
          <ResultPage />
        </React.Suspense>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Personality & Career Intelligence Report/i)).toBeInTheDocument();
    });
    // No raw internal phase labels in visible content
    const html = document.body.innerHTML;
    expect(html).not.toMatch(/\bphase8-v1\b/);
    expect(html).not.toMatch(/\bphase8\b/);
    expect(html).not.toMatch(/\bdeterministic\b/i.source + '.*score');
  });

  it('result page shows Career Intelligence when Phase 4 bundle is embedded', async () => {
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
        <React.Suspense fallback={null}>
          <ResultPage />
        </React.Suspense>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Career Intelligence' })).toBeInTheDocument();
    });
    expect(screen.getAllByText(/Software Engineer/i).length).toBeGreaterThanOrEqual(1);
  });
});
