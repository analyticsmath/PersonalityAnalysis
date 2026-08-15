// frontend/src/components/public/imprint/EvidenceQuestionTransform.jsx
// Signature Product Demonstration — Context physically transforms into an adaptive question

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { demoEvidenceQuestion, illustrativeDisclaimer } from './imprintData';
import '../../../styles/imprint/evidence-question-imprint.css';

export default function EvidenceQuestionTransform() {
  const containerRef = useRef(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const { sourceText, highlightText, prompt, options } = demoEvidenceQuestion;
  const selectedOption = options.find((opt) => opt.id === selectedOptionId) || null;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'evidence-question-timeline',
            trigger: containerRef.current,
            start: 'top top',
            end: '+=280vh',
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
          },
        });

        tl.addLabel('eq-source')
          .to({}, { duration: 0.8 })
          .addLabel('eq-locate')
          .to('.eq-evidence-highlight', { backgroundColor: 'rgba(0,0,0,0.08)', duration: 0.8 })
          .addLabel('eq-resolve')
          .to('.eq-source-body', { opacity: 0.7, duration: 0.8 })
          .addLabel('eq-lift')
          .to('.eq-evidence-highlight', { y: -6, color: '#0B0B0B', duration: 0.8 })
          .addLabel('eq-translate')
          .to('.eq-question-stage', { opacity: 1, y: 0, duration: 1 })
          .addLabel('eq-question')
          .to({}, { duration: 0.8 })
          .addLabel('eq-responses')
          .to({}, { duration: 1.2 })
          .addLabel('eq-release');

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="evidence-question-transform"
      ref={containerRef}
      aria-label="Context to Question Transformation"
    >
      <div className="eq-container">
        {/* ── Section Header ── */}
        <header className="eq-header">
          <h2 className="eq-title">Context changes the question.</h2>
          <span className="eq-disclosure">{illustrativeDisclaimer}</span>
        </header>

        {/* ── Single Transformation Field ── */}
        <div className="eq-field">
          {/* Source Evidence Layer */}
          <div className="eq-source-stage">
            <span className="eq-source-meta">Verified Professional Context</span>
            <p className="eq-source-body">
              Led a multi-region service migration{' '}
              <mark className="eq-evidence-highlight">{highlightText}</mark>.
            </p>
          </div>

          {/* Question & Response Layer */}
          <div className="eq-question-stage">
            <h3 className="eq-prompt-title">{prompt}</h3>

            <div className="eq-responses-group" role="radiogroup" aria-label="Question choices">
              {options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`eq-response-row ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedOptionId(opt.id)}
                  >
                    <span className="eq-radio-marker">
                      <span className="eq-radio-inner" />
                    </span>
                    <span className="eq-response-text">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Qualitative Evidence Signal Output (Populated on User Selection Only) */}
          {selectedOption && (
            <div className="eq-signal-stage" role="status" aria-live="polite">
              <span className="eq-signal-label">Derived Qualitative Signal:</span>
              <span className="eq-signal-value">{selectedOption.signal}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
