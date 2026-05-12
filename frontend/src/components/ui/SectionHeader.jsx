import React from 'react';

/**
 * @param {{ eyebrow?: string, title: string, subtitle?: string, actions?: React.ReactNode, as?: 'div'|'header' }} props
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  as: Component = 'header',
}) {
  return (
    <Component className="section-header">
      <div className="section-header__copy">
        {eyebrow ? <p className="section-header__eyebrow">{eyebrow}</p> : null}
        <h1 className="section-header__title">{title}</h1>
        {subtitle ? <p className="section-header__subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="section-header__actions">{actions}</div> : null}
    </Component>
  );
}
