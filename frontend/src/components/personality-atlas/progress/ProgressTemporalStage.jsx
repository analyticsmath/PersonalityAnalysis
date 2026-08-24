import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

gsap.registerPlugin(ScrollTrigger);

const ProgressTemporalStage = () => {
  const containerRef = useRef(null);
  const laterLayerRef = useRef(null);
  const synthesisRef = useRef(null);

  const content = PUBLIC_CONTENT.progress;
  const illo = content.temporalIllustration;

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !containerRef.current || !laterLayerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        laterLayerRef.current,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0.3 },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, ease: 'none' },
        0.2
      );

      tl.fromTo(
        synthesisRef.current,
        { y: 30, opacity: 0.2 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-atlas-scene-wrapper pa-progress-temporal"
      style={{ minHeight: '260svh', position: 'relative' }}
      aria-label="Temporal Comparison Stage"
    >
      <div className="pa-atlas-stage-sticky">
        {/* Baseline Temporal Image Plane */}
        <div
          style={{
            position: 'absolute',
            top: '12vh',
            left: '6vw',
            width: '52vw',
            height: '74vh',
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
              backgroundColor: 'rgba(22, 61, 53, 0.92)',
              padding: '6px 12px',
              borderRadius: 'var(--atlas-radius-xs)',
            }}
          >
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-paper)', fontSize: '0.74rem' }}>
              {illo.baselineDate}
            </span>
          </div>
        </div>

        {/* Later Context Temporal Image Plane (Overlapping entry) */}
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
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.45)',
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
              backgroundColor: 'rgba(22, 61, 53, 0.92)',
              padding: '6px 12px',
              borderRadius: 'var(--atlas-radius-xs)',
            }}
          >
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.74rem' }}>
              {illo.laterDate}
            </span>
          </div>
        </div>

        {/* Spatial Content Overlay */}
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
            paddingTop: 'calc(var(--atlas-header-height-desktop) + 24px)',
            paddingBottom: '40px',
            pointerEvents: 'none',
          }}
        >
          {/* Header */}
          <div style={{ maxWidth: '44rem', pointerEvents: 'auto' }}>
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', display: 'block', marginBottom: '8px' }}>
              {illo.badge}
            </span>
            <h1 className="pa-atlas-heading-xl" style={{ color: 'var(--atlas-paper)', marginBottom: '12px' }}>
              {content.hero.headline}
            </h1>
            <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-paper)', opacity: 0.9 }}>
              {content.hero.lead}
            </p>
          </div>

          {/* Temporal Overlap Synthesis Card */}
          <div
            ref={synthesisRef}
            style={{
              maxWidth: '42rem',
              backgroundColor: 'rgba(22, 61, 53, 0.94)',
              padding: '24px 30px',
              borderRadius: 'var(--atlas-radius-sm)',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div>
              <span className="pa-atlas-mono" style={{ color: 'var(--atlas-paper)', fontSize: '0.75rem', opacity: 0.8 }}>
                TRAIT STABILITY:
              </span>
              <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', marginTop: '4px' }}>
                {illo.stabilityFinding}
              </p>
            </div>

            <div>
              <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.75rem' }}>
                OBSERVED CONTEXTUAL ADAPTATION:
              </span>
              <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', marginTop: '4px' }}>
                {illo.adaptationFinding}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProgressTemporalStage);
