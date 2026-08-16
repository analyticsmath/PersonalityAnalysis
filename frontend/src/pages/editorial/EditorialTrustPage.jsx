// frontend/src/pages/editorial/EditorialTrustPage.jsx
// Personality Assessor — Trust & Transparency Route

import React from 'react';
import { Link } from 'react-router-dom';
import EditorialHeader from '../../components/editorial/EditorialHeader';
import EditorialFooter from '../../components/editorial/EditorialFooter';
import '../../styles/editorial/editorial-foundation.css';
import '../../styles/editorial/editorial-routes.css';

export default function EditorialTrustPage() {
  const pipelineStages = [
    {
      stage: '01',
      name: 'Evidence Intake',
      desc: 'You provide verified contextual signals: resume documents, role preferences, or direct scenario trade-offs. Nothing is inferred without direct user input.',
    },
    {
      stage: '02',
      name: 'Structured Psychometrics',
      desc: 'Validated algorithms compute scores for Big Five, RIASEC, and Work Values deterministically. Weight mappings are consistent, inspectable, and reproducible.',
    },
    {
      stage: '03',
      name: 'Narrative Synthesis',
      desc: 'Qualitative insights summarize trait combinations to highlight practical team dynamics and growth avenues without altering calculated scores.',
    },
    {
      stage: '04',
      name: 'User Data Ownership',
      desc: 'You maintain 100% control over your data. Export your entire assessment history anytime or delete your account permanently with one click.',
    },
  ];

  return (
    <div className="ed-route-page">
      <EditorialHeader />

      <header className="ed-route-hero">
        <span className="ed-tag">TRUST &amp; TRANSPARENCY</span>
        <h1 className="ed-route-hero__headline">
          Transparency in scoring. Absolute user data ownership.
        </h1>
        <p className="ed-route-hero__lead">
          We believe psychometric assessments should never function as opaque gatekeepers. Every calculation, framework mapping, and recommendation is fully inspectable.
        </p>
      </header>

      <main className="ed-route-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pipelineStages.map((st) => (
            <div key={st.stage} className="ed-privacy-stage">
              <div className="ed-privacy-stage__badge">Stage {st.stage}</div>
              <div className="ed-privacy-stage__content">
                <h2 className="ed-privacy-stage__title">{st.name}</h2>
                <p className="ed-privacy-stage__desc">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/assessment/start" className="ed-btn ed-btn--primary">
            Build your profile →
          </Link>
          <Link to="/privacy" className="ed-btn ed-btn--secondary">
            Inspect privacy controls →
          </Link>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
