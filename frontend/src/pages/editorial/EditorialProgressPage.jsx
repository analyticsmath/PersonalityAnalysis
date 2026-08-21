import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';

export const EditorialProgressPage = () => {
  const asset = MEDIA_ASSETS_V7.progressStudio;

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
          aria-label="Progress Overview"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / 8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h1 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-l)', lineHeight: 'var(--pa-display-l-lh)' }}>
                The same person can produce new evidence.
              </h1>
              <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: 'var(--pa-body-l)', color: 'var(--pa-muted-light)', lineHeight: 1.5, maxWidth: '640px' }}>
                Assessment history matters when change can be seen without erasing what stayed stable.
              </p>
            </div>

            <div style={{ gridColumn: '9 / 13', height: '380px', overflow: 'hidden', borderRadius: 'var(--pa-radius-control)' }}>
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

        {/* ── Section 2: Illustrative Longitudinal Record ── */}
        <section
          style={{
            backgroundColor: '#ECEFEA',
            color: 'var(--pa-carbon)',
            padding: 'clamp(70px, 9vh, 120px) 0',
          }}
          aria-label="Illustrative Progression Record"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / -1', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-oxblood)' }}>
                Illustrative record
              </span>
              <p style={{ fontSize: '0.875rem', color: 'var(--pa-muted-light)', margin: '0.25rem 0 0 0' }}>
                Sample evolution demonstrating how new context refines interpretation over time.
              </p>
            </div>

            <div style={{ gridColumn: '1 / 6', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ padding: '1.75rem', background: 'var(--pa-mineral)', borderRadius: 'var(--pa-radius-control)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pa-muted-light)' }}>
                  Earlier Evidence
                </span>
                <p style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.25rem', lineHeight: 1.4, margin: '0.5rem 0 0 0' }}>
                  "I avoid ambiguous ownership because it makes delivery harder to control."
                </p>
              </div>

              <div style={{ padding: '1.75rem', background: 'var(--pa-mineral)', borderRadius: 'var(--pa-radius-control)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pa-muted-light)' }}>
                  New Context
                </span>
                <p style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.25rem', lineHeight: 1.4, margin: '0.5rem 0 0 0' }}>
                  "Led a cross-team release where ownership changed repeatedly and decisions still had to move."
                </p>
              </div>
            </div>

            <div style={{ gridColumn: '7 / 13', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ padding: '2.5rem', background: 'var(--pa-carbon)', color: 'var(--pa-mineral)', borderRadius: 'var(--pa-radius-control)' }}>
                <span style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
                  Revised Reading
                </span>
                <p style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.5rem', lineHeight: 1.35, margin: '0.75rem 0 0 0' }}>
                  "Structure still matters. Newer evidence now also supports greater tolerance for ambiguity."
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--pa-pewter)', marginTop: '1.25rem', marginBottom: 0, lineHeight: 1.5 }}>
                  The later interpretation does not erase the earlier baseline; both remain inspectable in the record.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Longitudinal Principles (Staggered) ── */}
        <section
          style={{
            backgroundColor: 'var(--pa-mineral)',
            color: 'var(--pa-carbon)',
            padding: 'clamp(80px, 10vh, 130px) 0',
          }}
          aria-label="Progress Principles"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / 6', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.15 }}>
                What stayed stable
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--pa-muted-light)', lineHeight: 1.55, marginTop: '0.75rem' }}>
                A later assessment can reinforce patterns that were already visible.
              </p>
            </div>

            <div style={{ gridColumn: '7 / 12', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.15 }}>
                What changed
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--pa-muted-light)', lineHeight: 1.55, marginTop: '0.75rem' }}>
                New situations can add evidence that shifts the balance of an interpretation.
              </p>
            </div>

            <div style={{ gridColumn: '3 / 9', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.15 }}>
                What appeared later
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--pa-muted-light)', lineHeight: 1.55, marginTop: '0.75rem' }}>
                History is useful when newer evidence can be compared with the context that produced earlier readings.
              </p>
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}>
              <p style={{ fontSize: '1rem', color: 'var(--pa-carbon)', maxWidth: '580px', margin: 0 }}>
                Authenticated users can revisit assessment history and trend views tied to their own record.
              </p>
              <Link to="/signup" className="pa-btn-primary">
                Build a record you can revisit
              </Link>
            </div>
          </div>
        </section>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialProgressPage;
