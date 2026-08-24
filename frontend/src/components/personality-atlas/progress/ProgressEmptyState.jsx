import React from 'react';
import { Link } from 'react-router-dom';
import ResponseFragment from '../fragments/ResponseFragment';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

const ProgressEmptyState = () => {
  const empty = PUBLIC_CONTENT.progress.emptyState;

  return (
    <section
      className="pa-atlas-progress-empty pa-atlas-grid"
      style={{
        padding: '100px var(--atlas-outer-gutter) 120px',
        backgroundColor: 'var(--atlas-field)',
        color: 'var(--atlas-paper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
      aria-label="Progress Initial Baseline"
    >
      <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
        <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', display: 'block', marginBottom: '12px' }}>
          INITIAL BASELINE
        </span>
        <h2 className="pa-atlas-heading-xl" style={{ marginBottom: '16px' }}>
          {empty.headline}
        </h2>
        <p className="pa-atlas-body-lg" style={{ opacity: 0.88, marginBottom: '32px' }}>
          {empty.lead}
        </p>

        <div style={{ margin: '0 auto 36px', maxWidth: '38rem' }}>
          <ResponseFragment
            variant="response"
            text={empty.responseFragment}
            sourceId="0x8F4A"
            style={{
              backgroundColor: 'rgba(239, 245, 242, 0.08)',
              padding: '20px 28px',
              borderRadius: 'var(--atlas-radius-sm)',
            }}
          />
        </div>

        <Link to="/assessment/start" className="pa-atlas-btn-primary">
          {empty.cta}
        </Link>
      </div>
    </section>
  );
};

export default React.memo(ProgressEmptyState);
