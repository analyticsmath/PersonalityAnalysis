import React from 'react';

/**
 * Personality Assessor — AtlasResponsiveImage
 * Responsive image pipeline supporting AVIF, WebP, JPG fallback,
 * and dedicated portrait mobile crops.
 */
const AtlasResponsiveImage = ({
  asset,
  src,
  alt = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
  style = {},
  objectFit = 'cover',
  aspectRatio,
  ...props
}) => {
  if (!asset && !src) return null;

  const imageAlt = alt || asset?.alt || '';
  const fallbackSrc = src || asset?.fallback || asset?.source;
  const avifSrcSet = asset?.avifSrcSet;
  const webpSrcSet = asset?.webpSrcSet;
  const mobileAvif = asset?.mobileAvif;
  const mobileWebp = asset?.mobileWebp;
  const focalPoint = asset?.focalPoint?.desktop || '50% 50%';

  const combinedStyle = {
    objectFit,
    objectPosition: focalPoint,
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style,
  };

  return (
    <picture className={`pa-atlas-picture ${className}`.trim()}>
      {/* Mobile Portrait Dedicated Crops */}
      {mobileAvif && (
        <source
          media="(max-width: 767px)"
          type="image/avif"
          srcSet={mobileAvif}
        />
      )}
      {mobileWebp && (
        <source
          media="(max-width: 767px)"
          type="image/webp"
          srcSet={mobileWebp}
        />
      )}

      {/* Desktop / Tablet Derivatives */}
      {avifSrcSet && (
        <source
          type="image/avif"
          srcSet={avifSrcSet}
          sizes="(max-width: 1023px) 100vw, 85vw"
        />
      )}
      {webpSrcSet && (
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes="(max-width: 1023px) 100vw, 85vw"
        />
      )}

      <img
        src={fallbackSrc}
        alt={imageAlt}
        loading={loading}
        fetchPriority={fetchPriority}
        style={combinedStyle}
        {...props}
      />
    </picture>
  );
};

export default React.memo(AtlasResponsiveImage);
