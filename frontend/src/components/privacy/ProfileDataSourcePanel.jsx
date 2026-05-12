import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import StatusBadge from '../ui/StatusBadge';

export default function ProfileDataSourcePanel({ session }) {
  const src = session?.profileSource || '';
  const consent = session?.profileConsent;
  const label =
    src === 'manual_profile' ? 'Manual profile' : src === 'cv_upload' ? 'CV upload' : 'No active profile source';

  return (
    <section className="analytics-section">
      <SectionHeader
        as="div"
        eyebrow="Active session"
        title="Profile data source"
        subtitle="How your current in-progress session captured profile context (if any)."
      />
      <div className="analytics-metric-grid">
        <div>
          <p className="page-header__subtitle">Source</p>
          <StatusBadge label={label} variant="neutral" />
        </div>
        <div>
          <p className="page-header__subtitle">Consent</p>
          <p>{consent?.consentAccepted ? `Accepted (${consent.consentVersion || '—'})` : 'None recorded on session'}</p>
        </div>
      </div>
    </section>
  );
}
