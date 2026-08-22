import React from 'react';
import './ResponsiveEvidenceImage.css';

/**
 * ResponsiveEvidenceImage
 * Production responsive image component that outputs AVIF/WebP/JPG derivatives
 * from the Evidence in Context manifest without leaking intrinsic dimensions.
 */
export const ResponsiveEvidenceImage = ({
  asset = null,
  priority = false,
  focalPoint = null,
  aspectRatio = null,
  className = '',
  style = {},
  alt = null,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1080px',
}) => {
  if (!asset) return null;

  const effectiveAlt = alt !== null ? alt : asset.alt || 'Professional environment scene';
  const effectiveAspect = aspectRatio || asset.aspectRatio || '16 / 9';
  const effectiveFocal = focalPoint || asset.focalPoint?.desktop || '50% 50%';

  return (
    <div
      className={`pa-responsive-image-wrap ${className}`}
      style={{
        aspectRatio: effectiveAspect,
        ...style,
      }}
    >
      <picture className="pa-responsive-image__picture">
        {asset.avifSrcSet && (
          <source type="image/avif" srcSet={asset.avifSrcSet} sizes={sizes} />
        )}
        {asset.webpSrcSet && (
          <source type="image/webp" srcSet={asset.webpSrcSet} sizes={sizes} />
        )}
        <img
          src={asset.source || asset.fallback}
          alt={effectiveAlt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="pa-responsive-image__img"
          style={{
            objectPosition: effectiveFocal,
          }}
        />
      </picture>
    </div>
  );
};

export default ResponsiveEvidenceImage;
