import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
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
        <SectionHeader
          eyebrow="Phase 8"
          title="Privacy & account controls"
          subtitle="Transparency-first controls for export, deletion, and AI data handling. Not legal compliance documentation."
          actions={
            <Link className="history-item__link" to="/trust">
              Trust &amp; safety
            </Link>
          }
        />

        <section className="analytics-section">
          <h2 className="section-header__title">Privacy overview</h2>
          <p className="page-header__subtitle">
            We store account, assessment, analytics, and optional AI artifacts to run the product. Retention is until
            you delete data here or delete your account. See docs/architecture/privacy-data-governance.md for a full
            inventory.
          </p>
        </section>

        <ProfileDataSourcePanel session={q.data?.session} />
        <DataExportPanel />
        <DataDeletionPanel />
        <AiTransparencyPanel />

        <section className="analytics-section">
          <h2 className="section-header__title">Security notes</h2>
          <p className="page-header__subtitle">
            Use a strong unique password, keep your token private, and avoid uploading highly sensitive secrets into CV
            or manual profile text.
          </p>
        </section>
      </div>
    </main>
  );
}
