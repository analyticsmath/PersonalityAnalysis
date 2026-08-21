import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';

export const HomeFinaleChapter = () => {
  const asset = MEDIA_ASSETS_V7.homeContext;

  return (
    <section className="pa-home-finale" aria-label="Closing Context">
      <div className="pa-v7-grid">
        <div style={{ gridColumn: '1 / -1' }} className="pa-home-finale__inner">
          <div className="pa-home-finale__copy">
            <h2 className="pa-home-finale__h2">
              Your record should be richer than your first answer.
            </h2>
            <p className="pa-home-finale__body">
              Build a profile you can inspect, revisit and use for career exploration.
            </p>
            <div className="pa-home-finale__actions">
              <Link to="/signup" className="pa-btn-primary">
                Create my profile
              </Link>
              <Link to="/login" className="pa-link-text" style={{ color: 'var(--pa-carbon)' }}>
                Sign in to an existing record &rarr;
              </Link>
            </div>
          </div>

          <div className="pa-home-finale__media-wrap pa-media-plane">
            <picture>
              <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 38vw, 100vw" />
              <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 38vw, 100vw" />
              <img
                src={asset.source}
                alt={asset.alt}
                width={asset.intrinsicDimensions.width}
                height={asset.intrinsicDimensions.height}
                className="pa-home-finale__media"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFinaleChapter;
