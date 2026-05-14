import React from 'react';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import MetricCard from '../ui/MetricCard';

export default function CareerReadinessCard({ query }) {
  if (query.isPending) return <LoadingState message="Loading career readiness indicator" />;
  if (query.isError) {
    return <ErrorState title="Career readiness unavailable" message={query.error?.message || 'Error'} />;
  }

  const d = query.data || {};
  const preliminary = (d.warnings || []).some((w) => String(w).toLowerCase().includes('preliminary'));

  if (d.status === 'insufficient_history' || d.careerReadinessScore == null) {
    return (
      <section className="analytics-section" aria-labelledby="cr-heading">
        <h2 id="cr-heading" className="section-header__title">
          Career readiness indicator
        </h2>
        <p className="ui-message ui-message--neutral" role="status">
          {(d.warnings && d.warnings[0]) || 'Not enough data to compute a career readiness indicator yet.'}
        </p>
      </section>
    );
  }

  return (
    <section className="analytics-section" aria-labelledby="cr-heading">
      <h2 id="cr-heading" className="section-header__title">
        Career readiness indicator
      </h2>
      <p className="section-header__subtitle">
        Exploratory signal from your latest assessment — not hireability or a hiring guarantee.
      </p>
      {preliminary ? (
        <p className="ui-message ui-message--warning" role="status">
          Preliminary: scoring or evidence is partial; interpret cautiously.
        </p>
      ) : null}
      <div className="analytics-metric-grid">
        <MetricCard label="Indicator score" value={`${d.careerReadinessScore}`} hint="Blended from fit, skills, confidence, roadmap, evidence" />
        <MetricCard label="Top career" value={d.topCareer || '—'} hint="Highest evidence-based match" />
        <MetricCard label="Skill readiness" value={`${d.skillReadiness ?? '—'}`} hint="From skill gap engine" />
        <MetricCard label="Roadmap progress" value={`${d.roadmapProgress ?? 0}%`} hint="Your saved roadmap completions" />
        <MetricCard label="Evidence completeness" value={`${d.evidenceCompleteness ?? '—'}`} hint="Breadth of stored evidence items" />
        <MetricCard label="Confidence" value={`${Math.round((d.confidence || 0) * 100)}%`} hint="Model confidence" />
      </div>
      {(d.warnings || []).length ? (
        <ul className="recommendation-list" aria-label="Warnings">
          {d.warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
