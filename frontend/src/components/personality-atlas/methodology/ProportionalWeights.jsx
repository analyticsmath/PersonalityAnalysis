import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

const ProportionalWeights = () => {
  const weights = PUBLIC_CONTENT.methodology.weights;

  return (
    <section
      className="pa-atlas-methodology-weights"
      style={{
        padding: '60px 0 80px',
      }}
      aria-label="Multi-Factor Career Scoring Distribution"
    >
      <div style={{ maxWidth: '44rem', marginBottom: '32px' }}>
        <span className="pa-atlas-mono" style={{ color: 'var(--atlas-field)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
          DETERMINISTIC SCORING WEIGHTS
        </span>
        <h2 className="pa-atlas-heading-lg" style={{ color: 'var(--atlas-ink)', marginBottom: '12px' }}>
          Fixed multi-factor career calibration distribution.
        </h2>
        <p className="pa-atlas-body" style={{ color: 'var(--atlas-ink)', opacity: 0.85 }}>
          Career alignment calculations use verified mathematical weights without black-box adjustments.
        </p>
      </div>

      {/* Typographic Proportional Open Field */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {weights.map((w) => (
          <div
            key={w.id}
            style={{
              padding: '24px 28px',
              backgroundColor: 'var(--atlas-fog)',
              borderRadius: 'var(--atlas-radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '140px',
            }}
          >
            <div>
              <span className="pa-atlas-display-lg" style={{ color: 'var(--atlas-field)', lineHeight: 1 }}>
                {w.percentage}%
              </span>
              <h3 className="pa-atlas-heading-md" style={{ color: 'var(--atlas-ink)', fontSize: '1.15rem', marginTop: '8px' }}>
                {w.label}
              </h3>
            </div>
            <span className="pa-atlas-mono" style={{ fontSize: '0.74rem', color: 'var(--atlas-muted)', marginTop: '12px' }}>
              {w.role.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(ProportionalWeights);
