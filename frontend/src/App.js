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

const SuspensePageFallback = () => (
  <main
    className="app-page pa-suspense-fallback"
    style={{
      backgroundColor: 'var(--pa-mineral, #F3F5F2)',
      color: 'var(--pa-carbon, #0D0F0E)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div className="page-shell" style={{ textAlign: 'center' }}>
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

  return (
    <div className="app-root-container">
      <PublicMetadata />
      <Routes location={location} key={`${location.pathname}${location.search}`}>
        {/* ── Public Routes (Evidence in Context Visual Architecture) ── */}
        <Route path="/" element={<EditorialHomePage />} />
        <Route path="/how-it-works" element={withSuspense(<EditorialHowItWorksPage />)} />
        <Route path="/career-intelligence" element={withSuspense(<EditorialCareerIntelligencePage />)} />
        <Route path="/progress" element={withSuspense(<EditorialProgressPage />)} />
        <Route path="/methodology" element={withSuspense(<EditorialMethodologyPage />)} />
        <Route path="/trust" element={withSuspense(<EditorialTrustPage />)} />
        <Route path="/privacy" element={withSuspense(<EditorialPrivacyPage />)} />
        <Route path="/login" element={withSuspense(<LoginPage />)} />
        <Route path="/signup" element={withSuspense(<SignupPage />)} />

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
