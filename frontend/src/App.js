import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingState from './components/ui/LoadingState';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { AvatarEventProvider } from './components/avatar/AvatarEvents';
import RouteTransitionCoordinator from './components/personality-v7/motion/RouteTransitionCoordinator';
import EditorialHomePage from './pages/editorial/EditorialHomePage';
import PublicNotFoundPage from './pages/PublicNotFoundPage';
import PublicMetadata from './components/public/PublicMetadata';

const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/Auth/SignupPage'));
const EditorialHowItWorksPage = lazy(() => import('./pages/editorial/EditorialHowItWorksPage'));
const EditorialCareerIntelligencePage = lazy(() => import('./pages/editorial/EditorialCareerIntelligencePage'));
const EditorialProgressPage = lazy(() => import('./pages/editorial/EditorialProgressPage'));
const EditorialMethodologyPage = lazy(() => import('./pages/editorial/EditorialMethodologyPage'));
const EditorialTrustPage = lazy(() => import('./pages/editorial/EditorialTrustPage'));
const EditorialPrivacyPage = lazy(() => import('./pages/editorial/EditorialPrivacyPage'));

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

const PUBLIC_ROUTE_TONES = {
  '/career-intelligence': 'dark',
  '/how-it-works': 'dark',
  '/progress': 'dark',
  '/trust': 'dark',
  '/login': 'dark',
  '/methodology': 'light',
  '/privacy': 'light',
  '/signup': 'light',
};

const SuspensePageFallback = ({ pathname = '' }) => {
  const cleanPath = pathname.split('?')[0].split('#')[0];
  const isDark = PUBLIC_ROUTE_TONES[cleanPath] === 'dark' || cleanPath === '/';
  const bg = isDark ? 'var(--pa-carbon, #0D0F0E)' : 'var(--pa-mineral, #F3F5F2)';
  const fg = isDark ? 'var(--pa-mineral, #F3F5F2)' : 'var(--pa-carbon, #0D0F0E)';
  const traceColor = 'var(--pa-oxblood, #642832)';

  return (
    <div
      className="app-page pa-suspense-fallback"
      style={{
        backgroundColor: bg,
        color: fg,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="status"
      aria-label="Loading route"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '32px',
            height: '2px',
            backgroundColor: traceColor,
            opacity: 0.8,
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: 'var(--pa-font-sans, "Instrument Sans", sans-serif)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.5,
          }}
        >
          The Living Record
        </span>
      </div>
    </div>
  );
};

const withSuspense = (node, pathname = '') => (
  <Suspense fallback={<SuspensePageFallback pathname={pathname} />}>{node}</Suspense>
);

gsap.registerPlugin(ScrollTrigger);

/** Preserves query string when normalizing /assessment → /assessment/start (e.g. deep links). */
const AssessmentRootRedirect = () => {
  const location = useLocation();
  const target = `/assessment/start${location.search || ''}`;
  return <Navigate to={target} replace />;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <div className="app-root-container">
      <PublicMetadata />
      <Routes location={location} key={`${location.pathname}${location.search}`}>
        {/* ── Public Routes (Evidence in Context Visual Architecture) ── */}
        <Route path="/" element={<EditorialHomePage />} />
        <Route path="/how-it-works" element={withSuspense(<EditorialHowItWorksPage />, '/how-it-works')} />
        <Route path="/career-intelligence" element={withSuspense(<EditorialCareerIntelligencePage />, '/career-intelligence')} />
        <Route path="/progress" element={withSuspense(<EditorialProgressPage />, '/progress')} />
        <Route path="/methodology" element={withSuspense(<EditorialMethodologyPage />, '/methodology')} />
        <Route path="/trust" element={withSuspense(<EditorialTrustPage />, '/trust')} />
        <Route path="/privacy" element={withSuspense(<EditorialPrivacyPage />, '/privacy')} />
        <Route path="/login" element={withSuspense(<LoginPage />, '/login')} />
        <Route path="/signup" element={withSuspense(<SignupPage />, '/signup')} />

        {/* ── Protected Application Routes ── */}
        <Route
          path="/dashboard"
          element={withSuspense(
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/analytics"
          element={withSuspense(
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/account/privacy"
          element={withSuspense(
            <ProtectedRoute>
              <PrivacyControlsPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <AssessmentRootRedirect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/legacy/assessment-static"
          element={withSuspense(
            <ProtectedRoute>
              <LegacyStaticAssessmentPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/start"
          element={withSuspense(
            <ProtectedRoute>
              <StartAssessmentFlowPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/test"
          element={withSuspense(
            <ProtectedRoute>
              <AdaptiveAssessmentTestPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/behavior"
          element={withSuspense(
            <ProtectedRoute>
              <BehaviorAssessmentPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/career"
          element={withSuspense(
            <ProtectedRoute>
              <CareerExplorerPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/result"
          element={withSuspense(
            <ProtectedRoute>
              <AssessmentFlowResultPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Navigate to="/assessment/result" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result/:assessmentId"
          element={withSuspense(
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          )}
        />

        <Route path="*" element={<PublicNotFoundPage />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AvatarEventProvider>
        <RouteTransitionCoordinator>
          <AppRoutes />
        </RouteTransitionCoordinator>
      </AvatarEventProvider>
    </BrowserRouter>
  );
};

export default App;
