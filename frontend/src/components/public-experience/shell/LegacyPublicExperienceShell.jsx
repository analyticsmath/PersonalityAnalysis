import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PublicMotionRoot } from '../motion/PublicMotionRoot';
import { TransitionPortal } from '../motion/TransitionPortal';
import { PublicTransitionManager } from '../motion/PublicTransitionManager';
import { PublicHeader } from '../chrome/PublicHeader';
import { PublicIndex } from '../chrome/PublicIndex';
import { PublicFooter } from '../chrome/PublicFooter';
import { PublicRouteStage } from './PublicRouteStage';

/**
 * Legacy public shell retained only for fallback/non-canonical public routes.
 * Keeping this behind a lazy boundary prevents its older motion/canvas transition
 * stack from inflating the canonical marketing entry path.
 */
export function LegacyPublicExperienceShell() {
  const [indexOpen, setIndexOpen] = useState(false);
  const triggerRef = useRef(null);

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
}

export default LegacyPublicExperienceShell;
