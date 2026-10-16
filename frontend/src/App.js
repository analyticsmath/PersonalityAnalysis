import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoadingState from './components/ui/LoadingState';
import PublicMetadata from './components/public/PublicMetadata';
import { PublicExperienceLayout } from './components/public-experience/shell/PublicExperienceLayout';
import EditorialHomePage from './pages/editorial/EditorialHomePage';

// Secondary public routes are split away from the opening film. Home prewarms the
// shared cinematic route chunk after first paint so subsequent navigation stays fluid.
const EditorialHowItWorksPage = lazy(() => import('./pages/editorial/EditorialHowItWorksPage'));
const EditorialCareerIntelligencePage = lazy(() => import('./pages/editorial/EditorialCareerIntelligencePage'));
const EditorialProgressPage = lazy(() => import('./pages/editorial/EditorialProgressPage'));
const EditorialMethodologyPage = lazy(() => import('./pages/editorial/EditorialMethodologyPage'));
const EditorialTrustPage = lazy(() => import('./pages/editorial/EditorialTrustPage'));
const EditorialPrivacyPage = lazy(() => import('./pages/editorial/EditorialPrivacyPage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/Auth/SignupPage'));
const PublicNotFoundPage = lazy(() => import('./pages/PublicNotFoundPage'));

// Product-only runtime dependencies are kept out of the marketing entry bundle.
const ProductRuntimeProviders = lazy(() => import('./components/runtime/ProductRuntimeProviders'));
const ProtectedRoute = lazy(() => import('./components/ui/ProtectedRoute'));

// Protected Application Routes (Preserved)
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

const PRODUCT_RUNTIME_PATHS = new Set([
  '/login',
  '/signup',
  '/dashboard',
  '/analytics',
  '/account/privacy',
  '/assessment',
  '/assessment/start',
  '/assessment/test',
  '/assessment/behavior',
  '/assessment/career',
  '/assessment/result',
  '/legacy/assessment-static',
  '/results',
  '/reports',
]);

const needsProductRuntime = (pathname) =>
  PRODUCT_RUNTIME_PATHS.has(pathname) || pathname.startsWith('/result/');

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

const PublicSuspenseFallback = () => (
  <div
    style={{ minHeight: '100svh', background: '#f1f4f1' }}
    aria-busy="true"
    aria-label="Loading page"
  />
);

const withProtectedSuspense = (node) => (
  <Suspense fallback={<ProtectedSuspenseFallback />}>{node}</Suspense>
);

const withPublicSuspense = (node) => (
  <Suspense fallback={<PublicSuspenseFallback />}>{node}</Suspense>
);

/** Preserves query string when normalizing /assessment → /assessment/start */
const AssessmentRootRedirect = () => {
  const location = useLocation();
  const target = `/assessment/start${location.search || ''}`;
  return <Navigate to={target} replace />;
};

const AppRoutes = () => {
  return (
    <div className="app-root-container">
      <PublicMetadata />
      <Routes>
        {/* ── Public Experience Routes (Inside Persistent Shell) ── */}
        <Route element={<PublicExperienceLayout />}>
          <Route path="/" element={<EditorialHomePage />} />
          <Route path="/how-it-works" element={withPublicSuspense(<EditorialHowItWorksPage />)} />
          <Route path="/career-intelligence" element={withPublicSuspense(<EditorialCareerIntelligencePage />)} />
          <Route path="/progress" element={withPublicSuspense(<EditorialProgressPage />)} />
          <Route path="/methodology" element={withPublicSuspense(<EditorialMethodologyPage />)} />
          <Route path="/trust" element={withPublicSuspense(<EditorialTrustPage />)} />
          <Route path="/privacy" element={withPublicSuspense(<EditorialPrivacyPage />)} />
          <Route path="/terms" element={<Navigate to="/privacy" replace />} />
          <Route path="/login" element={withPublicSuspense(<LoginPage />)} />
          <Route path="/signup" element={withPublicSuspense(<SignupPage />)} />
          <Route path="*" element={withPublicSuspense(<PublicNotFoundPage />)} />
        </Route>

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
          element={withProtectedSuspense(
            <ProtectedRoute>
              <AssessmentRootRedirect />
            </ProtectedRoute>
          )}
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
          element={withProtectedSuspense(
            <ProtectedRoute>
              <Navigate to="/assessment/result" replace />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/reports"
          element={withProtectedSuspense(
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/result/:assessmentId"
          element={withProtectedSuspense(
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </div>
  );
};

const RuntimeBoundary = () => {
  const location = useLocation();
  if (!needsProductRuntime(location.pathname)) return <AppRoutes />;

  return (
    <Suspense fallback={<PublicSuspenseFallback />}>
      <ProductRuntimeProviders>
        <AppRoutes />
      </ProductRuntimeProviders>
    </Suspense>
  );
};

const App = () => (
  <BrowserRouter>
    <RuntimeBoundary />
  </BrowserRouter>
);

export default App;
