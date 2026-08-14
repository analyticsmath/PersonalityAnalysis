import React from 'react';
import { Link } from 'react-router-dom';
import MetricCard from '../ui/MetricCard';
import AnalyticsEmptyState from './AnalyticsEmptyState';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';

export default function PersonalIntelligenceOverview({ query }) {
  if (query.isPending) {
    return <LoadingState message="Loading personal intelligence overview" />;
  }
  if (query.isError) {
    return <ErrorState title="Could not load overview" message={query.error?.message || 'Try again later.'} />;
  }

  const d = query.data || {};
  if (!d.assessmentCount) {
    return (
      <AnalyticsEmptyState
        title="No assessments yet"
        description="Complete an adaptive assessment to unlock your personal intelligence dashboard."
        action={
          <Link className="ui-button ui-button--primary ui-button--sm" to="/assessment/start">
            Start assessment
          </Link>
        }
      />
    );
  }

  return (
    <section className="dashboard-widget" aria-labelledby="pi-overview-heading">
      <div className="dashboard-widget__head">
        <div>
          <h2 id="pi-overview-heading" className="dashboard-widget__title">
            Personal Intelligence
          </h2>
          <p className="dashboard-widget__subtitle">
            Summaries synthesized from your stored assessment records.
          </p>
        </div>
      </div>
      <div className="analytics-summary-strip" style={{ marginBottom: '16px' }}>
        <MetricCard label="Assessments" value={String(d.assessmentCount)} hint="Completed runs in your account" />
        <MetricCard
          label="Latest confidence"
          value={d.latestConfidence != null ? `${Math.round(Number(d.latestConfidence) * 100)}%` : '—'}
          hint="From latest result metadata"
        />
        <MetricCard label="Top signal" value={d.topTrait || '—'} hint="Dominant archetype or trait label" />
        <MetricCard label="Top career match" value={d.topCareerFit || '—'} hint="From latest career recommendations" />
        <MetricCard
          label="Career readiness indicator"
          value={
            d.careerReadiness?.careerReadinessScore != null ? `${d.careerReadiness.careerReadinessScore}` : '—'
          }
          hint="Weighted indicator — not hireability"
        />
        <MetricCard label="Latest report" value={d.latestReportStatus || '—'} hint="AI narrative presence" />
      </div>
      {d.nextRecommendedAction && (
        <p className="ui-message ui-message--neutral" role="status">
          <strong>Next step:</strong> {d.nextRecommendedAction}
        </p>
      )}
    </section>
  );
}
