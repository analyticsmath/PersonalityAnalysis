import React from 'react';
import ProductIllustration from './ProductIllustration';

export default function EmptyProductState({
  title = 'No data available',
  description = '',
  action = null,
  illustrationKey = '',
  compact = false,
  className = '',
}) {
  return (
    <div className={`empty-product-state ${compact ? 'empty-product-state--compact' : ''} ${className}`.trim()}>
      {illustrationKey && (
        <ProductIllustration
          slotKey={illustrationKey}
          className="empty-product-state__illustration"
          decorative
        />
      )}
      {title && <h3 className="empty-product-state__title">{title}</h3>}
      {description && <p className="empty-product-state__desc">{description}</p>}
      {action && <div className="empty-product-state__action">{action}</div>}
    </div>
  );
}
