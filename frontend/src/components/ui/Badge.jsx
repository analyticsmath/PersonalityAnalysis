import React from 'react';

const VARIANTS = {
  default: 'ds-badge',
  success: 'ds-badge ds-badge--success',
  warning: 'ds-badge ds-badge--warning',
  danger: 'ds-badge ds-badge--danger',
  neutral: 'ds-badge ds-badge--neutral',
};

/**
 * @param {{ children: React.ReactNode, variant?: keyof typeof VARIANTS, className?: string, title?: string }} props
 */
export default function Badge({ children, variant = 'default', className = '', title }) {
  return (
    <span className={`${VARIANTS[variant] || VARIANTS.default} ${className}`.trim()} title={title}>
      {children}
    </span>
  );
}
