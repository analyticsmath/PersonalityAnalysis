import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShield } from 'react-icons/fi';
import Button from '../components/ui/Button';
import ProductShell from '../components/product/ProductShell';
import ProfileDataSourcePanel from '../components/privacy/ProfileDataSourcePanel';
import DataExportPanel from '../components/privacy/DataExportPanel';
import DataDeletionPanel from '../components/privacy/DataDeletionPanel';
import AiTransparencyPanel from '../components/privacy/AiTransparencyPanel';
import { useActiveFlowSessionQuery } from '../hooks/useAssessmentFlow';
import '../styles/settings-product.css';

export default function PrivacyControlsPage() {
  const navigate = useNavigate();
  const q = useActiveFlowSessionQuery(true);

  return (
    <ProductShell
      title="Account & Privacy"
      actions={
        <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft /> Overview
        </Button>
      }
    >
      <div className="settings-shell">
        <header className="settings-header">
          <h1 className="settings-header__title">Privacy &amp; Account Governance</h1>
          <p className="settings-header__subtitle">
            You maintain direct control over your stored assessments, CV context, and profile records. You can export
            your full data at any time or selectively delete individual records.
          </p>
        </header>

        <ProfileDataSourcePanel session={q.data?.session} />
        <DataExportPanel />
        <DataDeletionPanel />
        <AiTransparencyPanel />

        <section className="settings-section-card" aria-labelledby="security-guidelines-title">
          <div className="settings-section-card__head">
            <h2 id="security-guidelines-title" className="settings-section-card__title">
              Security Guidelines
            </h2>
            <p className="settings-section-card__desc">
              Operational best practices for account credentials and uploaded documents.
            </p>
          </div>
          <div className="settings-section-card__body">
            <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.6 }}>
              Maintain a strong, unique password and keep your credentials secure. Avoid uploading unredacted personal
              identification numbers or confidential trade secrets in your CV documents.
            </p>
          </div>
        </section>
      </div>
    </ProductShell>
  );
}
