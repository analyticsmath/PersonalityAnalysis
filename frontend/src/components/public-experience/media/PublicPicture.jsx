import React from 'react';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';

export const PublicPicture = ({
  assetKey,
  alt = '',
  loading = 'lazy',
  priority = false,
  className = '',
  focalPosition,
  style = {},
}) => {
  const asset = MEDIA_MANIFEST_PX[assetKey];

  if (!asset) {
    console.warn(`PublicPicture: Asset key "${assetKey}" not found in media manifest.`);
    return null;
  }

  const computedAlt = alt || asset.alt || '';
  const objectPosition = focalPosition || asset.focalPoint?.desktop || '50% 50%';

  return (
    <picture className={`pa-px-picture ${className}`}>
      {/* Mobile 4:5 Portrait Crops */}
      {asset.mobileAvifSrcSet && (
        <source
          media="(max-width: 767px)"
          type="image/avif"
          srcSet={asset.mobileAvifSrcSet}
          sizes="100vw"
        />
      )}
      {asset.mobileWebpSrcSet && (
        <source
          media="(max-width: 767px)"
          type="image/webp"
          srcSet={asset.mobileWebpSrcSet}
          sizes="100vw"
        />
      )}
      {asset.mobileJpgSrcSet && (
        <source
          media="(max-width: 767px)"
          type="image/jpeg"
          srcSet={asset.mobileJpgSrcSet}
          sizes="100vw"
        />
      )}

      {/* Desktop Wide Formats */}
      {asset.avifSrcSet && (
        <source
          type="image/avif"
          srcSet={asset.avifSrcSet}
          sizes="(max-width: 1440px) 100vw, 1920px"
        />
      )}
      {asset.webpSrcSet && (
        <source
          type="image/webp"
          srcSet={asset.webpSrcSet}
          sizes="(max-width: 1440px) 100vw, 1920px"
        />
      )}

      {/* Fallback Image */}
      <img
        src={asset.sourceWebp || asset.fallbackJpg}
        srcSet={asset.jpgSrcSet || undefined}
        sizes="(max-width: 1440px) 100vw, 1920px"
        alt={computedAlt}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={{
          objectFit: 'cover',
          objectPosition,
          width: '100%',
          height: '100%',
          ...style,
        }}
      />
    </picture>
  );
};

export default PublicPicture;
