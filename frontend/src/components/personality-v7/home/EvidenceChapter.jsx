import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import useCinematicScene from '../motion/useCinematicScene';

gsap.registerPlugin(ScrollTrigger);

export const EvidenceChapter = () => {
  const containerRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const evidence = PUBLIC_CONTENT.home.evidenceSignal;

  useCinematicScene(({ isDesktop }) => {
    if (!isDesktop || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.pa-v7-evidence-hairline-annotation'),
      { opacity: 0.6, y: 8 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="pa-v7-chapter-evidence" aria-label="Chapter 02 — Evidence Is the Material">
      <div className="pa-v7-evidence__stage-wrap">
        {/* Dominant Visual Field: A02 Contextual Evidence Plane (>= 70% Unobstructed) */}
        <div className="pa-v7-evidence__central-plane">
          <MediaPlane
            asset={MEDIA_ASSETS_V7.a02}
            priority={false}
            objectPosition="50% 42%"
            alt="Contextual work evidence plane"
          />

          {/* 4 Perimeter Edge Hairline Annotations (No filled backgrounds, no all-caps) */}
          <div className="pa-v7-evidence-hairline-annotation pa-v7-evidence-hairline-annotation--top-left">
            <span className="pa-v7-evidence-hairline-annotation__label">Context</span>
            <span className="pa-v7-evidence-hairline-annotation__text">{evidence.demoEvidence.context}</span>
          </div>

          <div className="pa-v7-evidence-hairline-annotation pa-v7-evidence-hairline-annotation--top-right">
            <span className="pa-v7-evidence-hairline-annotation__label">Observed pattern</span>
            <span className="pa-v7-evidence-hairline-annotation__text">{evidence.demoEvidence.observedPattern}</span>
          </div>

          <div className="pa-v7-evidence-hairline-annotation pa-v7-evidence-hairline-annotation--mid-right">
            <span className="pa-v7-evidence-hairline-annotation__label">Role anchor</span>
            <span className="pa-v7-evidence-hairline-annotation__text">{evidence.demoEvidence.role}</span>
          </div>

          <div className="pa-v7-evidence-hairline-annotation pa-v7-evidence-hairline-annotation--bottom-right">
            <span className="pa-v7-evidence-hairline-annotation__label">Trade-off</span>
            <span className="pa-v7-evidence-hairline-annotation__text">{evidence.demoEvidence.tradeoff}</span>
          </div>
        </div>

        {/* Calm Paper Strip Anchored Below Image */}
        <div className="pa-v7-evidence__paper-strip">
          <p className="pa-v7-evidence__paper-prompt">
            {evidence.demoQuestion}
          </p>

          <div className="pa-v7-evidence__paper-options" role="radiogroup" aria-label="Sample assessment question">
            {evidence.demoOptions.map((opt) => (
              <label
                key={opt.id}
                className={`pa-v7-evidence__paper-option ${selectedOption === opt.id ? 'is-selected' : ''}`}
              >
                <input
                  type="radio"
                  name="evidence-demo-opt"
                  checked={selectedOption === opt.id}
                  onChange={() => setSelectedOption(opt.id)}
                  value={opt.id}
                />
                <span className="pa-v7-evidence__paper-option-text">{opt.label}</span>
              </label>
            ))}
          </div>

          {selectedOption && (
            <div className="pa-v7-evidence__paper-marker" aria-live="polite">
              <span className="pa-v7-evidence__marker-dot" />
              <span>Signal: {evidence.demoOptions.find(o => o.id === selectedOption)?.weightSignal}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EvidenceChapter;
