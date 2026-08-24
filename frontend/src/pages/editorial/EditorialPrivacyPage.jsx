import React, { useState, useEffect } from 'react';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import { PUBLIC_CONTENT } from '../../content/personality-atlas/publicContent';

export const EditorialPrivacyPage = () => {
  const content = PUBLIC_CONTENT.privacy;
  const sections = content.sections;
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSectionId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <AtlasScrollProvider>
      <AtlasLayout>
        <article
          className="pa-atlas-privacy-page pa-atlas-grid"
          style={{
            padding: 'calc(var(--atlas-header-height-desktop) + 40px) var(--atlas-outer-gutter) 100px',
            backgroundColor: 'var(--atlas-paper)',
            color: 'var(--atlas-ink)',
          }}
          aria-label="Privacy Terms & Policy"
        >
          {/* Header */}
          <header style={{ maxWidth: '48rem', marginBottom: '56px', gridColumn: '1 / -1' }}>
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-field)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
              LEGAL TERMS & DATA GOVERNANCE
            </span>
            <h1 className="pa-atlas-display-lg" style={{ color: 'var(--atlas-ink)', marginBottom: '16px' }}>
              {content.hero.headline}
            </h1>
            <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-ink)', opacity: 0.88 }}>
              {content.hero.lead}
            </p>
          </header>

          {/* Sticky Table of Contents (Left) & Reading Column (Right) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--atlas-column-gap)',
              alignItems: 'start',
              gridColumn: '1 / -1',
            }}
          >
            {/* Sticky Table of Contents */}
            <nav
              style={{
                position: 'sticky',
                top: 'calc(var(--atlas-header-height-desktop) + 24px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                paddingBottom: '24px',
              }}
              aria-label="Privacy Table of Contents"
            >
              <span className="pa-atlas-mono" style={{ fontSize: '0.74rem', color: 'var(--atlas-muted)' }}>
                CONTENTS:
              </span>
              {sections.map((sec) => {
                const isActive = sec.id === activeSectionId;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    style={{
                      fontFamily: 'var(--atlas-font-sans)',
                      fontSize: '0.96rem',
                      fontWeight: isActive ? 560 : 420,
                      color: isActive ? 'var(--atlas-field)' : 'var(--atlas-ink)',
                      opacity: isActive ? 1 : 0.6,
                      transform: isActive ? 'translateX(6px)' : 'none',
                      transition: 'all 160ms ease',
                    }}
                  >
                    {sec.title}
                  </a>
                );
              })}
            </nav>

            {/* Reading Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', maxWidth: 'var(--atlas-measure-reading)' }}>
              {sections.map((sec) => (
                <section key={sec.id} id={sec.id} style={{ scrollMarginTop: '110px' }}>
                  <h2 className="pa-atlas-heading-lg" style={{ color: 'var(--atlas-ink)', marginBottom: '14px', fontSize: '1.6rem' }}>
                    {sec.title}
                  </h2>
                  <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-ink)', opacity: 0.88, lineHeight: 1.65 }}>
                    {sec.content}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </article>
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default EditorialPrivacyPage;
