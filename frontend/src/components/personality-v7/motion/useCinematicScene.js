import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useCinematicScene — V7 Unified Scene Orchestration Hook
 * Manages desktop-pinned macro timelines and unpinned mobile document flow
 * with strict gsap.matchMedia() scoping and cleanup.
 */
export const useCinematicScene = (setupTimeline, deps = []) => {
  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    if (!scopeRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 901px)', (context) => {
        if (typeof setupTimeline === 'function') {
          setupTimeline({ isDesktop: true, context, scope: scopeRef.current });
        }
      });

      mm.add('(max-width: 900px)', (context) => {
        if (typeof setupTimeline === 'function') {
          setupTimeline({ isDesktop: false, context, scope: scopeRef.current });
        }
      });
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, deps);

  return scopeRef;
};

export default useCinematicScene;
