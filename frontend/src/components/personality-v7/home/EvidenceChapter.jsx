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
      containerRef.current.querySelectorAll('.pa-v7-evidence-annotation'),
      { opacity: 0.7, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="pa-v7-chapter-evidence" aria-label="Chapter 02 — Evidence Is the Material">
      <div className="pa-v7-evidence__stage-wrap">
        {/* Columns 2–11: Large Contextual Evidence Plane (A02) */}
        <div className="pa-v7-evidence__central-plane">
          <MediaPlane
            asset={MEDIA_ASSETS_V7.a02}
            priority={false}
            objectPosition="50% 42%"
            alt="Contextual work evidence plane"
          />

          {/* 4 Perimeter Edge Annotations */}
          <div className="pa-v7-evidence-annotation pa-v7-evidence-annotation--top-left">
            <span className="pa-v7-evidence-annotation__title">Context</span>
            <span>{evidence.demoEvidence.context}</span>
          </div>

          <div className="pa-v7-evidence-annotation pa-v7-evidence-annotation--top-right">
            <span className="pa-v7-evidence-annotation__title">Observed Pattern</span>
            <span>{evidence.demoEvidence.observedPattern}</span>
          </div>

          <div className="pa-v7-evidence-annotation pa-v7-evidence-annotation--role-anchor">
            <span className="pa-v7-evidence-annotation__title">Role Anchor</span>
            <span>{evidence.demoEvidence.role}</span>
          </div>

          <div className="pa-v7-evidence-annotation pa-v7-evidence-annotation--bottom-right">
            <span className="pa-v7-evidence-annotation__title">Trade-off</span>
            <span>{evidence.demoEvidence.tradeoff}</span>
          </div>
        </div>

        {/* Lower-Left Editorial Margin Question Module */}
        <div className="pa-v7-evidence__question-module">
          <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
            Calibrated Inquiry
          </span>
          <h3 className="pa-v7-evidence__prompt">
            {evidence.demoQuestion}
          </h3>

          <div className="pa-v7-evidence__options" role="radiogroup" aria-label="Sample assessment question">
            {evidence.demoOptions.map((opt) => (
              <label
                key={opt.id}
                className="pa-v7-evidence__option"
                style={{
                  backgroundColor: selectedOption === opt.id ? 'rgba(251, 250, 244, 0.08)' : 'transparent',
                }}
              >
                <input
                  type="radio"
                  name="evidence-demo-opt"
                  checked={selectedOption === opt.id}
                  onChange={() => setSelectedOption(opt.id)}
                  value={opt.id}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          {selectedOption && (
            <div className="pa-v7-evidence__live-marker" aria-live="polite">
              <span className="pa-v7-evidence__marker-dot" />
              <span>Calibrated Weight: {evidence.demoOptions.find(o => o.id === selectedOption)?.weightSignal}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EvidenceChapter;
