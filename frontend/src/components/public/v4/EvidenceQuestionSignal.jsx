import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePublicMotion } from '../PublicMotionRoot';

const contextDoc = {
  header: 'Professional Context Document',
  body: 'Led cross-functional architecture reviews for multi-region infrastructure. Orchestrated multi-region service migration under strict availability constraints. Coordinated incident response and reliability post-mortems across distributed engineering teams.',
  isolatedPhrase: 'Orchestrated multi-region service migration under strict availability constraints',
  question: 'When delivery pressure rises, what do you protect first?',
  options: [
    {
      id: 'opt-a',
      text: 'Protect core availability and defer non-critical services to subsequent delivery phases.',
      signal: 'Protects reliability before speed',
      dimensionHint: 'Reflects reliability over velocity',
    },
    {
      id: 'opt-b',
      text: 'Parallelize delivery streams with automated canary rollbacks and continuous stakeholder alignment.',
      signal: 'Balances execution with rollback safety',
      dimensionHint: 'Reflects calculated risk mitigation',
    },
    {
      id: 'opt-c',
      text: 'Reduce feature scope to guarantee baseline system integrity and maintain uptime.',
      signal: 'Narrows scope to preserve core availability',
      dimensionHint: 'Reflects strict boundary governance',
    },
  ],
};

export default function EvidenceQuestionSignal() {
  const containerRef = useRef(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const { reducedMotion } = usePublicMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'evidence-question-signal-stage',
            trigger: containerRef.current,
            start: 'top top',
            end: '+=320vh',
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // c0-evidence: document is initial protagonist
        tl.addLabel('c0-evidence');
        tl.to({}, { duration: 0.5 });

        // c1-isolate: non-essential text recedes, key phrase highlights
        tl.addLabel('c1-isolate');
        tl.to('.eqs-body-recede', { opacity: 0.2, duration: 0.8 }, 'c1-isolate');
        tl.to('.eqs-phrase-highlight', {
          backgroundColor: '#ECEFF1',
          padding: '4px 8px',
          borderRadius: '4px',
          duration: 0.8,
        }, 'c1-isolate');

        // c2-anchor: phrase translates as anchor
        tl.addLabel('c2-anchor');
        tl.to('.eqs-doc-plane', { y: -20, opacity: 0.85, duration: 0.7 }, 'c2-anchor');

        // c3-question: question emerges in opened space with dwell
        tl.addLabel('c3-question');
        tl.to('.eqs-question-field', {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
        }, 'c3-question');
        tl.to({}, { duration: 0.8 }); // Dwell on question

        // c4-responses: responses appear cleanly without preselection with dwell
        tl.addLabel('c4-responses');
        tl.to('.eqs-responses-group', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }, 'c4-responses');
        tl.to({}, { duration: 1.0 }); // Dwell on interactive choices

        tl.addLabel('c5-release');

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSelect = (id) => {
    setSelectedOptionId((prev) => (prev === id ? null : id));
  };

  const activeOption = contextDoc.options.find((o) => o.id === selectedOptionId);

  return (
    <section
      id="scene-evidence-question"
      className="evidence-question-signal-v4"
      ref={containerRef}
      data-header-scene="light"
      aria-labelledby="eqs-title"
    >
      <div className="eqs-v4-inner">
        <header className="eqs-v4-header">
          <div className="eqs-v4-title-wrap">
            <h2 id="eqs-title" className="eqs-v4-title">
              Context changes the question.
            </h2>
            <p className="eqs-v4-support">
              Evidence isolates from your real experience, shaping targeted adaptive questions without generic prompts.
            </p>
          </div>
          <span className="eqs-v4-demo-label">Illustrative interaction</span>
        </header>

        {/* Single Persistent Transformation Field (No two-column boxed cards) */}
        <div className="eqs-v4-stage">
          {/* Spatial Document Plane */}
          <div className="eqs-doc-plane">
            <div className="eqs-doc-plane__header">
              <span className="eqs-doc-plane__type">{contextDoc.header}</span>
            </div>
            <div className="eqs-doc-plane__content">
              <span className="eqs-body-recede">Led cross-functional architecture reviews for multi-region infrastructure. </span>
              <strong className="eqs-phrase-highlight">{contextDoc.isolatedPhrase}</strong>
              <span className="eqs-body-recede">. Coordinated incident response and reliability post-mortems across distributed engineering teams.</span>
            </div>
          </div>

          {/* Interactive Question & Qualitative Signal Field */}
          <div className="eqs-interaction-field">
            <div className="eqs-question-field">
              <span className="eqs-field-eyebrow">Adaptive Prompt</span>
              <h3 className="eqs-question-text">{contextDoc.question}</h3>
            </div>

            {/* Response Options (Zero Preselection by Default) */}
            <div className="eqs-responses-group" role="radiogroup" aria-label="Decision options">
              {contextDoc.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`eqs-option-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelect(opt.id)}
                  >
                    <div className="eqs-option-marker" aria-hidden="true">
                      {isSelected && <span className="eqs-option-marker-dot" />}
                    </div>
                    <span className="eqs-option-text">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Qualitative Signal Output: Appears ONLY after user decision */}
            {activeOption ? (
              <div className="eqs-qualitative-signal" role="status" aria-live="polite">
                <span className="eqs-signal-label">Observed Signal</span>
                <strong className="eqs-signal-text">{activeOption.signal}</strong>
                <span className="eqs-signal-hint">{activeOption.dimensionHint}</span>
              </div>
            ) : (
              <div className="eqs-signal-placeholder" aria-hidden="true">
                <span>Select an illustrative decision to inspect the measured signal output.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
