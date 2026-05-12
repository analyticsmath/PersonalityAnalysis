import React from 'react';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import AnalyticsEmptyState from './AnalyticsEmptyState';

export default function SkillProgressPanel({ query }) {
  if (query.isPending) return <LoadingState message="Loading skill progress" />;
  if (query.isError) {
    return <ErrorState title="Skill progress unavailable" message={query.error?.message || 'Error'} />;
  }

  const d = query.data || {};
  if (d.status === 'insufficient_history' && !d.targetCareer) {
    return (
      <AnalyticsEmptyState
        title="No skill snapshot"
        description="Complete an assessment with career recommendations to see skill alignment."
      />
    );
  }

  return (
    <section className="analytics-section" aria-labelledby="sk-heading">
      <h2 id="sk-heading" className="section-header__title">
        Skill progress
      </h2>
      <p className="ui-message ui-message--neutral">Target role: {d.targetCareer || '—'}</p>
      <p className="ui-message ui-message--neutral">Status: {d.status}</p>
      <div className="intel-ai-card__block">
        <h3>Matched skills</h3>
        <ul className="recommendation-list">
          {(d.matchedSkills || []).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {!(d.matchedSkills || []).length ? <li>None listed</li> : null}
        </ul>
      </div>
      <div className="intel-ai-card__block">
        <h3>Missing critical skills</h3>
        <ul className="recommendation-list">
          {(d.missingSkills || []).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {!(d.missingSkills || []).length ? <li>None listed</li> : null}
        </ul>
      </div>
      <div className="intel-ai-card__block">
        <h3>Recommended next skills</h3>
        <ul className="recommendation-list">
          {(d.recommendedSkills || []).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {!(d.recommendedSkills || []).length ? <li>None listed</li> : null}
        </ul>
      </div>
      {(d.progressItems || []).length ? (
        <div className="intel-ai-card__block">
          <h3>Detected changes</h3>
          <ul className="recommendation-list">
            {d.progressItems.map((p, i) => (
              <li key={`${p.skill}-${i}`}>
                {p.type}: {p.skill}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="empty-state">No multi-assessment skill deltas yet — baseline only.</p>
      )}
      {(d.warnings || []).map((w) => (
        <p key={w} className="ui-message ui-message--warning">
          {w}
        </p>
      ))}
    </section>
  );
}
