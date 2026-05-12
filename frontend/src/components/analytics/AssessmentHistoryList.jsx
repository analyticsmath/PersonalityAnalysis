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
    <section className="analytics-section" aria-labelledby="hist-heading">
      <h2 id="hist-heading" className="section-header__title">
        Assessment history
      </h2>
      <ul className="analytics-history-list">
        {items.map((row) => (
          <li key={row.resultId}>
            <article className="analytics-history-card">
              <div>
                <p className="page-header__eyebrow">{formatDate(row.completedAt || row.createdAt)}</p>
                <p>
                  <strong>{row.topCareer || 'Career TBD'}</strong> · {row.primaryArchetype || '—'}
                </p>
                <p className="ui-message ui-message--neutral">
                  Validity: {row.scoreValidity} · Status: {row.status}
                </p>
                <p className="ui-message ui-message--neutral">
                  Confidence: {row.confidence != null ? `${Math.round(Number(row.confidence) * 100)}%` : '—'} · AI
                  report: {row.hasAiReport ? 'yes' : 'no'} · Career intel: {row.hasCareerRecommendations ? 'yes' : 'no'}
                </p>
              </div>
              <div className="analytics-history-card__actions">
                {row.scoreValidity === 'legacy_unverified' ? (
                  <StatusBadge variant="warning" label="Legacy / unverified" />
                ) : null}
                <Link className="history-item__link" to={`/result/${row.assessmentId}`}>
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
