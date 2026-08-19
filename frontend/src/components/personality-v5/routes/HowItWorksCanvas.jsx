import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';
import useCinematicScene from '../motion/useCinematicScene';

const STAGE_ASSETS = [
  MEDIA_ASSETS.a02, // Stage 01: Context (A02)
  MEDIA_ASSETS.a03, // Stage 02: Adaptive question (A03)
  MEDIA_ASSETS.a07, // Stage 03: Independent readings (A07 Collage)
  MEDIA_ASSETS.a08, // Stage 04: Interpretation & Trust (A08)
];

/**
 * HowItWorksCanvas — V5 Continuous 4-Stage Photographic Transformation
 *
 * All four stages visibly retain their specified image field throughout scroll:
 * - Stage 01: A02 (Context)
 * - Stage 02: A03 (Adaptive Questioning)
 * - Stage 03: A07 (Independent Readings Collage)
 * - Stage 04: A08 (Interpretation & Trust)
 */
export const HowItWorksCanvas = () => {
  const { howItWorks } = PUBLIC_CONTENT;
  const stages = howItWorks.stages;
  const [openFaq, setOpenFaq] = useState(null);

  const stageImagesRef = useRef([]);
  const stageTextsRef = useRef([]);

  const containerRef = useCinematicScene((self, mm, el) => {
    // Desktop & Tablet Viewports (>640px)
    mm.add('(min-width: 641px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial state: Stage 0 is visible, others are transparent
      stageImagesRef.current.forEach((img, idx) => {
        if (img) {
          gsap.set(img, { opacity: idx === 0 ? 1 : 0, scale: idx === 0 ? 1 : 1.06 });
        }
      });
      stageTextsRef.current.forEach((txt, idx) => {
        if (txt) {
          gsap.set(txt, { opacity: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 30 });
        }
      });

      // 4 distinct scroll segments
      // Transition from Stage 0 to 1
      tl.to(stageImagesRef.current[0], { opacity: 0, scale: 0.96, duration: 0.2 }, 0.22);
      tl.to(stageTextsRef.current[0], { opacity: 0, y: -20, duration: 0.2 }, 0.22);
      tl.to(stageImagesRef.current[1], { opacity: 1, scale: 1, duration: 0.25 }, 0.26);
      tl.to(stageTextsRef.current[1], { opacity: 1, y: 0, duration: 0.25 }, 0.26);

      // Transition from Stage 1 to 2 (A07 Collage)
      tl.to(stageImagesRef.current[1], { opacity: 0, scale: 0.96, duration: 0.2 }, 0.48);
      tl.to(stageTextsRef.current[1], { opacity: 0, y: -20, duration: 0.2 }, 0.48);
      tl.to(stageImagesRef.current[2], { opacity: 1, scale: 1, duration: 0.25 }, 0.52);
      tl.to(stageTextsRef.current[2], { opacity: 1, y: 0, duration: 0.25 }, 0.52);

      // Transition from Stage 2 to 3 (A08)
      tl.to(stageImagesRef.current[2], { opacity: 0, scale: 0.96, duration: 0.2 }, 0.74);
      tl.to(stageTextsRef.current[2], { opacity: 0, y: -20, duration: 0.2 }, 0.74);
      tl.to(stageImagesRef.current[3], { opacity: 1, scale: 1, duration: 0.25 }, 0.78);
      tl.to(stageTextsRef.current[3], { opacity: 1, y: 0, duration: 0.25 }, 0.78);

      // Settle hold at end
      tl.to(stageImagesRef.current[3], { scale: 1.03, duration: 0.15, ease: 'none' }, 0.85);
    });
  }, [stages.length]);

  return (
    <>
      <section className="pa-route-hero" data-header-theme="dark">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{howItWorks.title}</h1>
            <p>{howItWorks.lead}</p>
          </div>
        </div>
      </section>

      {/* 4-Stage Continuous Sticky Canvas */}
      <section
        ref={containerRef}
        className="pa-hiw-v5-sticky-wrapper"
        data-header-theme="dark"
        style={{ height: '440svh', position: 'relative' }}
      >
        <div
          className="pa-sticky-viewport"
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100svh',
            backgroundColor: 'var(--pa-black)',
            color: 'var(--pa-white)',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            className="pa-container"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '48px',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Photographic Actor Plane with 4 Stacked Layers */}
            <div
              className="pa-hiw-stage-plane"
              style={{
                height: '64svh',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
            >
              {STAGE_ASSETS.map((asset, idx) => (
                <div
                  key={asset.source || idx}
                  ref={(el) => (stageImagesRef.current[idx] = el)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    willChange: 'transform, opacity',
                  }}
                >
                  <ResponsivePicture
                    asset={asset}
                    alt={asset.alt}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    objectPosition="50% 40%"
                  />
                </div>
              ))}
            </div>

            {/* Narrative Content with 4 Stacked Text Layers */}
            <div style={{ position: 'relative', minHeight: '320px', display: 'flex', alignItems: 'center' }}>
              {stages.map((stage, idx) => (
                <div
                  key={stage.step || idx}
                  ref={(el) => (stageTextsRef.current[idx] = el)}
                  style={{
                    position: idx === 0 ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--pa-track-status)',
                      color: 'var(--pa-fog)',
                      marginBottom: '12px',
                    }}
                  >
                    Stage 0{idx + 1} of 0{stages.length} — {stage.evidenceTag || 'Evidence Phase'}
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--pa-font-serif)',
                      fontSize: 'clamp(32px, 3.8vw, 52px)',
                      color: 'var(--pa-white)',
                      marginBottom: '16px',
                      lineHeight: '1.1',
                    }}
                  >
                    {stage.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '18px',
                      color: 'var(--pa-fog)',
                      lineHeight: '1.6',
                      marginBottom: '24px',
                    }}
                  >
                    {stage.body || stage.summary}
                  </p>
                  <div
                    style={{
                      borderLeft: '2px solid var(--pa-white)',
                      paddingLeft: '16px',
                      color: 'var(--pa-white)',
                      fontSize: '15px',
                      fontStyle: 'italic',
                    }}
                  >
                    {stage.subtitle || stage.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section on Paper */}
      <section
        className="pa-faq-section"
        data-header-theme="light"
        style={{ backgroundColor: 'var(--pa-paper)', padding: '10svh 0' }}
      >
        <div className="pa-container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '38px', marginBottom: '32px', color: 'var(--pa-ink)' }}>
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
