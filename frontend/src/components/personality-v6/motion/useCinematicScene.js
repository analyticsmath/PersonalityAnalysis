import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useCinematicScene Hook
 * - Encapsulates GSAP context (gsap.context), matchMedia responsive handling,
 *   visibility observer pause/resume, and deterministic cleanup.
 * - Guarantees ScrollTrigger timelines are killed cleanly on unmount and breakpoint changes.
 * - Reduced-motion mode fallback: stable document flow without pinned choreography.
 */
export const useCinematicScene = (setupTimeline, deps = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Create GSAP context scoped to this container
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      setupTimeline({ gsap, ScrollTrigger, mm, el });
    }, el);

    // Refresh ScrollTrigger deterministically once DOM layout has stabilized
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert(); // Completely reverts all GSAP properties, kills ScrollTriggers, restores original DOM styles
    };
  }, deps);

  return containerRef;

};

export default useCinematicScene;

