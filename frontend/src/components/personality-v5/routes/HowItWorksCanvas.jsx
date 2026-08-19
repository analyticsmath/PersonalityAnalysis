import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import SegmentedImageTransition from '../motion/SegmentedImageTransition';
import useCinematicScene from '../motion/useCinematicScene';

const STAGE_ASSETS = [
  MEDIA_ASSETS.a02, // 01 Context
  MEDIA_ASSETS.a03, // 02 Adaptive question
  MEDIA_ASSETS.a07, // 03 Independent readings
  MEDIA_ASSETS.a08, // 04 Interpretation & Trust
];

/**
 * HowItWorksCanvas — V5 Continuous 4-Stage Photographic Transformation
 *
 * Each stage activates a distinct image transformation:
 * - Stage 01: A02 (Context)
 * - Stage 02: A03 (Adaptive Questioning)
 * - Stage 03: A07 (Independent Readings)
 * - Stage 04: A08 (Longitudinal Trust & Interpretation)
 */
export const HowItWorksCanvas = () => {
  const { howItWorks } = PUBLIC_CONTENT;
  const stages = howItWorks.stages;

  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [incomingStageIdx, setIncomingStageIdx] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('forward');
  const [openFaq, setOpenFaq] = useState(null);

  const stageTextRef = useRef(null);

  const containerRef = useCinematicScene((self, mm, el) => {
    mm.add('(min-width: 1025px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const step = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
            if (step !== activeStageIdx && !isTransitioning) {
              setDirection(step > activeStageIdx ? 'forward' : 'backward');
              setIncomingStageIdx(step);
              setIsTransitioning(true);
            }
          },
        },
      });

      tl.to('.pa-hiw-stage-plane', { scale: 1.03, duration: 1, ease: 'none' }, 0);
    });
  }, [activeStageIdx, isTransitioning, stages.length]);

  const currentStage = stages[activeStageIdx] || stages[0];

  return (
    <>
      <section className="pa-route-hero">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{howItWorks.title}</h1>
            <p>{howItWorks.lead}</p>
          </div>
        </div>
      </section>

      {/* 4-Stage Continuous Sticky Canvas */}
      <section ref={containerRef} className="pa-hiw-v5-sticky-wrapper" style={{ height: '440svh', position: 'relative' }}>
        <div className="pa-sticky-viewport" style={{ backgroundColor: 'var(--pa-black)', color: 'var(--pa-white)' }}>
          <div className="pa-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
            {/* Photographic Actor Plane */}
            <div className="pa-hiw-stage-plane" style={{ height: '64svh', overflow: 'hidden' }}>
              <SegmentedImageTransition
                currentAsset={STAGE_ASSETS[activeStageIdx]}
                incomingAsset={incomingStageIdx !== null ? STAGE_ASSETS[incomingStageIdx] : null}
                isTransitioning={isTransitioning}
                direction={direction}
                onTransitionComplete={() => {
                  if (incomingStageIdx !== null) {
                    setActiveStageIdx(incomingStageIdx);
                    setIncomingStageIdx(null);
                  }
                  setIsTransitioning(false);
                }}
                sizes="(max-width: 1024px) 100vw, 55vw"
                objectPosition="50% 40%"
              />
            </div>

            {/* Narrative Content */}
            <div ref={stageTextRef}>
              <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-fog)', marginBottom: '12px' }}>
                Stage 0{activeStageIdx + 1} of 0{stages.length}
              </div>
              <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: 'clamp(32px, 3.8vw, 52px)', color: 'var(--pa-white)', marginBottom: '16px', lineHeight: '1.1' }}>
                {currentStage.title}
              </h2>
              <p style={{ fontSize: '18px', color: 'var(--pa-fog)', lineHeight: '1.6', marginBottom: '24px' }}>
                {currentStage.body || currentStage.summary}
              </p>
              <div style={{ borderLeft: '2px solid var(--pa-white)', paddingLeft: '16px', color: 'var(--pa-white)', fontSize: '15px', fontStyle: 'italic' }}>
                {currentStage.subtitle || currentStage.detail}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section on Paper */}
      <section className="pa-faq-section" style={{ backgroundColor: 'var(--pa-paper)', padding: '10svh 0' }}>
        <div className="pa-container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '38px', marginBottom: '32px' }}>
            Frequently Inquired Methodologies
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(howItWorks.faq || howItWorks.faqs || []).map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} style={{ borderBottom: '1px solid var(--pa-line-light)', paddingBottom: '16px' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--pa-font-sans)',
                      fontSize: '18px',
                      fontWeight: 500,
                      color: 'var(--pa-ink)',
                      cursor: 'pointer',
                      padding: '12px 0',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '20px' }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <p style={{ color: 'var(--pa-cool-600)', lineHeight: '1.6', paddingTop: '8px' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksCanvas;
