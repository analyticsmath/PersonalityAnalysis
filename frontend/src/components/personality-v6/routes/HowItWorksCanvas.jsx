import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import MediaPlane from '../motion/MediaPlane';
import useCinematicScene from '../motion/useCinematicScene';

const STAGE_ASSETS = [
  MEDIA_ASSETS_V6.a02, // Stage 1: Context
  MEDIA_ASSETS_V6.a03, // Stage 2: Adaptive Inquiry
  MEDIA_ASSETS_V6.a07, // Stage 3: Independent Readings
  MEDIA_ASSETS_V6.a08, // Stage 4: Interpretation & Trust
];

export const HowItWorksCanvas = () => {
  const { howItWorks } = PUBLIC_CONTENT;
  const stages = howItWorks.stages;

  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const mediaPlanesRef = useRef([]);
  const textBlocksRef = useRef([]);

  const selectStage = useCallback((index) => {
    if (index < 0 || index >= stages.length) return;
    setActiveStageIdx(index);

    // Cross-fade image planes & copy blocks
    mediaPlanesRef.current.forEach((planeEl, idx) => {
      if (!planeEl) return;
      if (idx <= index) {
        gsap.to(planeEl, { opacity: 1, duration: 0.4, overwrite: 'auto' });
      } else {
        gsap.to(planeEl, { opacity: 0, duration: 0.4, overwrite: 'auto' });
      }
    });

    textBlocksRef.current.forEach((textEl, idx) => {
      if (!textEl) return;
      if (idx === index) {
        gsap.to(textEl, { opacity: 1, y: 0, duration: 0.35, overwrite: 'auto', pointerEvents: 'auto' });
      } else {
        gsap.to(textEl, { opacity: 0, y: 10, duration: 0.35, overwrite: 'auto', pointerEvents: 'none' });
      }
    });
  }, [stages.length]);

  const containerRef = useCinematicScene(({ mm, el }) => {
    mm.add('(min-width: 901px) and (pointer: fine)', () => {
      // Initialize planes: Plane 0 is visible from start
      mediaPlanesRef.current.forEach((planeEl, idx) => {
        if (!planeEl) return;
        gsap.set(planeEl, { opacity: idx === 0 ? 1 : 0, zIndex: idx + 1 });
      });

      textBlocksRef.current.forEach((textEl, idx) => {
        if (!textEl) return;
        gsap.set(textEl, {
          opacity: idx === 0 ? 1 : 0,
          y: idx === 0 ? 0 : 10,
          zIndex: idx + 1,
          pointerEvents: idx === 0 ? 'auto' : 'none',
        });
      });

      const tl = gsap.timeline({
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
            const stage = Math.min(3, Math.floor(p * 4));
            setActiveStageIdx(stage);
          },
        },
      });

      // Stage 1 -> 2 transition (A03 fades in over A02)
      tl.to(
        mediaPlanesRef.current[1],
        { opacity: 1, ease: 'power1.inOut' },
        0.25
      );
      tl.to(
        textBlocksRef.current[0],
        { opacity: 0, y: -10, pointerEvents: 'none', ease: 'power1.out' },
        0.24
      );
      tl.to(
        textBlocksRef.current[1],
        { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'power1.out' },
        0.28
      );

      // Stage 2 -> 3 transition (A07 fades in over A03)
      tl.to(
        mediaPlanesRef.current[2],
        { opacity: 1, ease: 'power1.inOut' },
        0.50
      );
      tl.to(
        textBlocksRef.current[1],
        { opacity: 0, y: -10, pointerEvents: 'none', ease: 'power1.out' },
        0.49
      );
      tl.to(
        textBlocksRef.current[2],
        { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'power1.out' },
        0.53
      );

      // Stage 3 -> 4 transition (A08 fades in over A07)
      tl.to(
        mediaPlanesRef.current[3],
        { opacity: 1, ease: 'power1.inOut' },
        0.75
      );
      tl.to(
        textBlocksRef.current[2],
        { opacity: 0, y: -10, pointerEvents: 'none', ease: 'power1.out' },
        0.74
      );
      tl.to(
        textBlocksRef.current[3],
        { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'power1.out' },
        0.78
      );
    });

    mm.add('(max-width: 900px), (pointer: coarse)', () => {
      mediaPlanesRef.current.forEach((planeEl) => {
        if (planeEl) gsap.set(planeEl, { opacity: 1 });
      });
      textBlocksRef.current.forEach((textEl) => {
        if (textEl) gsap.set(textEl, { opacity: 1, y: 0, pointerEvents: 'auto' });
      });
    });
  }, []);

  return (
    <div className="pa-v6-how-it-works-page">
      {/* Intro Header */}
      <section
        style={{ padding: '8rem 4rem 4rem 4rem', background: 'var(--pa-paper)', color: 'var(--pa-obsidian)' }}
        data-header-theme="light"
      >
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <span className="pa-v6-eyebrow" style={{ color: 'var(--pa-muted)' }}>
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

      {/* 340svh 4-Stage Continuous Media Stage (Desktop Pinning / Mobile Sequential) */}
      <section
        ref={containerRef}
        className="pa-v6-hiw-stage-section"
        style={{ position: 'relative', width: '100%', minHeight: '340svh', backgroundColor: 'var(--pa-obsidian)' }}
        data-header-theme="dark"
        data-cinematic-stage="how-it-works"
        aria-label="Operational Stages"
      >
        <div className="pa-v6-hiw-sticky">
          {/* Left Stage: 4 Stacked Persistent Base Planes (A02 -> A03 -> A07 -> A08) */}
          <div className="pa-v6-hiw-media-bay" style={{ position: 'relative', width: '100%', height: '78svh', borderRadius: '2px', overflow: 'hidden' }}>
            {STAGE_ASSETS.map((asset, idx) => (
              <div
                key={asset.id}
                ref={(el) => (mediaPlanesRef.current[idx] = el)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: idx + 1,
                  opacity: idx === 0 ? 1 : 0,
                }}
              >
                <MediaPlane
                  asset={asset}
                  priority={idx === 0}
                  objectPosition={asset.focalPoint?.desktop || 'center center'}
                  alt={stages[idx]?.title || ''}
                />
              </div>
            ))}
          </div>

          {/* Right Stage: 4 Stacked Copy Blocks in Sync with Active Stage */}
          <div className="pa-v6-hiw-content-bay" style={{ position: 'relative', height: '78svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Stage Selector Pills */}
            <div
              role="tablist"
              aria-label="Operational Stages"
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem', zIndex: 10 }}
            >
              {stages.map((st, i) => (
                <button
                  key={st.step}
                  role="tab"
                  aria-selected={i === activeStageIdx}
                  onClick={() => selectStage(i)}
                  style={{
                    background: i === activeStageIdx ? 'var(--pa-bone)' : 'transparent',
                    color: i === activeStageIdx ? 'var(--pa-obsidian)' : 'var(--pa-stone)',
                    border: '1px solid var(--pa-rule-light)',
                    padding: '0.4rem 0.9rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {st.step}
                </button>
              ))}
            </div>

            {/* Stacked Copy Containers */}
            <div style={{ position: 'relative', minHeight: '320px' }}>
              {stages.map((st, idx) => (
                <div
                  key={st.step}
                  ref={(el) => (textBlocksRef.current[idx] = el)}
                  role="tabpanel"
                  aria-label={st.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    opacity: idx === 0 ? 1 : 0,
                    zIndex: idx + 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    color: 'var(--pa-bone)',
                  }}
                >
                  <span className="pa-v6-eyebrow">
                    {st.evidenceTag}
                  </span>
                  <h2 style={{ fontSize: '2.5rem', color: 'var(--pa-bone)', margin: '0.25rem 0 0.25rem 0', lineHeight: 1.1 }}>
                    {st.title}
                  </h2>
                  <h3 style={{ fontSize: '1.125rem', color: 'var(--pa-stone)', fontWeight: 400, margin: '0 0 0.5rem 0' }}>
                    {st.subtitle}
                  </h3>
                  <p style={{ fontSize: '1.0625rem', color: 'var(--pa-stone)', lineHeight: 1.6, maxWidth: '480px' }}>
                    {st.body}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', zIndex: 10 }}>
              <Link to={getSignupAcquisitionUrl('/assessment/start')} className="pa-v6-btn pa-v6-btn--primary">
                Build my profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{ padding: '6rem 4rem', background: 'var(--pa-charcoal)', color: 'var(--pa-bone)' }}
        data-header-theme="dark"
      >
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

