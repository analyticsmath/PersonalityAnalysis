import React, { useRef } from 'react';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import MagneticTarget from '../motion/MagneticTarget';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

export const HomeFinaleChapter = () => {
  const { navigateWithTransition } = useRouteTransition();
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);

  const asset = MEDIA_ASSETS_V7.homeContext;

  const handleCtaClick = (e, path) => {
    e.preventDefault();
    navigateWithTransition(path);
  };

  return (
    <section
      ref={sectionRef}
      className="pa-home-finale"
      aria-label="Finale & Narrative Closure"
      data-tone="dark"
    >
      <div className="pa-home-finale__stage">
        {/* Returning Hero Media Environment Spanning Negative Space */}
        <div ref={mediaRef} className="pa-home-finale__media-recurrence">
          <picture>
            <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 70vw, 100vw" />
            <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 70vw, 100vw" />
            <img
              src={asset.source}
              alt={asset.alt}
              width={asset.intrinsicDimensions.width}
              height={asset.intrinsicDimensions.height}
              className="pa-home-finale__img"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        {/* Foreground Open Typographic Closure Field */}
        <div ref={contentRef} className="pa-home-finale__content">
          <h2 className="pa-heading-major pa-home-finale__h2">
            Your record can keep changing as the evidence changes.
          </h2>
          <p className="pa-home-finale__lead">
            Personality Assessor creates an inspectable professional history that evolves alongside your career, projects, and new challenges.
          </p>

          {/* Returning Hero Evidence Object */}
          <div className="pa-home-finale__evidence-revisit">
            <div className="pa-home-finale__provenance-mark" aria-hidden="true" />
            <p className="pa-evidence-quote pa-home-finale__evidence-text">
              “I prefer clear ownership before committing work.”
            </p>
          </div>

          <div className="pa-home-finale__actions">
            <MagneticTarget>
              <a
                href="/signup"
                className="pa-btn-primary-dark"
                onClick={(e) => handleCtaClick(e, '/signup')}
              >
                Build your profile
              </a>
            </MagneticTarget>

            <a
              href="/login"
              className="pa-link-text pa-home-finale__signin-link"
              onClick={(e) => handleCtaClick(e, '/login')}
            >
              Return to an existing record &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFinaleChapter;
