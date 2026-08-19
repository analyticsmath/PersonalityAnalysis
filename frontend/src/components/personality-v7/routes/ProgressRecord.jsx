import React from 'react';
import { Link } from 'react-router-dom';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';

export const ProgressRecord = () => {
  const data = PUBLIC_CONTENT.progress;
  const echo = PUBLIC_CONTENT.home.developmentEcho;

  return (
    <div className="pa-v7-progress-stage">
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
          {data.comparisonNotice}
        </span>
        <h1 className="pa-v7-route-title" style={{ color: 'var(--pa-ink)' }}>
          {data.title}
        </h1>
        <p className="pa-v7-route-lead" style={{ color: 'var(--pa-ink)', opacity: 0.85, marginBottom: '3.5rem' }}>
          {data.lead}
        </p>

        {/* Dual Period Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '2px', boxShadow: '0 8px 24px rgba(24, 26, 22, 0.08)' }}>
            <div style={{ height: '240px', borderRadius: '2px', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <MediaPlane asset={MEDIA_ASSETS_V7.a05} alt="Baseline calibration portrait" />
            </div>
            <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>Baseline Record (Oct 2024)</span>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--pa-ink)', margin: '0.25rem 0 0.5rem' }}>Early Engineering Lead</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--pa-ink)', opacity: 0.8 }}>
              Initial calibration focused on technical analysis and individual problem solving.
            </p>
          </div>

          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '2px', boxShadow: '0 8px 24px rgba(24, 26, 22, 0.08)' }}>
            <div style={{ height: '240px', borderRadius: '2px', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <MediaPlane asset={MEDIA_ASSETS_V7.a06} alt="Current calibration portrait" />
            </div>
            <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>Reassessment (Aug 2026)</span>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--pa-ink)', margin: '0.25rem 0 0.5rem' }}>Cross-Functional Director</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--pa-ink)', opacity: 0.8 }}>
              Expanded strategic agency, negotiation under ambiguity, and organizational alignment.
            </p>
          </div>
        </div>

        {/* Trait Deltas */}
        <div style={{ maxWidth: '820px', borderTop: '1px solid var(--pa-rule-paper)', paddingTop: '2rem', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.375rem', color: 'var(--pa-ink)', marginBottom: '1.5rem' }}>Measured Trait Evolution</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {echo.traitsComparison.map((trait, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--pa-rule-paper)', paddingBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--pa-ink)', fontSize: '0.9375rem' }}>{trait.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--pa-stone)' }}>{trait.status}</div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--pa-ink)', fontSize: '0.9375rem' }}>
                  {trait.earlier}% → {trait.current}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focused Update CTA */}
        <div>
          <Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--ink">
            Start or Update Your Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgressRecord;
