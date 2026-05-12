import React from 'react';

/**
 * Lightweight tooltip: native `title` + optional keyboard focus ring for supplemental hints.
 * @param {{ children: React.ReactNode, content: string, className?: string }} props
 */
export default function Tooltip({ children, content, className = '' }) {
  if (!content) {
    return children;
  }

  return (
    <span className={`ui-tooltip-wrap ${className}`.trim()} title={content}>
      {children}
    </span>
  );
}
