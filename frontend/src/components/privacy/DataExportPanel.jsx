import React, { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import { exportAccountDataJson } from '../../api/accountApi';

export default function DataExportPanel() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const runExport = async () => {
    setError('');
    setStatus('loading');
    try {
      const data = await exportAccountDataJson();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `personality-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus('success');
    } catch (e) {
      setError(e.message || 'Export failed');
      setStatus('error');
    }
  };

  return (
    <section className="analytics-section" aria-labelledby="export-heading">
      <SectionHeader
        as="div"
        eyebrow="Data portability"
        title="Export my data"
        subtitle="Download a JSON snapshot of stored account, session, result, and roadmap data. Password hashes and server secrets are never included."
      />
      <h2 id="export-heading" className="visually-hidden">
        Export
      </h2>
      {status === 'loading' ? <LoadingState message="Preparing export" /> : null}
      {status === 'error' && error ? <ErrorState title="Export failed" message={error} /> : null}
      {status === 'success' ? (
        <p className="ui-message ui-message--neutral" role="status" aria-live="polite">
          Download started. Check your browser downloads folder.
        </p>
      ) : null}
      <div className="privacy-actions">
        <Button type="button" variant="secondary" onClick={runExport} disabled={status === 'loading'}>
          Download JSON export
        </Button>
      </div>
    </section>
  );
}
