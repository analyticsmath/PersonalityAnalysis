import React from 'react';

/**
 * MediaPlane — V7 Static First-Paint Guaranteed Image Plane
 * Immediately renders responsive AVIF & WebP sources with authored object-position
 * and explicit aspect ratios. Visible in static CSS before JavaScript runs.
 */
export const MediaPlane = ({
  asset,
  objectPosition = '50% 50%',
  priority = false,
  alt = '',
  className = '',
  style = {},
  sizes,
  fetchPriority,
  width,
  height,
  loading,
  decoding,
}) => {
  if (!asset) {
    return <div className={`pa-v7-media-plane ${className}`} style={style} />;
  }

  const avifEntries = asset.avif ? Object.entries(asset.avif) : [];
  const webpEntries = asset.webp ? Object.entries(asset.webp) : [];

  const avifSrcset = avifEntries
    .map(([w, src]) => `${src} ${w}w`)
    .join(', ');

  const webpSrcset = webpEntries
    .map(([w, src]) => `${src} ${w}w`)
    .join(', ');

  const intrinsicDimensions = typeof asset.aspectRatio === 'string'
    ? asset.aspectRatio.match(/^(\d+)\s*\/\s*(\d+)$/)
    : null;
  const intrinsicWidth = width || asset.width || intrinsicDimensions?.[1];
  const intrinsicHeight = height || asset.height || intrinsicDimensions?.[2];
  const responsiveSizes = sizes || '100vw';
  const fallbackSrc = webpEntries.at(-1)?.[1] || asset.source || '';

  return (
    <div
      className={`pa-v7-media-plane ${className}`}
      style={{
        aspectRatio: asset.aspectRatio || undefined,
        ...style,
      }}
    >
      <picture>
        {avifSrcset && <source type="image/avif" srcSet={avifSrcset} sizes={responsiveSizes} />}
        {webpSrcset && <source type="image/webp" srcSet={webpSrcset} sizes={responsiveSizes} />}
        <img
          src={fallbackSrc}
          alt={alt || asset.alt || ''}
          width={intrinsicWidth}
          height={intrinsicHeight}
          sizes={responsiveSizes}
          fetchPriority={fetchPriority || (priority ? 'high' : undefined)}
          loading={loading || (priority ? 'eager' : 'lazy')}
          decoding={decoding || 'async'}
          style={{
            objectPosition: objectPosition || asset.focalPoint?.desktop || '50% 50%',
          }}
        />
      </picture>
    </div>
  );
};

export default MediaPlane;
