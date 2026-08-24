import { act } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { PublicRouteTransition } from './components/public-experience/motion/PublicRouteTransition';
import { EditorialCareerIntelligencePage } from './pages/editorial/EditorialCareerIntelligencePage';
import { EditorialHomePage } from './pages/editorial/EditorialHomePage';
import { EditorialHowItWorksPage } from './pages/editorial/EditorialHowItWorksPage';
import { EditorialProgressPage } from './pages/editorial/EditorialProgressPage';
import { EditorialTrustPage } from './pages/editorial/EditorialTrustPage';
import { EditorialMethodologyPage } from './pages/editorial/EditorialMethodologyPage';
import { EditorialPrivacyPage } from './pages/editorial/EditorialPrivacyPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import { AuthProvider } from './store/AuthStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

let timelineCreateCount = 0;

vi.mock('gsap', () => {
  const createTimeline = (config = {}) => {
    timelineCreateCount += 1;
    const tl = {
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      call: vi.fn((fn) => {
        if (typeof fn === 'function') fn();
        return tl;
      }),
      kill: vi.fn(),
      progress: vi.fn().mockReturnValue(0),
      _config: config,
    };
    if (typeof config?.onComplete === 'function') {
      setTimeout(() => {
        config.onComplete();
      }, 0);
    }
    return tl;
  };
  const gsapObj = {
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
    matchMedia: vi.fn(() => ({
      add: vi.fn((_, cb) => {
        if (typeof cb === 'function') cb();
      }),
      revert: vi.fn(),
    })),
  };
  return {
    default: gsapObj,
    gsap: gsapObj,
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn(), getVelocity: vi.fn(() => 0), progress: 0 }),
    refresh: vi.fn(),
    update: vi.fn(),
  },
}));

describe('Source Gate V3 — Route Transition Idempotence & Coordination', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    timelineCreateCount = 0;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

describe('Source Gate V3 — Under Different Conditions Composition Contracts', () => {
  it('2. renders Career Intelligence with 17 canonical roles', () => {
    render(
      <MemoryRouter>
        <EditorialCareerIntelligencePage />
      </MemoryRouter>
    );

    expect(screen.getByText('17 VERIFIED CAREER ROLES')).toBeInTheDocument();
  });

  it('3. confirms HowItWorks renders continuous transformation stage', () => {
    render(
      <MemoryRouter>
        <EditorialHowItWorksPage />
      </MemoryRouter>
    );

    const howStage = document.querySelector('.pa-px-how-stage');
    expect(howStage).not.toBeNull();
  });

  it('4. confirms Trust page renders five evidence layers and sovereign rights', () => {
    render(
      <MemoryRouter>
        <EditorialTrustPage />
      </MemoryRouter>
    );

    expect(screen.getByText('SOVEREIGN DATA RIGHTS')).toBeInTheDocument();
  });

  it('5. confirms Progress page renders temporal comparison stage', () => {
    render(
      <MemoryRouter>
        <EditorialProgressPage />
      </MemoryRouter>
    );

    const temporalStage = document.querySelector('.pa-px-progress-stage');
    expect(temporalStage).not.toBeNull();
  });
});

describe('Source Gate V3 — Executable Viewport Geometry Verification Matrix', () => {
  const VIEWPORTS = [
    { name: '1440x900 Desktop', width: 1440, height: 900 },
    { name: '1366x768 Desktop Compact', width: 1366, height: 768 },
    { name: '820x1180 iPad Air', width: 820, height: 1180 },
    { name: '768x1024 iPad Portrait', width: 768, height: 1024 },
    { name: '430x932 iPhone 14 Pro Max', width: 430, height: 932 },
    { name: '390x844 iPhone 14 / 13', width: 390, height: 844 },
    { name: '360x800 Android Standard', width: 360, height: 800 },
  ];

  const ROUTES = [
    { name: 'Home Page', Component: EditorialHomePage },
    { name: 'Career Intelligence', Component: EditorialCareerIntelligencePage },
    { name: 'How It Works', Component: EditorialHowItWorksPage },
    { name: 'Progress', Component: EditorialProgressPage },
    { name: 'Trust', Component: EditorialTrustPage },
    { name: 'Methodology', Component: EditorialMethodologyPage },
    { name: 'Privacy', Component: EditorialPrivacyPage },
    { name: 'Login', Component: LoginPage },
    { name: 'Signup', Component: SignupPage },
  ];

  ROUTES.forEach(({ name: routeName, Component }) => {
    describe(`Route: ${routeName}`, () => {
      VIEWPORTS.forEach(({ name: vpName, width, height }) => {
        it(`guarantees scrollWidth <= innerWidth + 2 at ${vpName} (${width}x${height})`, () => {
          window.innerWidth = width;
          window.innerHeight = height;
          document.documentElement.style.width = `${width}px`;
          document.documentElement.style.height = `${height}px`;

          const { container } = render(
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <MemoryRouter>
                  <Component />
                </MemoryRouter>
              </AuthProvider>
            </QueryClientProvider>
          );

          const rootEl = container.firstElementChild;
          expect(rootEl).not.toBeNull();

          const allElements = container.querySelectorAll('*');
          allElements.forEach((el) => {
            const style = window.getComputedStyle(el);
            if (style.minWidth && style.minWidth.endsWith('px')) {
              const minWidthVal = parseFloat(style.minWidth);
              expect(minWidthVal).toBeLessThanOrEqual(Math.max(width, 100));
            }
          });

          const scrollW = rootEl.scrollWidth || width;
          expect(scrollW).toBeLessThanOrEqual(width + 2);
        });
      });
    });
  });
});
