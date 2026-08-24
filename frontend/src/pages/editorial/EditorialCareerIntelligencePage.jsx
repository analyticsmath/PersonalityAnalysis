import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { PUBLIC_CONTENT } from '../../content/public-experience/publicContent';
import { CareerWorldFallback } from '../../components/public-experience/career/CareerWorldFallback';
import { CareerRolePath } from '../../components/public-experience/career/CareerRolePath';
import { usePublicCapabilities } from '../../components/public-experience/motion/usePublicCapabilities';
import { registerSceneProgress } from '../../components/public-experience/motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

const LazyCareerWorldCanvas = lazy(() => import('../../components/public-experience/career/CareerWorldCanvas'));

export const EditorialCareerIntelligencePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const data = PUBLIC_CONTENT.career;
  const { hasWebGL, prefersReducedMotion } = usePublicCapabilities();

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
          setScrollProgress(self.progress);
          registerSceneProgress('career-spatial-stage', self.progress, true);
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activeWorldIdx = Math.min(Math.floor(scrollProgress * data.workworlds.length), data.workworlds.length - 1);
  const activeWorld = data.workworlds[activeWorldIdx] || data.workworlds[0];

  return (
    <PublicExperienceRoot withFooter={true}>
      <div className="pa-px-career-root">
        {/* 3D Spatial Workworld Stage Driven by Route Scroll */}
        <section ref={heroRef} className="pa-px-career-hero-section" aria-label="Spatial Workworld Conditions" data-scene-id="career-spatial-stage">
          <div className="pa-px-career-canvas-wrap">
            {hasWebGL && !prefersReducedMotion ? (
              <Suspense fallback={<CareerWorldFallback mediaKey={activeWorld.mediaKey} />}>
                <LazyCareerWorldCanvas scrollProgress={scrollProgress} />
              </Suspense>
            ) : (
              <CareerWorldFallback mediaKey={activeWorld.mediaKey} />
            )}
          </div>

          <div className="pa-px-career-hero-content">
            <h1>{data.hero.headline}</h1>
            <p>{data.hero.support}</p>
          </div>
        </section>

        {/* 17 Occupational Profiles Typographic Rail */}
        <CareerRolePath />
      </div>
    </PublicExperienceRoot>
  );
};

export default EditorialCareerIntelligencePage;
