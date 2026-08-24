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
      const stage = containerRef.current.querySelector('.pa-px-journey-stage');
      const env0 = containerRef.current.querySelector('.pa-px-env--0');
      const env1 = containerRef.current.querySelector('.pa-px-env--1');
      const env2 = containerRef.current.querySelector('.pa-px-env--2');
      const env3 = containerRef.current.querySelector('.pa-px-env--3');

      const text0 = env0.querySelector('.pa-px-journey__content');
      const text1 = env1.querySelector('.pa-px-journey__content');
      const text2 = env2.querySelector('.pa-px-journey__content');
      const text3 = env3.querySelector('.pa-px-journey__content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      // Default state: Env 0 active
      gsap.set(env0, { zIndex: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, opacity: 1 });
      gsap.set(env1, { zIndex: 2, clipPath: 'polygon(70% 20%, 100% 20%, 100% 80%, 70% 80%)', scale: 1.15, opacity: 0 });
      gsap.set(env2, { zIndex: 3, clipPath: 'polygon(0% 25%, 35% 25%, 35% 85%, 0% 85%)', scale: 1.15, opacity: 0 });
      gsap.set(env3, { zIndex: 4, clipPath: 'polygon(65% 15%, 100% 15%, 100% 75%, 65% 75%)', scale: 1.15, opacity: 0 });

      // Transition 1: Precision -> Autonomy (Asymmetric entry from right, Precision contracts to left)
      tl.to(env1, { opacity: 1, duration: 0.2 }, 0.1)
        .to(env1, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 0.8, ease: 'power2.inOut' }, 0.2)
        .to(env0, { scale: 0.94, opacity: 0.4, duration: 0.6, ease: 'none' }, 0.2)
        .to(text0, { y: '-60px', opacity: 0, duration: 0.4 }, 0.2)
        .fromTo(text1, { y: '60px', opacity: 0 }, { y: '0px', opacity: 1, duration: 0.5 }, 0.5);

      // Transition 2: Autonomy -> Collaboration (Asymmetric entry from left/bottom, Autonomy contracts right)
      tl.to(env2, { opacity: 1, duration: 0.2 }, 1.1)
        .to(env2, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 0.8, ease: 'power2.inOut' }, 1.2)
        .to(env1, { scale: 0.94, opacity: 0.4, duration: 0.6, ease: 'none' }, 1.2)
        .to(text1, { y: '-60px', opacity: 0, duration: 0.4 }, 1.2)
        .fromTo(text2, { y: '60px', opacity: 0 }, { y: '0px', opacity: 1, duration: 0.5 }, 1.5);

      // Transition 3: Collaboration -> Operational Pressure (Diagonal takeover from upper right)
      tl.to(env3, { opacity: 1, duration: 0.2 }, 2.1)
        .to(env3, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 0.8, ease: 'power2.inOut' }, 2.2)
        .to(env2, { scale: 0.94, opacity: 0.4, duration: 0.6, ease: 'none' }, 2.2)
        .to(text2, { y: '-60px', opacity: 0, duration: 0.4 }, 2.2)
        .fromTo(text3, { y: '60px', opacity: 0 }, { y: '0px', opacity: 1, duration: 0.5 }, 2.5);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-journey-section" aria-label="Workworld Journey">
      <div className="pa-px-journey-stage">
        {conditions.map((cond, idx) => (
          <div key={cond.id} className={`pa-px-journey-env pa-px-env--${idx}`}>
            {/* Cinematic Media Plane with Shader Velocity Tension */}
            <div className="pa-px-journey__media-wrap">
              <CinematicMediaPlane assetKey={cond.mediaKey} alt={cond.name} />
            </div>

            {/* Direct Editorial Negative-Space Typography (No Info Card) */}
            <div className="pa-px-journey__content">
              <span className="pa-px-journey__condition-tag">{cond.name}</span>
              <h3 className="pa-px-journey__interpretation">{cond.interpretation}</h3>
              <p className="pa-px-journey__detail">{cond.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkworldJourney;
