import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScrollProvider — V7 Desktop-Only Smooth Scroll
 * Runs exclusively on fine pointer / desktop viewports, disabled on touch/mobile
 * and when prefers-reduced-motion is requested.
 */
export const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Only initialize on desktop with fine pointer
    const canSmoothScroll = window.matchMedia(
      '(min-width: 901px) and (pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)'
    ).matches;

    if (!canSmoothScroll) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis with GSAP ScrollTrigger ticker
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
