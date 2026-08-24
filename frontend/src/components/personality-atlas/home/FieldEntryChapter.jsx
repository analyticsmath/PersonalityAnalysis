import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import ResponseFragment from '../fragments/ResponseFragment';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

gsap.registerPlugin(ScrollTrigger);

const FieldEntryChapter = () => {
  const containerRef = useRef(null);
  const imagePlaneRef = useRef(null);
  const headlineRef = useRef(null);
  const fragmentRef = useRef(null);

  const content = PUBLIC_CONTENT.home.chapter1;

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        // 20-48%: Image drift and scale; H1 translation
        tl.to(imagePlaneRef.current, {
          scale: 1.035,
          xPercent: -4,
          ease: 'none',
        }, 0.2);

        tl.to(headlineRef.current, {
          y: -30,
          opacity: 0.72,
          ease: 'none',
        }, 0.2);

        // 48-72%: Fragment gains prominence
        tl.to(fragmentRef.current, {
          scale: 1.02,
          ease: 'none',
        }, 0.48);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-atlas-scene-wrapper pa-atlas-field-entry"
      style={{ minHeight: '155svh', position: 'relative' }}
      aria-label="Field Entry"
    >
      <div className="pa-atlas-stage-sticky">
        {/* Dominant Environmental Image Plane */}
        <div
          ref={imagePlaneRef}
          className="pa-atlas-field-entry__media-plane"
          style={{
            position: 'absolute',
            top: '7vh',
            right: '-4vw',
            width: '78vw',
            height: '84vh',
            overflow: 'hidden',
            borderRadius: 'var(--atlas-radius-media)',
            zIndex: 1,
          }}
        >
          <AtlasResponsiveImage
            asset={MEDIA_ASSETS_ATLAS.homeContext}
            loading="eager"
            fetchPriority="high"
            style={{ width: '100%', height: '100%' }}
          />
          {/* Subtle Ambient Ground Wash */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(22, 61, 53, 0.25)',
            }}
          />
        </div>

        {/* Typographic Composition Layer */}
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
            paddingTop: 'calc(var(--atlas-header-height-desktop) + 32px)',
            paddingBottom: '48px',
          }}
        >
          {/* Top/Middle: H1 Invading the Image Space */}
          <div style={{ maxWidth: '62vw' }}>
            <h1
              ref={headlineRef}
              className="pa-atlas-display-xl"
              style={{
                color: 'var(--atlas-paper)',
                marginBottom: '24px',
              }}
            >
              {content.headline}
            </h1>
            <p
              className="pa-atlas-body-lg"
              style={{
                color: 'var(--atlas-paper)',
                opacity: 0.9,
                maxWidth: '38rem',
                marginBottom: '32px',
              }}
            >
              {content.lead}
            </p>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/assessment/start" className="pa-atlas-btn-primary">
                {content.ctaPrimary}
              </Link>
              <Link to="/how-it-works" className="pa-atlas-btn-secondary">
                <span>{content.ctaSecondary}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Lower Anchored Response Fragment */}
          <div
            ref={fragmentRef}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
            }}
          >
            <ResponseFragment
              variant="response"
              text={content.sampleResponse}
              sourceId="0x8F4A"
              style={{
                backgroundColor: 'rgba(22, 61, 53, 0.88)',
                padding: '24px 32px',
                borderRadius: 'var(--atlas-radius-sm)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FieldEntryChapter);
