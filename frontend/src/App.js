import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingState from './components/ui/LoadingState';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { AvatarEventProvider } from './components/avatar/AvatarEvents';
import EditorialHomePage from './pages/editorial/EditorialHomePage';
import PublicNotFoundPage from './pages/PublicNotFoundPage';
import PublicMetadata from './components/public/PublicMetadata';
import PublicRouteTransition from './components/public-experience/motion/PublicRouteTransition';

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

const PublicSuspenseFallback = () => (
  <div
    className="pa-px-suspense-fallback"
    style={{
      backgroundColor: 'var(--px-ink, #121416)',
      color: 'var(--px-white, #F7F8F8)',
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
          border: '2px solid rgba(247, 248, 248, 0.3)',
          borderTopColor: 'var(--px-white, #F7F8F8)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
        aria-hidden="true"
      />
    </div>
  </div>
);

const ProtectedSuspenseFallback = () => (
  <div
    className="app-page pa-suspense-fallback"
    style={{
      backgroundColor: 'var(--pa-carbon, #0D0F0E)',
      color: 'var(--pa-mineral, #F3F5F2)',
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

const withPublicSuspense = (node) => (
  <Suspense fallback={<PublicSuspenseFallback />}>{node}</Suspense>
);

const withProtectedSuspense = (node) => (
  <Suspense fallback={<ProtectedSuspenseFallback />}>{node}</Suspense>
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
  const isPublicRoute = [
    '/',
    '/how-it-works',
    '/career-intelligence',
    '/progress',
    '/methodology',
    '/trust',
    '/privacy',
    '/login',
    '/signup',
  ].includes(location.pathname);

  return (
    <div className="app-root-container">
      <PublicMetadata />
      {isPublicRoute && <PublicRouteTransition />}
      <Routes location={location} key={`${location.pathname}${location.search}`}>
        {/* ── Public Experience Routes ── */}
        <Route path="/" element={<EditorialHomePage />} />
        <Route path="/how-it-works" element={withPublicSuspense(<EditorialHowItWorksPage />)} />
        <Route path="/career-intelligence" element={withPublicSuspense(<EditorialCareerIntelligencePage />)} />
        <Route path="/progress" element={withPublicSuspense(<EditorialProgressPage />)} />
        <Route path="/methodology" element={withPublicSuspense(<EditorialMethodologyPage />)} />
        <Route path="/trust" element={withPublicSuspense(<EditorialTrustPage />)} />
        <Route path="/privacy" element={withPublicSuspense(<EditorialPrivacyPage />)} />
        <Route path="/login" element={withPublicSuspense(<LoginPage />)} />
        <Route path="/signup" element={withPublicSuspense(<SignupPage />)} />

        {/* ── Protected Application Routes (Preserved) ── */}
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
        <AppRoutes />
      </AvatarEventProvider>
    </BrowserRouter>
  );
};

export default App;
