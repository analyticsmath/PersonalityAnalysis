import React from 'react';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import AnalyticsEmptyState from '../analytics/AnalyticsEmptyState';

export default function GrowthRecommendationsPanel({ query, items = [] }) {
  if (query.isPending) {
    return <LoadingState message="Loading growth recommendations" />;
  }
  if (query.isError) {
    return <ErrorState title="Growth recommendations unavailable" message={query.error?.message || 'Error'} />;
  }

  if (!items.length) {
    return (
      <AnalyticsEmptyState
        title="No growth recommendations yet"
        description="Generate an AI report or complete career recommendations on your latest result to populate suggestions."
      />
    );
  }

  return (
    <section className="analytics-section" aria-labelledby="growth-heading">
      <h2 id="growth-heading" className="section-header__title">
        Growth recommendations
      </h2>
      <ul className="growth-recs">
        {items.map((row, idx) => {
          const srcLabel =
            row.source === 'ai_report'
              ? 'AI report'
              : row.source === 'career_engine'
              ? 'Career engine'
              : 'System';
          return (
            <li key={`${row.source}-${idx}`}>
              <strong>{srcLabel}</strong>
              <p>{row.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
