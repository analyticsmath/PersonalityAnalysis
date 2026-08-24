/**
 * Personality Assessor - Public Motion Root
 * Authoritative scroll and motion engine.
 * Unifies Lenis smooth scroll, GSAP RAF ticker, and ScrollTrigger without velocity corruption.
 */

import React, { useEffect, useRef, useMemo, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { updateScrollState } from './scrollState';
import { usePublicCapabilities } from './usePublicCapabilities';
import { SceneDebugger } from './SceneDebugger';
import { publicMotionController } from './publicMotionController';

gsap.registerPlugin(ScrollTrigger);

if (
  typeof window !== 'undefined' &&
  typeof window.requestAnimationFrame === 'function' &&
  typeof ScrollTrigger.config === 'function'
) {
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    limitCallbacks: true,
    syncInterval: 30,
  });
}

export const PublicMotionContext = createContext(publicMotionController);
export const usePublicMotion = () => useContext(PublicMotionContext);
export const useLenis = () => useContext(PublicMotionContext).getLenis();

export const PublicMotionRoot = ({ children }) => {
  const lenisRef = useRef(null);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (prefersReducedMotion) {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      return;
    }

    let lenis = null;
    let tickerCallback = null;

    try {
      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.0,
        syncTouch: false,
        stopInertiaOnNavigate: true,
      });

      lenisRef.current = lenis;
      publicMotionController.setLenis(lenis);

      // Synchronize Lenis scroll event directly with ScrollTrigger and mutable scrollState
      lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        updateScrollState(e.scroll, e.velocity, e.direction, e.progress);
      });

      // Hook Lenis into GSAP RAF ticker with zero lag smoothing
      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    } catch (err) {
      console.warn('Lenis initialization skipped / fallback:', err);
    }

    // Centralized debounced refresh discipline on fonts, media, and layout resize
    const scheduleRefresh = () => {
      if (typeof ScrollTrigger.refresh === 'function') {
        ScrollTrigger.refresh();
      }
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleRefresh).catch(() => {});
    }

    const refreshTimer = setTimeout(scheduleRefresh, 150);

    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scheduleRefresh, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
      publicMotionController.setLenis(null);
    };
  }, [prefersReducedMotion]);

  // Stable Context API object
  const contextValue = useMemo(() => publicMotionController, []);

  return (
    <PublicMotionContext.Provider value={contextValue}>
      {children}
      {import.meta.env.DEV && <SceneDebugger />}
    </PublicMotionContext.Provider>
  );
};

export default PublicMotionRoot;
