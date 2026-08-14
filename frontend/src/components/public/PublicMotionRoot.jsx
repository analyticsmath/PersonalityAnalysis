import { createContext, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const PublicMotionContext = createContext({ motionReady: false, reducedMotion: false, finePointer: false });
export const usePublicMotion = () => useContext(PublicMotionContext);

export default function PublicMotionRoot({ children }) {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const root = useRef(null);
  const [state, setState] = useState({ motionReady: false, finePointer: false });

  useLayoutEffect(() => {
    const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    const context = gsap.context(() => {
      setState({ motionReady: true, finePointer });
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    }, root);

    return () => context.revert();
  }, [location.pathname, reducedMotion]);

  const value = useMemo(() => ({ ...state, reducedMotion }), [state, reducedMotion]);

  return (
    <PublicMotionContext.Provider value={value}>
      <div ref={root} className="public-native-scroll-wrapper">
        {children}
      </div>
    </PublicMotionContext.Provider>
  );
}
