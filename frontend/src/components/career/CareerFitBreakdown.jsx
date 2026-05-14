import React from 'react';

const LABELS = {
  riasecFit: 'RIASEC fit',
  skillFit: 'Skill fit',
  workValuesFit: 'Work values fit',
  personalityFit: 'Work-style (Big Five) fit',
  educationFit: 'Education / context fit',
  goalFit: 'Goal / domain fit',
};

const CareerFitBreakdown = ({ fitBreakdown = {} }) => {
  const entries = Object.entries(LABELS).map(([key, label]) => ({
    key,
    label,
    value: Math.round(Number(fitBreakdown[key] ?? 0)),
  }));

  return (
    <div className="career-fit-breakdown" data-testid="career-fit-breakdown">
      {entries.map((row) => (
        <div
          key={row.key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            padding: '6px 0',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <span>{row.label}</span>
          <span>
            <strong>{row.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CareerFitBreakdown;
