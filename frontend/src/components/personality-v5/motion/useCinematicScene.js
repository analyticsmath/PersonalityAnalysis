import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useCinematicScene — V5 GSAP MatchMedia & Context Scene Orchestrator
 *
 * Encapsulates:
 * - Independent matchMedia setups for Desktop (>1024px), Tablet (641-1024px), Mobile (<=640px), and Reduced Motion.
 * - Automatic context cleanup on unmount.
 * - ScrollTrigger lifecycle synchronization.
 *
 * @param {Function} setupFunction - (self, matchMedia, element) => void
 * @param {Array} dependencies - React dependencies
 * @returns {React.RefObject} containerRef
 */
export function useCinematicScene(setupFunction, dependencies = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      setupFunction(self, mm, el);

      return () => {
        mm.revert();
      };
    }, el);

    // Refresh ScrollTrigger calculations after layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, dependencies);

  return containerRef;
}

export default useCinematicScene;
