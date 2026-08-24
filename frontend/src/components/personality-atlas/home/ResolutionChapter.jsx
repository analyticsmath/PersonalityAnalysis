import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import ResponseFragment from '../fragments/ResponseFragment';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

gsap.registerPlugin(ScrollTrigger);

const ResolutionChapter = () => {
  const containerRef = useRef(null);
  const [activeStateIndex, setActiveStateIndex] = useState(0);

  const content = PUBLIC_CONTENT.home.chapter5;
  const states = content.resolutionStates;

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => {
          const seg = Math.min(states.length - 1, Math.floor(self.progress * states.length));
          setActiveStateIndex(seg);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [states.length]);

  const currentState = states[activeStateIndex] || states[0];

  return (
    <section
      ref={containerRef}
      className="pa-atlas-scene-wrapper pa-atlas-resolution"
      style={{ minHeight: '200svh', position: 'relative' }}
      aria-label="Resolution and Trace"
    >
      <div className="pa-atlas-stage-sticky">
        {/* Background Returning Environmental Crop */}
        <div
          style={{
            position: 'absolute',
            top: '8vh',
            right: '4vw',
            width: '45vw',
            height: '76vh',
            borderRadius: 'var(--atlas-radius-media)',
            overflow: 'hidden',
            opacity: 0.28,
            zIndex: 1,
          }}
        >
          <AtlasResponsiveImage
            asset={MEDIA_ASSETS_ATLAS.homeContext}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Spatial Resolution Layout */}
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
          {/* Top: Resolution Pipeline States */}
          <div style={{ maxWidth: '58rem' }}>
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', display: 'block', marginBottom: '8px' }}>
              PROVENANCE CHAIN RECORD
            </span>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                margin: '16px 0 24px',
              }}
            >
              {states.map((st, idx) => {
                const isActive = idx === activeStateIndex;
                return (
                  <div
                    key={st.id}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--atlas-radius-xs)',
                      backgroundColor: isActive ? 'var(--atlas-signal)' : 'rgba(239, 245, 242, 0.1)',
                      color: isActive ? 'var(--atlas-field)' : 'var(--atlas-paper)',
                      fontWeight: isActive ? 540 : 450,
                      fontSize: '0.86rem',
                      fontFamily: 'var(--atlas-font-mono)',
                      transition: 'all 200ms ease',
                    }}
                  >
                    {st.label}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                backgroundColor: 'rgba(22, 61, 53, 0.9)',
                padding: '16px 20px',
                borderRadius: 'var(--atlas-radius-sm)',
                maxWidth: '36rem',
              }}
            >
              <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.74rem' }}>
                CURRENT STATE: {currentState.label.toUpperCase()}
              </span>
              <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', opacity: 0.9, marginTop: '4px' }}>
                {currentState.desc}
              </p>
            </div>
          </div>

          {/* Middle: Active Fragment Carry */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <ResponseFragment
              variant="response"
              text="“I clarify responsibilities before committing work.”"
              sourceId="0x8F4A"
              date="2026-08"
            />
          </div>

          {/* Bottom: Final Call to Action */}
          <div style={{ maxWidth: '50rem' }}>
            <h2 className="pa-atlas-heading-xl" style={{ color: 'var(--atlas-paper)', marginBottom: '16px' }}>
              {content.headline}
            </h2>
            <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-paper)', opacity: 0.88, marginBottom: '24px' }}>
              {content.lead}
            </p>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/assessment/start" className="pa-atlas-btn-primary">
                {content.ctaPrimary}
              </Link>
              <Link to="/methodology" className="pa-atlas-btn-secondary">
                <span>{content.ctaSecondary}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ResolutionChapter);
