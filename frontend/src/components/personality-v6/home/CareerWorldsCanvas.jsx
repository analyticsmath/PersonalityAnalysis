import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import PlaneHandoff from '../motion/PlaneHandoff';
import useCinematicScene from '../motion/useCinematicScene';

export const CareerWorldsCanvas = () => {
  const { careerWorlds } = PUBLIC_CONTENT.home;
  const worlds = careerWorlds.worlds;

  const [activeWorldIndex, setActiveWorldIndex] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const prevIndexRef = useRef(0);

  const activeWorld = worlds[activeWorldIndex] || worlds[0];
  const prevWorld = worlds[prevIndexRef.current] || worlds[0];

  const activeAsset = MEDIA_ASSETS_V6[activeWorld.imageKey] || MEDIA_ASSETS_V6.a03;
  const prevAsset = MEDIA_ASSETS_V6[prevWorld.imageKey] || MEDIA_ASSETS_V6.a03;

  // Single atomic selection handler: updates tab, image, and copy in same render
  const selectWorld = (index) => {
    if (index === activeWorldIndex) return;
    prevIndexRef.current = activeWorldIndex;
    setActiveWorldIndex(index);
    setTransitionProgress(0);
  };

  // GSAP Macro Scroll Timeline
  const containerRef = useCinematicScene(({ mm, el }) => {
    mm.add('(min-width: 901px)', () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const targetIdx = Math.min(worlds.length - 1, Math.floor(p * worlds.length));
            if (targetIdx !== activeWorldIndex) {
              prevIndexRef.current = activeWorldIndex;
              setActiveWorldIndex(targetIdx);
            }
            // Sub-progress within current world transition
            const subP = (p * worlds.length) % 1;
            setTransitionProgress(subP);
          },
        },
      });
    });
  }, [activeWorldIndex, worlds.length]);

  return (
    <section
      ref={containerRef}
      className="pa-v6-scene-careers"
      data-header-theme="dark"
      data-cinematic-stage="careers"
      aria-label="Career Worlds Canvas"
    >
      <div className="pa-v6-scene-careers__sticky">
        <div className="pa-v6-career-canvas">
          {/* Dominant Full-Bleed Media Field with Overlap-Safe Handoff */}
          <div className="pa-v6-career-canvas__backdrop">
            <PlaneHandoff
              assetA={prevAsset}
              assetB={activeAsset}
              progress={transitionProgress}
              objectPositionA={prevAsset.focalPoint?.desktop || 'center center'}
              objectPositionB={activeAsset.focalPoint?.desktop || 'center center'}
            />
          </div>

          {/* Top Edge Selector Controls */}
          <div className="pa-v6-career-canvas__controls" role="tablist" aria-label="Career Worlds">
            {worlds.map((w, idx) => (
              <button
                key={w.id}
                role="tab"
                aria-selected={idx === activeWorldIndex}
                className={`pa-v6-career-tab ${idx === activeWorldIndex ? 'active' : ''}`}
                onClick={() => selectWorld(idx)}
              >
                <span>{w.index.split(' / ')[0]}</span> · {w.name.split(' & ')[0]}
              </button>
            ))}
          </div>

          {/* Edge-Anchored Direct Structural Copy (Never below photo) */}
          <div className="pa-v6-career-canvas__overlay-copy">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', color: 'var(--pa-stone)', textTransform: 'uppercase', fontWeight: 600 }}>
                World {activeWorld.index}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--pa-bone)', fontWeight: 600 }}>
                {activeWorld.theme}
              </span>
            </div>

            <h3 style={{ fontSize: '1.75rem', color: 'var(--pa-bone)', margin: '0 0 1rem 0' }}>
              {activeWorld.name}
            </h3>

            <p style={{ fontSize: '0.9375rem', color: 'var(--pa-stone)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {activeWorld.statement}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px solid var(--pa-rule-light)', paddingTop: '1rem', fontSize: '0.8125rem' }}>
              <div>
                <strong style={{ color: 'var(--pa-bone)', display: 'block', marginBottom: '4px' }}>Fitting Condition</strong>
                <span style={{ color: 'var(--pa-stone)' }}>{activeWorld.whyItFits}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--pa-bone)', display: 'block', marginBottom: '4px' }}>Stretch Tension</strong>
                <span style={{ color: 'var(--pa-stone)' }}>{activeWorld.whereItStretches}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--pa-bone)', display: 'block', marginBottom: '4px' }}>Development Priority</strong>
                <span style={{ color: 'var(--pa-stone)' }}>{activeWorld.whatToStrengthen}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerWorldsCanvas;
