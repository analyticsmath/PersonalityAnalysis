import React from 'react';

/**
 * SectionHeader
 * Accessible clean section header without decorative eyebrows.
 */
export default function SectionHeader({
  title,
  subtitle,
  actions,
  as: Component = 'header',
  className = '',
}) {
  return (
    <Component className={`section-header ${className}`.trim()}>
      <div className="section-header__copy">
        <h2 className="section-header__title">{title}</h2>
        {subtitle ? <p className="section-header__subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="section-header__actions">{actions}</div> : null}
    </Component>
  );
}
