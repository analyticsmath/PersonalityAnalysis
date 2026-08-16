// frontend/src/pages/editorial/EditorialProgressPage.jsx
// Personality Assessor — Longitudinal Progress Editorial Route

import React from 'react';
import { Link } from 'react-router-dom';
import EditorialHeader from '../../components/editorial/EditorialHeader';
import EditorialFooter from '../../components/editorial/EditorialFooter';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-foundation.css';
import '../../styles/editorial/editorial-routes.css';

export default function EditorialProgressPage() {
  const milestones = [
    {
      period: 'Baseline Intake',
      title: 'Initial Dimension Calibration',
      desc: 'First baseline established across Big Five and RIASEC models based on initial adaptive scenarios and resume context.',
      image: EDITORIAL_MEDIA_ASSETS.hero.actor1.src,
      delta: 'Foundational Baseline',
    },
    {
      period: 'Milestone 2 · Senior Transition',
      title: 'Technical Strategy & Systems Architecture',
      desc: 'Updated assessment incorporated architecture review documents, shifting Conscientiousness and Systemic Reasoning signals upward.',
      image: EDITORIAL_MEDIA_ASSETS.hero.actor6.src,
      delta: '+ Strategic Synthesis',
    },
    {
      period: 'Milestone 3 · Team Leadership',
      title: 'Multidisciplinary Alignment & Cross-Functional Governance',
      desc: 'Submitting team delivery artifacts calibrated extraversion and collaboration load tolerances for executive engineering tracks.',
      image: EDITORIAL_MEDIA_ASSETS.hero.actor5.src,
      delta: '+ Cross-Team Velocity',
    },
  ];

  return (
    <div className="ed-route-page">
      <EditorialHeader />

      <header className="ed-route-hero">
        <span className="ed-tag">LONGITUDINAL INTELLIGENCE</span>
        <h1 className="ed-route-hero__headline">
          Profiles that evolve alongside your career milestones.
        </h1>
        <p className="ed-route-hero__lead">
          Track trait and capability shifts over time with inspectable evidence snapshots, maintaining continuity as your responsibilities expand.
        </p>
      </header>

      <main className="ed-route-body">
        {milestones.map((m, idx) => (
          <div
            key={m.period}
            className={`ed-storyboard-step ${idx % 2 === 1 ? 'ed-storyboard-step--reversed' : ''}`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="ed-tag ed-tag--accent" style={{ margin: 0 }}>{m.period}</span>
              <h2 className="ed-h2" style={{ margin: 0 }}>
                {m.title}
              </h2>
              <p className="ed-lead" style={{ fontSize: '15px' }}>
                {m.desc}
              </p>
              <div style={{ marginTop: '8px' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: 'var(--ed-ink)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: 'var(--ed-radius-pill)',
                }}>
                  {m.delta}
                </span>
              </div>
            </div>

            <div className="ed-storyboard-step__visual">
              <img src={m.image} alt={m.title} loading="lazy" />
            </div>
          </div>
        ))}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link to="/assessment/start" className="ed-btn ed-btn--primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
            Update your profile telemetry →
          </Link>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
