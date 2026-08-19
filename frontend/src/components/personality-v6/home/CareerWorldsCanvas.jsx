import React, { useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import MediaPlane from '../motion/MediaPlane';
import useCinematicScene from '../motion/useCinematicScene';

export const CareerWorldsCanvas = () => {
  const { careerWorlds } = PUBLIC_CONTENT.home;
  const worlds = careerWorlds.worlds;

  const [activeWorldIndex, setActiveWorldIndex] = useState(0);
  const mediaPlanesRef = useRef([]);

  const activeWorld = worlds[activeWorldIndex] || worlds[0];

  // Atomic world selector: updates tab, media, requirements, and copy synchronously
  const selectWorld = useCallback((index) => {
    if (index < 0 || index >= worlds.length) return;
    setActiveWorldIndex(index);

    // Cross-fade media planes deterministically
    mediaPlanesRef.current.forEach((planeEl, idx) => {
      if (!planeEl) return;
      if (idx === index) {
        gsap.to(planeEl, { opacity: 1, zIndex: 2, duration: 0.4, overwrite: 'auto' });
      } else {
        gsap.to(planeEl, { opacity: 0, zIndex: 1, duration: 0.4, overwrite: 'auto' });
      }
    });
  }, [worlds.length]);

  // GSAP Macro Scroll Timeline with empty deps
  const containerRef = useCinematicScene(({ mm, el }) => {
    mm.add('(min-width: 901px) and (pointer: fine)', () => {
      // Initialize planes: first plane is visible
      mediaPlanesRef.current.forEach((planeEl, idx) => {
        if (!planeEl) return;
        gsap.set(planeEl, { opacity: idx === 0 ? 1 : 0, zIndex: idx === 0 ? 2 : 1 });
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const targetIdx = Math.min(worlds.length - 1, Math.floor(p * worlds.length));
            selectWorld(targetIdx);
          },
        },
      });
    });

    mm.add('(max-width: 900px), (pointer: coarse)', () => {
      mediaPlanesRef.current.forEach((planeEl, idx) => {
        if (!planeEl) return;
        gsap.set(planeEl, { opacity: idx === 0 ? 1 : 0 });
      });
    });
  }, [selectWorld, worlds.length]);

  // Keyboard navigation for Career Worlds tablist
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (activeWorldIndex + 1) % worlds.length;
      selectWorld(nextIdx);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (activeWorldIndex - 1 + worlds.length) % worlds.length;
      selectWorld(prevIdx);
    }
  };

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
          {/* Dominant Full-Bleed Media Field with Stacked Persistent Planes */}
          <div className="pa-v6-career-canvas__backdrop" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {worlds.map((w, idx) => {
              const asset = MEDIA_ASSETS_V6[w.imageKey] || MEDIA_ASSETS_V6.a03;
              return (
                <div
                  key={w.id}
                  ref={(el) => (mediaPlanesRef.current[idx] = el)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: idx === activeWorldIndex ? 1 : 0,
                    zIndex: idx === activeWorldIndex ? 2 : 1,
                  }}
                >
                  <MediaPlane
                    asset={asset}
                    priority={idx === 0}
                    objectPosition={asset.focalPoint?.desktop || 'center center'}
                    alt={w.name}
                  />
                </div>
              );
            })}
          </div>

          {/* Top Edge Selector Controls */}
          <div
            className="pa-v6-career-canvas__controls"
            role="tablist"
            aria-label="Career Worlds"
            onKeyDown={handleKeyDown}
          >
            {worlds.map((w, idx) => (
              <button
                key={w.id}
                role="tab"
                id={`tab-world-${w.id}`}
                aria-selected={idx === activeWorldIndex}
                className={`pa-v6-career-tab ${idx === activeWorldIndex ? 'active' : ''}`}
                onClick={() => selectWorld(idx)}
              >
                <span>{w.index.split(' / ')[0]}</span> · {w.name.split(' & ')[0]}
              </button>
            ))}
          </div>

          {/* Edge-Anchored Translucent Reading Surface */}
          <div className="pa-v6-career-canvas__overlay-copy">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <span className="pa-v6-eyebrow">
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

