import React from 'react';
import { Link } from 'react-router-dom';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import AnalyticsEmptyState from './AnalyticsEmptyState';

const formatDate = (v) => {
  if (!v) return '—';
  try {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(v));
  } catch {
    return '—';
  }
};

export default function ReportHistoryPanel({ query }) {
  if (query.isPending) return <LoadingState message="Loading report history" />;
  if (query.isError) {
    return <ErrorState title="Report history unavailable" message={query.error?.message || 'Error'} />;
  }

  const items = (query.data && query.data.items) || [];
  if (!items.length) {
    return (
      <AnalyticsEmptyState
        title="No saved reports"
        description="Generate an AI report on a result to populate this list."
      />
    );
  }

  return (
    <section className="analytics-section" aria-labelledby="rh-heading">
      <h2 id="rh-heading" className="section-header__title">
        Report history
      </h2>
      <ul className="analytics-history-list">
        {items.map((row) => (
          <li key={row.resultId}>
            <article className="analytics-history-card">
              <div>
                <p>{formatDate(row.assessmentDate)}</p>
                <p>
                  Report: {row.hasReport ? 'available' : 'none'} · Validity: {row.scoreValidity} · Source:{' '}
                  {row.scoreSource}
                </p>
                <p className="ui-message ui-message--neutral">
                  AI fallback used: {row.fallbackUsed ? 'yes' : 'no'}
                </p>
              </div>
              <Link className="history-item__link" to={`/result/${row.resultId}`}>
                Open result
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
