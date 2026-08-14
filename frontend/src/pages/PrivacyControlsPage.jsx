import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ProfileDataSourcePanel from '../components/privacy/ProfileDataSourcePanel';
import DataExportPanel from '../components/privacy/DataExportPanel';
import DataDeletionPanel from '../components/privacy/DataDeletionPanel';
import AiTransparencyPanel from '../components/privacy/AiTransparencyPanel';
import { useActiveFlowSessionQuery } from '../hooks/useAssessmentFlow';

export default function PrivacyControlsPage() {
  const q = useActiveFlowSessionQuery(true);

  return (
    <main className="app-page privacy-page">
      <div className="page-shell">
        <header className="page-header">
          <div className="page-header__actions-row">
            <Link to="/dashboard" className="public-text-action">
              <FiArrowLeft /> Back to dashboard
            </Link>
          </div>
          <h1 className="page-header__title">Privacy &amp; Account Controls</h1>
          <p className="page-header__subtitle">
            Manage data export, selective record deletion, CV context retention, and permanent account removal.
          </p>
        </header>

        <section className="analytics-section">
          <h2 className="section-header__title">Data Governance Overview</h2>
          <p className="page-header__subtitle">
            You maintain direct control over your stored assessments, CV context, and profile records. You can export
            your full data at any time or selectively delete individual records.
          </p>
        </section>

        <ProfileDataSourcePanel session={q.data?.session} />
        <DataExportPanel />
        <DataDeletionPanel />
        <AiTransparencyPanel />

        <section className="analytics-section">
          <h2 className="section-header__title">Security Guidelines</h2>
          <p className="page-header__subtitle">
            Maintain a strong, unique password and keep your credentials secure. Avoid uploading unredacted personal
            identification numbers or confidential trade secrets in your CV documents.
          </p>
        </section>
      </div>
    </main>
  );
}
