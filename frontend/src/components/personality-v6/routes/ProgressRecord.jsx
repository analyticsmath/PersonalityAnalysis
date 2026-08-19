import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import MediaPlane from '../motion/MediaPlane';

export const ProgressRecord = () => {
  const { progress, home } = PUBLIC_CONTENT;
  const { developmentEcho } = home;

  return (
    <div className="pa-v6-progress-page" style={{ backgroundColor: 'var(--pa-obsidian)', color: 'var(--pa-bone)' }}>
      {/* Visual Header with A05 */}
      <section style={{ position: 'relative', height: '65svh', width: '100%', overflow: 'hidden' }}>
        <MediaPlane
          asset={MEDIA_ASSETS_V6.a05}
          objectPosition="50% 40%"
          alt="Progress Record Lead Visual"
          priority={true}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,18,16,0.95) 0%, rgba(17,18,16,0.4) 60%, rgba(17,18,16,0.7) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '3.5rem', left: '4rem', right: '4rem', maxWidth: '820px', zIndex: 2 }}>
          <span style={{ fontSize: '0.8125rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pa-stone)', fontWeight: 600 }}>
            Longitudinal Tracking
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'var(--pa-bone)', margin: '0.5rem 0 1rem 0' }}>
            {progress.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--pa-stone)', lineHeight: 1.5 }}>
            {progress.lead}
          </p>
        </div>
      </section>

      {/* Comparative Record Section */}
      <section style={{ padding: '6rem 4rem', borderTop: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem', borderBottom: '1px solid var(--pa-rule-light)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>Comparative Assessment Record</h2>
            <span style={{ fontSize: '0.8125rem', color: 'var(--pa-stone)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {progress.comparisonNotice}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ background: 'rgba(29, 30, 26, 0.7)', padding: '2rem', borderRadius: '2px', border: '1px solid var(--pa-rule-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--pa-stone)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Baseline
              </div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--pa-bone)', display: 'block', marginBottom: '1.5rem' }}>
                {developmentEcho.earlierDate}
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {developmentEcho.traitsComparison.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(251, 250, 245, 0.08)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--pa-stone)' }}>{item.label}</span>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--pa-bone)' }}>{item.earlier}%</strong>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(29, 30, 26, 0.7)', padding: '2rem', borderRadius: '2px', border: '1px solid var(--pa-bone)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--pa-bone)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                Active Profile
              </div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--pa-bone)', display: 'block', marginBottom: '1.5rem' }}>
                {developmentEcho.currentDate}
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {developmentEcho.traitsComparison.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(251, 250, 245, 0.08)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--pa-stone)' }}>{item.label}</span>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--pa-bone)' }}>{item.current}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to={getSignupAcquisitionUrl('/assessment/start')} className="pa-v6-btn pa-v6-btn--primary">
              Build your baseline profile →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgressRecord;
