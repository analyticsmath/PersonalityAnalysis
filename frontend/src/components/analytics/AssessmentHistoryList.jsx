import React from 'react';
import { Link } from 'react-router-dom';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import AnalyticsEmptyState from './AnalyticsEmptyState';
import StatusBadge from '../ui/StatusBadge';

const formatDate = (v) => {
  if (!v) return '—';
  try {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(v));
  } catch {
    return '—';
  }
};

export default function AssessmentHistoryList({ query }) {
  if (query.isPending) return <LoadingState message="Loading assessment history" />;
  if (query.isError) {
    return <ErrorState title="History unavailable" message={query.error?.message || 'Error'} />;
  }
  const items = query.data || [];
  if (!items.length) {
    return (
      <AnalyticsEmptyState
        title="No history yet"
        description="Your completed assessments will appear here with validity and report flags."
      />
    );
  }

  return (
    <section className="dashboard-widget" aria-labelledby="hist-heading">
      <div className="dashboard-widget__head">
        <h2 id="hist-heading" className="dashboard-widget__title">
          Assessment History
        </h2>
        <span style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{items.length} records</span>
      </div>
      <ul className="analytics-history-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((row) => (
          <li key={row.resultId} style={{ marginBottom: '8px' }}>
            <article className="analytics-history-row">
              <div className="analytics-history-row__info">
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 500 }}>
                  {formatDate(row.completedAt || row.createdAt)}
                </span>
                <strong>{row.topCareer || 'Career TBD'} · {row.primaryArchetype || '—'}</strong>
                <span style={{ fontSize: '0.8125rem', color: 'var(--secondary)' }}>
                  Validity: {row.scoreValidity} · Status: {row.status} · Confidence:{' '}
                  {row.confidence != null ? `${Math.round(Number(row.confidence) * 100)}%` : '—'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {row.scoreValidity === 'legacy_unverified' ? (
                  <StatusBadge variant="warning" label="Legacy / unverified" />
                ) : null}
                <Link
                  className="ui-button ui-button--ghost ui-button--sm"
                  to={`/result/${row.assessmentId || row.resultId}`}
                  aria-label="View result"
                >
                  View result
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
