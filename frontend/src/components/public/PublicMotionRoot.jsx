import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const PublicMotionContext = createContext({ motionReady: false, smoother: null, reducedMotion: false, finePointer: false });
export const usePublicMotion = () => useContext(PublicMotionContext);

export default function PublicMotionRoot({ children }) {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState({ motionReady: false, smoother: null, finePointer: false });

  useLayoutEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const eligible = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches && !reducedMotion;
    let smoother = null;
    if (eligible) smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 0.62, effects: false, smoothTouch: false, normalizeScroll: false });
    setState({ motionReady: true, smoother, finePointer });
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());
    return () => { smoother?.kill(); ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); };
  }, [location.pathname, reducedMotion]);

  const value = useMemo(() => ({ ...state, reducedMotion }), [state, reducedMotion]);
  return <PublicMotionContext.Provider value={value}><div id="smooth-wrapper"><div id="smooth-content">{children}</div></div></PublicMotionContext.Provider>;
}
