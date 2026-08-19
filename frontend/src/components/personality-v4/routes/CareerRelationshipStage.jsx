import React, { useState } from 'react';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import SegmentedImageTransition from '../../personality-v5/motion/SegmentedImageTransition';

/**
 * CareerRelationshipStage — V5 Navigable Career Worlds Canvas
 *
 * Employs SegmentedImageTransition across selected worlds:
 * - 5 curated career environments.
 * - Deep examination of fit factors, stretch dynamics, and growth priorities.
 */
export const CareerRelationshipStage = () => {
  const { careerWorlds } = PUBLIC_CONTENT.home;
  const worlds = careerWorlds.worlds;

  const [activeIdx, setActiveIdx] = useState(0);
  const [incomingIdx, setIncomingIdx] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (idx) => {
    if (idx === activeIdx || isTransitioning) return;
    setIncomingIdx(idx);
    setIsTransitioning(true);
  };

  const activeWorld = worlds[activeIdx] || worlds[0];
  const activeAsset = MEDIA_ASSETS[activeWorld.imageKey] || MEDIA_ASSETS.a03;
  const incomingAsset = incomingIdx !== null ? MEDIA_ASSETS[worlds[incomingIdx].imageKey] : null;

  return (
    <div style={{ backgroundColor: 'var(--pa-black)', color: 'var(--pa-white)', minHeight: '100vh', paddingBottom: '12svh' }}>
      <section className="pa-route-hero pa-route-hero--dark">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1 style={{ color: 'var(--pa-white)' }}>{PUBLIC_CONTENT.careerIntelligence.title}</h1>
            <p style={{ color: 'var(--pa-fog)' }}>{PUBLIC_CONTENT.careerIntelligence.lead}</p>
          </div>
        </div>
      </section>

      <section className="pa-career-intel-section" aria-label="Career Intelligence Worlds Explorer" style={{ marginTop: '4svh' }}>
        <div className="pa-container">
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1.2fr 1fr', gap: '40px', alignItems: 'flex-start' }}>
            {/* Navigable World Index */}
            <div role="tablist" aria-label="Work World Categories" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {worlds.map((world, idx) => {
                const isSelected = activeIdx === idx;
                return (
                  <button
                    key={world.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(idx)}
                    style={{
                      textAlign: 'left',
                      background: isSelected ? 'rgba(255, 254, 249, 0.08)' : 'transparent',
                      border: 'none',
                      borderLeft: `2px solid ${isSelected ? 'var(--pa-white)' : 'transparent'}`,
                      padding: '16px 20px',
                      color: isSelected ? 'var(--pa-white)' : 'var(--pa-quiet)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '18px', marginBottom: '4px' }}>
                      {world.name}
                    </div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)' }}>
                      {world.theme}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Photographic Canvas Plane */}
            <div style={{ height: '62svh', overflow: 'hidden', position: 'relative' }}>
              <SegmentedImageTransition
                currentAsset={activeAsset}
                incomingAsset={incomingAsset}
                isTransitioning={isTransitioning}
                onTransitionComplete={() => {
                  if (incomingIdx !== null) {
                    setActiveIdx(incomingIdx);
                    setIncomingIdx(null);
                  }
                  setIsTransitioning(false);
                }}
                objectPosition="50% 40%"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* Detailed Inspection Bay */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '28px', color: 'var(--pa-white)', marginBottom: '8px' }}>
                  {activeWorld.title}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--pa-fog)' }}>{activeWorld.focus}</div>
              </div>

              <div style={{ borderTop: '1px solid var(--pa-line-dark)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-fog)', marginBottom: '6px' }}>
                  Why It May Fit
                </h4>
                <p style={{ color: 'var(--pa-white)', lineHeight: '1.5', fontSize: '15px' }}>{activeWorld.whyItFits}</p>
              </div>

              <div style={{ borderTop: '1px solid var(--pa-line-dark)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-fog)', marginBottom: '6px' }}>
                  Where It May Stretch
                </h4>
                <p style={{ color: 'var(--pa-fog)', lineHeight: '1.5', fontSize: '15px' }}>{activeWorld.whereItStretches}</p>
              </div>

              <div style={{ borderTop: '1px solid var(--pa-line-dark)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-fog)', marginBottom: '6px' }}>
                  What to Strengthen
                </h4>
                <p style={{ color: 'var(--pa-fog)', lineHeight: '1.5', fontSize: '15px' }}>{activeWorld.whatToStrengthen}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerRelationshipStage;
