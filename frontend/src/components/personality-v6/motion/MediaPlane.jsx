import React from 'react';

/**
 * MediaPlane
 * Renders a full responsive <picture> base plane with AVIF/WebP sources,
 * stable aspect ratio, explicit dimensions, preload policy, and optional overlay slot.
 *
 * Guaranteed Invariant:
 * The responsive <picture> element is the permanent base image, rendered statically
 * and visible before GSAP initializes.
 */
export const MediaPlane = ({
  asset,
  alt = '',
  sizes = '100vw',
  objectPosition = 'center center',
  transformOrigin = 'center center',
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

  // Extract explicit aspect ratio if provided
  let widthAttr = 1280;
  let heightAttr = 853;
  if (asset.aspectRatio && typeof asset.aspectRatio === 'string') {
    const parts = asset.aspectRatio.split('/').map((s) => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] > 0) {
      widthAttr = Math.round(parts[0]);
      heightAttr = Math.round(parts[1]);
    }
  }

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
      <picture
        className="pa-v6-media-plane__picture"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      >
        {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
        {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
        <img
          src={defaultSrc}
          alt={alt || asset.alt || ''}
          width={widthAttr}
          height={heightAttr}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          className="pa-v6-media-plane__img"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
            transformOrigin,
          }}
        />
      </picture>
      {overlay && <div className="pa-v6-media-plane__overlay-slot">{overlay}</div>}
    </div>
  );
};

export default MediaPlane;

