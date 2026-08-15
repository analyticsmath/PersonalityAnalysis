// frontend/src/components/public/imprint/DevelopmentReturnLoop.jsx
// Development Return Loop — Demonstrating how new work returns into the profile

import React, { useState } from 'react';
import { demoDevelopmentStages } from './imprintData';
import '../../../styles/imprint/development-imprint.css';

export default function DevelopmentReturnLoop() {
  const [activeStageIdx, setActiveStageIdx] = useState(2); // Start on Artifact

  return (
    <section className="development-return-loop" aria-label="Development Return Loop">
      <div className="development-container">
        {/* ── Section Header ── */}
        <header className="development-header">
          <h2 className="development-title">New work changes the profile.</h2>
        </header>

        {/* ── Spatial Loop Stage ── */}
        <div className="development-loop-stage">
          {/* 5 Scene States Sequence */}
          <nav className="development-states-nav" aria-label="Development stages">
            {demoDevelopmentStages.map((stage, idx) => {
              const isActive = activeStageIdx === idx;
              return (
                <button
                  key={stage.id}
                  type="button"
                  className={`development-state-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveStageIdx(idx)}
                >
                  <span className="development-state-name">{stage.name}</span>
                  <p className="development-state-desc">{stage.desc}</p>
                </button>
              );
            })}
          </nav>

          {/* Spatial Interactive Protagonist Frame */}
          <div className="development-visual-stage">
            <img
              src="/media/personality-imprint/fragments/work-surface-640.webp"
              alt="Verifiable project artifact and documentation surface"
              loading="lazy"
            />
            <div className="development-loop-svg-overlay">
              <svg viewBox="0 0 500 500" width="100%" height="100%" fill="none" stroke="#0B0B0B" strokeWidth="1.5">
                <path d="M 250,50 A 200,200 0 1,1 249,50" strokeDasharray="6,6" opacity="0.3" />
                <circle cx="250" cy="50" r="6" fill="#0B0B0B" />
                <circle cx="450" cy="250" r="6" fill="#0B0B0B" />
                <circle cx="250" cy="450" r="6" fill="#0B0B0B" />
                <circle cx="50" cy="250" r="6" fill="#0B0B0B" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
