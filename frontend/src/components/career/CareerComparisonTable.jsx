import React from 'react';

const CareerComparisonTable = ({ rows = [], items = [] }) => {
  const list = Array.isArray(rows) && rows.length ? rows : Array.isArray(items) ? items : [];

  if (!list.length) {
    return <p className="empty-state">No careers to compare.</p>;
  }

  return (
    <div className="career-compare-table" data-testid="career-comparison-table" style={{ marginTop: '16px' }}>
      <table className="analytics-accessible-table">
        <thead>
          <tr>
            <th scope="col">Role Title</th>
            <th scope="col">Fit Score</th>
            <th scope="col">Confidence</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => {
            const conf =
              typeof r.confidence === 'number' && r.confidence <= 1
                ? Math.round(r.confidence * 100)
                : Math.round(Number(r.confidence || 0));
            const fit = r.fitScore ?? r.match ?? r.score ?? 0;
            return (
              <tr key={r.careerId || r.title}>
                <td><strong>{r.title}</strong></td>
                <td>{Math.round(Number(fit))}%</td>
                <td>{conf ? `${conf}%` : '—'}</td>
                <td style={{ textTransform: 'capitalize' }}>{r.fitType || r.environmentType || 'Standard'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CareerComparisonTable;
