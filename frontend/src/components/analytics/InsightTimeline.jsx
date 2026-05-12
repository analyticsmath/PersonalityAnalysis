import React from 'react';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import AnalyticsEmptyState from './AnalyticsEmptyState';

const formatDate = (v) => {
  if (!v) return '—';
  try {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(v));
  } catch {
    return '—';
  }
};

export default function InsightTimeline({ query }) {
  if (query.isPending) return <LoadingState message="Loading insight timeline" />;
  if (query.isError) {
    return <ErrorState title="Timeline unavailable" message={query.error?.message || 'Error'} />;
  }

  const events = (query.data && query.data.events) || [];
  if (!events.length) {
    return (
      <AnalyticsEmptyState
        title="No timeline events yet"
        description="Events appear as you complete assessments, generate reports, and update roadmap progress."
      />
    );
  }

  return (
    <section className="analytics-section" aria-labelledby="tl-heading">
      <h2 id="tl-heading" className="section-header__title">
        Insight timeline
      </h2>
      <div className="analytics-timeline" role="list">
        {events.map((e, i) => (
          <div className="analytics-timeline__item" role="listitem" key={`${e.type}-${e.resultId}-${i}`}>
            <p className="page-header__eyebrow">{formatDate(e.date)}</p>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p className="ui-message ui-message--neutral">
              {e.type} · {e.severity}
              {e.resultId ? ` · result ${e.resultId}` : ''}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
