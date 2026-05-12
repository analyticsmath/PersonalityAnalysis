import React from 'react';

/**
 * @param {{ label: string, value: React.ReactNode, hint?: string, variant?: 'default' | 'accent' }} props
 */
export default function MetricCard({ label, value, hint, variant = 'default' }) {
  return (
    <article
      className={`metric-card metric-card--${variant}`.trim()}
      aria-label={hint ? `${label}: ${value}. ${hint}` : `${label}: ${value}`}
    >
      <p className="metric-card__label">{label}</p>
      <p className="metric-card__value">{value}</p>
      {hint ? <p className="metric-card__hint">{hint}</p> : null}
    </article>
  );
}
