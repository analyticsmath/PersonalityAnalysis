import React from 'react';
import { personalityIllustrations } from '../../content/personalityIllustrations';

/**
 * ProductIllustration
 * Renders approved illustrations from the registry.
 * If asset is not yet available, gracefully renders nothing.
 */
export default function ProductIllustration({
  slotKey = '',
  src: explicitSrc = '',
  alt = '',
  decorative = true,
  className = '',
  loading = 'lazy',
}) {
  const registered = slotKey ? personalityIllustrations[slotKey] : null;
  const imageSrc = explicitSrc || registered?.src || '';

  if (!imageSrc) {
    return null;
  }

  const resolvedAlt = decorative ? '' : (alt || registered?.defaultAlt || '');

  return (
    <figure className={`product-illustration-wrap ${className}`.trim()}>
      <img
        src={imageSrc}
        alt={resolvedAlt}
        loading={loading}
        className="product-illustration-img"
        aria-hidden={decorative ? 'true' : undefined}
      />
    </figure>
  );
}
