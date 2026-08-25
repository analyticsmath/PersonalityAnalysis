/**
 * Personality Assessor - Career Spatial Experience
 * 3D perspective spatial environment entry and career role rail.
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CareerRolePath } from './CareerRolePath';
import { PersistentMediaSlot } from '../canvas/PersistentMediaSlot';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const CareerSpatialExperience = () => {
  const heroRef = useRef(null);
  const data = PUBLIC_CONTENT.career;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          registerSceneProgress('career-spatial-stage', self.progress, true);
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="pa-px-career-root">
      {/* 3D Spatial Workworld Stage Driven by Persistent WebGL Canvas & Route Scroll */}
      <section
        ref={heroRef}
        className="pa-px-career-hero-section"
        aria-label="Spatial Workworld Conditions"
        data-scene-id="career-spatial-stage"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: prefersReducedMotion ? 'auto' : '220svh',
          backgroundColor: 'transparent', // Let persistent canvas show through
        }}
      >
        {/* Destination Slot for Shared Actor Carry from Home */}
        <div
          className="pa-px-career-entry-slot-wrapper"
          style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }}
        >
          <PersistentMediaSlot
            actorId="home-observation-primary"
            slotId="career-entry-world"
            assetKey="workworldPrecision"
            alt="Spatial Workworld entry"
            transitionRole="shared"
          />
        </div>

        <div className="pa-px-career-hero-content" style={{ position: 'relative', zIndex: 5 }}>
          <h1 className="pa-px-career-title">{data.hero.headline}</h1>
          <p className="pa-px-career-support">{data.hero.support}</p>
        </div>
      </section>

      {/* 17 Occupational Profiles Typographic Rail */}
      <CareerRolePath />
    </div>
  );
};

export default CareerSpatialExperience;
