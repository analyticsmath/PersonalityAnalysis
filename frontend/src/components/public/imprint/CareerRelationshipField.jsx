// frontend/src/components/public/imprint/CareerRelationshipField.jsx
// Career Relationship Field — Dimensional alignment and explainable fit

import React, { useState } from 'react';
import { demoCareers } from './imprintData';
import '../../../styles/imprint/career-imprint.css';

export default function CareerRelationshipField() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeRole = demoCareers[activeIdx] || demoCareers[0];

  return (
    <section className="career-relationship-field" aria-label="Career Relationship Field">
      <div className="career-container">
        {/* ── Section Header ── */}
        <header className="career-header">
          <h2 className="career-title">A fit score should explain itself.</h2>
          <p className="career-support">
            Inspect where a role aligns, where it stretches and what could strengthen the relationship.
          </p>
        </header>

        {/* ── Spatial Field Layout ── */}
        <div className="career-field-layout">
          {/* Role Index Left */}
          <nav className="career-role-index" aria-label="Explore roles">
            {demoCareers.map((role, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={role.id}
                  type="button"
                  className={`career-role-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <span className="career-role-marker" aria-hidden="true" />
                  <span>{role.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Dominant Active Role Environment */}
          <div className="career-media-stage">
            <img src={activeRole.environment} alt={activeRole.title} loading="lazy" />
          </div>

          {/* Reasoning & Relationship Excerpt */}
          <div className="career-reasoning-stage">
            <h3 className="career-active-role-name">{activeRole.title}</h3>

            <div className="career-relationship-pills">
              <div className="career-dimension-line">
                <span className="career-dimension-tag">Dimensional Alignment</span>
                <p className="career-dimension-desc">{activeRole.aligned}</p>
              </div>

              <div className="career-dimension-line">
                <span className="career-dimension-tag">Stretch Dimension</span>
                <p className="career-dimension-desc">{activeRole.stretch}</p>
              </div>

              <div className="career-dimension-line">
                <span className="career-dimension-tag">Capability Growth Path</span>
                <p className="career-dimension-desc">{activeRole.growth}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
