import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import PlaneHandoff from '../motion/PlaneHandoff';
import useCinematicScene from '../motion/useCinematicScene';

const STAGE_ASSETS = [
  MEDIA_ASSETS_V6.a02, // Stage 1: Context
  MEDIA_ASSETS_V6.a03, // Stage 2: Adaptive Inquiry
  MEDIA_ASSETS_V6.a07, // Stage 3: Independent Readings
  MEDIA_ASSETS_V6.a08, // Stage 4: Interpretation
];

export const HowItWorksCanvas = () => {
  const { howItWorks } = PUBLIC_CONTENT;
  const stages = howItWorks.stages;

  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [handoffProgress, setHandoffProgress] = useState(0);

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
            const stage = Math.min(3, Math.floor(p * 4));
            setActiveStageIdx(stage);
            const subProgress = (p * 4) % 1;
            setHandoffProgress(subProgress);
          },
        },
      });
    });
  }, []);

  const currentStage = stages[activeStageIdx] || stages[0];
  const currentAsset = STAGE_ASSETS[activeStageIdx] || STAGE_ASSETS[0];
  const nextAsset = STAGE_ASSETS[Math.min(3, activeStageIdx + 1)];

  return (
    <div className="pa-v6-how-it-works-page">
      {/* Intro Header */}
      <section style={{ padding: '7rem 4rem 3rem 4rem', background: 'var(--pa-paper)', color: 'var(--pa-obsidian)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pa-muted)', fontWeight: 600 }}>
            Operational Process
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'var(--pa-obsidian)', margin: '0.5rem 0 1rem 0' }}>
            {howItWorks.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--pa-charcoal)', lineHeight: 1.5, maxWidth: '640px' }}>
            {howItWorks.lead}
          </p>
        </div>
      </section>

      {/* 340svh 4-Stage Persistent Media Stage */}
      <section
        ref={containerRef}
        style={{ position: 'relative', width: '100%', height: '340svh', backgroundColor: 'var(--pa-obsidian)' }}
        data-cinematic-stage="how-it-works"
        aria-label="Operational Stages"
      >
        <div style={{ position: 'sticky', top: 0, left: 0, width: '100vw', height: '100svh', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.1fr 1fr', padding: '4.5rem 4rem 2rem 4rem', gap: '4rem', alignItems: 'center' }}>
          {/* Left Stage: Overlap-Safe Persistent Base Plane (A02 -> A03 -> A07 -> A08) */}
          <div style={{ position: 'relative', width: '100%', height: '78svh', borderRadius: '2px', overflow: 'hidden' }}>
            <PlaneHandoff
              assetA={currentAsset}
              assetB={nextAsset}
              progress={handoffProgress}
              objectPositionA="center center"
              objectPositionB="center center"
            />
          </div>

          {/* Right Stage: Contextual Copy with Stage Index and Functional Trace */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--pa-bone)', maxWidth: '520px' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {stages.map((st, i) => (
                <button
                  key={st.step}
                  onClick={() => setActiveStageIdx(i)}
                  style={{
                    background: i === activeStageIdx ? 'var(--pa-bone)' : 'transparent',
                    color: i === activeStageIdx ? 'var(--pa-obsidian)' : 'var(--pa-stone)',
                    border: '1px solid var(--pa-rule-light)',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  {st.step}
                </button>
              ))}
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pa-stone)', fontWeight: 600 }}>
                {currentStage.evidenceTag}
              </span>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--pa-bone)', margin: '0.25rem 0 0.5rem 0' }}>
                {currentStage.title}
              </h2>
              <h3 style={{ fontSize: '1.125rem', color: 'var(--pa-stone)', fontWeight: 400, margin: '0 0 1.25rem 0' }}>
                {currentStage.subtitle}
              </h3>
              <p style={{ fontSize: '1.0625rem', color: 'var(--pa-stone)', lineHeight: 1.6 }}>
                {currentStage.body}
              </p>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <Link to={getSignupAcquisitionUrl('/assessment/start')} className="pa-v6-btn pa-v6-btn--primary">
                Build my profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '6rem 4rem', background: 'var(--pa-charcoal)', color: 'var(--pa-bone)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '2.5rem' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
            {howItWorks.faq.map((item, idx) => (
              <div key={idx} style={{ borderTop: '1px solid var(--pa-rule-light)', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', color: 'var(--pa-bone)', marginBottom: '0.75rem' }}>{item.q}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--pa-stone)', lineHeight: 1.55 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksCanvas;
