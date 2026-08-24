import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { updateScrollState } from './scrollState';
import { usePublicCapabilities } from './usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const PublicMotionRoot = ({ children }) => {
  const lenisRef = useRef(null);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.92,
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
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
};

export default PublicMotionRoot;
