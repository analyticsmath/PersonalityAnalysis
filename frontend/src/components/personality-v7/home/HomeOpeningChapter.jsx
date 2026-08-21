import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';

export const HomeOpeningChapter = () => {
  const asset = MEDIA_ASSETS_V7.homeContext;

  return (
    <section className="pa-home-opening" aria-label="Orientation">
      <div className="pa-home-opening__media-stage">
        <picture>
          <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 76vw, 100vw" />
          <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 76vw, 100vw" />
          <img
            src={asset.source}
            alt={asset.alt}
            width={asset.intrinsicDimensions.width}
            height={asset.intrinsicDimensions.height}
            className="pa-home-opening__media"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div className="pa-home-opening__carbon-plane">
        <h1 className="pa-home-opening__h1">
          One answer should<br />never define you.
        </h1>
        <p className="pa-home-opening__lead">
          Personality Assessor builds an inspectable professional record from personality, vocational interests, work values and the context around your responses.
        </p>
        <div className="pa-home-opening__actions">
          <Link to="/signup" className="pa-btn-primary-dark">
            Build your profile
          </Link>
          <Link to="/how-it-works" className="pa-link-text" style={{ color: 'var(--pa-mineral)' }}>
            See how the record works &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeOpeningChapter;
