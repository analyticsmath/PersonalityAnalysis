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

  const fallbackSrc = asset.source || (webpEntries.length > 0 ? webpEntries[0][1] : '');

  return (
    <div
      className={`pa-v7-media-plane ${className}`}
      style={{
        aspectRatio: asset.aspectRatio || undefined,
        ...style,
      }}
    >
      <picture>
        {avifSrcset && <source type="image/avif" srcSet={avifSrcset} sizes="100vw" />}
        {webpSrcset && <source type="image/webp" srcSet={webpSrcset} sizes="100vw" />}
        <img
          src={fallbackSrc}
          alt={alt || asset.alt || ''}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          style={{
            objectPosition: objectPosition || asset.focalPoint?.desktop || '50% 50%',
          }}
        />
      </picture>
    </div>
  );
};

export default MediaPlane;
