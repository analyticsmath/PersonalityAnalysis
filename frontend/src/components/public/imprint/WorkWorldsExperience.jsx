// frontend/src/components/public/imprint/WorkWorldsExperience.jsx
// Work Worlds Experience — Persistent Stage with 6 Professional Evidence Behaviors

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imprintMedia } from '../../../content/personalityImprintMedia';
import EvidenceTrace from './EvidenceTrace';
import { animateSvgContour, createImprintScope } from './imprintAnime';
import '../../../styles/imprint/work-worlds-imprint.css';

export default function WorkWorldsExperience() {
  const containerRef = useRef(null);
  const traceRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const worlds = imprintMedia.worlds;
  const activeWorld = worlds[activeIdx] || worlds[0];

  // Anime.js local SVG contour animation when active world changes
  useLayoutEffect(() => {
    const scope = createImprintScope(containerRef.current);
    const traceEl = containerRef.current?.querySelector('.trace-path');
    if (traceEl) {
      animateSvgContour(traceEl, { duration: 700 });
    }
    return () => {
      if (scope) scope.revert();
    };
  }, [activeIdx]);

  // GSAP Macro Scroll Timeline with Named Semantic Labels
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'work-worlds-timeline',
            trigger: containerRef.current,
            start: 'top top',
            end: '+=300vh',
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(worlds.length - 1, Math.floor(self.progress * worlds.length));
              setActiveIdx(idx);
            },
          },
        });

        // Add exact required semantic labels
        tl.addLabel('build-enter')
          .to({}, { duration: 0.85 })
          .addLabel('build-settled')
          .to({}, { duration: 1.1 })
          .addLabel('investigate-enter')
          .to({}, { duration: 0.85 })
          .addLabel('investigate-settled')
          .to({}, { duration: 1.1 })
          .addLabel('make-enter')
          .to({}, { duration: 0.85 })
          .addLabel('make-settled')
          .to({}, { duration: 1.1 })
          .addLabel('shape-enter')
          .to({}, { duration: 0.85 })
          .addLabel('shape-settled')
          .to({}, { duration: 1.1 })
          .addLabel('structure-enter')
          .to({}, { duration: 0.85 })
          .addLabel('structure-settled')
          .to({}, { duration: 1.1 })
          .addLabel('collaborate-enter')
          .to({}, { duration: 0.85 })
          .addLabel('collaborate-settled')
          .to({}, { duration: 1.1 })
          .addLabel('worlds-release');

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [worlds.length]);

  return (
    <section
      id="work-worlds"
      className="work-worlds-experience"
      ref={containerRef}
      aria-label="Work Worlds Experience"
    >
      <div className="work-worlds-container">
        {/* ── Section Heading ── */}
        <header className="worlds-header">
          <h2 className="worlds-title">Work changes the evidence.</h2>
          <p className="worlds-support">
            Different environments reveal different ways of solving, making, structuring and collaborating.
          </p>
        </header>

        {/* ── Persistent Stage ── */}
        <div className="worlds-stage">
          {/* World Index (Open Text Navigation) */}
          <nav className="worlds-nav" aria-label="Professional environments">
            {worlds.map((world, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={world.id}
                  type="button"
                  className={`world-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="world-nav-marker" aria-hidden="true" />
                  <span className="world-nav-name">{world.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Active Canvas & Anime SVG Trace Overlay */}
          <div className="worlds-canvas">
            <div className="worlds-media-frame">
              <picture>
                <source srcSet={`${activeWorld.basePath}-1440.avif 1440w, ${activeWorld.basePath}-960.avif 960w, ${activeWorld.basePath}-640.avif 640w`} type="image/avif" />
                <source srcSet={`${activeWorld.basePath}-1440.webp 1440w, ${activeWorld.basePath}-960.webp 960w, ${activeWorld.basePath}-640.webp 640w`} type="image/webp" />
                <img
                  src={`${activeWorld.basePath}-960.jpg`}
                  alt={activeWorld.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="worlds-trace-overlay" ref={traceRef}>
                <EvidenceTrace
                  type={activeWorld.id}
                  strokeColor={activeWorld.traceColor || '#0B0B0B'}
                />
              </div>
            </div>

            {/* Active World Statement */}
            <div className="world-statement-row">
              <p className="world-active-statement">{activeWorld.statement}</p>
              <span className="world-behavior-verb">{activeWorld.behaviorVerb}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
