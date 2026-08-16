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
      desc: 'You provide contextual inputs: optional profile text, role preferences, or scenario trade-offs. Responses are processed strictly in the context of the assessment session.',
    },
    {
      stage: '02',
      name: 'Structured Psychometrics',
      desc: 'Validated deterministic algorithms compute scores across Big Five, RIASEC, and Work Values. Weight mappings are consistent, inspectable, and reproducible.',
    },
    {
      stage: '03',
      name: 'Narrative Synthesis',
      desc: 'Qualitative synthesis summarizes trait combinations to highlight practical team dynamics and growth avenues without altering calculated scores.',
    },
    {
      stage: '04',
      name: 'User Data Controls',
      desc: 'You maintain direct control over your stored assessments and profile records. You can export your data as JSON or delete your records and account at any time.',
    },
  ];

  return (
    <div className="ed-route-page">
      <EditorialHeader />

      <header className="ed-route-hero">
        <span className="ed-tag">TRUST &amp; TRANSPARENCY</span>
        <h1 className="ed-route-hero__headline">
          Transparency in scoring. Direct user data control.
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
