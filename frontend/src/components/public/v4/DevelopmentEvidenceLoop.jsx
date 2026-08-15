import React, { useState } from 'react';
import { ResponsiveImage } from '../PublicChrome';
import { publicMedia } from '../../../content/personalityMarketingDemo';

const loopActions = [
  {
    key: 'gap',
    title: 'Gap',
    phrase: 'Pinpoints specific capability stretch against target roles.',
  },
  {
    key: 'work',
    title: 'Work',
    phrase: 'Guides focused initiatives to build unproven skills.',
  },
  {
    key: 'artifact',
    title: 'Artifact',
    phrase: 'Produces reviewable outputs—architectures, research, systems.',
  },
  {
    key: 'evidence',
    title: 'Evidence',
    phrase: 'Integrates verified deliverables into your profile record.',
  },
  {
    key: 'return',
    title: 'Return',
    phrase: 'Re-calibrates dimensional readings as your work evolves.',
  },
];

export default function DevelopmentEvidenceLoop() {
  const [activeKey, setActiveKey] = useState('work');
  const processMedia = publicMedia.hero.process || publicMedia.hero.evidenceWall;

  return (
    <section
      id="scene-development-loop"
      className="development-evidence-loop-v4"
      data-header-scene="light"
      aria-labelledby="dev-loop-title"
    >
      <div className="dev-loop-v4-inner">
        <header className="dev-loop-v4-header">
          <h2 id="dev-loop-title" className="dev-loop-v4-title">
            New work changes the profile.
          </h2>
          <p className="dev-loop-v4-support">
            Development is a continuous feedback loop where real deliverables evolve your calibrated readings over time.
          </p>
        </header>

        {/* Media / Artifact Loop as Protagonist */}
        <div className="dev-loop-v4-stage">
          {/* Protagonist Media Canvas */}
          <div className="dev-loop-canvas">
            <figure className="dev-loop-canvas__media">
              {processMedia && (
                <ResponsiveImage
                  media={processMedia}
                  alt="Professional project planning session and project evidence"
                  sizes="(min-width: 1024px) 52vw, 92vw"
                />
              )}
            </figure>
          </div>

          {/* Short Action Words Flow */}
          <div className="dev-loop-actions-flow" role="tablist" aria-label="Development cycle phases">

            {loopActions.map((action) => {
              const isActive = activeKey === action.key;
              return (
                <button
                  key={action.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`dev-loop-action-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveKey(action.key)}
                >
                  <div className="dev-loop-action-head">
                    <span className="dev-loop-action-title">{action.title}</span>
                    <span className="dev-loop-action-marker" aria-hidden="true" />
                  </div>
                  {isActive && (
                    <p className="dev-loop-action-phrase">{action.phrase}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
