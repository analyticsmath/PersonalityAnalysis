import React, { useMemo } from 'react';
import ChartSummary from '../a11y/ChartSummary';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import AnalyticsEmptyState from './AnalyticsEmptyState';

const BIG_FIVE_DIMS = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalStability'];

export default function TraitTrendChart({ query }) {
  const payload = query.data || {};
  const points = Array.isArray(payload.trendPoints) ? payload.trendPoints : [];
  const bfPoints = useMemo(() => points.filter((p) => BIG_FIVE_DIMS.includes(p.dimension)), [points]);
  const summaryLines = useMemo(() => {
    if (!bfPoints.length) return ['No Big Five trend points in this window.'];
    const byDim = {};
    bfPoints.forEach((p) => {
      if (!byDim[p.dimension]) byDim[p.dimension] = [];
      byDim[p.dimension].push(p.score);
    });
    return Object.entries(byDim).map(([dim, scores]) => {
      const last = scores[scores.length - 1];
      const first = scores[0];
      const delta = last - first;
      return `${dim}: scores moved from about ${first} to ${last} (${delta >= 0 ? '+' : ''}${delta})`;
    });
  }, [bfPoints]);

  if (query.isPending) return <LoadingState message="Loading trait trends" />;
  if (query.isError) {
    return <ErrorState title="Trends unavailable" message={query.error?.message || 'Error'} />;
  }

  if (payload.status === 'insufficient_history') {
    return (
      <section className="analytics-section" aria-labelledby="trend-heading">
        <h2 id="trend-heading" className="section-header__title">
          Trait trends
        </h2>
        <AnalyticsEmptyState title="Not enough history yet" description={payload.message} />
      </section>
    );
  }

  const chartId = 'trait-trend-summary';

  return (
    <section className="analytics-section" aria-labelledby="trend-heading">
      <h2 id="trend-heading" className="section-header__title">
        Trait trends
      </h2>
      <p className="ui-message ui-message--neutral" id={chartId}>
        Big Five progression across assessments (valid or partial scoring only). RIASEC and work values appear in the
        dataset when present.
      </p>
      <ChartSummary id={`${chartId}-detail`} title="Numeric summary" lines={summaryLines} />
      <div className="analytics-trend-scroll">
        <table className="analytics-trend-table" aria-describedby={`${chartId}-detail`}>
          <caption className="visually-hidden">Big Five trend points by date and result</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Dimension</th>
              <th scope="col">Score</th>
              <th scope="col">Validity</th>
            </tr>
          </thead>
          <tbody>
            {bfPoints.slice(0, 80).map((p, i) => (
              <tr key={`${p.resultId}-${p.dimension}-${i}`}>
                <td>{p.date}</td>
                <td>{p.dimension}</td>
                <td>{p.score}</td>
                <td>{p.validity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
