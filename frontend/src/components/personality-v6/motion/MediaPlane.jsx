import React from 'react';

/**
 * MediaPlane
 * Renders a full responsive <picture> base plane with AVIF/WebP sources,
 * stable aspect ratio, explicit dimensions, preload policy, and optional overlay slot.
 */
export const MediaPlane = ({
  asset,
  alt = '',
  sizes = '100vw',
  objectPosition = 'center center',
  priority = false,
  className = '',
  style = {},
  overlay = null,
}) => {
  if (!asset) {
    return <div className={`pa-v6-media-plane ${className}`} style={style} />;
  }

  const avifSrcSet = asset.avif
    ? Object.entries(asset.avif)
        .map(([w, src]) => `${src} ${w}w`)
        .join(', ')
    : '';

  const webpSrcSet = asset.webp
    ? Object.entries(asset.webp)
        .map(([w, src]) => `${src} ${w}w`)
        .join(', ')
    : '';

  const largestWidth = asset.widths ? Math.max(...asset.widths) : 1280;
  const defaultSrc = asset.webp?.[largestWidth] || asset.source || '';

  return (
    <div
      className={`pa-v6-media-plane ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <picture className="pa-v6-media-plane__picture" style={{ display: 'block', width: '100%', height: '100%' }}>
        {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
        {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
        <img
          src={defaultSrc}
          alt={alt || asset.alt || ''}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="pa-v6-media-plane__img"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
          }}
        />
      </picture>
      {overlay && <div className="pa-v6-media-plane__overlay-slot">{overlay}</div>}
    </div>
  );
};

export default MediaPlane;
