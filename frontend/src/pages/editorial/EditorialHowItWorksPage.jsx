import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';

const STAGES = [
  {
    id: 'stage-context',
    title: 'Context changes what an answer means.',
    body: 'Background information, CV context when you choose to provide it, and earlier responses can inform the path through the assessment.',
    aspect: 'Background & Framing',
  },
  {
    id: 'stage-adaptive',
    title: 'The next question can depend on what came before.',
    body: 'The assessment runs through staged questions rather than presenting every person with one fixed marketing quiz.',
    aspect: 'Staged Inquiry',
  },
  {
    id: 'stage-readings',
    title: 'Personality, interests and work values remain separate readings.',
    body: 'Big Five, RIASEC and work-value evidence retain their own meaning. Contextual career signals can support interpretation without flattening the record into one opaque personality score.',
    aspect: 'Multi-Lens Decomposition',
  },
  {
    id: 'stage-careers',
    title: 'The record is compared with curated role profiles.',
    body: 'The current implementation uses deterministic comparison logic across multiple evidence layers. Present career results as material for exploration rather than a prediction of the one correct career.',
    aspect: 'Deterministic Comparison',
  },
  {
    id: 'stage-revisit',
    title: 'Later assessments become new evidence.',
    body: 'History and trend views make it possible to compare what stayed stable with what changed.',
    aspect: 'Longitudinal Revisit',
  },
];

export const EditorialHowItWorksPage = () => {
  const asset = MEDIA_ASSETS_V7.howItWorksCraft;

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        {/* ── Opening Section ── */}
        <section
          style={{
            backgroundColor: 'var(--pa-mineral)',
            color: 'var(--pa-carbon)',
            paddingTop: 'calc(var(--pa-header-height) + 40px)',
            paddingBottom: 'clamp(60px, 8vh, 100px)',
          }}
          aria-label="How It Works Overview"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / 8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h1 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-l)', lineHeight: 'var(--pa-display-l-lh)' }}>
                A response enters the record in context.
              </h1>
              <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: 'var(--pa-body-l)', color: 'var(--pa-muted-light)', lineHeight: 1.5, maxWidth: '640px' }}>
                The assessment separates different kinds of evidence so they can be inspected before they are used together for career exploration.
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

        {/* ── Stages Flow Section ── */}
        <section
          style={{
            backgroundColor: 'var(--pa-mineral)',
            color: 'var(--pa-carbon)',
            padding: 'clamp(60px, 8vh, 100px) 0',
          }}
          aria-label="Assessment Pipeline Stages"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / 5', position: 'sticky', top: '120px' }}>
              <div
                style={{
                  padding: '1.75rem',
                  background: 'var(--pa-carbon)',
                  color: 'var(--pa-mineral)',
                  borderRadius: 'var(--pa-radius-control)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
                  The Evidence Object
                </span>
                <p style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.1875rem', lineHeight: 1.4, margin: 0 }}>
                  One inspectable response moves through context, staged inquiry, separate framework readings, and deterministic career comparison.
                </p>
              </div>
            </div>

            <div style={{ gridColumn: '6 / 13', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {STAGES.map((stage) => (
                <div
                  key={stage.id}
                  style={{
                    padding: '2.25rem 2.5rem',
                    background: '#ECEFEA',
                    borderRadius: 'var(--pa-radius-control)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pa-oxblood)' }}>
                    {stage.aspect}
                  </span>
                  <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.15, margin: 0 }}>
                    {stage.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: 'var(--pa-body)', color: 'var(--pa-muted-light)', lineHeight: 1.55, margin: 0 }}>
                    {stage.body}
                  </p>
                </div>
              ))}

              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/signup" className="pa-btn-primary">
                  Create your first record
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHowItWorksPage;
