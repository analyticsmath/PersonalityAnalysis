import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const PublicMotionContext = createContext({
  motionReady: false,
  reducedMotion: false,
  finePointer: false,
  scrollTo: () => {},
});

export const usePublicMotion = () => useContext(PublicMotionContext);

export default function PublicMotionRoot({ children }) {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const root = useRef(null);
  const [state, setState] = useState({ motionReady: false, finePointer: false });

  useEffect(() => {
    const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

    // Refresh ScrollTrigger when layout or fonts settle
    setState({ motionReady: true, finePointer });

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      // Revert ScrollTrigger instances attached to this context if needed
    };
  }, [location.pathname, location.search, reducedMotion]);

  const scrollTo = (target, smooth = true) => {
    if (typeof window === 'undefined') return;
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: smooth && !reducedMotion ? 'smooth' : 'auto' });
    }
  };

  const value = useMemo(
    () => ({ ...state, reducedMotion, scrollTo }),
    [state, reducedMotion]
  );

  return (
    <PublicMotionContext.Provider value={value}>
      <div ref={root} className="public-motion-root">
        {children}
      </div>
    </PublicMotionContext.Provider>
  );
}
