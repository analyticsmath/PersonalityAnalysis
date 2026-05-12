import React from 'react';
import Badge from './Badge';

const BAND_VARIANT = {
  high: 'success',
  medium: 'warning',
  low: 'neutral',
};

/**
 * @param {{ band?: string, percent?: number | null }} props
 */
export default function ConfidenceBadge({ band = 'low', percent = null }) {
  const b = String(band || 'low').toLowerCase();
  const variant = BAND_VARIANT[b] || 'neutral';
  const label =
    percent != null && Number.isFinite(Number(percent))
      ? `${b} confidence (${Math.round(Number(percent))}%)`
      : `${b} confidence`;

  return (
    <Badge variant={variant} title="Based on response consistency and evidence weighting.">
      {label}
    </Badge>
  );
}
