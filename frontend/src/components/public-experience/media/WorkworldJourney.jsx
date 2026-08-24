import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CinematicMediaPlane } from './CinematicMediaPlane';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, registerActor } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const WorkworldJourney = () => {
  const containerRef = useRef(null);
  const conditions = PUBLIC_CONTENT.home.workworlds.conditions;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const env0 = containerRef.current.querySelector('.pa-px-env--0');
      const env1 = containerRef.current.querySelector('.pa-px-env--1');
      const env2 = containerRef.current.querySelector('.pa-px-env--2');
      const env3 = containerRef.current.querySelector('.pa-px-env--3');

      const text0 = env0?.querySelector('.pa-px-journey__content');
      const text1 = env1?.querySelector('.pa-px-journey__content');
      const text2 = env2?.querySelector('.pa-px-journey__content');
      const text3 = env3?.querySelector('.pa-px-journey__content');

      const mediaWrap0 = env0?.querySelector('.pa-px-journey__media-wrap');
      const mediaWrap1 = env1?.querySelector('.pa-px-journey__media-wrap');
      const mediaWrap2 = env2?.querySelector('.pa-px-journey__media-wrap');
      const mediaWrap3 = env3?.querySelector('.pa-px-journey__media-wrap');

      // Register active Workworld plane for route carry to Career
      if (mediaWrap0) {
        registerActor('workworld-active-media', {
          element: mediaWrap0,
          assetKey: conditions[0]?.mediaKey || 'workworldPrecision',
        });
      }

      // Initial visual states: 100% valid, zero black void
      // Env 0: Dominant (100% full screen)
      gsap.set(env0, {
        zIndex: 10,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        opacity: 1,
        visibility: 'visible',
      });
      // Env 1: Anticipation origin at lower-right (non-fullscreen crop origin)
      gsap.set(env1, {
        zIndex: 20,
        clipPath: 'polygon(66% 25%, 100% 25%, 100% 90%, 66% 90%)',
        scale: 1.08,
        opacity: 0,
        visibility: 'visible',
      });
      // Env 2: Anticipation origin at upper-left
      gsap.set(env2, {
        zIndex: 30,
        clipPath: 'polygon(0% 10%, 42% 10%, 42% 70%, 0% 70%)',
        scale: 1.08,
        opacity: 0,
        visibility: 'visible',
      });
      // Env 3: Anticipation origin at right-center
      gsap.set(env3, {
        zIndex: 40,
        clipPath: 'polygon(55% 15%, 100% 15%, 100% 85%, 55% 85%)',
        scale: 1.08,
        opacity: 0,
        visibility: 'visible',
      });

      // Single continuous scrub timeline: 1:1 scrub mapping for immediate Page Down safety
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Immediate 1:1 scrub
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            registerSceneProgress('home-workworld', self.progress, true);
          },
        },
      });

      // ── Transition 1: Precision (0) -> Autonomy (1) ──
      // 0.00 - 0.12: Env 0 stable
      // 0.12 - 0.30: Env 1 enters from lower-right 34vw origin, inner image counter-moves
      // 0.25 - 0.65: Overlap & Zoom Parallax
      // 0.42 - 0.60: Climax (both prominent in central field)
      // 0.62: Env 1 becomes dominant, Env 0 recedes to left residue
      // 0.82 - 0.92: Env 1 settles
      tl.to(env1, { opacity: 1, duration: 0.15, ease: 'none' }, 0.10)
        .to(env1, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 0.70,
          ease: 'power1.inOut',
        }, 0.15)
        .to(env0, {
          scale: 0.92,
          xPercent: -18,
          opacity: 0.45,
          duration: 0.65,
          ease: 'none',
        }, 0.18)
        .to(text0, {
          yPercent: -35,
          opacity: 0,
          duration: 0.35,
          ease: 'none',
        }, 0.15)
        .fromTo(text1,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.45, ease: 'none' },
          0.45
        );

      // ── Transition 2: Autonomy (1) -> Collaboration (2) ──
      // 1.00 - 1.12: Env 1 stable
      // 1.12 - 1.30: Env 2 enters from upper-left wide crop
      // 1.42 - 1.60: Climax (diagonal handoff)
      // 1.62: Env 2 dominant, Env 1 recedes into lower-right residue
      tl.to(env2, { opacity: 1, duration: 0.15, ease: 'none' }, 1.10)
        .to(env2, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 0.70,
          ease: 'power1.inOut',
        }, 1.15)
        .to(env1, {
          scale: 0.92,
          xPercent: 18,
          yPercent: 12,
          opacity: 0.45,
          duration: 0.65,
          ease: 'none',
        }, 1.18)
        .to(text1, {
          yPercent: -35,
          opacity: 0,
          duration: 0.35,
          ease: 'none',
        }, 1.15)
        .fromTo(text2,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.45, ease: 'none' },
          1.45
        );

      // ── Transition 3: Collaboration (2) -> Operational Pressure (3) ──
      // 2.00 - 2.12: Env 2 stable
      // 2.12 - 2.30: Env 3 enters with tighter horizontal tension
      // 2.42 - 2.60: Climax
      // 2.62: Env 3 dominant, Env 2 recedes to upper edge
      tl.to(env3, { opacity: 1, duration: 0.15, ease: 'none' }, 2.10)
        .to(env3, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 0.70,
          ease: 'power1.inOut',
        }, 2.15)
        .to(env2, {
          scale: 0.92,
          yPercent: -15,
          opacity: 0.45,
          duration: 0.65,
          ease: 'none',
        }, 2.18)
        .to(text2, {
          yPercent: -35,
          opacity: 0,
          duration: 0.35,
          ease: 'none',
        }, 2.15)
        .fromTo(text3,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.45, ease: 'none' },
          2.45
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, conditions]);

  return (
    <section ref={containerRef} className="pa-px-journey-section" aria-label="Workworld Journey" data-scene-id="home-workworld">
      <div className="pa-px-journey-stage">
        {conditions.map((cond, idx) => (
          <div key={cond.id} className={`pa-px-journey-env pa-px-env--${idx}`}>
            {/* Cinematic Media Plane with Shader Velocity Tension & Dominant Opacity */}
            <div className="pa-px-journey__media-wrap">
              <CinematicMediaPlane assetKey={cond.mediaKey} alt={cond.name} priority={idx === 0} />
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
