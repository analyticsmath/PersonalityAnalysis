import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import useCinematicScene from '../motion/useCinematicScene';

gsap.registerPlugin(ScrollTrigger);

export const CareerEnvironmentsChapter = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const [activeWorldIndex, setActiveWorldIndex] = useState(0);

  const worlds = PUBLIC_CONTENT.home.careerWorlds.worlds;
  const activeWorld = worlds[activeWorldIndex] || worlds[0];

  const worldAssets = [
    MEDIA_ASSETS_V7.a03, // Systems
    MEDIA_ASSETS_V7.a04, // Product
    MEDIA_ASSETS_V7.a05, // Coaching
    MEDIA_ASSETS_V7.a06, // Direction
    MEDIA_ASSETS_V7.a02, // Operations
  ];

  useCinematicScene(({ isDesktop }) => {
    if (!isDesktop || !containerRef.current || !stickyRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      pinSpacing: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const count = worlds.length;
        const nextIdx = Math.min(Math.floor(progress * count), count - 1);
        setActiveWorldIndex(nextIdx);
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-v7-chapter-careers"
      aria-label="Chapter 04 — Career Environments"
    >
      <div ref={stickyRef} className="pa-v7-chapter-careers__sticky">
        <div className="pa-v7-careers__atlas-stage">
          {/* Left Edge: 01 / 05 Counter & Environment Title */}
          <div className="pa-v7-careers__left-edge">
            <div className="pa-v7-careers__counter">
              {activeWorld.index}
            </div>
            <h2 className="pa-v7-careers__world-name">
              {activeWorld.name}
            </h2>
            <div className="pa-v7-careers__theme-tag">
              {activeWorld.theme}
            </div>
          </div>

          {/* Central Media Field: 72vw max, 66svh with Lateral Plane Pass */}
          <div className="pa-v7-careers__central-media-field">
            {worlds.map((w, idx) => (
              <div
                key={w.id}
                className="pa-v7-careers__world-layer"
                style={{
                  opacity: activeWorldIndex === idx ? 1 : 0,
                  transform: activeWorldIndex === idx ? 'translateX(0) scale(1)' : 'translateX(7%) scale(0.98)',
                  transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: activeWorldIndex === idx ? 2 : 1,
                }}
              >
                <MediaPlane
                  asset={worldAssets[idx]}
                  priority={idx === 0}
                  alt={`Career environment: ${w.name}`}
                />
              </div>
            ))}
          </div>

          {/* Right Edge: 3 Concise Evidence Lines */}
          <div className="pa-v7-careers__right-edge">
            <div className="pa-v7-careers__evidence-line">
              <span className="pa-v7-careers__evidence-label">Fitting Condition</span>
              <p className="pa-v7-careers__evidence-text">{activeWorld.whyItFits}</p>
            </div>

            <div className="pa-v7-careers__evidence-line">
              <span className="pa-v7-careers__evidence-label">Stretch Tension</span>
              <p className="pa-v7-careers__evidence-text">{activeWorld.whereItStretches}</p>
            </div>

            <div className="pa-v7-careers__evidence-line">
              <span className="pa-v7-careers__evidence-label">Development Priority</span>
              <p className="pa-v7-careers__evidence-text">{activeWorld.whatToStrengthen}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerEnvironmentsChapter;
