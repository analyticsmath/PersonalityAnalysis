import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';

export const PrivacyDocument = () => {
  const { privacy } = PUBLIC_CONTENT;

  return (
    <div
      className="pa-v6-privacy-page"
      data-header-theme="light"
      style={{ backgroundColor: 'var(--pa-bone)', color: 'var(--pa-obsidian)', minHeight: '100svh', padding: '7rem 4rem 6rem 4rem' }}
    >
      <article style={{ maxWidth: '820px', margin: '0 auto' }}>

        <header style={{ marginBottom: '3.5rem', borderBottom: '1px solid var(--pa-rule-dark)', paddingBottom: '2rem' }}>
          <span style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pa-muted)', fontWeight: 600 }}>
            Governance & Privacy Policy
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: 1.05, color: 'var(--pa-obsidian)', margin: '0.5rem 0 1rem 0' }}>
            {privacy.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--pa-charcoal)', lineHeight: 1.5, margin: 0 }}>
            {privacy.lead}
          </p>
          <div style={{ fontSize: '0.8125rem', color: 'var(--pa-muted)', marginTop: '1rem' }}>
            Last Updated: {privacy.lastUpdated}
          </div>
        </header>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {privacy.sections.map((section) => (
            <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--pa-obsidian)', margin: 0 }}>
                {section.title}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--pa-charcoal)', lineHeight: 1.65, margin: 0 }}>
                {section.content}
              </p>
            </section>
          ))}
        </main>
      </article>
    </div>
  );
};

export default PrivacyDocument;
