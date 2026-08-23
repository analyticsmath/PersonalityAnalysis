import React from 'react';
import './MobileEvidenceSpine.css';

const DEFAULT_BRANCHES = [
  {
    key: 'bigFive',
    dimension: 'BIG FIVE',
    title: 'Extraversion',
    desc: 'Clarifying stakeholders and taking cross-functional initiative',
    side: 'left',
  },
  {
    key: 'riasec',
    dimension: 'RIASEC',
    title: 'Investigative / Conventional',
    desc: 'Analytical issue investigation & procedural organization',
    side: 'right',
  },
  {
    key: 'values',
    dimension: 'WORK VALUES',
    title: 'Independence & Learning',
    desc: 'Autonomous execution paired with continuous learning orientation',
    side: 'left',
  },
  {
    key: 'signals',
    dimension: 'CAREER SIGNALS',
    title: 'Communication & Planning',
    desc: 'Structured problem framing and deliberate execution',
    side: 'right',
  },
];

export const MobileEvidenceSpine = ({
  branches = DEFAULT_BRANCHES,
  activeBranchKey = null,
  activeBranchIndex = 0,
  className = '',
}) => {
  // If activeBranchKey is provided, resolve its index
  const resolvedActiveIndex = activeBranchKey
    ? branches.findIndex((b) => b.key === activeBranchKey)
    : activeBranchIndex;

  const currentActiveIdx = Math.max(0, Math.min(resolvedActiveIndex, branches.length - 1));

  return (
    <div className={`pa-mobile-spine ${className}`} role="region" aria-label="Mobile evidence spine">
      {/* Central Oxblood Spine Path */}
      <div className="pa-mobile-spine__line" aria-hidden="true" />

      {/* Traveling Source Marker */}
      <div
        className="pa-mobile-spine__source-marker"
        style={{
          top: `calc(${currentActiveIdx * 25}% + 1.25rem)`,
        }}
        aria-hidden="true"
      >
        <span className="pa-mobile-spine__marker-dot" />
        <span className="pa-mobile-spine__marker-label">SOURCE</span>
      </div>

      <div className="pa-mobile-spine__branches">
        {branches.map((branch, idx) => {
          const isActive = idx === currentActiveIdx;
          const isSettled = idx < currentActiveIdx;
          const isPending = idx > currentActiveIdx;

          return (
            <div
              key={branch.key}
              className={`pa-mobile-spine__branch pa-mobile-spine__branch--${branch.side} ${
                isActive ? 'is-active' : isSettled ? 'is-settled' : 'is-pending'
              }`}
            >
              <div className="pa-mobile-spine__connector" aria-hidden="true">
                <span className="pa-mobile-spine__connector-dot" />
              </div>
              <div className="pa-mobile-spine__open-label">
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
