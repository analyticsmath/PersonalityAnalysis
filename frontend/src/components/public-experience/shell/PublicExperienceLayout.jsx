/**
 * Personality Assessor - Public Experience Layout
 * Canonical marketing routes use the lightweight cinematic shell. Authentication
 * stays transactional. The older public motion stack is lazy-loaded only for
 * fallback/non-canonical routes.
 */
import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CinematicPublicShell } from '../human-trace/CinematicPublicShell';

const LegacyPublicExperienceShell = lazy(() => import('./LegacyPublicExperienceShell'));

const CINEMATIC_MARKETING_ROUTES = new Set([
  '/',
  '/how-it-works',
  '/career-intelligence',
  '/progress',
  '/trust',
  '/methodology',
  '/privacy',
]);

export const PublicExperienceLayout = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  if (CINEMATIC_MARKETING_ROUTES.has(location.pathname)) {
    return <CinematicPublicShell />;
  }

  if (isAuthRoute) {
    return (
      <div className="pa-public-experience pa-px-shell-root pa-px-shell-root--auth">
        <a href="#main-content" className="pa-px-skip-link">Skip to main content</a>
        <main id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="pa-public-experience" aria-busy="true" />}>
      <LegacyPublicExperienceShell />
    </Suspense>
  );
};

export default PublicExperienceLayout;