import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext({
  lenis: null,
  getScrollState: () => ({ scroll: 0, limit: 0, velocity: 0, direction: 0, progress: 0 }),
  subscribe: () => () => {},
  scrollTo: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export const SmoothScrollProvider = ({ children, options = {} }) => {
  const lenisRef = useRef(null);
  const stateRef = useRef({
    scroll: 0,
    limit: 0,
    velocity: 0,
    direction: 0,
    progress: 0,
  });
  const listenersRef = useRef(new Set());

  const getScrollState = () => stateRef.current;

  const subscribe = (callback) => {
    listenersRef.current.add(callback);
    return () => listenersRef.current.delete(callback);
  };

  const scrollTo = (target, scrollOptions = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, scrollOptions);
    } else {
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // In reduced motion, we do not initialize smooth scroll interpolation
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const lenis = new Lenis({
      lerp: options.lerp ?? (isTouch ? 1 : 0.085),
      wheelMultiplier: options.wheelMultiplier ?? 0.95,
      touchMultiplier: options.touchMultiplier ?? 1,
      smoothWheel: !isTouch,
      syncTouch: false,
      ...options,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll event to ScrollTrigger and ref subscriber pool (zero React re-renders)
    lenis.on('scroll', (e) => {
      stateRef.current = {
        scroll: e.scroll,
        limit: e.limit,
        velocity: e.velocity,
        direction: e.direction,
        progress: e.progress,
      };

      ScrollTrigger.update();

      // Notify external subscribers (e.g. infinite text move, cursor velocity)
      listenersRef.current.forEach((fn) => {
        try {
          fn(stateRef.current);
        } catch {
          // ignore subscriber error
        }
      });
    });

    // Synchronize GSAP ticker with Lenis RAF
    const updateGsapTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsapTicker);
      lenis.destroy();
      lenisRef.current = null;
      listenersRef.current.clear();
    };
  }, [options.lerp, options.wheelMultiplier, options.touchMultiplier]);

  return (
    <ScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        getScrollState,
        subscribe,
        scrollTo,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
