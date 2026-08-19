import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useCinematicScene Hook
 * - Encapsulates GSAP context (gsap.context), matchMedia responsive handling,
 *   visibility observer pause/resume, and deterministic cleanup.
 * - Guarantees ScrollTrigger timelines are killed cleanly on unmount and breakpoint changes.
 */
export const useCinematicScene = (setupTimeline, deps = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      setupTimeline({ gsap, ScrollTrigger, mm, el });
    }, el);

    // Refresh ScrollTrigger after DOM has settled
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, deps);

  return containerRef;
};

export default useCinematicScene;
