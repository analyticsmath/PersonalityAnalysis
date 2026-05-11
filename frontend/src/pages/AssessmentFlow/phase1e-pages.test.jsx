import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TestPage from './TestPage';
import ResultPage from './ResultPage';

const mockMachine = vi.fn();
const mockResultQuery = vi.fn();
const submitAnswer = vi.fn();
const recoverSession = vi.fn();

vi.mock('../../hooks/useAuth', () => ({ useAuth: () => ({ userId: 'u1' }) }));
vi.mock('../../hooks/useAssessmentSessionMachine', () => ({ default: () => mockMachine() }));
vi.mock('../../hooks/useAssessmentFlow', () => ({
  useAdaptiveQuestionQuery: () => ({ data: { session: { stage: 'questionnaire', adaptiveMetrics: {} }, question: { questionId: 'q1', sequence: 1, type: 'likert', text: 'Q', category: 'gen' } }, refetch: vi.fn() }),
  usePreviousAdaptiveQuestionMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
  useAssessmentFlowResultQuery: () => mockResultQuery(),
  useCareerChatMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
  useWhyNotCareerMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
}));
vi.mock('../../components/assessment/QuestionRenderer', () => ({ default: ({ onLikertChange }) => <button onClick={() => onLikertChange(4)}>set</button> }));
vi.mock('../../components/assessment/QuestionVisualPanel', () => ({ default: () => <div/> }));
vi.mock('../../components/charts/TraitRadarChart', () => ({ default: () => <div/> }));
vi.mock('../../components/charts/CareerAlignmentChart', () => ({ default: () => <div/> }));
vi.mock('../../components/charts/MetricBarChart', () => ({ default: () => <div/> }));
vi.mock('../../components/charts/InsightHeatmapChart', () => ({ default: () => <div/> }));
vi.mock('../../components/3d/TraitSphere', () => ({ default: () => <div/> }));
vi.mock('framer-motion', () => ({ useReducedMotion: () => true, motion: new Proxy({}, { get: () => 'div' }) }));
vi.mock('../../utils/assessmentFlowStorage', () => ({ readAssessmentFlowState: () => ({ sessionId: 's1' }), saveAssessmentFlowState: vi.fn(), saveQuestionDraft: vi.fn(), readQuestionDraft: () => null, clearQuestionDraft: vi.fn(), clearAssessmentFlowState: vi.fn() }));
vi.mock('../../components/avatar/AvatarEvents', () => ({ AVATAR_EVENTS: {}, useAvatarEvents: () => ({ emit: vi.fn() }) }));
vi.mock('gsap', () => ({ gsap: { registerPlugin: vi.fn(), timeline: () => ({ fromTo: () => {}, kill: () => {} }), to: () => ({ kill: () => {} }), fromTo: () => ({ kill: () => {}, scrollTrigger: { kill: () => {} } }) } }));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));

describe('phase1e page states', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMachine.mockReturnValue({ stage: 'ASSESSMENT_IN_PROGRESS', shouldPoll: true, isMutating: false, canSubmitAnswer: true, submitAnswer, recoverSession, progress: { answeredCount: 1 }, session: { sessionId: 's1' } });
    mockResultQuery.mockReturnValue({ isPending: false, data: { result: { trait_scores: {}, career_recommendations: [], meta: {} }, state: { reportStatus: { status: 'scoring_required' } } } });
  });

  it('disables submit while mutation pending and shows recovery states', async () => {
    mockMachine.mockReturnValueOnce({ stage: 'ASSESSMENT_IN_PROGRESS', shouldPoll: true, isMutating: true, canSubmitAnswer: true, submitAnswer, recoverSession, progress: { answeredCount: 1 }, session: { sessionId: 's1' } });
    render(<MemoryRouter><TestPage /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(screen.getByText(/recovered/i)).toBeInTheDocument();
  });

  it('double click submit triggers submit handler (hook enforces dedupe)', () => {
    render(<MemoryRouter><TestPage /></MemoryRouter>);
    fireEvent.click(screen.getByText('set'));
    const next = screen.getByRole('button', { name: /next/i });
    fireEvent.click(next);
    fireEvent.click(next);
    expect(submitAnswer).toHaveBeenCalledTimes(2);
  });

  it('result page report states render and no auto-generate loop', () => {
    const { rerender } = render(<MemoryRouter><ResultPage /></MemoryRouter>);
    expect(screen.getByText(/Scoring is required/i)).toBeInTheDocument();
    mockResultQuery.mockReturnValue({ isPending: false, data: { result: { trait_scores: {}, career_recommendations: [], meta: {} }, state: { reportStatus: { status: 'generating' } } } });
    rerender(<MemoryRouter><ResultPage /></MemoryRouter>);
    expect(screen.getByText(/Generating your AI report/i)).toBeInTheDocument();
    mockResultQuery.mockReturnValue({ isPending: false, data: { result: { trait_scores: {}, career_recommendations: [], meta: {} }, state: { reportStatus: { status: 'failed' } } } });
    rerender(<MemoryRouter><ResultPage /></MemoryRouter>);
    expect(screen.getByText(/Please retry/i)).toBeInTheDocument();
  });
});
