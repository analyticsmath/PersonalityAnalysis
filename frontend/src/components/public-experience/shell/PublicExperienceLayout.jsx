/**
 * Personality Assessor - Public Experience Layout
 * Editorial Evidence Atlas: Light-theme persistent shell mounting
 * PublicMotionRoot, PublicHeader, PublicRouteStage, PublicIndex overlay, and PublicFooter.
 * Survives child route navigations continuously without blank screen flashes.
 */

import React, { useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PublicMotionRoot } from '../motion/PublicMotionRoot';
import { TransitionPortal } from '../motion/TransitionPortal';
import { PublicTransitionManager } from '../motion/PublicTransitionManager';
import { PublicHeader } from '../chrome/PublicHeader';
import { PublicIndex } from '../chrome/PublicIndex';
import { PublicFooter } from '../chrome/PublicFooter';
import { PublicRouteStage } from './PublicRouteStage';

export const PublicExperienceLayout = () => {
  const [indexOpen, setIndexOpen] = useState(false);
  const triggerRef = useRef(null);
  const location = useLocation();

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <PublicMotionRoot>
      <div className="pa-public-experience pa-px-shell-root">
        {/* Accessible Skip Navigation Link */}
        <a href="#main-content" className="pa-px-skip-link">
          Skip to main content
        </a>

        {/* Fixed DOM-First Transition Portal Layer */}
        <TransitionPortal />

        {/* Active Route Transition Orchestration Engine */}
        <PublicTransitionManager />

        {/* Persistent Editorial Header */}
        <PublicHeader
          onOpenIndex={() => setIndexOpen(true)}
          isIndexOpen={indexOpen}
          triggerRef={triggerRef}
        />

        {/* Transition-Aware Route DOM Stage */}
        <main id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
          <PublicRouteStage>
            <Outlet />
          </PublicRouteStage>
        </main>

        {/* Creative Site Index Overlay */}
        <PublicIndex
          isOpen={indexOpen}
          onClose={() => setIndexOpen(false)}
          triggerRef={triggerRef}
        />

        {/* Quiet Utility Footer on Non-Auth Routes */}
        {!isAuthRoute && <PublicFooter />}
      </div>
    </PublicMotionRoot>
  );
};

export default PublicExperienceLayout;
