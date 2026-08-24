import React, { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AtlasScrollContext = createContext({
  lenis: null,
  scrollTo: () => {},
});

export const useAtlasScroll = () => useContext(AtlasScrollContext);

export const AtlasScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.92,
      smoothWheel: true,
      touchMultiplier: 1.0,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
    };
  }, []);

  const scrollTo = (target, options = {}) => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !lenisRef.current) {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: isReducedMotion ? 'auto' : 'smooth' });
      }
      return;
    }

    lenisRef.current.scrollTo(target, options);
  };

  return (
    <AtlasScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </AtlasScrollContext.Provider>
  );
};

export default AtlasScrollProvider;
