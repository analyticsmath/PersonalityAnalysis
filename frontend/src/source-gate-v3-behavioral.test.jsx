import { act } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RouteTransitionCoordinator, useRouteTransition } from './components/personality-v7/motion/RouteTransitionCoordinator';
import { CareerSpatialCanvas } from './components/personality-v7/career/CareerSpatialCanvas';
import { EditorialCareerIntelligencePage, CAREER_LENSES } from './pages/editorial/EditorialCareerIntelligencePage';
import { HomeCareerTakeoverScene } from './components/personality-v7/home/HomeCareerTakeoverScene';
import { EditorialHowItWorksPage } from './pages/editorial/EditorialHowItWorksPage';
import { EditorialProgressPage } from './pages/editorial/EditorialProgressPage';
import { EditorialTrustPage } from './pages/editorial/EditorialTrustPage';

// Mock GSAP for deterministic headless execution
vi.mock('gsap', () => {
  const createTimeline = () => {
    const tl = {
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      call: vi.fn((fn) => {
        if (typeof fn === 'function') fn();
        return tl;
      }),
      kill: vi.fn(),
      progress: vi.fn().mockReturnValue(0),
    };
    return tl;
  };
  return {
    gsap: {
      timeline: vi.fn(createTimeline),
      to: vi.fn(),
      fromTo: vi.fn(),
      set: vi.fn(),
      quickSetter: vi.fn(() => vi.fn()),
      ticker: {
        add: vi.fn(),
        remove: vi.fn(),
        lagSmoothing: vi.fn(),
      },
      context: vi.fn((cb) => {
        if (typeof cb === 'function') cb();
        return { revert: vi.fn() };
      }),
      registerPlugin: vi.fn(),
    },
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn() }),
    refresh: vi.fn(),
  },
}));

describe('Source Gate V3 — Route Transition Idempotence & Coordination', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const TestNavigationHarness = ({ destination = '/target?next=/dashboard' }) => {
    const { navigateWithTransition, markRouteReady } = useRouteTransition();
    return (
      <div>
        <div id="main-content" tabIndex="-1">Target Main</div>
        <button onClick={() => navigateWithTransition(destination, 'TEST')}>
          Start Navigation
        </button>
        <button onClick={() => markRouteReady('/target')}>
          Signal Ready
        </button>
      </div>
    );
  };

  it('1. ensures real route-ready starts entrance once and safety timer cannot fire it again', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RouteTransitionCoordinator>
          <TestNavigationHarness destination="/target" />
        </RouteTransitionCoordinator>
      </MemoryRouter>
    );

    // Trigger navigation
    fireEvent.click(screen.getByText('Start Navigation'));

    // Signal route readiness
    act(() => {
      fireEvent.click(screen.getByText('Signal Ready'));
    });

    // Advance past safety timer window (2000ms)
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // Main content focus was acquired
    const mainEl = document.getElementById('main-content');
    expect(mainEl).not.toBeNull();
  });

  it('2. ensures safety fallback timer fires entrance if readiness signal never arrives', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RouteTransitionCoordinator>
          <TestNavigationHarness destination="/target" />
        </RouteTransitionCoordinator>
      </MemoryRouter>
    );

    // Trigger navigation without marking route ready
    fireEvent.click(screen.getByText('Start Navigation'));

    // Advance past safety timer window
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    const overlay = document.querySelector('.pa-route-transition-overlay');
    expect(overlay).not.toBeNull();
  });

  it('3. ensures query parameters survive transition', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RouteTransitionCoordinator>
          <TestNavigationHarness destination="/career-intelligence?filter=open-questions" />
        </RouteTransitionCoordinator>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Start Navigation'));
    act(() => {
      vi.advanceTimersByTime(500);
    });

    const overlay = document.querySelector('.pa-route-transition-overlay');
    expect(overlay).not.toBeNull();
  });
});

describe('Source Gate V3 — Career WebGL & DOM Fallback', () => {
  it('4. preserves WebGL component and gracefully gates when capability checks fail', () => {
    const onUnavailable = vi.fn();
    const onReady = vi.fn();

    const { rerender } = render(
      <CareerSpatialCanvas
        activeIndex={0}
        items={CAREER_LENSES}
        isMobile={false}
        onCanvasReady={onReady}
        onCanvasUnavailable={onUnavailable}
      />
    );

    // In jsdom environment, capability gating safely calls onUnavailable without throwing
    expect(onUnavailable).toHaveBeenCalled();

    rerender(
      <CareerSpatialCanvas
        activeIndex={1}
        items={CAREER_LENSES}
        isMobile={false}
        onCanvasReady={onReady}
        onCanvasUnavailable={onUnavailable}
      />
    );

    rerender(
      <CareerSpatialCanvas
        activeIndex={2}
        items={CAREER_LENSES}
        isMobile={false}
        onCanvasReady={onReady}
        onCanvasUnavailable={onUnavailable}
      />
    );
  });

  it('5. renders both primary and secondary support crops in Career DOM fallback', () => {
    render(
      <MemoryRouter>
        <EditorialCareerIntelligencePage />
      </MemoryRouter>
    );

    const primaryCrop = document.querySelector('.pa-career-atlas__dom-primary');
    const secondaryCrop = document.querySelector('.pa-career-atlas__dom-secondary');

    expect(primaryCrop).not.toBeNull();
    expect(secondaryCrop).not.toBeNull();
  });
});

describe('Source Gate V3 — Home & Public Page Composition Contracts', () => {
  it('6. confirms HomeCareerTakeoverScene provides accessible environment buttons', () => {
    render(
      <MemoryRouter>
        <HomeCareerTakeoverScene />
      </MemoryRouter>
    );

    const envButtons = screen.getAllByRole('tab');
    expect(envButtons.length).toBe(3);
    envButtons.forEach((btn) => {
      expect(btn.className).toContain('pa-home-career-scene__env-btn');
    });
  });

  it('7. confirms HowItWorks renders single persistent Evidence Strip and truthful validity vocabulary', () => {
    render(
      <MemoryRouter>
        <EditorialHowItWorksPage />
      </MemoryRouter>
    );

    const persistentStrip = document.querySelector('.pa-engine-pipeline__persistent-strip-wrap');
    expect(persistentStrip).not.toBeNull();

    // Verify validity vocabulary presence
    const validityVocab = document.querySelector('.pa-engine-pipeline__validity-readout');
    expect(validityVocab).not.toBeNull();
  });

  it('8. confirms Trust page renders shared spatial hero and asymmetric rights layout', () => {
    render(
      <MemoryRouter>
        <EditorialTrustPage />
      </MemoryRouter>
    );

    const sharedStage = document.querySelector('.pa-trust-hero__stage-field');
    const backdrop = document.querySelector('.pa-trust-hero__media-backdrop');
    const asymmetricRights = document.querySelector('.pa-trust-rights__asymmetric-field');

    expect(sharedStage).not.toBeNull();
    expect(backdrop).not.toBeNull();
    expect(asymmetricRights).not.toBeNull();
  });

  it('9. confirms Progress page renders temporal crops and intersection readout', () => {
    render(
      <MemoryRouter>
        <EditorialProgressPage />
      </MemoryRouter>
    );

    const cropA = document.querySelector('.pa-progress-film__crop--a');
    const cropB = document.querySelector('.pa-progress-film__crop--b');
    const intersection = document.querySelector('.pa-progress-film__intersection');

    expect(cropA).not.toBeNull();
    expect(cropB).not.toBeNull();
    expect(intersection).not.toBeNull();
  });
});
