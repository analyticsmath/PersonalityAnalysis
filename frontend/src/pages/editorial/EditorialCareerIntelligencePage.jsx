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
        <div className="pa-px-career-stage">
          <div className="pa-px-career-stage__sticky">
            <div className="pa-px-career-header-overlay">
              <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
                Spatial Career Field
              </span>
              <h1>{data.hero.headline}</h1>
              <p>{data.hero.support}</p>
            </div>

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

            <div className="pa-px-career-world-card">
              <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '6px' }}>
                Active Condition {activeWorldIdx + 1} of 5
              </span>
              <div className="pa-px-career-world-card__name">{activeWorld.name}</div>
              <p className="pa-px-career-world-card__cond">{activeWorld.condition}</p>
              <div style={{ marginTop: '12px', fontSize: 'var(--px-caption)', opacity: 0.8 }}>
                <strong>Alignment:</strong> {activeWorld.alignment}
              </div>
            </div>
          </div>
        </div>

        {/* 17 Canonical Roles */}
        <CareerRolePath />
      </div>
    </PublicExperienceRoot>
  );
};

export default EditorialCareerIntelligencePage;
