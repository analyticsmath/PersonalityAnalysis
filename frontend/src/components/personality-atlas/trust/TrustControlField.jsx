import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

const TrustControlField = () => {
  const control = PUBLIC_CONTENT.trust.humanControl;

  return (
    <section
      className="pa-atlas-trust-control pa-atlas-grid"
      style={{
        padding: '60px var(--atlas-outer-gutter) 100px',
        backgroundColor: 'var(--atlas-fog)',
        color: 'var(--atlas-ink)',
      }}
      aria-label="User Data Rights & Controls"
    >
      <div style={{ maxWidth: '44rem', marginBottom: '40px' }}>
        <span className="pa-atlas-mono" style={{ color: 'var(--atlas-field)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
          SOVEREIGN RECORD RIGHTS
        </span>
        <h2 className="pa-atlas-heading-lg" style={{ marginBottom: '12px' }}>
          {control.title}
        </h2>
        <p className="pa-atlas-body" style={{ opacity: 0.88 }}>
          {control.lead}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--atlas-column-gap)',
          width: '100%',
        }}
      >
        {control.actions.map((act) => (
          <div
            key={act.id}
            style={{
              backgroundColor: 'var(--atlas-paper)',
              padding: '28px 30px',
              borderRadius: 'var(--atlas-radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <span className="pa-atlas-mono" style={{ fontSize: '0.74rem', color: 'var(--atlas-muted)' }}>
                ACCOUNT CONTROL
              </span>
              <h3 className="pa-atlas-heading-md" style={{ fontSize: '1.25rem', margin: '6px 0 10px' }}>
                {act.label}
              </h3>
              <p className="pa-atlas-body" style={{ fontSize: '0.92rem', opacity: 0.85, lineHeight: 1.55 }}>
                {act.description}
              </p>
            </div>

            <Link
              to="/account/privacy"
              className="pa-atlas-btn-secondary"
              style={{ padding: '0', height: 'auto', fontSize: '0.94rem', color: 'var(--atlas-field)', fontWeight: 540 }}
            >
              <span>Manage in account</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(TrustControlField);
