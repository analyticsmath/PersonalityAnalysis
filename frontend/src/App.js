import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import LoadingState from './components/ui/LoadingState';
import ProtectedRoute from './components/ui/ProtectedRoute';
import PageTransition from './components/motion/PageTransition';
import { AvatarEventProvider } from './components/avatar/AvatarEvents';
import { getPrefersReducedMotion } from './utils/motion';
import PublicHomePage from './pages/PublicHomePage';
import PublicMarketingPage from './pages/PublicMarketingPage';
import PublicNotFoundPage from './pages/PublicNotFoundPage';
import PublicMetadata from './components/public/PublicMetadata';
import './pages/PublicSite.css';

const DashboardPage = lazy(() => import('./pages/Dashboard'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const ResultPage = lazy(() => import('./pages/Result'));
const StartAssessmentFlowPage = lazy(() => import('./pages/AssessmentFlow/StartPage'));
const AdaptiveAssessmentTestPage = lazy(() => import('./pages/AssessmentFlow/TestPage'));
const BehaviorAssessmentPage = lazy(() => import('./pages/AssessmentFlow/BehaviorPage'));
const AssessmentFlowResultPage = lazy(() => import('./pages/AssessmentFlow/ResultPage'));
const CareerExplorerPage = lazy(() => import('./pages/AssessmentFlow/CareerExplorerPage'));
const LegacyStaticAssessmentPage = lazy(() => import('./pages/Legacy/LegacyStaticAssessmentPage'));
const PrivacyControlsPage = lazy(() => import('./pages/PrivacyControlsPage'));
const AnimatedBackground = lazy(() => import('./components/ui/AnimatedBackground'));
const AvatarController = lazy(() => import('./components/avatar/AvatarController'));

const SuspensePageFallback = () => (
  <main className="app-page">
    <div className="page-shell">
      <LoadingState message="Loading page" />
    </div>
  </main>
);

const withSuspense = (node) => <Suspense fallback={<SuspensePageFallback />}>{node}</Suspense>;

gsap.registerPlugin(ScrollTrigger);

/** Preserves query string when normalizing /assessment → /assessment/start (e.g. deep links). */
const AssessmentRootRedirect = () => {
  const location = useLocation();
  const target = `/assessment/start${location.search || ''}`;
  return <Navigate to={target} replace />;
};

const AppRoutes = () => {
  const location = useLocation();
  const authenticatedPath = /^(?:\/dashboard|\/analytics|\/account\/privacy|\/assessment(?:\/|$)|\/legacy\/|\/results$|\/reports$|\/result\/)/.test(location.pathname);
  const isPublicPage = !authenticatedPath;

  const withTransition = (element) => <PageTransition>{element}</PageTransition>;

  useEffect(() => {
    if (isPublicPage) return undefined;
    const nodes = Array.from(document.querySelectorAll('[data-scroll-reveal]'));
    const animations = [];

    if (getPrefersReducedMotion()) {
      nodes.forEach((node) => {
        gsap.set(node, { autoAlpha: 1, y: 0 });
      });
      return () => {};
    }

    nodes.forEach((node, index) => {
      animations.push(
        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.56,
            ease: 'power3.out',
            delay: Math.min(index * 0.04, 0.2),
            scrollTrigger: {
              trigger: node,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      );
    });

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [isPublicPage, location.pathname]);

  return (
    <>
      {!isPublicPage && <Suspense fallback={null}><AnimatedBackground /></Suspense>}
      <div data-barba="wrapper">
        <PublicMetadata />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={`${location.pathname}${location.search}`}>
            <Route path="/" element={<PublicHomePage />} />
            <Route path="/how-it-works" element={<PublicMarketingPage type="how-it-works" />} />
            <Route path="/career-intelligence" element={<PublicMarketingPage type="career-intelligence" />} />
            <Route path="/progress" element={<PublicMarketingPage type="progress" />} />
            <Route path="/methodology" element={<PublicMarketingPage type="methodology" />} />
            <Route path="/privacy" element={<PublicMarketingPage type="privacy" />} />
            <Route path="/login" element={withTransition(<LoginPage />)} />
            <Route path="/signup" element={withTransition(<SignupPage />)} />

            <Route
              path="/dashboard"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route
              path="/analytics"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route
              path="/account/privacy"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <PrivacyControlsPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route path="/trust" element={<PublicMarketingPage type="trust" />} />
            <Route
              path="/assessment"
              element={withTransition(
                <ProtectedRoute>
                  <AssessmentRootRedirect />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/legacy/assessment-static"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <LegacyStaticAssessmentPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route
              path="/assessment/start"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <StartAssessmentFlowPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route
              path="/assessment/test"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <AdaptiveAssessmentTestPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route
              path="/assessment/behavior"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <BehaviorAssessmentPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route
              path="/assessment/career"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <CareerExplorerPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route
              path="/assessment/result"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <AssessmentFlowResultPage />
                  </ProtectedRoute>
                )
              )}
            />
            <Route
              path="/results"
              element={withTransition(
                <ProtectedRoute>
                  <Navigate to="/assessment/result" replace />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/reports"
              element={withTransition(
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/result/:assessmentId"
              element={withTransition(
                withSuspense(
                  <ProtectedRoute>
                    <ResultPage />
                  </ProtectedRoute>
                )
              )}
            />

            <Route path="*" element={<PublicNotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AvatarEventProvider>
        <AppChrome />
      </AvatarEventProvider>
    </BrowserRouter>
  );
};

const AppChrome = () => {
  const location = useLocation();
  const authenticatedPath = /^(?:\/dashboard|\/analytics|\/account\/privacy|\/assessment(?:\/|$)|\/legacy\/|\/results$|\/reports$|\/result\/)/.test(location.pathname);
  const isPublicPage = !authenticatedPath;

  return (
    <>
      {!isPublicPage && <Suspense fallback={null}><AvatarController /></Suspense>}
      <AppRoutes />
    </>
  );
};

export default App;
