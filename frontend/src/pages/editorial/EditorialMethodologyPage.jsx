import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';

const METHODOLOGY_SECTIONS = [
  {
    id: 'big-five',
    title: 'Big Five',
    copy: 'Personality is represented through continuous dimensions rather than a personality type. Use the dimensions as one layer of evidence, not as a diagnosis or permanent identity.',
  },
  {
    id: 'riasec',
    title: 'RIASEC',
    copy: 'Vocational interests are considered across Realistic, Investigative, Artistic, Social, Enterprising and Conventional patterns.',
  },
  {
    id: 'work-values',
    title: 'Work values',
    copy: 'Work values describe conditions and outcomes that matter in a work environment. Keep them conceptually separate from personality and vocational interests.',
  },
  {
    id: 'contextual-signals',
    title: 'Contextual career signals',
    copy: 'Responses and professional context can add supporting evidence about how someone approaches work. Present these signals as supporting interpretation, not as an independent clinical construct.',
  },
  {
    id: 'career-comparison',
    title: 'Career comparison',
    copy: 'The current application compares the user record with a curated set of career profiles using deterministic weighted logic across multiple evidence layers. Do not describe this as machine learning predicting the correct career.',
  },
  {
    id: 'cv-context',
    title: 'CV context',
    copy: 'When a user chooses to provide a PDF or DOCX CV, the application can extract professional context for use in the experience. Do not describe this as credential verification.',
  },
  {
    id: 'ai-assistance',
    title: 'AI assistance',
    copy: 'Where configured, AI can support narrative explanation or coaching. Core assessment and career-comparison behavior must remain usable when AI assistance is unavailable.',
  },
  {
    id: 'limits',
    title: 'Limits',
    copy: 'Personality Assessor is not a clinical diagnostic service. Do not advertise formal psychometric validation, guaranteed career fit, unsupported accuracy percentages or a permanent reading of a person.',
  },
];

export const EditorialMethodologyPage = () => {
  return (
    <PublicLayout headerTheme="light-content" withFooter={true}>
      <article
        style={{
          backgroundColor: 'var(--pa-mineral)',
          color: 'var(--pa-carbon)',
          paddingTop: 'calc(var(--pa-header-height) + 48px)',
          paddingBottom: 'clamp(80px, 10vh, 140px)',
        }}
        aria-label="Methodology Reading Room"
      >
        <div className="pa-v7-grid">
          {/* Header Field */}
          <div style={{ gridColumn: '1 / -1', maxWidth: '780px', marginBottom: 'clamp(40px, 6vh, 72px)' }}>
            <h1 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-l)', lineHeight: 'var(--pa-display-l-lh)', margin: 0 }}>
              A profile should be inspectable before it is persuasive.
            </h1>
            <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: 'var(--pa-lead-editorial)', color: 'var(--pa-muted-light)', lineHeight: 1.45, marginTop: '1.25rem' }}>
              Personality Assessor keeps different evidence layers visible so users can understand what a reading represents and where its limits are.
            </p>
          </div>

          {/* Sticky Table of Contents Navigation */}
          <aside
            style={{
              gridColumn: '1 / 4',
              position: 'sticky',
              top: '120px',
              height: 'fit-content',
            }}
            aria-label="Methodology sections"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-muted-light)', marginBottom: '0.5rem' }}>
                On this page
              </span>
              {METHODOLOGY_SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  style={{
                    fontFamily: 'var(--pa-font-functional)',
                    fontSize: '0.875rem',
                    color: 'var(--pa-carbon)',
                    textDecoration: 'none',
                    opacity: 0.8,
                    transition: 'opacity 0.18s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '1')}
                  onMouseLeave={(e) => (e.target.style.opacity = '0.8')}
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Reading Column */}
          <div
            style={{
              gridColumn: '5 / 12',
              display: 'flex',
              flexDirection: 'column',
              gap: '3.5rem',
              maxWidth: '720px',
            }}
          >
            {METHODOLOGY_SECTIONS.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                style={{
                  scrollMarginTop: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.15, margin: 0 }}>
                  {sec.title}
                </h2>
                <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '1.0625rem', lineHeight: 1.6, color: 'var(--pa-carbon)', margin: 0 }}>
                  {sec.copy}
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </PublicLayout>
  );
};

export default EditorialMethodologyPage;
