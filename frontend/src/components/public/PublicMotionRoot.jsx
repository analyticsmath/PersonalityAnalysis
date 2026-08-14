import { createContext, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const PublicMotionContext = createContext({
  motionReady: false,
  reducedMotion: false,
  finePointer: false,
  smoother: null,
  scrollTo: () => {},
});

export const usePublicMotion = () => useContext(PublicMotionContext);

export default function PublicMotionRoot({ children }) {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const root = useRef(null);
  const smootherRef = useRef(null);
  const [state, setState] = useState({ motionReady: false, finePointer: false, smoother: null });

  useLayoutEffect(() => {
    const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    let smootherInstance = null;

    const context = gsap.context(() => {
      const wrapperEl = document.getElementById('smooth-wrapper');
      const contentEl = document.getElementById('smooth-content');

      if (wrapperEl && contentEl && finePointer && !reducedMotion) {
        try {
          smootherInstance = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 0.65,
            effects: true,
            smoothTouch: 0,
          });
          smootherRef.current = smootherInstance;
        } catch {
          // Fallback to native scrolling if smoother fails
        }
      }

      setState({ motionReady: true, finePointer, smoother: smootherInstance });

      if (typeof document !== 'undefined' && document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    }, root);

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      context.revert();
    };
  }, [location.pathname, reducedMotion]);

  const scrollTo = (target, smooth = true) => {
    if (smootherRef.current) {
      smootherRef.current.scrollTo(target, smooth);
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
      }
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
