import React from 'react';

/**
 * Textual summary for charts (pair parent with aria-describedby={id}).
 * @param {{ id: string, title: string, lines: string[] }} props
 */
export default function ChartSummary({ id, title, lines = [] }) {
  const body = lines.filter(Boolean).join('. ');
  if (!body) {
    return null;
  }

  return (
    <p id={id} className="chart-summary__text">
      <strong className="chart-summary__title">{title}</strong>
      <span> {body}</span>
    </p>
  );
}
