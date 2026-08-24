/**
 * Personality Assessor - Public Experience Layout
 * Persistent shell mounting PublicMotionRoot, PersistentVisualCanvas, PublicTransitionManager,
 * PersistentHeader, PublicRouteStage, and PublicIndex overlay menu.
 * Survives child route navigations continuously without remounting.
 */

import React, { useState, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PublicMotionRoot } from '../motion/PublicMotionRoot';
import { PersistentVisualCanvas } from '../canvas/PersistentVisualCanvas';
import { PublicTransitionManager } from '../motion/PublicTransitionManager';
import { PublicHeader } from '../chrome/PublicHeader';
import { PublicIndex } from '../chrome/PublicIndex';
import { PublicFooter } from '../chrome/PublicFooter';
import { PublicRouteStage } from './PublicRouteStage';

export const PublicExperienceLayout = () => {
  const [indexOpen, setIndexOpen] = useState(false);
  const location = useLocation();

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <PublicMotionRoot>
      <div className="pa-px-shell-root">
        {/* Fixed GPU Visual Substrate Layer */}
        <PersistentVisualCanvas />

        {/* Persistent Shared Actor Transition Manager */}
        <PublicTransitionManager />

        {/* Persistent Minimal Editorial Header */}
        <PublicHeader onOpenIndex={() => setIndexOpen(true)} />

        {/* Transition-Aware Route DOM Stage */}
        <main id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
          <PublicRouteStage>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </PublicRouteStage>
        </main>

        {/* Creative Site Index Overlay */}
        <PublicIndex isOpen={indexOpen} onClose={() => setIndexOpen(false)} />

        {/* Quiet Utility Footer on Non-Auth Routes */}
        {!isAuthRoute && <PublicFooter />}
      </div>
    </PublicMotionRoot>
  );
};

export default PublicExperienceLayout;
