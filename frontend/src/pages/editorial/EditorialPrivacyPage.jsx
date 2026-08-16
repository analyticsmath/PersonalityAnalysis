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
      desc: 'We only collect data you actively submit during an assessment session (CV text, scenario choices, domain preferences). No passive surveillance or third-party tracking.',
    },
    {
      badge: 'Processing',
      title: 'Deterministic Computation & Telemetry',
      desc: 'Your answers are scored deterministically against validated psychometric frameworks (Big Five, RIASEC, Work Values). Processing occurs securely on isolated application servers.',
    },
    {
      badge: 'Storage',
      title: 'Encrypted Persistence & Isolation',
      desc: 'Profiles, assessment history, and career fit mappings are stored with database encryption at rest. Records are isolated to your authenticated account credentials.',
    },
    {
      badge: 'Export',
      title: 'Portable Data Export (JSON)',
      desc: 'You can download your entire assessment record, raw answers, psychometric dimensions, and longitudinal history as portable JSON at any time.',
    },
    {
      badge: 'Deletion',
      title: 'Permanent Account & Data Purge',
      desc: 'You can execute an irreversible deletion of your account and all associated assessment records directly from your account settings with immediate cascade.',
    },
  ];

  return (
    <div className="ed-route-page">
      <EditorialHeader />

      <header className="ed-route-hero">
        <span className="ed-tag">DATA OWNERSHIP LIFECYCLE</span>
        <h1 className="ed-route-hero__headline">
          You own your psychometric profile and all associated data.
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
              Signed-in users can manage data export, revoke session access, or trigger permanent account deletion.
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
