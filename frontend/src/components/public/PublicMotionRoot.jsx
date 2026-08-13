import { createContext, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const PublicMotionContext = createContext({ motionReady: false, reducedMotion: false, finePointer: false });
export const usePublicMotion = () => useContext(PublicMotionContext);

export default function PublicMotionRoot({ children }) {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const root = useRef(null);
  const [state, setState] = useState({ motionReady: false, finePointer: false });

  useLayoutEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const context = gsap.context(() => {
      let smoother;
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        if (reducedMotion) return undefined;
        smoother = ScrollSmoother.create({ wrapper: '#public-smooth-wrapper', content: '#public-smooth-content', smooth: 0.85, effects: false, smoothTouch: false, normalizeScroll: false });
        return () => smoother?.kill();
      });
      setState({ motionReady: true, finePointer });
      document.fonts?.ready?.then(() => ScrollTrigger.refresh());
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, [location.pathname, reducedMotion]);

  const value = useMemo(() => ({ ...state, reducedMotion }), [state, reducedMotion]);
  return <PublicMotionContext.Provider value={value}><div ref={root} id="public-smooth-wrapper"><div id="public-smooth-content">{children}</div></div></PublicMotionContext.Provider>;
}
