import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import MediaPlane from '../motion/MediaPlane';

const BIG_FIVE_CHAPTERS = [
  { key: 'openness', name: 'Openness', asset: MEDIA_ASSETS_V6.b01, high: 'Exploratory & Abstract', low: 'Pragmatic & Concrete', text: 'Measures cognitive exploration, intellectual curiosity, and aesthetic sensitivity. High scores prefer ambiguous conceptual challenges.' },
  { key: 'conscientiousness', name: 'Conscientiousness', asset: MEDIA_ASSETS_V6.b02, high: 'Systematic & Thorough', low: 'Flexible & Spontaneous', text: 'Measures structural precision, organizational discipline, and execution stamina. High scores build durable systems.' },
  { key: 'extraversion', name: 'Extraversion', asset: MEDIA_ASSETS_V6.b03, high: 'Expressive & Outward', low: 'Independent & Contemplative', text: 'Measures social energy regulation and interactive velocity. High scores thrive in active stakeholder environments.' },
  { key: 'agreeableness', name: 'Agreeableness', asset: MEDIA_ASSETS_V6.b04, high: 'Cooperative & Empathetic', low: 'Competitive & Direct', text: 'Measures relational orientation and prosocial negotiation. High scores foster group trust and alignment.' },
  { key: 'stability', name: 'Emotional Stability', asset: MEDIA_ASSETS_V6.b05, high: 'Steady & Grounded', low: 'Reactive & Sensitive', text: 'Measures affective resilience under acute professional pressure and uncertainty.' },
];

const RIASEC_CHAPTERS = [
  { id: 'realistic', name: 'Realistic', asset: MEDIA_ASSETS_V6.b06, text: 'Hands-on engagement with physical tools, industrial hardware, and concrete technical systems.' },
  { id: 'investigative', name: 'Investigative', asset: MEDIA_ASSETS_V6.b07, text: 'Empirical inquiry, statistical analysis, deep domain research, and scientific problem spaces.' },
  { id: 'artistic', name: 'Artistic', asset: MEDIA_ASSETS_V6.b08, text: 'Unstructured creative synthesis, narrative design, interface aesthetics, and novel prototypes.' },
  { id: 'social', name: 'Social', asset: MEDIA_ASSETS_V6.b09, text: 'Mentorship, facilitation, team enablement, organizational coaching, and human development.' },
  { id: 'enterprising', name: 'Enterprising', asset: MEDIA_ASSETS_V6.b10, text: 'Strategic direction, resource mobilization, venture leadership, and high-accountability decisions.' },
  { id: 'conventional', name: 'Conventional', asset: MEDIA_ASSETS_V6.b11, text: 'Precision governance, deterministic verification, compliance standards, and structured ledgers.' },
];

export const MethodAtlas = () => {
  const { methodology } = PUBLIC_CONTENT;

  return (
    <div className="pa-v6-methodology-page" style={{ backgroundColor: 'var(--pa-obsidian)', color: 'var(--pa-bone)' }}>
      {/* 1. Immediate Visual Opening Chapter (No text-only giant intro) */}
      <section style={{ position: 'relative', height: '80svh', width: '100%', overflow: 'hidden' }}>
        <MediaPlane
          asset={MEDIA_ASSETS_V6.a07}
          objectPosition="50% 40%"
          alt="Methodology Visual Atlas Lead"
          priority={true}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,18,16,0.95) 0%, rgba(17,18,16,0.4) 60%, rgba(17,18,16,0.7) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '4rem', left: '4rem', right: '4rem', maxWidth: '820px', zIndex: 2 }}>
          <span style={{ fontSize: '0.8125rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pa-stone)', fontWeight: 600 }}>
            Psychometric Architecture
          </span>
          <h1 style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)', lineHeight: 1.02, color: 'var(--pa-bone)', margin: '0.5rem 0 1rem 0' }}>
            {methodology.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--pa-stone)', lineHeight: 1.5 }}>
            {methodology.lead}
          </p>
        </div>
      </section>

      {/* 2. Big Five Dimensional Chapter */}
      <section style={{ padding: '6rem 4rem', borderTop: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ maxWidth: '680px', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 600 }}>
              Framework 01
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '0.25rem 0 1rem 0' }}>Big Five Trait Spectrums</h2>
            <p style={{ color: 'var(--pa-stone)', lineHeight: 1.55 }}>{methodology.bigFiveIntro}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
            {BIG_FIVE_CHAPTERS.map((item) => (
              <div key={item.key} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ height: '280px', borderRadius: '2px', overflow: 'hidden' }}>
                  <MediaPlane asset={item.asset} objectPosition="center center" alt={item.name} />
                </div>
                <div>
                  <strong style={{ fontSize: '1.125rem', color: 'var(--pa-bone)' }}>{item.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--pa-stone)', margin: '4px 0 8px 0', textTransform: 'uppercase' }}>
                    {item.high}
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--pa-muted)', lineHeight: 1.45 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RIASEC Environmental Atlas Chapter */}
      <section style={{ padding: '6rem 4rem', background: 'var(--pa-charcoal)', borderTop: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ maxWidth: '680px', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 600 }}>
              Framework 02
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '0.25rem 0 1rem 0' }}>RIASEC Occupational Environments</h2>
            <p style={{ color: 'var(--pa-stone)', lineHeight: 1.55 }}>{methodology.riasecIntro}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {RIASEC_CHAPTERS.map((env) => (
              <div key={env.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(17, 18, 16, 0.5)', padding: '1.5rem', borderRadius: '2px' }}>
                <div style={{ height: '220px', borderRadius: '2px', overflow: 'hidden' }}>
                  <MediaPlane asset={env.asset} objectPosition="center center" alt={env.name} />
                </div>
                <div>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--pa-bone)' }}>{env.name}</strong>
                  <p style={{ fontSize: '0.875rem', color: 'var(--pa-stone)', marginTop: '6px', lineHeight: 1.5 }}>
                    {env.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. O*NET Work Values on B12 */}
      <section style={{ padding: '6rem 4rem', borderTop: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ height: '520px', borderRadius: '2px', overflow: 'hidden' }}>
            <MediaPlane asset={MEDIA_ASSETS_V6.b12} objectPosition="50% 50%" alt="O*NET Evidence Field" />
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 600 }}>
              Framework 03
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '0.25rem 0 1rem 0' }}>O*NET Work Values</h2>
            <p style={{ color: 'var(--pa-stone)', lineHeight: 1.55, marginBottom: '2rem' }}>
              {methodology.workValuesIntro}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PUBLIC_CONTENT.home.independentReadings.models[2].values.map((v) => (
                <div key={v.rank} style={{ borderLeft: '2px solid var(--pa-bone)', paddingLeft: '1rem' }}>
                  <strong style={{ color: 'var(--pa-bone)', fontSize: '0.9375rem' }}>{v.rank} · {v.name}</strong>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--pa-stone)' }}>{v.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Deterministic Scoring: Progressive Line System (No Dashboard Boxes) */}
      <section style={{ padding: '6rem 4rem', background: 'var(--pa-charcoal)', borderTop: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ maxWidth: '680px', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 600 }}>
              Computation Engine
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '0.25rem 0 1rem 0' }}>Deterministic Scoring Architecture</h2>
            <p style={{ color: 'var(--pa-stone)', lineHeight: 1.55 }}>{methodology.deterministicIntro}</p>
          </div>

          {/* Progressive Line Pipeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', borderTop: '2px solid var(--pa-bone)', paddingTop: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--pa-stone)', marginBottom: '4px' }}>Stage 01</div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--pa-bone)' }}>Evidence In</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--pa-stone)', marginTop: '8px', lineHeight: 1.45 }}>
                Contextual role history, calibrated choice responses, and trade-off deliberations.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--pa-stone)', marginBottom: '4px' }}>Stage 02</div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--pa-bone)' }}>Weighted Scoring</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--pa-stone)', marginTop: '8px', lineHeight: 1.45 }}>
                Mathematical percentile distributions calculated against validated normative reference groups.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--pa-stone)', marginBottom: '4px' }}>Stage 03</div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--pa-bone)' }}>Separated Outputs</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--pa-stone)', marginTop: '8px', lineHeight: 1.45 }}>
                Distinct, inspectable tables for Big Five, RIASEC, and O*NET dimensions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Scientific Limitations & Boundaries */}
      <section style={{ padding: '6rem 4rem', borderTop: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Scientific Limitations & Scope</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            {methodology.limitations.map((lim, idx) => (
              <div key={idx} style={{ borderTop: '1px solid var(--pa-rule-light)', paddingTop: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--pa-bone)', marginBottom: '8px' }}>
                  {lim.heading}
                </strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--pa-stone)', lineHeight: 1.55 }}>
                  {lim.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MethodAtlas;
