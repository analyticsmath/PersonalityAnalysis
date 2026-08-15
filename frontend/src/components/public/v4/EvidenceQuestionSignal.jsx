import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePublicMotion } from '../PublicMotionRoot';

const contextDoc = {
  header: 'Verified Background Record #4109',
  body: 'Led cross-functional architecture reviews for multi-region infrastructure. Orchestrated multi-region service migration under strict SLA constraints. Coordinated incident response and reliability post-mortems across distributed engineering teams.',
  isolatedPhrase: 'Orchestrated multi-region service migration under strict SLA constraints',
  question: 'When migration complexity threatens delivery milestones, how do you rebalance architectural scope and risk?',
  options: [
    {
      id: 'opt-a',
      text: 'Decompose migration into isolated zero-downtime increments, accepting short-term velocity trade-offs to protect system integrity.',
      signal: {
        title: 'Signal: Systemic Reliability & Constraint Calibration',
        score: '+22 Reliability Weight',
        reading: 'Feeds Conscientiousness & Strategic Systems Signals',
      },
    },
    {
      id: 'opt-b',
      text: 'Parallelize service transitions with automated canary rollbacks and continuous stakeholder alignment.',
      signal: {
        title: 'Signal: Adaptive Execution & Risk Optimization',
        score: '+20 Agility Weight',
        reading: 'Feeds Openness & Investigative Interest',
      },
    },
    {
      id: 'opt-c',
      text: 'Enforce strict core availability criteria and defer non-critical microservice migrations to subsequent delivery phases.',
      signal: {
        title: 'Signal: Decisive Boundary Setting & Scope Control',
        score: '+18 Governance Weight',
        reading: 'Feeds Structured Conventional & Autonomy Values',
      },
    },
  ],
};

export default function EvidenceQuestionSignal() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
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
            end: '+=300vh',
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        });

        // c0-evidence -> c1-isolate: isolate key phrase
        tl.to('.eqs-doc-unfocused', { opacity: 0.25, duration: 1 });
        tl.to('.eqs-doc-highlight', {
          backgroundColor: '#ECEFF1',
          padding: '4px 8px',
          borderRadius: '4px',
          duration: 0.8,
        }, '<');

        // c2-anchor -> c3-question: question emerges from anchor
        tl.to('.eqs-question-container', {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        });

        // c4-responses: responses appear cleanly with NOTHING preselected
        tl.to('.eqs-responses-group', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        });

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
          <h2 id="eqs-title" className="eqs-v4-title">
            Context changes the question.
          </h2>
          <p className="eqs-v4-support">
            Evidence isolates from your real experience, shaping targeted adaptive questions without generic prompts.
          </p>
        </header>

        <div className="eqs-v4-stage" ref={stageRef}>
          {/* Step 1: Context Evidence Document */}
          <div className="eqs-stage-column eqs-stage-column--context">
            <span className="eqs-col-tag">01. Evidence Anchor</span>
            <div className="eqs-doc-box">
              <div className="eqs-doc-box__head">
                <span className="eqs-doc-box__label">{contextDoc.header}</span>
              </div>
              <div className="eqs-doc-box__content">
                <span className="eqs-doc-unfocused">
                  Led cross-functional architecture reviews for multi-region infrastructure.{' '}
                </span>
                <mark className="eqs-doc-highlight">
                  {contextDoc.isolatedPhrase}.
                </mark>
                <span className="eqs-doc-unfocused">
                  {' '}Coordinated incident response and reliability post-mortems across distributed engineering teams.
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 & 3: Adaptive Question & Interactive Response Options */}
          <div className="eqs-stage-column eqs-stage-column--interaction">
            <span className="eqs-col-tag">02. Adaptive Question &amp; User Decision</span>
            <div className="eqs-question-container">
              <div className="eqs-question-label">Generated from isolated context:</div>
              <h3 className="eqs-question-text">{contextDoc.question}</h3>

              <div className="eqs-responses-group" role="radiogroup" aria-label="Interactive demo question">
                {contextDoc.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`eqs-option-row ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelect(opt.id)}
                    >
                      <div className="eqs-option-marker">
                        {isSelected && <span className="eqs-option-marker-dot" />}
                      </div>
                      <span className="eqs-option-text">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Calibrated Signal Output (Derives exclusively from user selection or shows neutral state) */}
            <div className="eqs-signal-output">
              <span className="eqs-col-tag">03. Measured Signal</span>
              {activeOption ? (
                <div className="eqs-signal-card is-active">
                  <div className="eqs-signal-card__head">
                    <span className="eqs-signal-card__title">{activeOption.signal.title}</span>
                    <span className="eqs-signal-card__score">{activeOption.signal.score}</span>
                  </div>
                  <p className="eqs-signal-card__reading">{activeOption.signal.reading}</p>
                </div>
              ) : (
                <div className="eqs-signal-card is-neutral">
                  <span className="eqs-signal-card__hint">
                    Select a decision above to view how structured responses directly map to dimensional signals without AI fabrication.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
