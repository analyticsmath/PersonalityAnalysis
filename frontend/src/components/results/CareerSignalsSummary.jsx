import React, { useMemo } from 'react';

const CareerSignalsSummary = ({ careerSignals = {}, scoreMeta = null }) => {
  const blocked =
    scoreMeta &&
    (['mock', 'unknown'].includes(String(scoreMeta.scoreSource || '')) ||
      ['insufficient_data', 'invalid'].includes(String(scoreMeta.scoreValidity || '')));

  const rows = useMemo(() => {
    const src = careerSignals && typeof careerSignals === 'object' ? careerSignals : {};
    return Object.entries(src)
      .map(([key, v]) => ({
        key,
        score: Math.round(Number(v?.score || 0)),
        n: Number(v?.evidenceCount || 0),
        sources: Array.isArray(v?.sources) ? v.sources.join(', ') : '',
      }))
      .filter((r) => r.n > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [careerSignals]);

  if (blocked || !rows.length) {
    return (
      <div className="chart-shell" aria-label="Career signals unavailable">
        Career skill signals will populate after richer CV and questionnaire evidence is captured.
      </div>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} data-testid="career-signals-summary">
      {rows.map((r) => (
        <li
          key={r.key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid #E2E8F0',
            fontSize: 14,
          }}
        >
          <span style={{ fontWeight: 600 }}>{r.key}</span>
          <span>
            {r.score}% · evidence {r.n}
            {r.sources ? <span style={{ opacity: 0.75 }}> ({r.sources})</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(CareerSignalsSummary);
