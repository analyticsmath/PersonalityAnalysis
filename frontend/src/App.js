import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingState from './components/ui/LoadingState';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { AvatarEventProvider } from './components/avatar/AvatarEvents';
import AtlasRouteTransitionCoordinator from './components/personality-atlas/motion/AtlasRouteTransitionCoordinator';
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

const PublicSuspenseFallback = () => (
  <div
    className="app-page pa-atlas-suspense-fallback"
    style={{
      backgroundColor: 'var(--atlas-field, #163D35)',
      color: 'var(--atlas-paper, #EFF5F2)',
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
          width: '24px',
          height: '24px',
          border: '2px solid var(--atlas-signal, #CDD86A)',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
        aria-hidden="true"
      />
      <span
        style={{
          fontFamily: 'var(--atlas-font-mono, monospace)',
          fontSize: '0.78rem',
          letterSpacing: '0.08em',
          color: 'var(--atlas-signal, #CDD86A)',
        }}
      >
        LOADING CONTEXT ATLAS
      </span>
    </div>
  </div>
);

const ProtectedSuspenseFallback = ({ pathname = '' }) => {
  const cleanPath = pathname.split('?')[0].split('#')[0];
  const isDark = PUBLIC_ROUTE_TONES[cleanPath] === 'dark' || cleanPath === '/';
  const bg = isDark ? 'var(--pa-carbon, #0D0F0E)' : 'var(--pa-mineral, #F3F5F2)';
  const fg = isDark ? 'var(--pa-mineral, #F3F5F2)' : 'var(--pa-carbon, #0D0F0E)';

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
      <LoadingState />
    </div>
  );
};

const withPublicSuspense = (node) => (
  <Suspense fallback={<PublicSuspenseFallback />}>{node}</Suspense>
);

const withProtectedSuspense = (node, pathname = '') => (
  <Suspense fallback={<ProtectedSuspenseFallback pathname={pathname} />}>{node}</Suspense>
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
        {/* ── Public Routes (Context Atlas Visual Architecture) ── */}
        <Route path="/" element={<EditorialHomePage />} />
        <Route path="/how-it-works" element={withPublicSuspense(<EditorialHowItWorksPage />)} />
        <Route path="/career-intelligence" element={withPublicSuspense(<EditorialCareerIntelligencePage />)} />
        <Route path="/progress" element={withPublicSuspense(<EditorialProgressPage />)} />
        <Route path="/methodology" element={withPublicSuspense(<EditorialMethodologyPage />)} />
        <Route path="/trust" element={withPublicSuspense(<EditorialTrustPage />)} />
        <Route path="/privacy" element={withPublicSuspense(<EditorialPrivacyPage />)} />
        <Route path="/login" element={withPublicSuspense(<LoginPage />)} />
        <Route path="/signup" element={withPublicSuspense(<SignupPage />)} />

        {/* ── Protected Application Routes ── */}
        <Route
          path="/dashboard"
          element={withProtectedSuspense(
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/analytics"
          element={withProtectedSuspense(
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/account/privacy"
          element={withProtectedSuspense(
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
          element={withProtectedSuspense(
            <ProtectedRoute>
              <LegacyStaticAssessmentPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/start"
          element={withProtectedSuspense(
            <ProtectedRoute>
              <StartAssessmentFlowPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/test"
          element={withProtectedSuspense(
            <ProtectedRoute>
              <AdaptiveAssessmentTestPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/behavior"
          element={withProtectedSuspense(
            <ProtectedRoute>
              <BehaviorAssessmentPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/career"
          element={withProtectedSuspense(
            <ProtectedRoute>
              <CareerExplorerPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/assessment/result"
          element={withProtectedSuspense(
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
          element={withProtectedSuspense(
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
        <AtlasRouteTransitionCoordinator>
          <AppRoutes />
        </AtlasRouteTransitionCoordinator>
      </AvatarEventProvider>
    </BrowserRouter>
  );
};

export default App;
