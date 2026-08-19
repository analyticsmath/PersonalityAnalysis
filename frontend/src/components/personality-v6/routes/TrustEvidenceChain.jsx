import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import MediaPlane from '../motion/MediaPlane';

export const TrustEvidenceChain = () => {
  const { trust } = PUBLIC_CONTENT;

  return (
    <div className="pa-v6-trust-page" style={{ backgroundColor: 'var(--pa-obsidian)', color: 'var(--pa-bone)' }}>
      {/* Visual Header with A08 */}
      <section style={{ position: 'relative', height: '65svh', width: '100%', overflow: 'hidden' }}>
        <MediaPlane
          asset={MEDIA_ASSETS_V6.a08}
          objectPosition="50% 48%"
          alt="Trust and Data Governance Lead Plane"
          priority={true}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,18,16,0.95) 0%, rgba(17,18,16,0.4) 60%, rgba(17,18,16,0.7) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '3.5rem', left: '4rem', right: '4rem', maxWidth: '820px', zIndex: 2 }}>
          <span style={{ fontSize: '0.8125rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pa-stone)', fontWeight: 600 }}>
            Trust & Governance
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'var(--pa-bone)', margin: '0.5rem 0 1rem 0' }}>
            {trust.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--pa-stone)', lineHeight: 1.5 }}>
            {trust.lead}
          </p>
        </div>
      </section>

      {/* 5-Stage Audit Chain */}
      <section style={{ padding: '6rem 4rem', borderTop: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Data Flow & Audit Trail</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {trust.chain.map((st) => (
              <div
                key={st.stage}
                style={{
                  borderLeft: '2px solid var(--pa-bone)',
                  paddingLeft: '1.5rem',
                  background: 'rgba(29, 30, 26, 0.6)',
                  padding: '1.5rem',
                  borderRadius: '2px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 600 }}>
                    Stage {st.stage} · {st.type}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--pa-bone)', margin: '0 0 0.5rem 0' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--pa-stone)', margin: 0, lineHeight: 1.55 }}>
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Controls Links */}
      <section style={{ padding: '6rem 4rem', background: 'var(--pa-charcoal)', borderTop: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div style={{ borderTop: '1px solid var(--pa-rule-light)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--pa-bone)', marginBottom: '0.75rem' }}>
              {trust.controls.exportTitle}
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--pa-stone)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
              {trust.controls.exportDesc}
            </p>
            <Link to="/account/privacy" className="pa-v6-btn pa-v6-btn--secondary" style={{ fontSize: '0.8125rem' }}>
              Access Privacy Controls →
            </Link>
          </div>

          <div style={{ borderTop: '1px solid var(--pa-rule-light)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--pa-bone)', marginBottom: '0.75rem' }}>
              {trust.controls.deleteTitle}
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--pa-stone)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
              {trust.controls.deleteDesc}
            </p>
            <Link to="/privacy" className="pa-v6-btn pa-v6-btn--secondary" style={{ fontSize: '0.8125rem' }}>
              Read Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrustEvidenceChain;
