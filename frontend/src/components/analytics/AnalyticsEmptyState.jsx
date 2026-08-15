import React from 'react';
import ProductIllustration from '../ui/ProductIllustration';

export default function AnalyticsEmptyState({
  title = 'No historical analytics yet',
  description = 'Complete an adaptive assessment to unlock your personal intelligence dashboard and longitudinal trend tracking.',
  action,
}) {
  return (
    <div className="empty-state-panel analytics-empty-state-panel" role="status">
      <ProductIllustration slotKey="analytics-empty" className="analytics-empty-illustration" decorative />
      <h2 className="empty-state-panel__title">{title}</h2>
      {description ? <p className="empty-state-panel__desc">{description}</p> : null}
      {action ? <div className="empty-state-panel__action">{action}</div> : null}
    </div>
  );
}
