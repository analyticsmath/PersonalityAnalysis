import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Guarded Lenis Integration for V6 Cinematic System:
 * - Activates Lenis strictly when:
 *   1. Window width >= 900px
 *   2. Pointer is fine (mouse/trackpad, not touch)
 *   3. Hover is available
 *   4. prefers-reduced-motion is NOT active
 * - Synchronizes with GSAP ScrollTrigger ticker exactly once.
 * - Cleans up cleanly on unmount or breakpoint changes.
 */
export const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkEligibility = () => {
      const minWidth = window.matchMedia('(min-width: 900px)').matches;
      const hoverHover = window.matchMedia('(hover: hover)').matches;
      const pointerFine = window.matchMedia('(pointer: fine)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      return minWidth && hoverHover && pointerFine && !reducedMotion;
    };

    if (!checkEligibility()) {
      // Native scrolling active
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll to ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
