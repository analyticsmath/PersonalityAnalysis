import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CareerExplorerPage from './CareerExplorerPage';

const mockCareerQuery = vi.fn();

vi.mock('../../hooks/useAuth', () => ({ useAuth: () => ({ userId: 'u1' }) }));

vi.mock('../../hooks/useAssessmentFlow', () => ({
  useCareerRecommendationsQuery: () => mockCareerQuery(),
}));

vi.mock('../../utils/assessmentFlowStorage', () => ({
  readAssessmentFlowState: () => ({ sessionId: 'sess-1' }),
}));

describe('CareerExplorerPage', () => {
  beforeEach(() => {
    mockCareerQuery.mockReset();
  });

  it('renders deterministic career panel when query succeeds (no AI dependency)', () => {
    mockCareerQuery.mockReturnValue({
      isPending: false,
      isError: false,
      data: {
        locked: false,
        preliminary: false,
        recommendations: {
          bestFits: [{ careerId: 'c1', title: 'Engineer', fitScore: 80 }],
          stretchFits: [],
          exploratoryFits: [],
          lowerFitButPossible: [],
        },
        topRecommendations: [{ careerId: 'c1', title: 'Engineer', fitScore: 80 }],
        roadmaps: [],
      },
    });

    render(
      <MemoryRouter initialEntries={['/assessment/career?session=sess-1']}>
        <Routes>
          <Route path="/assessment/career" element={<CareerExplorerPage />} />
        </Routes>
      </MemoryRouter>
    );

    const panel = screen.getByTestId('career-explorer-panel');
    expect(within(panel).getAllByText(/Engineer/i).length).toBeGreaterThan(0);
  });
});
