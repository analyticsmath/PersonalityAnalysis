// frontend/src/pages/editorial/EditorialPrivacyPage.jsx
// Personality Assessor — Privacy Policy & Data Ownership Lifecycle Route

import React from 'react';
import { Link } from 'react-router-dom';
import EditorialHeader from '../../components/editorial/EditorialHeader';
import EditorialFooter from '../../components/editorial/EditorialFooter';
import '../../styles/editorial/editorial-foundation.css';
import '../../styles/editorial/editorial-routes.css';

export default function EditorialPrivacyPage() {
  const lifecycleStages = [
    {
      badge: 'Collection',
      title: 'Contextual Intake & Session Answers',
      desc: 'We store the information you submit during assessment sessions: manual profile text, scenario responses, and selected domain areas.',
    },
    {
      badge: 'Processing',
      title: 'Deterministic Computation',
      desc: 'Your answers are processed deterministically against validated psychometric frameworks (Big Five, RIASEC, and Work Values) to derive trait vectors and career fit indicators.',
    },
    {
      badge: 'Retention',
      title: 'User-Governed Retention',
      desc: 'We keep your assessment, profile, and analytics data until you delete it from Privacy controls or delete your account. No automatic purge is applied by default.',
    },
    {
      badge: 'Export',
      title: 'Profile Data Export (JSON)',
      desc: 'You can download your stored profile and assessment data in structured JSON format directly from your account privacy controls.',
    },
    {
      badge: 'Deletion',
      title: 'Account & Data Deletion',
      desc: 'You can delete individual assessment results, clear manual profile data, or permanently delete your user account and associated records through account settings.',
    },
  ];

  return (
    <div className="ed-route-page">
      <EditorialHeader />

      <header className="ed-route-hero">
        <span className="ed-tag">DATA OWNERSHIP LIFECYCLE</span>
        <h1 className="ed-route-hero__headline">
          Inspectable policies. Verifiable data controls.
        </h1>
        <p className="ed-route-hero__lead">
          This public page explains our data ownership policy and available controls. If you are signed in, you can execute data export and deletion controls directly in your account.
        </p>
      </header>

      <main className="ed-route-body">
        <div className="ed-privacy-lifecycle">
          {lifecycleStages.map((stage) => (
            <div key={stage.badge} className="ed-privacy-stage">
              <div className="ed-privacy-stage__badge">{stage.badge}</div>
              <div className="ed-privacy-stage__content">
                <h2 className="ed-privacy-stage__title">{stage.title}</h2>
                <p className="ed-privacy-stage__desc">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '24px',
          padding: '28px 32px',
          borderRadius: 'var(--ed-radius-card)',
          backgroundColor: 'var(--ed-surface)',
          border: '1px solid var(--ed-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <h3 className="ed-h3" style={{ margin: '0 0 6px 0' }}>Execute Privacy &amp; Account Actions</h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--ed-text-secondary)' }}>
              Signed-in users can manage data export, clear manual profile data, or permanently delete their account.
            </p>
          </div>

          <Link to="/account/privacy" className="ed-btn ed-btn--primary">
            Open Account Privacy Controls →
          </Link>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
