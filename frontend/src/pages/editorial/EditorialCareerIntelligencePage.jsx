import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../content/public-experience/publicContent';
import { CareerRolePath } from '../../components/public-experience/career/CareerRolePath';
import { usePublicCapabilities } from '../../components/public-experience/motion/usePublicCapabilities';
import { registerSceneProgress } from '../../components/public-experience/motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const EditorialCareerIntelligencePage = () => {
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
      >
        <div className="pa-px-career-hero-content">
          <h1>{data.hero.headline}</h1>
          <p>{data.hero.support}</p>
        </div>
      </section>

      {/* 17 Occupational Profiles Typographic Rail */}
      <CareerRolePath />
    </div>
  );
};

export default EditorialCareerIntelligencePage;
