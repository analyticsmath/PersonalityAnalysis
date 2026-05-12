import React from 'react';

/**
 * @param {{ title?: string, description?: string, action?: React.ReactNode, icon?: React.ReactNode }} props
 */
export default function EmptyState({ title = 'Nothing here yet', description, action, icon }) {
  return (
    <div className="empty-state-panel" role="status">
      {icon ? <div className="empty-state-panel__icon" aria-hidden="true">{icon}</div> : null}
      <h2 className="empty-state-panel__title">{title}</h2>
      {description ? <p className="empty-state-panel__desc">{description}</p> : null}
      {action ? <div className="empty-state-panel__action">{action}</div> : null}
    </div>
  );
}
