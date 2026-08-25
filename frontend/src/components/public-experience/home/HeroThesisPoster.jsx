import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

export const HeroThesisPoster = () => {
  const data = PUBLIC_CONTENT.home.worldEntry;

  return (
    <section className="pa-px-ch-poster" aria-label="Thesis Poster">
      <div className="pa-px-ch-poster__grid">
        <div className="pa-px-ch-poster__type-col">
          <h1 className="pa-px-ch-poster__headline">
            ONE ANSWER <br />
            IS NOT ONE <br />
            RESULT.
          </h1>
          <p className="pa-px-ch-poster__support">
            {data.support}
          </p>
          <div className="pa-px-ch-poster__actions">
            <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
              {data.ctaPrimary}
            </Link>
            <Link to="/how-it-works" className="pa-px-btn-secondary">
              {data.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="pa-px-ch-poster__media-col">
          <div className="pa-px-ch-poster__media-frame">
            <PublicPicture
              assetKey="homeHeroContext"
              alt="Professional working in technology workshop"
              priority={true}
            />
          </div>
        </div>

        <div className="pa-px-ch-poster__source-cue">
          <svg className="pa-px-evidence-path" width="32" height="12" viewBox="0 0 32 12" aria-hidden="true">
            <path d="M 0,6 L 26,6 M 20,1 L 26,6 L 20,11" />
          </svg>
          <span>Source: &ldquo;{data.response}&rdquo;</span>
        </div>
      </div>
    </section>
  );
};

export default HeroThesisPoster;
