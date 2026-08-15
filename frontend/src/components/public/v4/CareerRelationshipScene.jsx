import React, { useState } from 'react';
import { ResponsiveImage } from '../PublicChrome';
import { publicMedia } from '../../../content/personalityMarketingDemo';

export default function CareerRelationshipScene() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const careers = publicMedia.careers || [];
  const currentCareer = careers[selectedIdx] || careers[0];

  return (
    <section
      id="scene-career-relationship"
      className="career-relationship-v4"
      data-header-scene="light"
      aria-labelledby="career-scene-title"
    >
      <div className="career-relationship-v4-inner">
        <header className="career-relationship-v4-header">
          <div className="career-relationship-v4-heading-wrap">
            <h2 id="career-scene-title" className="career-relationship-v4-title">
              A fit score should explain itself.
            </h2>
            <p className="career-relationship-v4-support">
              Inspect where a role aligns, where it stretches and what could strengthen the relationship.
            </p>
          </div>
          <span className="career-relationship-v4-demo-label">Illustrative role relationship</span>
        </header>

        <div className="career-relationship-v4-grid">
          {/* Role Index Left Rail */}
          <nav className="career-role-index" aria-label="Career role environments">
            {careers.map((career, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={career.id}
                  type="button"
                  className={`career-role-index-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                  aria-pressed={isSelected}
                >
                  <span className="career-role-name">{career.title}</span>
                  <span className="career-role-match tabular-nums">{career.match}% fit</span>
                </button>
              );
            })}
          </nav>

          {/* Active Career Stage: Media + Open Reasoning Typography (No Badges) */}
          <div className="career-active-stage">
            {/* Active Profession Media Frame */}
            <figure className="career-active-media">
              {currentCareer?.media && (
                <ResponsiveImage
                  media={currentCareer.media}
                  alt={`Environment for ${currentCareer.title}`}
                  sizes="(min-width: 1024px) 50vw, 92vw"
                />
              )}
            </figure>

            {/* Open Semantic Rationale Typography (No Container Cards) */}
            <div className="career-rationale-flow">
              <div className="career-rationale-block">
                <h3 className="career-rationale-label">Why it relates</h3>
                <p className="career-rationale-body">{currentCareer?.why}</p>
              </div>

              <div className="career-rationale-block">
                <h3 className="career-rationale-label">Where the stretch is</h3>
                <p className="career-rationale-body">{currentCareer?.stretch}</p>
              </div>

              <div className="career-rationale-block">
                <h3 className="career-rationale-label">What could strengthen the relationship</h3>
                <p className="career-rationale-body">{currentCareer?.strengthen}</p>
              </div>

              <footer className="career-methodology-note">
                Recommendations represent dimensional alignment for career exploration, not an absolute guarantee of hiring success.
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
