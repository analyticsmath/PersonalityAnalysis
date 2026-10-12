import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import PublicRouteTransition from './components/public-experience/motion/PublicRouteTransition';
import EditorialCareerIntelligencePage from './pages/editorial/EditorialCareerIntelligencePage';
import EditorialHowItWorksPage from './pages/editorial/EditorialHowItWorksPage';
import EditorialTrustPage from './pages/editorial/EditorialTrustPage';
import EditorialProgressPage from './pages/editorial/EditorialProgressPage';
import EditorialMethodologyPage from './pages/editorial/EditorialMethodologyPage';

describe('Source Gate V3 — Public Route Transitions & Navigation Guard', () => {
  const TestNavigationHarness = () => {
    const location = useLocation();
    return (
      <div>
        <div id="main-content" tabIndex="-1">Target Main</div>
        <div data-testid="current-search">{location.search}</div>
        <div data-testid="current-path">{location.pathname}</div>
      </div>
    );
  };

  it('1. Transition Coordinator mounts smoothly without errors', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PublicRouteTransition />
        <TestNavigationHarness />
      </MemoryRouter>
    );

    expect(screen.getByText('Target Main')).toBeInTheDocument();
  });
});

describe('Source Gate V3 — Editorial Evidence Atlas Composition Contracts', () => {
  it('2. renders Career Intelligence with 17 canonical roles', () => {
    render(
      <MemoryRouter>
        <EditorialCareerIntelligencePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('tablist', { name: 'Occupational profiles' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(17);
  });

  it('3. confirms HowItWorks renders causal visual essay stage', () => {
    render(
      <MemoryRouter>
        <EditorialHowItWorksPage />
      </MemoryRouter>
    );

    const howStage = document.querySelector('.vt-how-sequence');
    expect(howStage).not.toBeNull();
  });

  it('4. confirms Trust page renders five evidence layers and sovereign rights', () => {
    render(
      <MemoryRouter>
        <EditorialTrustPage />
      </MemoryRouter>
    );

    expect(document.querySelectorAll('.vt-trust-step-buttons button')).toHaveLength(5);
    expect(screen.getByRole('group', { name: 'Select provenance stage' })).toBeInTheDocument();
  });

  it('5. confirms Progress page renders temporal comparison stage', () => {
    render(
      <MemoryRouter>
        <EditorialProgressPage />
      </MemoryRouter>
    );

    const temporalStage = document.querySelector('.vt-time-comparison');
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(temporalStage).not.toBeNull();
  });

  it('6. confirms Methodology renders research publication layout without repeated rows', () => {
    render(
      <MemoryRouter>
        <EditorialMethodologyPage />
      </MemoryRouter>
    );

    expect(document.querySelectorAll('.vt-monograph-articles article')).toHaveLength(8);
  });
});
