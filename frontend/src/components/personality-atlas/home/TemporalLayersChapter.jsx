import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import ResponseFragment from '../fragments/ResponseFragment';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

gsap.registerPlugin(ScrollTrigger);

const TemporalLayersChapter = () => {
  const containerRef = useRef(null);
  const laterLayerRef = useRef(null);

  const content = PUBLIC_CONTENT.home.chapter4;

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !containerRef.current || !laterLayerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        laterLayerRef.current,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0.4 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-atlas-scene-wrapper pa-atlas-temporal-layers"
      style={{ minHeight: '220svh', position: 'relative' }}
      aria-label="Temporal Layers"
    >
      <div className="pa-atlas-stage-sticky">
        {/* Baseline Layer Image (Left/Center) */}
        <div
          style={{
            position: 'absolute',
            top: '10vh',
            left: '6vw',
            width: '54vw',
            height: '75vh',
            borderRadius: 'var(--atlas-radius-media)',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <AtlasResponsiveImage
            asset={MEDIA_ASSETS_ATLAS.homeContext}
            style={{ width: '100%', height: '100%' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'rgba(22, 61, 53, 0.9)',
              padding: '6px 12px',
              borderRadius: 'var(--atlas-radius-xs)',
            }}
          >
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-paper)', fontSize: '0.72rem' }}>
              {content.baselineToken}
            </span>
          </div>
        </div>

        {/* Later Context Overlap Layer (Enters from right via clipPath) */}
        <div
          ref={laterLayerRef}
          style={{
            position: 'absolute',
            top: '18vh',
            right: '6vw',
            width: '52vw',
            height: '72vh',
            borderRadius: 'var(--atlas-radius-media)',
            overflow: 'hidden',
            zIndex: 2,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <AtlasResponsiveImage
            asset={MEDIA_ASSETS_ATLAS.progressStudio}
            style={{ width: '100%', height: '100%' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(22, 61, 53, 0.9)',
              padding: '6px 12px',
              borderRadius: 'var(--atlas-radius-xs)',
            }}
          >
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.72rem' }}>
              {content.laterToken}
            </span>
          </div>
        </div>

        {/* Foreground Content Card & Comparative Synthesis */}
        <div
          className="pa-atlas-grid"
          style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 'calc(var(--atlas-header-height-desktop) + 20px)',
            paddingBottom: '40px',
            pointerEvents: 'none',
          }}
        >
          <div style={{ maxWidth: '42rem', pointerEvents: 'auto' }}>
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', display: 'block', marginBottom: '8px' }}>
              LONGITUDINAL ACCUMULATION
            </span>
            <h2 className="pa-atlas-heading-lg" style={{ color: 'var(--atlas-paper)', marginBottom: '12px' }}>
              {content.headline}
            </h2>
            <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', opacity: 0.88 }}>
              {content.lead}
            </p>
          </div>

          <div
            style={{
              maxWidth: '38rem',
              backgroundColor: 'rgba(22, 61, 53, 0.92)',
              padding: '20px 24px',
              borderRadius: 'var(--atlas-radius-sm)',
              pointerEvents: 'auto',
            }}
          >
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>
              LONGITUDINAL SYNTHESIS
            </span>
            <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', fontSize: '0.94rem', lineHeight: 1.45 }}>
              {content.comparisonNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TemporalLayersChapter);
