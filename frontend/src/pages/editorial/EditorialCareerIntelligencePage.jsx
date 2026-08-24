import React, { useState, useEffect, lazy, Suspense } from 'react';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import CareerWorldFallback from '../../components/personality-atlas/career/CareerWorldFallback';
import RoleIndexField from '../../components/personality-atlas/career/RoleIndexField';
import { PUBLIC_CONTENT } from '../../content/personality-atlas/publicContent';
import careersData from '../../content/careers.json';

// Canonical 17 roles export for contract stability
export const ROLE_ENTRIES = Object.values(careersData);
export const CAREER_LENSES = PUBLIC_CONTENT.career.workworlds;

// Code-split R3F Canvas to prevent bundling Three in Home initial load
const LazyCareerWorldCanvas = lazy(() =>
  import('../../components/personality-atlas/career/CareerWorldCanvas')
);

export const EditorialCareerIntelligencePage = () => {
  const [activeWorldIdx, setActiveWorldIdx] = useState(0);
  const [canRender3D, setCanRender3D] = useState(false);

  const content = PUBLIC_CONTENT.career;
  const workworlds = content.workworlds;
  const activeWorld = workworlds[activeWorldIdx] || workworlds[0];

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    setCanRender3D(isFinePointer && !isReducedMotion && isDesktop);
  }, []);

  return (
    <AtlasScrollProvider>
      <AtlasLayout>
        {/* Workworld Atlas First Viewport Stage */}
        <section
          className="pa-atlas-scene-wrapper pa-career-atlas"
          style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden' }}
          aria-label="Workworld Atlas"
        >
          {/* Spatial 3D Canvas or Art-Directed DOM Fallback */}
          {canRender3D ? (
            <Suspense fallback={<CareerWorldFallback activeWorld={activeWorld} />}>
              <LazyCareerWorldCanvas
                activeIndex={activeWorldIdx}
                onSelectIndex={(idx) => setActiveWorldIdx(idx)}
              />
            </Suspense>
          ) : (
            <CareerWorldFallback activeWorld={activeWorld} />
          )}

          {/* Coordinated Editorial Foreground Interface */}
          <div
            className="pa-atlas-grid"
            style={{
              position: 'relative',
              zIndex: 3,
              width: '100%',
              minHeight: '100svh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingTop: 'calc(var(--atlas-header-height-desktop) + 24px)',
              paddingBottom: '40px',
              pointerEvents: 'none',
            }}
          >
            {/* Top Anchor: Route Title & Lead */}
            <div style={{ maxWidth: '46rem', pointerEvents: 'auto' }}>
              <h1 className="pa-atlas-display-lg" style={{ color: 'var(--atlas-paper)', marginBottom: '12px' }}>
                {content.hero.headline}
              </h1>
              <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-paper)', opacity: 0.9 }}>
                {content.hero.lead}
              </p>
            </div>

            {/* Middle/Bottom: Active Environment State & Selection Rail */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
                gap: 'var(--atlas-column-gap)',
                alignItems: 'flex-end',
                pointerEvents: 'auto',
              }}
            >
              {/* Active World Progressive Textual Sequence */}
              <div
                style={{
                  backgroundColor: 'rgba(22, 61, 53, 0.88)',
                  padding: '28px 32px',
                  borderRadius: 'var(--atlas-radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.78rem' }}>
                  ACTIVE WORKWORLD: {activeWorld.name.toUpperCase()}
                </span>

                <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-paper)', fontStyle: 'italic' }}>
                  {activeWorld.condition}
                </p>

                <div className="pa-career-atlas__node-sequence" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="pa-career-atlas__rel-node--alignment">
                    <span className="pa-atlas-mono" style={{ fontSize: '0.72rem', color: 'var(--atlas-signal)' }}>
                      ALIGNMENT:
                    </span>
                    <span className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', marginLeft: '8px' }}>
                      {activeWorld.alignment}
                    </span>
                  </div>

                  <div className="pa-career-atlas__rel-node--tension">
                    <span className="pa-atlas-mono" style={{ fontSize: '0.72rem', color: 'var(--atlas-fog)' }}>
                      TENSION:
                    </span>
                    <span className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', marginLeft: '8px' }}>
                      {activeWorld.tension}
                    </span>
                  </div>

                  <div className="pa-career-atlas__rel-node--develop">
                    <span className="pa-atlas-mono" style={{ fontSize: '0.72rem', color: 'var(--atlas-lichen)' }}>
                      DEVELOP:
                    </span>
                    <span className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', marginLeft: '8px' }}>
                      {activeWorld.develop}
                    </span>
                  </div>
                </div>
              </div>

              {/* Workworld Quick Selectors */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <span className="pa-atlas-mono" style={{ color: 'var(--atlas-paper)', fontSize: '0.74rem', opacity: 0.8 }}>
                  EXPLORE 5 WORKWORLDS:
                </span>
                {workworlds.map((world, idx) => {
                  const isCurrent = idx === activeWorldIdx;
                  return (
                    <button
                      key={world.id}
                      onClick={() => setActiveWorldIdx(idx)}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        backgroundColor: isCurrent ? 'var(--atlas-signal)' : 'rgba(239, 245, 242, 0.1)',
                        color: isCurrent ? 'var(--atlas-field)' : 'var(--atlas-paper)',
                        fontWeight: isCurrent ? 540 : 450,
                        fontSize: '0.92rem',
                        borderRadius: 'var(--atlas-radius-xs)',
                        transition: 'all 180ms ease',
                      }}
                      aria-pressed={isCurrent}
                    >
                      {world.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 17-Role Directory Open Field */}
        <RoleIndexField />
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default EditorialCareerIntelligencePage;
