import React, { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import ErrorState from '../ui/ErrorState';
import {
  deleteAccountAssessment,
  deleteAccountEntirely,
  deleteAccountProfileData,
} from '../../api/accountApi';
import { useAuth } from '../../hooks/useAuth';

export default function DataDeletionPanel() {
  const { logout } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const [resultId, setResultId] = useState('');

  const run = async (kind) => {
    setError('');
    setMessage('');
    setBusy(kind);
    try {
      if (kind === 'profile') {
        if (!window.confirm('Clear CV/manual profile fields from all stored sessions and results on this account?')) {
          setBusy('');
          return;
        }
        await deleteAccountProfileData();
        setMessage('Profile-related fields were cleared from your stored sessions and results.');
      } else if (kind === 'assessment') {
        if (!resultId.trim()) {
          throw new Error('Enter a result ID to delete one assessment.');
        }
        if (!window.confirm('Delete this assessment result permanently?')) {
          setBusy('');
          return;
        }
        await deleteAccountAssessment(resultId.trim());
        setMessage('Assessment result deleted.');
        setResultId('');
      } else if (kind === 'account') {
        if (!window.confirm('Permanently delete your account and all related data? This cannot be undone.')) {
          setBusy('');
          return;
        }
        await deleteAccountEntirely();
        setMessage('Account deleted. You will be signed out.');
        logout();
        window.setTimeout(() => {
          window.location.href = '/login';
        }, 400);
      }
    } catch (e) {
      setError(e.message || 'Request failed');
    } finally {
      setBusy('');
    }
  };

  return (
    <section className="analytics-section" aria-labelledby="del-heading">
      <SectionHeader
        as="div"
        eyebrow="Controls"
        title="Delete data"
        subtitle="Deletes require explicit JSON confirmation on the API. Destructive actions cannot be recovered from this deployment."
      />
      <h2 id="del-heading" className="visually-hidden">
        Delete data
      </h2>
      {error ? <ErrorState title="Action failed" message={error} /> : null}
      {message ? (
        <p className="ui-message ui-message--neutral" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}

      <div className="privacy-actions" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <Button type="button" variant="secondary" disabled={Boolean(busy)} onClick={() => run('profile')}>
          Delete profile / CV fields from stored data
        </Button>

        <label htmlFor="del-result-id" className="manual-profile-form__consent">
          Result ID (from URL /result/…)
        </label>
        <input
          id="del-result-id"
          value={resultId}
          onChange={(e) => setResultId(e.target.value)}
          placeholder="Mongo ObjectId"
        />
        <Button type="button" variant="secondary" disabled={Boolean(busy)} onClick={() => run('assessment')}>
          Delete this assessment result
        </Button>

        <Button type="button" variant="primary" disabled={Boolean(busy)} onClick={() => run('account')}>
          Delete entire account
        </Button>
      </div>
    </section>
  );
}
