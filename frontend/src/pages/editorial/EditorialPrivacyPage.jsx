import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import { PUBLIC_CONTENT } from '../../content/personality-v7/publicContent';

export const EditorialPrivacyPage = () => {
  const data = PUBLIC_CONTENT.privacy;

  return (
    <PublicLayout headerTheme="light-content" withFooter={true}>
      <article
        style={{
          backgroundColor: 'var(--pa-mineral)',
          color: 'var(--pa-carbon)',
          paddingTop: 'calc(var(--pa-header-height) + 48px)',
          paddingBottom: 'clamp(80px, 10vh, 140px)',
        }}
        aria-label="Privacy Policy"
      >
        <div className="pa-v7-grid">
          {/* Header Field */}
          <div style={{ gridColumn: '1 / -1', maxWidth: '780px', marginBottom: 'clamp(40px, 6vh, 72px)' }}>
            <h1 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-l)', lineHeight: 'var(--pa-display-l-lh)', margin: 0 }}>
              Privacy
            </h1>
            <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: 'var(--pa-lead-editorial)', color: 'var(--pa-muted-light)', lineHeight: 1.45, marginTop: '1.25rem' }}>
              Read how Personality Assessor handles assessment data and the controls available to your account.
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
            aria-label="Privacy document sections"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-muted-light)', marginBottom: '0.5rem' }}>
                On this page
              </span>
              {data.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
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
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Reading Document */}
          <div
            style={{
              gridColumn: '5 / 12',
              display: 'flex',
              flexDirection: 'column',
              gap: '3.5rem',
              maxWidth: '720px',
            }}
          >
            {data.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                style={{
                  scrollMarginTop: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.15, margin: 0 }}>
                  {section.title}
                </h2>
                <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '1.0625rem', lineHeight: 1.6, color: 'var(--pa-carbon)', margin: 0 }}>
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </PublicLayout>
  );
};

export default EditorialPrivacyPage;
