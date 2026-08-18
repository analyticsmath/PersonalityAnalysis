import React from 'react';

/**
 * Responsive Picture component supporting modern AVIF/WebP image formats
 * with width-constrained srcsets, layout sizes, and zero layout shift.
 */
export const ResponsivePicture = ({
  asset,
  alt = '',
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
  objectPosition = 'center',
  style = {},
  imgStyle = {},
  width,
  height,
}) => {
  if (!asset) return null;

  const avifEntries = asset.avif ? Object.entries(asset.avif) : [];
  const webpEntries = asset.webp ? Object.entries(asset.webp) : [];

  const avifSrcSet = avifEntries
    .sort(([w1], [w2]) => Number(w1) - Number(w2))
    .map(([w, url]) => `${url} ${w}w`)
    .join(', ');

  const webpSrcSet = webpEntries
    .sort(([w1], [w2]) => Number(w1) - Number(w2))
    .map(([w, url]) => `${url} ${w}w`)
    .join(', ');

  const highestWidth = Math.max(
    ...[...avifEntries.map(([w]) => Number(w)), ...webpEntries.map(([w]) => Number(w)), 1200]
  );
  const fallbackSrc =
    asset.webp?.[highestWidth] ||
    asset.source ||
    Object.values(asset.webp || {})[0] ||
    Object.values(asset.avif || {})[0];

  const resolvedAlt = alt !== undefined ? alt : asset.alt || '';

  return (
    <picture className={`pa-picture ${className}`.trim()} style={style}>
      {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
      {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
      <img
        src={fallbackSrc}
        alt={resolvedAlt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        width={width || (asset.originalDimensions?.width ? asset.originalDimensions.width : undefined)}
        height={height || (asset.originalDimensions?.height ? asset.originalDimensions.height : undefined)}
        className={`pa-picture__img ${imgClassName}`.trim()}
        style={{
          objectPosition,
          ...imgStyle,
        }}
      />
    </picture>
  );
};

export default ResponsivePicture;
