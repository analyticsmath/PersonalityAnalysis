import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';

export const ProgressRecord = () => {
  const { progress, home } = PUBLIC_CONTENT;
  const { developmentEcho } = home;

  return (
    <>
      <section className="pa-route-hero">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{progress.title}</h1>
            <p>{progress.lead}</p>
          </div>
        </div>
      </section>

      <section className="pa-echo-section" aria-label="Historical Profile Comparison">
        <div className="pa-container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 'var(--pa-track-status)',
                color: 'var(--pa-cool-600)',
                background: 'var(--pa-cool-100)',
                padding: '4px 12px',
                borderRadius: 'var(--pa-radius-btn)',
              }}
            >
              {progress.comparisonNotice}
            </span>
          </div>

          <div className="pa-echo-field">
            <div className="pa-echo-dates-header">
              <div className="pa-echo-date-block">
                <span className="pa-echo-date-label">{developmentEcho.earlierLabel}</span>
                <span className="pa-echo-date-val">{developmentEcho.earlierDate}</span>
              </div>
              <div className="pa-echo-date-block" style={{ textAlign: 'right' }}>
                <span className="pa-echo-date-label">{developmentEcho.currentLabel}</span>
                <span className="pa-echo-date-val">{developmentEcho.currentDate}</span>
              </div>
            </div>

            <div className="pa-echo-comparison-rows">
              {developmentEcho.traitsComparison.map((item, idx) => (
                <div key={idx} className="pa-echo-row">
                  <div className="pa-echo-row-label">{item.label}</div>

                  <div className="pa-echo-track">
                    <div
                      className="pa-echo-dot-earlier"
                      style={{ left: `${item.earlier}%` }}
                      title={`Earlier: ${item.earlier}%`}
                    />
                    {item.earlier !== item.current && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '3px',
                          left: `${Math.min(item.earlier, item.current)}%`,
                          width: `${Math.abs(item.current - item.earlier)}%`,
                          height: '2px',
                          backgroundColor: 'var(--pa-ink)',
                        }}
                      />
                    )}
                    <div
                      className="pa-echo-dot-current"
                      style={{ left: `${item.current}%` }}
                      title={`Current: ${item.current}%`}
                    />
                  </div>

                  <div className="pa-echo-status">{item.status}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to={getSignupAcquisitionUrl()} className="pa-btn pa-btn--primary">
              Start building my profile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgressRecord;
