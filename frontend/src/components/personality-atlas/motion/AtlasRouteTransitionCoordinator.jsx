import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { getRouteTransition } from '../../../content/personality-atlas/routeTransitionMap';

const PUBLIC_ROUTES = new Set([
  '/',
  '/career-intelligence',
  '/how-it-works',
  '/progress',
  '/methodology',
  '/trust',
  '/privacy',
  '/login',
  '/signup',
]);

const AtlasRouteTransitionCoordinator = ({ children }) => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const overlayRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  const isPublicRoute = PUBLIC_ROUTES.has(location.pathname);
  const wasPublicRoute = PUBLIC_ROUTES.has(prevPathRef.current);

  useEffect(() => {
    // If not transitioning between public routes, update immediately with no choreography
    if (!isPublicRoute || !wasPublicRoute) {
      prevPathRef.current = location.pathname;
      setDisplayChildren(children);
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname === prevPathRef.current) {
      setDisplayChildren(children);
      return;
    }

    const transitionMeta = getRouteTransition(prevPathRef.current, location.pathname);
    const durationSec = Math.min(1.0, (transitionMeta.duration || 750) / 1000);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      prevPathRef.current = location.pathname;
      setDisplayChildren(children);
      window.scrollTo(0, 0);
      return;
    }

    isTransitioningRef.current = true;
    const overlay = overlayRef.current;

    // Execute solid-color plane transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
      },
    });

    if (overlay) {
      tl.set(overlay, { pointerEvents: 'auto' })
        .to(overlay, {
          opacity: 1,
          duration: durationSec * 0.45,
          ease: 'power2.inOut',
        })
        .call(() => {
          prevPathRef.current = location.pathname;
          setDisplayChildren(children);
          window.scrollTo(0, 0);
        })
        .to(overlay, {
          opacity: 0,
          duration: durationSec * 0.55,
          ease: 'power2.inOut',
        })
        .set(overlay, { pointerEvents: 'none' });
    } else {
      prevPathRef.current = location.pathname;
      setDisplayChildren(children);
      window.scrollTo(0, 0);
    }

    return () => {
      tl.kill();
    };
  }, [location.pathname, children, isPublicRoute, wasPublicRoute]);

  return (
    <>
      <div
        ref={overlayRef}
        className="pa-atlas-transition-overlay"
        aria-hidden="true"
      />
      {displayChildren}
    </>
  );
};

export default AtlasRouteTransitionCoordinator;
