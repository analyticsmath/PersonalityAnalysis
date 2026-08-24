import React, { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { updateScrollState } from './scrollState';
import { usePublicCapabilities } from './usePublicCapabilities';
import { SceneDebugger } from './SceneDebugger';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function' && typeof ScrollTrigger.config === 'function') {
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    limitCallbacks: true,
  });
}

export const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

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
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.0,
        syncTouch: false,
      });

      lenisRef.current = lenis;

      // Synchronize Lenis scroll position with GSAP ScrollTrigger
      lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        updateScrollState(e.scroll, e.velocity, e.direction, e.progress);
      });

      // Hook Lenis into GSAP RAF ticker
      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    } catch {
      // Graceful fallback for non-browser / test environments
    }

    // Native scroll event listener to capture keyboard scroll (PageDown, ArrowDown) immediately
    const handleNativeScroll = () => {
      ScrollTrigger.update();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      updateScrollState(window.scrollY, 0, 1, Math.max(0, Math.min(1, window.scrollY / maxScroll)));
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    // Centralized refresh discipline: debounced on fonts, media, and layout changes
    const scheduleRefresh = () => {
      if (typeof ScrollTrigger.refresh === 'function') {
        ScrollTrigger.refresh();
      }
    };

    // Refresh once fonts are ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleRefresh).catch(() => {});
    }

    const refreshTimer = setTimeout(scheduleRefresh, 120);

    // Debounced window resize handler
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scheduleRefresh, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('resize', handleResize);
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
      {import.meta.env.DEV && <SceneDebugger />}
    </LenisContext.Provider>
  );
};

export default PublicMotionRoot;
