import React from 'react';
import './MobileEvidenceSpine.css';

/**
 * MobileEvidenceSpine
 * Vertical continuous evidence path for mobile viewport branching and engine stages.
 */
export const MobileEvidenceSpine = ({
  branches = [
    { key: 'bigFive', dimension: 'BIG FIVE', title: 'Conscientiousness', desc: 'Positive contribution to systematic execution', side: 'left' },
    { key: 'riasec', dimension: 'RIASEC', title: 'Investigative / Conventional', desc: 'Analytical problem structuring & procedural clarity', side: 'right' },
    { key: 'values', dimension: 'WORK VALUES', title: 'Independence & Learning', desc: 'High preference for autonomy and skill depth', side: 'left' },
    { key: 'signals', dimension: 'CAREER SIGNAL', title: 'Planning & Ownership', desc: 'Initiative when accountability is ambiguous', side: 'right' },
  ],
  activeBranchKey = null,
  className = '',
}) => {
  return (
    <div className={`pa-mobile-spine ${className}`}>
      <div className="pa-mobile-spine__line" aria-hidden="true" />

      <div className="pa-mobile-spine__branches">
        {branches.map((branch) => {
          const isActive = activeBranchKey === branch.key || !activeBranchKey;
          return (
            <div
              key={branch.key}
              className={`pa-mobile-spine__branch pa-mobile-spine__branch--${branch.side} ${
                isActive ? 'is-active' : 'is-dimmed'
              }`}
            >
              <div className="pa-mobile-spine__connector" aria-hidden="true">
                <span className="pa-mobile-spine__connector-dot" />
              </div>
              <div className="pa-mobile-spine__card">
                <span className="pa-mobile-spine__dim">{branch.dimension}</span>
                <strong className="pa-mobile-spine__title">{branch.title}</strong>
                <p className="pa-mobile-spine__desc">{branch.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileEvidenceSpine;
