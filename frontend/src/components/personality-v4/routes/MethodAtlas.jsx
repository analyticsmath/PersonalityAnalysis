import React from 'react';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';

/**
 * MethodAtlas — V5 A07-Led Psychometric Frameworks Atlas
 *
 * Removes boxed white cards and builds a continuous photographic chapter atlas:
 * - A07 visual anchor across chapters.
 * - Big Five spectrum, RIASEC vocational interest map, O*NET occupational values, and deterministic scoring ledger.
 * - Explicit psychometric boundaries and non-clinical limitations.
 */
export const MethodAtlas = () => {
  const { methodology, home } = PUBLIC_CONTENT;
  const bigFive = home.independentReadings.models.find((m) => m.id === 'big-five');
  const riasec = home.independentReadings.models.find((m) => m.id === 'riasec');
  const workValues = home.independentReadings.models.find((m) => m.id === 'work-values');

  return (
    <div className="pa-methodology-atlas-v5" style={{ backgroundColor: 'var(--pa-paper)', color: 'var(--pa-ink)', paddingBottom: '12svh' }}>
      {/* A07-Led Hero Stage */}
      <section className="pa-route-hero">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{methodology.title}</h1>
            <p>{methodology.lead}</p>
          </div>

          <div style={{ height: '52svh', overflow: 'hidden', marginTop: '36px' }}>
            <ResponsivePicture
              asset={MEDIA_ASSETS.a07}
              alt={MEDIA_ASSETS.a07.alt}
              sizes="100vw"
              objectPosition="50% 40%"
              priority={true}
            />
          </div>
        </div>
      </section>

      <section className="pa-method-chapters" aria-label="Psychometric Frameworks Atlas" style={{ marginTop: '8svh' }}>
        <div className="pa-container">
          {/* Chapter 01: Big Five */}
          <article style={{ borderTop: '1px solid var(--pa-line-light)', padding: '48px 0', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '48px' }}>
            <div>
              <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-quiet)', marginBottom: '8px' }}>
                Chapter 01
              </div>
              <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '32px', lineHeight: '1.15', marginBottom: '16px' }}>
                Big Five Personality Dimensions
              </h2>
              <p style={{ color: 'var(--pa-cool-600)', lineHeight: '1.6' }}>
                {methodology.bigFiveIntro}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bigFive?.traits.map((trait) => (
                <div key={trait.id} style={{ borderBottom: '1px solid rgba(16, 17, 15, 0.08)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '15px', fontWeight: 500 }}>
                    <span>{trait.name}</span>
                    <span className="pa-tabular">{trait.sample}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: 'var(--pa-cool-200)', position: 'relative', marginBottom: '6px' }}>
                    <div style={{ width: `${trait.sample}%`, height: '100%', backgroundColor: trait.color || 'var(--pa-ink)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--pa-quiet)' }}>
                    <span>{trait.low}</span>
                    <span>{trait.high}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Chapter 02: Holland RIASEC */}
          <article style={{ borderTop: '1px solid var(--pa-line-light)', padding: '48px 0', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '48px' }}>
            <div>
              <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-quiet)', marginBottom: '8px' }}>
                Chapter 02
              </div>
              <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '32px', lineHeight: '1.15', marginBottom: '16px' }}>
                Holland RIASEC Vocational Interests
              </h2>
              <p style={{ color: 'var(--pa-cool-600)', lineHeight: '1.6' }}>
                {methodology.riasecIntro}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {riasec?.territories.map((territory) => (
                <div key={territory.id} style={{ borderLeft: '2px solid var(--pa-ink)', paddingLeft: '12px' }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{territory.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--pa-cool-600)', lineHeight: '1.4' }}>{territory.description}</div>
                </div>
              ))}
            </div>
          </article>

          {/* Chapter 03: O*NET Work Values */}
          <article style={{ borderTop: '1px solid var(--pa-line-light)', padding: '48px 0', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '48px' }}>
            <div>
              <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-quiet)', marginBottom: '8px' }}>
                Chapter 03
              </div>
              <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '32px', lineHeight: '1.15', marginBottom: '16px' }}>
                O*NET Occupational Work Values
              </h2>
              <p style={{ color: 'var(--pa-cool-600)', lineHeight: '1.6' }}>
                {methodology.workValuesIntro}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {workValues?.values.map((v) => (
                <div key={v.rank} style={{ display: 'grid', gridTemplateColumns: '32px 140px 1fr', gap: '16px', fontSize: '14px', alignItems: 'baseline' }}>
                  <span className="pa-tabular" style={{ color: 'var(--pa-quiet)' }}>{v.rank}</span>
                  <span style={{ fontWeight: 600 }}>{v.name}</span>
                  <span style={{ color: 'var(--pa-cool-600)' }}>{v.description}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Chapter 04: Deterministic Scoring Ledger */}
          <article style={{ borderTop: '1px solid var(--pa-line-light)', padding: '48px 0', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '48px' }}>
            <div>
              <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-quiet)', marginBottom: '8px' }}>
                Chapter 04
              </div>
              <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '32px', lineHeight: '1.15', marginBottom: '16px' }}>
                Deterministic Scoring & Behavioral Signals
              </h2>
              <p style={{ color: 'var(--pa-cool-600)', lineHeight: '1.6' }}>
                {methodology.deterministicIntro}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: 'var(--pa-track-status)', color: 'var(--pa-quiet)', borderBottom: '1px solid var(--pa-line-light)', paddingBottom: '8px' }}>
                <span>Input Layer</span>
                <span>Response Weight</span>
                <span>Scoring Engine</span>
                <span>Synthesis</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '13px', color: 'var(--pa-ink)', padding: '8px 0', borderBottom: '1px solid rgba(16, 17, 15, 0.04)' }}>
                <span>Self-Reported Experience</span>
                <span>Role Matrix</span>
                <span>Deterministic Baseline</span>
                <span>Context Anchor</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '13px', color: 'var(--pa-ink)', padding: '8px 0', borderBottom: '1px solid rgba(16, 17, 15, 0.04)' }}>
                <span>Adaptive Scenarios</span>
                <span>Calibrated Weights</span>
                <span>Bayesian Scoring</span>
                <span>Stretch & Fit</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '13px', color: 'var(--pa-ink)', padding: '8px 0' }}>
                <span>Latency & Modification</span>
                <span>Confidence Metric</span>
                <span>Stability Index</span>
                <span>Reflective Insight</span>
              </div>
            </div>
          </article>

          {/* Boundaries & Limitations */}
          <div style={{ borderTop: '2px solid var(--pa-ink)', paddingTop: '48px', marginTop: '32px' }}>
            <h2 style={{ fontFamily: 'var(--pa-font-serif)', fontSize: '28px', marginBottom: '24px' }}>
              Framework Boundaries & Limitations
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {methodology.limitations.map((lim, idx) => (
                <div key={idx} style={{ borderLeft: '2px solid var(--pa-cool-400)', paddingLeft: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{lim.heading}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--pa-cool-600)', lineHeight: '1.5' }}>{lim.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MethodAtlas;
