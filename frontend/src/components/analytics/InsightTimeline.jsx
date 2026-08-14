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
    <section className="dashboard-widget" aria-labelledby="tl-heading">
      <div className="dashboard-widget__head">
        <h2 id="tl-heading" className="dashboard-widget__title">
          Insight Timeline
        </h2>
      </div>
      <div className="analytics-timeline-events" role="list">
        {events.map((e, i) => (
          <div className="analytics-timeline-event" role="listitem" key={`${e.type}-${e.resultId}-${i}`}>
            <span className="analytics-timeline-event__date">{formatDate(e.date)}</span>
            <h3 className="analytics-timeline-event__title">{e.title}</h3>
            <p className="analytics-timeline-event__detail">{e.description}</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>
              {e.type} · {e.severity}
              {e.resultId ? ` · result ${e.resultId}` : ''}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
