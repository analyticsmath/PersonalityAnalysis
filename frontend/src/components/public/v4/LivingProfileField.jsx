import React, { useState } from 'react';
import { marketingDemo } from '../../../content/personalityMarketingDemo';

const lenses = [
  { id: 'personality', label: 'Personality (Big Five)', summary: 'Continuous dimensional spectrums of cognitive and behavioral style.' },
  { id: 'interests', label: 'Vocational Interests (RIASEC)', summary: 'Six operational territories of affinity and focus.' },
  { id: 'values', label: 'Work Values', summary: 'Ordered workplace motivations and cultural requirements.' },
  { id: 'signals', label: 'Career Signals', summary: 'Demonstrated competencies derived from verified problem solving.' },
];

export default function LivingProfileField() {
  const [activeLens, setActiveLens] = useState('personality');

  const { bigFive, riasec, values, signals } = marketingDemo.profile;
  const currentLensMeta = lenses.find((l) => l.id === activeLens) || lenses[0];

  // Helper for SVG RIASEC radar coordinates (radius = 90, center = 110, 110)
  const radarPoints = riasec
    .map(([_, score], idx) => {
      const angle = (Math.PI * 2 * idx) / 6 - Math.PI / 2;
      const r = (score / 100) * 80;
      const x = 110 + r * Math.cos(angle);
      const y = 110 + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section
      id="scene-living-profile"
      className="living-profile-field-v4"
      data-header-scene="light"
      aria-labelledby="living-profile-title"
    >
      <div className="living-profile-v4-inner">
        <header className="living-profile-v4-header">
          <h2 id="living-profile-title" className="living-profile-v4-title">
            Four readings. Kept separate.
          </h2>
          <p className="living-profile-v4-support">
            Personality, interests, values and career signals answer different questions.
          </p>
        </header>

        <div className="living-profile-v4-layout">
          {/* Lens Selector Rail (Labels Only, Quiet Underline Marker) */}
          <nav className="living-profile-v4-nav" role="tablist" aria-label="Profile dimension lenses">
            {lenses.map((lens) => (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={activeLens === lens.id}
                aria-controls={`panel-${lens.id}`}
                id={`tab-${lens.id}`}
                className={`profile-lens-tab ${activeLens === lens.id ? 'is-active' : ''}`}
                onClick={() => setActiveLens(lens.id)}
              >
                <span className="profile-lens-tab__label">{lens.label}</span>
              </button>
            ))}
          </nav>

          {/* Open Analytical Field */}
          <div className="living-profile-v4-field" role="region" aria-live="polite">
            <div className="profile-view-head">
              <span className="profile-view-summary">{currentLensMeta.summary}</span>
              <span className="profile-view-demo-tag">Illustrative profile calibration</span>
            </div>

            {/* Lens 1: Big Five Continuous Lollipops */}
            {activeLens === 'personality' && (
              <div id="panel-personality" role="tabpanel" aria-labelledby="tab-personality" className="profile-lens-view">
                <div className="profile-lollipops-list">
                  {bigFive.map(([trait, score]) => (
                    <div key={trait} className="profile-lollipop-item">
                      <div className="profile-lollipop-label-row">
                        <span className="profile-lollipop-name">{trait}</span>
                        <span className="profile-lollipop-value tabular-nums">{score}</span>
                      </div>
                      <div className="profile-lollipop-track" role="meter" aria-valuenow={score} aria-valuemin="0" aria-valuemax="100" aria-label={trait}>
                        <div className="profile-lollipop-line" style={{ width: `${score}%` }} />
                        <div className="profile-lollipop-point" style={{ left: `${score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lens 2: RIASEC SVG Radar + Ranked Hierarchy */}
            {activeLens === 'interests' && (
              <div id="panel-interests" role="tabpanel" aria-labelledby="tab-interests" className="profile-lens-view">
                <div className="profile-riasec-stage">
                  {/* SVG Radar Chart */}
                  <div className="profile-radar-canvas" aria-hidden="true">
                    <svg viewBox="0 0 220 220" className="profile-radar-svg">
                      {/* Grid webs */}
                      {[0.33, 0.66, 1].map((scale) => (
                        <polygon
                          key={scale}
                          points={Array.from({ length: 6 })
                            .map((_, i) => {
                              const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                              const r = 80 * scale;
                              return `${110 + r * Math.cos(angle)},${110 + r * Math.sin(angle)}`;
                            })
                            .join(' ')}
                          fill="none"
                          stroke="#D9DDE1"
                          strokeWidth="1"
                        />
                      ))}
                      {/* Polygon score shape */}
                      <polygon points={radarPoints} fill="rgba(11, 11, 11, 0.08)" stroke="#0B0B0B" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Ranked List */}
                  <div className="profile-bars-list">
                    {riasec.map(([territory, score], idx) => (
                      <div key={territory} className="profile-bar-item">
                        <div className="profile-bar-label-row">
                          <span className="profile-bar-name">
                            <span className="profile-rank-num">{idx + 1}.</span> {territory}
                          </span>
                          <span className="profile-bar-value tabular-nums">{score}%</span>
                        </div>
                        <div className="profile-bar-track">
                          <div className="profile-bar-fill" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Lens 3: Work Values Ordered Hierarchy */}
            {activeLens === 'values' && (
              <div id="panel-values" role="tabpanel" aria-labelledby="tab-values" className="profile-lens-view">
                <div className="profile-values-ordered-list">
                  {values.map(([val, score], idx) => (
                    <div key={val} className="profile-value-rank-row">
                      <span className="profile-value-rank-idx">#{idx + 1}</span>
                      <span className="profile-value-rank-title">{val}</span>
                      <div className="profile-bar-track">
                        <div className="profile-bar-fill" style={{ width: `${score}%` }} />
                      </div>
                      <span className="profile-value-rank-score tabular-nums">{score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lens 4: Career Signals */}
            {activeLens === 'signals' && (
              <div id="panel-signals" role="tabpanel" aria-labelledby="tab-signals" className="profile-lens-view">
                <div className="profile-lollipops-list">
                  {signals.map(([signal, score]) => (
                    <div key={signal} className="profile-lollipop-item">
                      <div className="profile-lollipop-label-row">
                        <span className="profile-lollipop-name">{signal}</span>
                        <span className="profile-lollipop-value tabular-nums">{score}/100</span>
                      </div>
                      <div className="profile-lollipop-track" role="meter" aria-valuenow={score} aria-valuemin="0" aria-valuemax="100" aria-label={signal}>
                        <div className="profile-lollipop-line" style={{ width: `${score}%` }} />
                        <div className="profile-lollipop-point" style={{ left: `${score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
