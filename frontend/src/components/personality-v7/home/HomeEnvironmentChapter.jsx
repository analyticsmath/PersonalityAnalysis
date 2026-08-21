import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';

export const HomeEnvironmentChapter = () => {
  const asset = MEDIA_ASSETS_V7.careerComplex;

  return (
    <section className="pa-home-environment" aria-label="Career Environment">
      <div className="pa-v7-grid">
        <div style={{ gridColumn: '1 / -1' }} className="pa-home-environment__inner">
          <div className="pa-home-environment__copy">
            <h2 className="pa-home-environment__h2">
              Career fit is a relationship between evidence and environment.
            </h2>
            <p className="pa-home-environment__body">
              Personality Assessor compares your record with curated career profiles across multiple fit layers. The useful question is how your evidence relates to the conditions of the work.
            </p>
            <div>
              <Link to="/career-intelligence" className="pa-btn-primary-dark">
                Explore career intelligence
              </Link>
            </div>
          </div>

          <div className="pa-home-environment__media-wrap pa-media-plane">
            <picture>
              <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 45vw, 100vw" />
              <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 45vw, 100vw" />
              <img
                src={asset.source}
                alt={asset.alt}
                width={asset.intrinsicDimensions.width}
                height={asset.intrinsicDimensions.height}
                className="pa-home-environment__media"
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

export default HomeEnvironmentChapter;
