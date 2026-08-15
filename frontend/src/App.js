import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import LoadingState from './components/ui/LoadingState';
import ProtectedRoute from './components/ui/ProtectedRoute';
import PageTransition from './components/motion/PageTransition';
import { AvatarEventProvider } from './components/avatar/AvatarEvents';
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

  const withTransition = (element) => <PageTransition>{element}</PageTransition>;

  return (
    <div className="app-root-container">
      <PublicMetadata />
      <Routes location={location} key={`${location.pathname}${location.search}`}>
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/how-it-works" element={<PublicMarketingPage type="how-it-works" />} />
        <Route path="/career-intelligence" element={<PublicMarketingPage type="career-intelligence" />} />
        <Route path="/progress" element={<PublicMarketingPage type="progress" />} />
        <Route path="/methodology" element={<PublicMarketingPage type="methodology" />} />
        <Route path="/privacy" element={<PublicMarketingPage type="privacy" />} />
        <Route path="/trust" element={<PublicMarketingPage type="trust" />} />
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
