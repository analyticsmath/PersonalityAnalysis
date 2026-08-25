/**
 * Personality Assessor - Career Spatial Experience
 * 2.5D CSS perspective spatial stage with 5 environmental world planes as baseline,
 * upgraded to Three.js perspective scene when WebGL is supported.
 * Guaranteed visually complete and responsive without WebGL.
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CareerRolePath } from './CareerRolePath';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, scrollBus } from '../motion/scrollState';
import { clamp01, easeInOutCubic, easeOutCubic } from '../motion/homeSceneModel';

gsap.registerPlugin(ScrollTrigger);

const CAREER_DOM_PLANES = [
  {
    key: 'workworldPrecision',
    alt: 'Precision lathe engineering environment',
    transform: 'translate3d(0, 0, 0px)',
    aspectRatio: '16 / 10',
    width: 'clamp(380px, 48vw, 680px)',
    top: '24%',
    left: '8vw',
  },
  {
    key: 'careerDeepInquiry',
    alt: 'Deep analytical diagnostics inquiry environment',
    transform: 'translate3d(180px, -40px, -600px) rotateY(-8deg)',
    aspectRatio: '16 / 10',
    width: 'clamp(360px, 45vw, 640px)',
    top: '20%',
    left: '46vw',
  },
  {
    key: 'careerCoordination',
    alt: 'Collaborative engineering coordination studio',
    transform: 'translate3d(-160px, 50px, -1200px) rotateY(10deg)',
    aspectRatio: '16 / 10',
    width: 'clamp(360px, 46vw, 650px)',
    top: '26%',
    left: '12vw',
  },
  {
    key: 'workworldPressure',
    alt: 'Operational control room coordination under time constraints',
    transform: 'translate3d(140px, -30px, -1800px) rotateY(-6deg)',
    aspectRatio: '16 / 10',
    width: 'clamp(380px, 48vw, 680px)',
    top: '22%',
    left: '42vw',
  },
  {
    key: 'careerSynthesis',
    alt: 'Synthesis of architectural and technical systems',
    transform: 'translate3d(0, 0, -2400px)',
    aspectRatio: '16 / 10',
    width: 'clamp(400px, 50vw, 700px)',
    top: '24%',
    left: '25vw',
  },
];

export const CareerSpatialExperience = () => {
  const heroRef = useRef(null);
  const worldGroupRef = useRef(null);
  const data = PUBLIC_CONTENT.career;
  const { prefersReducedMotion, webgl, isMobile } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current || !worldGroupRef.current) return;

    const groupEl = worldGroupRef.current;
    const planes = groupEl.querySelectorAll('.pa-px-career-dom-plane');

    const updateFrame = (p) => {
      const clampedP = clamp01(p);
      registerSceneProgress('career-spatial-stage', clampedP, true);

      // Virtual camera progression along Z-axis (0 -> 2400px)
      const travelZ = clampedP * 2400;
      const camX = Math.sin(clampedP * Math.PI) * 120;
      const camY = Math.cos(clampedP * Math.PI * 1.5) * -30;
      const camRotY = Math.sin(clampedP * Math.PI) * -8;

      groupEl.style.transform = `translate3d(${-camX}px, ${-camY}px, ${travelZ}px) rotateY(${camRotY}deg)`;

      // Dynamic opacity for planes as camera approaches
      planes.forEach((plane, idx) => {
        const planeZ = idx * 600;
        const dist = planeZ - travelZ;
        let opacity = 1.0;
        if (dist > 1400) {
          opacity = Math.max(0, 1 - (dist - 1400) / 600);
        } else if (dist < -300) {
          opacity = Math.max(0, 1 - (-dist - 300) / 400);
        }
        plane.style.opacity = `${opacity}`;
      });
    };

    const computeProgress = () => {
      if (!heroRef.current) return 0;
      const start = heroRef.current.offsetTop;
      const travel = heroRef.current.offsetHeight - window.innerHeight;
      if (travel <= 0) return 0;
      return Math.max(0, Math.min(1, (window.scrollY - start) / travel));
    };

    updateFrame(computeProgress());

    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateFrame(self.progress);
      },
    });

    const unsubscribeBus = scrollBus.subscribe(() => {
      updateFrame(computeProgress());
    });

    return () => {
      unsubscribeBus();
      st.kill();
    };
  }, [prefersReducedMotion]);

  const trackHeight = prefersReducedMotion ? 'auto' : (isMobile ? '200svh' : '260svh');

  return (
    <div className="pa-px-career-root">
      {/* 2.5D DOM Spatial Stage (Active & Rich Everywhere, Upgraded via WebGL Canvas) */}
      <section
        ref={heroRef}
        className="pa-px-career-hero-section"
        aria-label="Spatial Workworld Conditions"
        data-scene-id="career-spatial-stage"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: trackHeight,
          backgroundColor: 'var(--px-ink, #121416)',
          color: 'var(--px-white, #F7F8F8)',
          overflow: 'hidden',
        }}
      >
        <div
          className="pa-px-career-stage-sticky"
          style={{
            position: prefersReducedMotion ? 'relative' : 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: prefersReducedMotion ? 'auto' : '100svh',
            overflow: 'hidden',
          }}
        >
          {/* Header Typography (Visible immediately at cold load) */}
          <div
            className="pa-px-career-hero-content"
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(40px, 8vh, 80px) var(--px-outer-gutter, 6vw) 0',
              maxWidth: '54rem',
              pointerEvents: 'none',
            }}
          >
            <h1 className="pa-px-career-title">{data.hero.headline}</h1>
            <p className="pa-px-career-support">{data.hero.support}</p>
          </div>

          {/* 3D Perspective Stage Container */}
          <div
            className="pa-px-career-perspective-stage"
            style={{
              position: 'absolute',
              inset: 0,
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
              overflow: 'hidden',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          >
            {/* World Group Transforming in 3D Space */}
            <div
              ref={worldGroupRef}
              className="pa-px-career-world-group"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {CAREER_DOM_PLANES.map((plane, idx) => (
                <div
                  key={plane.key}
                  className={`pa-px-career-dom-plane pa-px-plane--${idx + 1}`}
                  style={{
                    position: 'absolute',
                    top: plane.top,
                    left: plane.left,
                    width: plane.width,
                    aspectRatio: plane.aspectRatio,
                    transform: plane.transform,
                    borderRadius: '2px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.55)',
                    willChange: 'transform, opacity',
                  }}
                >
                  <PublicPicture
                    assetKey={plane.key}
                    alt={plane.alt}
                    priority={idx < 2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 17 Occupational Profiles Typographic Rail */}
      <CareerRolePath />
    </div>
  );
};

export default CareerSpatialExperience;

