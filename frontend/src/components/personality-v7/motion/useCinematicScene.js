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

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', (context) => (
        typeof setupTimeline === 'function'
          ? setupTimeline({ isDesktop: true, context, scope: scopeRef.current })
          : undefined
      ));
    }, scopeRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, deps);

  return scopeRef;
};

export default useCinematicScene;
