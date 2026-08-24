import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CinematicMediaPlane } from './CinematicMediaPlane';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const WorkworldJourney = () => {
  const containerRef = useRef(null);
  const conditions = PUBLIC_CONTENT.home.workworlds.conditions;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const envNodes = containerRef.current.querySelectorAll('.pa-px-home-passage__environment');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          fastScrollEnd: true,
        },
      });

      // Transition across 4 environments with moving crops, depth shifts, scale and travel
      envNodes.forEach((node, i) => {
        if (i === 0) {
          tl.set(node, { opacity: 1, scale: 1, zIndex: 1 });
        } else {
          tl.fromTo(
            node,
            {
              clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
              scale: 1.12,
              opacity: 0.8,
              zIndex: i + 1,
            },
            {
              clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'power2.inOut',
            },
            `+=${0.2}`
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="pa-px-home-passage">
      <div className="pa-px-home-passage__stage">
        {conditions.map((cond, idx) => (
          <div key={cond.id} className={`pa-px-home-passage__environment pa-px-env-${idx}`}>
            <div className="pa-px-home-passage__bg-media">
              <CinematicMediaPlane assetKey={cond.mediaKey} alt={cond.name} />
            </div>
            <div className="pa-px-home-passage__info">
              <div className="pa-px-home-passage__cond-name">{cond.name}</div>
              <h3 className="pa-px-home-passage__interpretation">{cond.interpretation}</h3>
              <p className="pa-px-home-passage__detail">{cond.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkworldJourney;
