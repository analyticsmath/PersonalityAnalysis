import React, { useState, Suspense, lazy } from 'react';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { PUBLIC_CONTENT } from '../../content/public-experience/publicContent';
import { CareerWorldFallback } from '../../components/public-experience/career/CareerWorldFallback';
import { CareerRolePath } from '../../components/public-experience/career/CareerRolePath';
import { usePublicCapabilities } from '../../components/public-experience/motion/usePublicCapabilities';

const LazyCareerWorldCanvas = lazy(() => import('../../components/public-experience/career/CareerWorldCanvas'));

export const EditorialCareerIntelligencePage = () => {
  const [activeWorldIdx, setActiveWorldIdx] = useState(0);
  const data = PUBLIC_CONTENT.career;
  const { hasWebGL, prefersReducedMotion } = usePublicCapabilities();

  const activeWorld = data.workworlds[activeWorldIdx] || data.workworlds[0];

  return (
    <PublicExperienceRoot withFooter={true}>
      <div className="pa-px-career-root">
        {/* 3D Spatial Workworld Stage */}
        <section className="pa-px-career-hero-section" aria-label="Spatial Workworld Conditions">
          <div className="pa-px-career-canvas-wrap">
            {hasWebGL && !prefersReducedMotion ? (
              <Suspense fallback={<CareerWorldFallback mediaKey={activeWorld.mediaKey} />}>
                <LazyCareerWorldCanvas
                  activeIdx={activeWorldIdx}
                  onSelectWorld={(idx) => setActiveWorldIdx(idx)}
                />
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
