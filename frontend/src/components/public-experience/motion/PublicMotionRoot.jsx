import React, { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { updateScrollState } from './scrollState';
import { usePublicCapabilities } from './usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

if (typeof ScrollTrigger.config === 'function') {
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    limitCallbacks: true,
    syncInterval: 40,
  });
}

export const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export const PublicMotionRoot = ({ children }) => {
  const lenisRef = useRef(null);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    let lenis = null;
    let tickerCallback = null;

    try {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.0,
        infinite: false,
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

    // Initial refresh after microtask / font load
    const refreshTimer = setTimeout(() => {
      if (typeof ScrollTrigger.refresh === 'function') {
        ScrollTrigger.refresh();
      }
    }, 150);

    const handleResize = () => {
      if (typeof ScrollTrigger.refresh === 'function') {
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('resize', handleResize);
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};

export default PublicMotionRoot;
