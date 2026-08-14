import React, { useMemo } from 'react';
import MetricBarChart from './MetricBarChart';

const LABELS = {
  achievement: 'Achievement',
  independence: 'Independence',
  recognition: 'Recognition',
  relationships: 'Relationships',
  support: 'Support',
  workingConditions: 'Working conditions',
  security: 'Security',
  autonomy: 'Autonomy',
  learning: 'Learning',
  impact: 'Impact',
  workLifeBalance: 'Work-life balance',
  compensation: 'Compensation',
};

const WorkValuesProfileCard = ({ workValues = {}, scoreMeta = null, height = 280 }) => {
  const blocked =
    scoreMeta &&
    (['mock', 'unknown'].includes(String(scoreMeta.scoreSource || '')) ||
      ['insufficient_data', 'invalid'].includes(String(scoreMeta.scoreValidity || '')));

  const { metrics, labels } = useMemo(() => {
    const entries = Object.entries(workValues || {})
      .map(([k, v]) => {
        const hasScore = v?.score !== null && v?.score !== undefined && Number.isFinite(Number(v?.score));
        return {
          k,
          score: hasScore ? Math.round(Number(v.score)) : null,
          n: Number(v?.evidenceCount || 0),
        };
      })
      .filter((e) => e.n > 0 && e.score !== null)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 8);

    const m = {};
    const l = {};
    entries.forEach(({ k, score }) => {
      m[k] = score;
      l[k] = LABELS[k] || k;
    });
    return { metrics: m, labels: l };
  }, [workValues]);

  if (blocked || Object.keys(metrics).length === 0) {
    return (
      <div className="chart-shell" aria-label="Work values unavailable">
        Work values preferences will appear once there is enough preference-related evidence.
      </div>
    );
  }

  return (
    <div className="chart-shell" aria-label="Work values chart">
      <MetricBarChart metrics={metrics} labels={labels} barColor="#7c3aed" height={height} />
    </div>
  );
};

export default React.memo(WorkValuesProfileCard);
