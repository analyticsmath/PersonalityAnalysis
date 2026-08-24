import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import ResponseFragment from '../fragments/ResponseFragment';
import LottieTransformScene from './LottieTransformScene';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

gsap.registerPlugin(ScrollTrigger);

const HowTransformationStage = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMovementIdx, setActiveMovementIdx] = useState(0);

  const content = PUBLIC_CONTENT.howItWorks;
  const movements = content.movements;

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const seg = Math.min(movements.length - 1, Math.floor(self.progress * movements.length));
          setActiveMovementIdx(seg);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [movements.length]);

  const activeMovement = movements[activeMovementIdx] || movements[0];

  return (
    <section
      ref={containerRef}
      className="pa-atlas-scene-wrapper pa-atlas-how-stage"
      style={{ minHeight: '360svh', position: 'relative' }}
      aria-label="Continuous Transformation"
    >
      <div className="pa-atlas-stage-sticky">
        {/* Background Transformation Stage Media Detail */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            opacity: 0.18,
            zIndex: 1,
          }}
        >
          <AtlasResponsiveImage
            asset={MEDIA_ASSETS_ATLAS.howProcess}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Main Grid Content */}
        <div
          className="pa-atlas-grid"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 'calc(var(--atlas-header-height-desktop) + 24px)',
            paddingBottom: '40px',
          }}
        >
          {/* Top Header */}
          <div style={{ maxWidth: '48rem' }}>
            <h1 className="pa-atlas-heading-xl" style={{ color: 'var(--atlas-ink)', marginBottom: '12px' }}>
              {content.hero.headline}
            </h1>
            <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-ink)', opacity: 0.85 }}>
              {content.hero.lead}
            </p>
          </div>

          {/* Central Transformation Area: Movement Text + Lottie */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
              gap: 'var(--atlas-column-gap)',
              alignItems: 'center',
              padding: '20px 0',
            }}
          >
            {/* Left Column: Movement Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span
                  className="pa-atlas-mono"
                  style={{
                    color: 'var(--atlas-field)',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  TRANSFORMATION STAGE: {activeMovement.name.toUpperCase()}
                </span>
                <h2 className="pa-atlas-heading-lg" style={{ color: 'var(--atlas-ink)', marginBottom: '12px' }}>
                  {activeMovement.title}
                </h2>
                <p className="pa-atlas-body" style={{ color: 'var(--atlas-ink)', opacity: 0.88, maxWidth: '34rem', lineHeight: 1.6 }}>
                  {activeMovement.body}
                </p>
              </div>

              {/* Sample illustrative response */}
              <div style={{ marginTop: '16px' }}>
                <span
                  className="pa-atlas-mono"
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--atlas-muted)',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  {content.illustrativeNotice}
                </span>
                <ResponseFragment
                  variant="clause"
                  text={content.illustrativeResponse}
                  sourceId="0x8F4A"
                  style={{
                    backgroundColor: 'var(--atlas-fog)',
                    color: 'var(--atlas-ink)',
                    padding: '12px 18px',
                    borderRadius: 'var(--atlas-radius-xs)',
                  }}
                />
              </div>
            </div>

            {/* Right Column: Lottie Vector Transformation */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <LottieTransformScene progress={scrollProgress} />
            </div>
          </div>

          {/* Bottom Stage Progress Indicator (No 01-06 numbers) */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            {movements.map((mov, idx) => {
              const isActive = idx === activeMovementIdx;
              return (
                <div
                  key={mov.id}
                  style={{
                    height: '4px',
                    flex: 1,
                    maxWidth: '120px',
                    backgroundColor: isActive ? 'var(--atlas-field)' : 'var(--atlas-fog)',
                    borderRadius: '2px',
                    transition: 'background-color 200ms ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HowTransformationStage);
