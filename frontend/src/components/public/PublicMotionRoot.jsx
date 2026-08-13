import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const canSmooth = () => (
  window.innerWidth >= 1024
  && window.matchMedia('(pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

/** Owns the optional public-only GSAP smoother and removes it on every route change. */
export default function PublicMotionRoot({ children }) {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!canSmooth() || reducedMotion) return undefined;
    let smoother;
    let cancelled = false;

    import('gsap/ScrollSmoother').then(({ ScrollSmoother }) => {
      if (cancelled || !ScrollSmoother) return;
      gsap.registerPlugin(ScrollSmoother);
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 0.78, effects: false, smoothTouch: false,
      });
    }).catch(() => {
      // Native scrolling remains the intended fallback when this GSAP distribution omits ScrollSmoother.
    });

    return () => {
      cancelled = true;
      smoother?.kill();
    };
  }, [location.pathname, reducedMotion]);

  return <div id="smooth-wrapper"><div id="smooth-content">{children}</div></div>;
}
