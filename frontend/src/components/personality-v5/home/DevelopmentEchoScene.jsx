import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';

/**
 * Scene 05 — Development Echo (V5)
 *
 * Longitudinal comparison demonstrating temporal profile evolution:
 * - Shared paper ground with earlier vs current state comparisons.
 * - Measured traces with explicit delta indicators.
 */
export const DevelopmentEchoScene = () => {
  const { developmentEcho } = PUBLIC_CONTENT.home;
  const comparisons = developmentEcho?.traitsComparison || [];

  return (
    <section
      className="pa-echo-v5"
      data-header-theme="light"
      aria-label="Development Echo"
    >
      <div className="pa-container">
        <div className="pa-echo-grid">
          {/* Photographic Anchor */}
          <div style={{ height: '48svh', overflow: 'hidden' }}>
            <ResponsivePicture
              asset={MEDIA_ASSETS.a05}
              alt={MEDIA_ASSETS.a05.alt}
              sizes="(max-width: 1024px) 100vw, 45vw"
              objectPosition="50% 40%"
            />
          </div>

          {/* Temporal Evolution Traces */}
          <div>
            <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-quiet)', marginBottom: '8px' }}>
              Longitudinal Calibration
            </div>
            <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: 'clamp(28px, 3.4vw, 46px)', marginBottom: '16px', lineHeight: '1.1' }}>
              {developmentEcho?.title}
            </h2>
            <p style={{ color: 'var(--pa-cool-600)', marginBottom: '28px', lineHeight: '1.5' }}>
              {developmentEcho?.body || developmentEcho?.lead}
            </p>

            <div className="pa-echo-traces">
              {comparisons.map((item) => (
                <div key={item.label} className="pa-echo-trace-item">
                  <div className="pa-echo-trace-label">{item.label}</div>
                  <div className="pa-echo-trace-bars">
                    {/* Current Score */}
                    <div className="pa-echo-bar-row">
                      <span style={{ color: 'var(--pa-ink)', fontWeight: 500 }}>Current</span>
                      <div className="pa-echo-bar-track">
                        <div className="pa-echo-bar-fill" style={{ width: `${item.current}%` }} />
                      </div>
                      <span className="pa-tabular">{item.current}</span>
                    </div>
                    {/* Earlier Baseline */}
                    <div className="pa-echo-bar-row">
                      <span style={{ color: 'var(--pa-quiet)' }}>Baseline</span>
                      <div className="pa-echo-bar-track">
                        <div className="pa-echo-bar-fill pa-echo-bar-fill--earlier" style={{ width: `${item.earlier}%` }} />
                      </div>
                      <span className="pa-tabular" style={{ color: 'var(--pa-quiet)' }}>{item.earlier}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentEchoScene;
