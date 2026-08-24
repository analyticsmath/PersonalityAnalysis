import React from 'react';
import ProportionalWeights from './ProportionalWeights';
import ResponseFragment from '../fragments/ResponseFragment';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

const MethodologyPublication = () => {
  const content = PUBLIC_CONTENT.methodology;
  const frameworks = content.frameworks;

  return (
    <article
      className="pa-atlas-methodology-pub pa-atlas-grid"
      style={{
        padding: 'calc(var(--atlas-header-height-desktop) + 40px) var(--atlas-outer-gutter) 100px',
        backgroundColor: 'var(--atlas-paper)',
        color: 'var(--atlas-ink)',
      }}
      aria-label="Research Methodology Publication"
    >
      {/* Title & Opening Field */}
      <header style={{ maxWidth: '48rem', marginBottom: '56px' }}>
        <span className="pa-atlas-mono" style={{ color: 'var(--atlas-field)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
          RESEARCH PUBLICATION & PSYCHOMETRIC SPECIFICATION
        </span>
        <h1 className="pa-atlas-display-lg" style={{ color: 'var(--atlas-ink)', marginBottom: '16px' }}>
          {content.hero.headline}
        </h1>
        <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-ink)', opacity: 0.88 }}>
          {content.hero.lead}
        </p>
      </header>

      {/* Framework Text Index (Not pills, no boxes, no numbers) */}
      <nav
        style={{
          display: 'flex',
          gap: 'clamp(14px, 2vw, 28px)',
          flexWrap: 'wrap',
          marginBottom: '64px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--atlas-fog)',
        }}
        aria-label="Framework Jump Links"
      >
        {frameworks.map((fw) => (
          <a
            key={fw.id}
            href={`#${fw.id}`}
            style={{
              fontFamily: 'var(--atlas-font-sans)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--atlas-field)',
              opacity: 0.8,
              transition: 'opacity 160ms ease',
            }}
          >
            {fw.name}
          </a>
        ))}
      </nav>

      {/* Long-form Methodological Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', maxWidth: 'var(--atlas-measure-reading)' }}>
        {frameworks.map((fw) => (
          <section key={fw.id} id={fw.id} style={{ scrollMarginTop: '100px' }}>
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-muted)', fontSize: '0.76rem', display: 'block', marginBottom: '6px' }}>
              {fw.role.toUpperCase()}
            </span>
            <h2 className="pa-atlas-heading-lg" style={{ color: 'var(--atlas-ink)', marginBottom: '14px' }}>
              {fw.name}
            </h2>
            <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-ink)', opacity: 0.88, lineHeight: 1.65 }}>
              {fw.description}
            </p>
          </section>
        ))}

        {/* Editorial Pull Statement */}
        <div
          style={{
            margin: '24px 0',
            padding: '32px 36px',
            backgroundColor: 'var(--atlas-field)',
            color: 'var(--atlas-paper)',
            borderRadius: 'var(--atlas-radius-sm)',
          }}
        >
          <ResponseFragment
            variant="response"
            text="“Psychometric validity requires that independent constructs remain separate rather than collapsed into a single convenience index.”"
            style={{ fontSize: '1.35rem', color: 'var(--atlas-paper)' }}
          />
        </div>

        {/* Deterministic Proportional Scoring Calibration */}
        <ProportionalWeights />
      </div>
    </article>
  );
};

export default React.memo(MethodologyPublication);
