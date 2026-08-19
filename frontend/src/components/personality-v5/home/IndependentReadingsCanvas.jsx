import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';
import useCinematicScene from '../motion/useCinematicScene';

/**
 * Scene 03 — Four Independent Readings Canvas (V5)
 *
 * Replaces tabbed card containers with an A07 photographic collage stage:
 * - Big Five (5 spectrum traces)
 * - RIASEC (6 spatial zones)
 * - O*NET Work Values (ordered vertical editorial index)
 * - Behavioral Signals (evidence ledger line)
 */
export const IndependentReadingsCanvas = () => {
  const { independentReadings } = PUBLIC_CONTENT.home;
  const models = independentReadings?.models || [];
  const [activeTab, setActiveTab] = useState(0);

  const collageRef = useRef(null);

  const containerRef = useCinematicScene((self, mm, el) => {
    mm.add('(min-width: 1025px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
          onUpdate: (selfState) => {
            // Synchronize active reading based on scroll territory
            const step = Math.min(models.length - 1, Math.floor(selfState.progress * models.length));
            setActiveTab(step);
          },
        },
      });

      // Shift collage perspective across scroll
      tl.to(collageRef.current, { scale: 1.05, x: 20, ease: 'none' }, 0);
    });
  }, [models.length]);

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      const next = (index + 1) % models.length;
      setActiveTab(next);
    } else if (e.key === 'ArrowLeft') {
      const prev = (index - 1 + models.length) % models.length;
      setActiveTab(prev);
    }
  };

  const currentModel = models[activeTab] || models[0] || {};

  return (
    <section ref={containerRef} className="pa-readings-v5" aria-label="Four Independent Readings">
      <div className="pa-readings-v5__viewport">
        {/* Collage Photographic Plane */}
        <div ref={collageRef} className="pa-readings-v5__collage">
          <ResponsivePicture
            asset={MEDIA_ASSETS.a07}
            alt={MEDIA_ASSETS.a07.alt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            objectPosition="50% 45%"
          />
        </div>

        {/* Inspector Panel directly on paper canvas */}
        <div className="pa-readings-v5__inspector">
          {/* Accessible Tablist */}
          <div className="pa-readings-tablist" role="tablist" aria-label="Psychometric Frameworks">
            {models.map((model, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={model.id}
                  id={`tab-model-${model.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-model-${model.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`pa-readings-tab ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  {model.name}
                </button>
              );
            })}
          </div>

          {/* Reading Data View */}
          <div
            id={`panel-model-${currentModel.id}`}
            role="tabpanel"
            aria-labelledby={`tab-model-${currentModel.id}`}
            className="pa-reading-data-view"
          >
            <h3 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '28px', marginBottom: '8px' }}>
              {currentModel.name}
            </h3>
            <p style={{ color: 'var(--pa-cool-600)', marginBottom: '24px', lineHeight: '1.5' }}>
              {currentModel.summary}
            </p>

            {/* Lens specific data marks */}
            {currentModel.id === 'big-five' && (
              <div className="pa-reading-traits-list">
                {currentModel.traits?.map((trait) => (
                  <div key={trait.id} className="pa-reading-trait-row">
                    <span>{trait.name}</span>
                    <div className="pa-reading-trait-track">
                      <div
                        className="pa-reading-trait-fill"
                        style={{
                          width: `${trait.sample}%`,
                          backgroundColor: trait.color || 'var(--pa-ink)',
                        }}
                      />
                    </div>
                    <span className="pa-tabular" style={{ textAlign: 'right', fontWeight: 500 }}>
                      {trait.sample}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {currentModel.id === 'riasec' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {currentModel.territories?.map((th) => (
                  <div key={th.id} style={{ borderLeft: '2px solid var(--pa-ink)', paddingLeft: '10px' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{th.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--pa-quiet)' }}>{th.intensity}% intensity</div>
                  </div>
                ))}
              </div>
            )}

            {currentModel.id === 'work-values' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentModel.values?.map((val) => (
                  <div key={val.rank} style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                    <span className="pa-tabular" style={{ color: 'var(--pa-quiet)', width: '20px' }}>
                      {val.rank}
                    </span>
                    <span>{val.name}</span>
                  </div>
                ))}
              </div>
            )}

            {currentModel.id === 'behavioral-signals' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentModel.signals?.map((sig) => (
                  <div key={sig.source} style={{ borderLeft: '2px solid var(--pa-ink)', paddingLeft: '12px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--pa-quiet)', textTransform: 'uppercase' }}>{sig.metric}</div>
                    <div style={{ fontSize: '14px', color: 'var(--pa-ink)' }}>{sig.interpretation}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndependentReadingsCanvas;
