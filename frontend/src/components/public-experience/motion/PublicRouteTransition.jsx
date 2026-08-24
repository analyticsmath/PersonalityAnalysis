import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { getRouteTransition } from '../../../content/public-experience/transitionMap';

export const PublicRouteTransition = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const layerRef = useRef(null);

  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;

    const fromPath = prevPathRef.current;
    const toPath = location.pathname;
    prevPathRef.current = toPath;

    const transitionConfig = getRouteTransition(fromPath, toPath);
    const layer = layerRef.current;
    if (!layer) return;

    // Window scroll to top
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(layer, { opacity: 0, pointerEvents: 'none' });
      },
    });

    tl.set(layer, { opacity: 0.85, pointerEvents: 'all' })
      .to(layer, {
        opacity: 0,
        duration: (transitionConfig.duration || 600) / 1000,
        ease: transitionConfig.ease || 'power2.inOut',
      });

    return () => {
      tl.kill();
      if (layer) {
        gsap.set(layer, { opacity: 0, pointerEvents: 'none' });
      }
    };
  }, [location.pathname]);

  return <div ref={layerRef} className="pa-px-transition-layer" aria-hidden="true" />;
};

export default PublicRouteTransition;
