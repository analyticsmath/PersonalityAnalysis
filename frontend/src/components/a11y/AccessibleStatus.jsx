import React from 'react';

/**
 * Live region for loading / errors / saves (visible + announced).
 * @param {{ children: React.ReactNode, politeness?: 'polite' | 'assertive', id?: string, className?: string }} props
 */
export default function AccessibleStatus({ children, politeness = 'polite', id, className = '' }) {
  if (children == null || children === '') {
    return null;
  }

  return (
    <div id={id} role="status" aria-live={politeness} className={`accessible-status-inline ${className}`.trim()}>
      {children}
    </div>
  );
}
