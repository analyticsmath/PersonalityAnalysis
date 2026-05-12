import React from 'react';

const CareerComparisonTable = ({ rows = [] }) => {
  const list = Array.isArray(rows) ? rows : [];

  if (!list.length) {
    return <p className="empty-state">No careers to compare.</p>;
  }

  return (
    <div className="career-compare-table" data-testid="career-comparison-table">
      <table className="career-compare-table__grid">
        <thead>
          <tr>
            <th>Title</th>
            <th>Fit</th>
            <th>Confidence</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => {
            const conf =
              typeof r.confidence === 'number' && r.confidence <= 1
                ? Math.round(r.confidence * 100)
                : Math.round(Number(r.confidence || 0));
            return (
              <tr key={r.careerId || r.title}>
                <td>{r.title}</td>
                <td>{Math.round(Number(r.fitScore || 0))}</td>
                <td>{conf}%</td>
                <td>{r.fitType || ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CareerComparisonTable;
