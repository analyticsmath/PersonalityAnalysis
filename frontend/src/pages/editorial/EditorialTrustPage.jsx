import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import InspectionAperture from '../../components/personality-v7/motion/InspectionAperture';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';

const RECORD_STATES = [
  {
    id: 'supplied',
    buttonLabel: 'You supplied',
    title: 'You supplied',
    content: 'Assessment responses, background details and CV text only if you chose to upload a CV.',
    provenanceTag: 'User Supplied Input',
  },
  {
    id: 'calculated',
    buttonLabel: 'The system calculated',
    title: 'The system calculated',
    content: 'Big Five, RIASEC and work-value readings together with supporting career signals.',
    provenanceTag: 'Algorithmic Decomposition',
  },
  {
    id: 'compared',
    buttonLabel: 'The system compared',
    title: 'The system compared',
    content: 'Your record with curated career profiles using deterministic weighted logic.',
    provenanceTag: 'Deterministic Career Comparison',
  },
  {
    id: 'assisted',
    buttonLabel: 'AI can assist',
    title: 'AI can assist',
    content: 'Narrative explanation or coaching where that functionality is configured. AI assistance is not the sole source of the core assessment score.',
    provenanceTag: 'Optional AI Commentary',
  },
  {
    id: 'controlled',
    buttonLabel: 'You control',
    title: 'You control',
    content: 'Data export, assessment deletion and account deletion through the controls implemented in the application.',
    provenanceTag: 'Account & Privacy Agency',
  },
];

export const EditorialTrustPage = () => {
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const activeState = RECORD_STATES[activeStateIndex];
  const asset = MEDIA_ASSETS_V7.trustInspection;

  const surfaceContent = (
    <div>
      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-muted-light)' }}>
        Surface Statement
      </span>
      <p style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.5rem', lineHeight: 1.35, margin: '0.5rem 0 0 0' }}>
        "Prefers clear structure before committing work."
      </p>
    </div>
  );

  const revealedContent = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
      <div>
        <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
          Source
        </span>
        <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-mineral)', margin: '0.25rem 0 0 0' }}>
          Assessment response
        </p>
      </div>
      <div>
        <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
          Reading
        </span>
        <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-mineral)', margin: '0.25rem 0 0 0' }}>
          Big Five contribution
        </p>
      </div>
      <div>
        <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
          Additional Context
        </span>
        <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-mineral)', margin: '0.25rem 0 0 0' }}>
          Work-value evidence
        </p>
      </div>
      <div>
        <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
          Career Use
        </span>
        <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-mineral)', margin: '0.25rem 0 0 0' }}>
          One input among comparison layers
        </p>
      </div>
    </div>
  );

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        {/* ── Section 1: Opening Hero ── */}
        <section
          style={{
            backgroundColor: 'var(--pa-mineral)',
            color: 'var(--pa-carbon)',
            paddingTop: 'calc(var(--pa-header-height) + 40px)',
            paddingBottom: 'clamp(60px, 8vh, 100px)',
          }}
          aria-label="Trust and Provenance Overview"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / 8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h1 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-l)', lineHeight: 'var(--pa-display-l-lh)' }}>
                Trust starts with knowing where a conclusion came from.
              </h1>
              <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: 'var(--pa-body-l)', color: 'var(--pa-muted-light)', lineHeight: 1.5, maxWidth: '640px' }}>
                You should be able to distinguish what you supplied, what the system calculated, what was compared and what remains under your control.
              </p>
            </div>

            <div style={{ gridColumn: '9 / 13', height: '360px', overflow: 'hidden', borderRadius: 'var(--pa-radius-control)' }}>
              <picture>
                <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 33vw, 100vw" />
                <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 33vw, 100vw" />
                <img
                  src={asset.source}
                  alt={asset.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </section>

        {/* ── Section 2: One Record, Five States ── */}
        <section
          style={{
            backgroundColor: '#ECEFEA',
            color: 'var(--pa-carbon)',
            padding: 'clamp(80px, 10vh, 120px) 0',
          }}
          aria-label="Five Provenance States"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / -1', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.15 }}>
                One Record, Five States
              </h2>
              <p style={{ color: 'var(--pa-muted-light)', marginTop: '0.5rem', fontSize: '1.0625rem' }}>
                Every piece of information in your profile belongs to a verifiable provenance tier.
              </p>
            </div>

            {/* Direct selector buttons */}
            <div style={{ gridColumn: '1 / 5', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {RECORD_STATES.map((st, idx) => {
                const isSelected = activeStateIndex === idx;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setActiveStateIndex(idx)}
                    style={{
                      textAlign: 'left',
                      padding: '1.25rem 1.5rem',
                      background: isSelected ? 'var(--pa-carbon)' : 'var(--pa-mineral)',
                      color: isSelected ? 'var(--pa-mineral)' : 'var(--pa-carbon)',
                      border: 'none',
                      borderRadius: 'var(--pa-radius-control)',
                      cursor: 'pointer',
                      transition: 'background 0.18s ease, color 0.18s ease',
                      fontFamily: 'var(--pa-font-functional)',
                      fontSize: '1rem',
                      fontWeight: isSelected ? 500 : 450,
                    }}
                    aria-pressed={isSelected}
                  >
                    {st.buttonLabel}
                  </button>
                );
              })}
            </div>

            {/* State Detail Display */}
            <div style={{ gridColumn: '6 / 13', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div
                style={{
                  padding: '2.5rem',
                  background: 'var(--pa-mineral)',
                  borderRadius: 'var(--pa-radius-control)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pa-oxblood)' }}>
                  {activeState.provenanceTag}
                </span>
                <h3 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.75rem', lineHeight: 1.25, margin: 0 }}>
                  {activeState.title}
                </h3>
                <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '1.125rem', lineHeight: 1.55, color: 'var(--pa-carbon)', margin: 0 }}>
                  {activeState.content}
                </p>

                {activeState.id === 'controlled' && (
                  <div style={{ marginTop: '1rem' }}>
                    <Link
                      to="/account/privacy"
                      className="pa-link-text"
                      style={{ color: 'var(--pa-oxblood)', fontWeight: 500 }}
                    >
                      Inspect your account privacy controls &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Interactive Aperture & Privacy Link ── */}
        <section
          style={{
            backgroundColor: 'var(--pa-mineral)',
            color: 'var(--pa-carbon)',
            padding: 'clamp(80px, 10vh, 120px) 0',
          }}
          aria-label="Interactive Record Inspection"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / -1', maxWidth: '880px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.15 }}>
                Inspect provenance on any reading
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--pa-muted-light)', lineHeight: 1.55, margin: 0 }}>
                Hover with a fine pointer or tap the toggle button to reveal the exact source, framework contribution, and career weighting.
              </p>

              <InspectionAperture
                surfaceContent={surfaceContent}
                revealedContent={revealedContent}
                buttonLabel="Inspect provenance"
              />

              <div style={{ marginTop: '1rem' }}>
                <Link to="/privacy" className="pa-btn-primary">
                  Read the privacy details
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialTrustPage;
