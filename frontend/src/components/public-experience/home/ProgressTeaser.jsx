import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';

export const ProgressTeaser = () => {
  const data = PUBLIC_CONTENT.home.timeExposure;
  const [temporalState, setTemporalState] = useState('baseline');

  return (
    <section className="pa-px-ch-progress-teaser" aria-label="Progress Longitudinal Teaser">
      <div className="pa-px-ch-progress-teaser__inner">
        <div>
          <span className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase' }}>
            Longitudinal Tracking
          </span>
          <h2 className="pa-px-heading-xl" style={{ marginTop: '8px', marginBottom: '16px' }}>
            {data.headline}
          </h2>
          <p className="pa-px-body-lg" style={{ marginBottom: '24px' }}>
            {data.support}
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button
              type="button"
              className={`pa-px-btn-${temporalState === 'baseline' ? 'primary' : 'secondary'}`}
              style={{ height: '42px', padding: '0 18px', fontSize: '0.9rem' }}
              onClick={() => setTemporalState('baseline')}
            >
              {data.baselineLabel}
            </button>
            <button
              type="button"
              className={`pa-px-btn-${temporalState === 'later' ? 'primary' : 'secondary'}`}
              style={{ height: '42px', padding: '0 18px', fontSize: '0.9rem' }}
              onClick={() => setTemporalState('later')}
            >
              {data.laterLabel}
            </button>
          </div>

          <Link to="/progress" className="pa-px-btn-text">
            Explore Longitudinal Progress &rarr;
          </Link>
        </div>

        <div style={{ background: 'var(--pa-paper)', padding: 'var(--px-space-content)', borderRadius: 'var(--px-radius-sm)', border: '1px solid var(--pa-mineral)' }}>
          <div style={{ width: '100%', aspectRatio: '16 / 10', borderRadius: 'var(--px-radius-xs)', overflow: 'hidden', marginBottom: '16px' }}>
            <PublicPicture
              assetKey={temporalState === 'baseline' ? 'homeSituationDetail' : 'workworldAutonomy'}
              alt={temporalState === 'baseline' ? 'Initial baseline assessment context' : 'Shifted later responsibilities context'}
            />
          </div>
          <div className="pa-px-body" style={{ fontWeight: 500, color: 'var(--pa-ink)' }}>
            {temporalState === 'baseline' ? data.stabilityFinding : data.adaptationFinding}
          </div>
          <div className="pa-px-data" style={{ marginTop: '6px' }}>
            {data.disclaimer}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressTeaser;
