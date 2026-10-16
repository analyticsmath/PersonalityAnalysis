/**
 * Personality Assessor - Public Experience Layout
 * Marketing routes share one cinematic shell. Authentication routes use a
 * focused transactional frame; all other public fallbacks retain the legacy shell.
 */
import { useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PublicMotionRoot } from '../motion/PublicMotionRoot';
import { TransitionPortal } from '../motion/TransitionPortal';
import { PublicTransitionManager } from '../motion/PublicTransitionManager';
import { PublicHeader } from '../chrome/PublicHeader';
import { PublicIndex } from '../chrome/PublicIndex';
import { PublicFooter } from '../chrome/PublicFooter';
import { PublicRouteStage } from './PublicRouteStage';
import { CinematicPublicShell } from '../human-trace/CinematicPublicShell';

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
  const [indexOpen, setIndexOpen] = useState(false);
  const triggerRef = useRef(null);
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  if (CINEMATIC_MARKETING_ROUTES.has(location.pathname)) {
    return <CinematicPublicShell />;
  }

  if (isAuthRoute) {
    return (
      <PublicMotionRoot>
        <div className="pa-public-experience pa-px-shell-root pa-px-shell-root--auth">
          <a href="#main-content" className="pa-px-skip-link">Skip to main content</a>
          <TransitionPortal />
          <PublicTransitionManager />
          <main id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
            <PublicRouteStage>
              <Outlet />
            </PublicRouteStage>
          </main>
        </div>
      </PublicMotionRoot>
    );
  }

  return (
    <PublicMotionRoot>
      <div className="pa-public-experience pa-px-shell-root">
        <a href="#main-content" className="pa-px-skip-link">Skip to main content</a>
        <TransitionPortal />
        <PublicTransitionManager />
        <PublicHeader
          onOpenIndex={() => setIndexOpen(true)}
          isIndexOpen={indexOpen}
          triggerRef={triggerRef}
        />
        <main id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
          <PublicRouteStage>
            <Outlet />
          </PublicRouteStage>
        </main>
        <PublicIndex
          isOpen={indexOpen}
          onClose={() => setIndexOpen(false)}
          triggerRef={triggerRef}
        />
        <PublicFooter />
      </div>
    </PublicMotionRoot>
  );
};

export default PublicExperienceLayout;