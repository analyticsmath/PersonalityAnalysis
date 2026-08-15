// frontend/src/components/public/imprint/EvidenceImprint.jsx
// Core Photographic Evidence Fragment Component

import React from 'react';

export default function EvidenceImprint({
  fragment,
  width = 'auto',
  height = 'auto',
  className = '',
  style = {},
  priority = false,
}) {
  if (!fragment || !fragment.basePath) return null;

  const { basePath, alt = 'Photographic evidence fragment' } = fragment;

  return (
    <figure
      className={`evidence-imprint-fragment ${className}`}
      style={{ width, height, ...style }}
    >
      <picture>
        <source srcSet={`${basePath}-640.avif 640w, ${basePath}-960.avif 960w, ${basePath}-480.avif 480w`} type="image/avif" />
        <source srcSet={`${basePath}-640.webp 640w, ${basePath}-960.webp 960w, ${basePath}-480.webp 480w`} type="image/webp" />
        <img
          src={`${basePath}-640.png`}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      </picture>
    </figure>
  );
}
