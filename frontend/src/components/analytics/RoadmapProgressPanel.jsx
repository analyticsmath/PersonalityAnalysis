import React, { useCallback, useMemo } from 'react';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import { useRoadmapProgressMutation, useRoadmapProgressQuery } from '../../hooks/usePersonalAnalytics';

export default function RoadmapProgressPanel({ resultId, careerId }) {
  const enabled = Boolean(resultId && careerId);
  const q = useRoadmapProgressQuery(resultId, careerId, enabled);
  const m = useRoadmapProgressMutation();

  const keys = useMemo(() => q.data?.validActionKeys || [], [q.data?.validActionKeys]);
  const completed = useMemo(() => new Set(q.data?.completedActionKeys || []), [q.data?.completedActionKeys]);
  const actionLabels = useMemo(() => q.data?.actionLabels || {}, [q.data?.actionLabels]);

  const labelForKey = useCallback(
    (key) => {
      if (actionLabels && actionLabels[key]) {
        return actionLabels[key];
      }
      const raw = String(key || '').trim();
      const parts = raw.split('|');
      if (parts.length === 3) {
        return `Stage ${Number(parts[1]) + 1} · item ${Number(parts[2]) + 1}`;
      }
      return raw.replace(/\|/g, ' · ');
    },
    [actionLabels]
  );

  const toggle = useCallback(
    async (key) => {
      if (!resultId || !careerId) return;
      const next = new Set(completed);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      await m.mutateAsync({
        resultId,
        careerId,
        completedActionKeys: Array.from(next),
      });
    },
    [careerId, completed, m, resultId]
  );

  if (!enabled) {
    return (
      <section className="analytics-section" aria-labelledby="rm-heading">
        <h2 id="rm-heading" className="section-header__title">
          Roadmap progress
        </h2>
        <p className="empty-state">Save a result with a top career match to track roadmap actions here.</p>
      </section>
    );
  }

  if (q.isPending) return <LoadingState message="Loading roadmap progress" />;
  if (q.isError) {
    return <ErrorState title="Roadmap progress unavailable" message={q.error?.message || 'Error'} />;
  }

  if (!keys.length) {
    return (
      <section className="analytics-section" aria-labelledby="rm-heading">
        <h2 id="rm-heading" className="section-header__title">
          Roadmap progress
        </h2>
        <p className="empty-state">No roadmap actions found on this result for the selected career.</p>
      </section>
    );
  }

  return (
    <section className="analytics-section" aria-labelledby="rm-heading">
      <h2 id="rm-heading" className="section-header__title">
        Roadmap progress
      </h2>
      <p className="ui-message ui-message--neutral" aria-live="polite">
        {q.data?.progressPercent ?? 0}% complete ({q.data?.completedCount ?? 0}/{keys.length} actions)
      </p>
      <ul className="recommendation-list">
        {keys.map((key) => (
          <li key={key}>
            <label className="analytics-roadmap-label">
              <input
                type="checkbox"
                checked={completed.has(key)}
                onChange={() => toggle(key)}
                disabled={m.isPending}
                aria-label={`Mark roadmap action complete: ${labelForKey(key)}`}
              />
              <span>{labelForKey(key)}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
