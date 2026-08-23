import React from 'react';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import EnvironmentPlane from '../living-record/EnvironmentPlane';
import EvidenceStrip from '../living-record/EvidenceStrip';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';
import './HomeFinaleScene.css';

/**
 * HomeFinaleScene (Scene 8)
 * Thematic return to the opening world with an accumulated Living Record.
 * Resolves the narrative before the footer.
 */
export const HomeFinaleScene = () => {
  const { navigateWithTransition } = useRouteTransition();

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <section
      id="home-scene-finale"
      className="pa-home-finale-scene"
      data-tone="dark"
      aria-label="Finale: The Living Record accumulated"
    >
      <div className="pa-home-finale-scene__backdrop" aria-hidden="true" />

      {/* Alternate Crop of Opening World */}
      <div className="pa-home-finale-scene__media">
        <EnvironmentPlane
          asset={MEDIA_ASSETS_V7.homeContext}
          role="primary"
          focalPoint="65% 55%"
          caption="STUDIO REVISITED / ACCUMULATED RECORD"
        />
      </div>

      <div className="pa-home-finale-scene__content">
        <div className="pa-home-finale-scene__header">
          <h2 className="pa-home-finale-scene__h2">
            The source stays.
            <br />
            The record gets better.
          </h2>
          <p className="pa-home-finale-scene__lead">
            Retain what you supplied. Compare across environments. Revisit as your career evolves without overwriting who you were.
          </p>
        </div>

        {/* Accumulated Protagonist */}
        <div className="pa-home-finale-scene__strip-wrap">
          <EvidenceStrip
            quote="“I clarify responsibilities before committing work.”"
            eyebrow="ACCUMULATED RECORD"
            sourceLabel="SOURCE + EVIDENCE + DATE + TRACE"
            theme="mineral"
            variant="dated"
            accumulatedMarks={true}
          />
        </div>

        <div className="pa-home-finale-scene__actions">
          <a
            href="/signup"
            className="pa-btn pa-btn--primary"
            onClick={(e) => handleCtaClick(e, '/signup')}
          >
            Build profile
          </a>
          <a
            href="/login"
            className="pa-btn pa-btn--quiet"
            onClick={(e) => handleCtaClick(e, '/login')}
          >
            Sign in →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeFinaleScene;
