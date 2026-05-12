import React from 'react';
import Badge from './Badge';

/**
 * Generic status pill (non-AI domain statuses).
 * @param {{ label: string, variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral', title?: string }} props
 */
export default function StatusBadge({ label, variant = 'neutral', title }) {
  return (
    <Badge variant={variant} title={title}>
      {label}
    </Badge>
  );
}
