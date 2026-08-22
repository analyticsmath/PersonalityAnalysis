import React from 'react';
import EvidenceStrip from '../living-record/EvidenceStrip';
import './HomeSourceQuietScene.css';

/**
 * HomeSourceQuietScene (Scene 2)
 * Deliberate recovery state (3/10 intensity) establishing source persistence
 * before the branching sequence begins.
 */
export const HomeSourceQuietScene = () => {
  return (
    <section
      id="home-scene-quiet"
      className="pa-home-quiet-scene"
      aria-label="Source quiet: Retained evidence baseline"
    >
      <div className="pa-home-quiet-scene__inner">
        <div className="pa-home-quiet-scene__statement-wrap">
          <p className="pa-home-quiet-scene__statement">
            One response can create more than one evidence record.
          </p>
        </div>

        <div className="pa-home-quiet-scene__strip-wrap">
          <EvidenceStrip
            quote="“I clarify responsibilities before committing work.”"
            eyebrow="RETAINED SPECIMEN"
            sourceLabel="SOURCE / ANSWER"
            theme="carbon"
            variant="source"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSourceQuietScene;
