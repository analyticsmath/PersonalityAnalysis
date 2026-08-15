import React, { useState } from 'react';
import { marketingDemo } from '../../../content/personalityMarketingDemo';

const lenses = [
  { id: 'personality', label: 'Personality (Big Five)', summary: 'Continuous dimensional spectrums of cognitive and emotional style.' },
  { id: 'interests', label: 'Vocational Interests (RIASEC)', summary: 'Six distinct operational territories of affinity and focus.' },
  { id: 'values', label: 'Work Values', summary: 'Ordered workplace motivations and cultural requirements.' },
  { id: 'signals', label: 'Career Signals', summary: 'Demonstrated competencies derived from verified problem solving.' },
];

export default function LivingProfileField() {
  const [activeLens, setActiveLens] = useState('personality');

  const { bigFive, riasec, values, signals } = marketingDemo.profile;

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
          {/* Lens Selector Rail */}
          <nav className="living-profile-v4-nav" role="tablist" aria-label="Profile dimension lenses">
            {lenses.map((lens) => (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={activeLens === lens.id}
                aria-controls={`panel-${lens.id}`}
                id={`tab-${lens.id}`}
                className={`profile-lens-btn ${activeLens === lens.id ? 'is-active' : ''}`}
                onClick={() => setActiveLens(lens.id)}
              >
                <span className="profile-lens-btn__label">{lens.label}</span>
                <span className="profile-lens-btn__desc">{lens.summary}</span>
              </button>
            ))}
          </nav>

          {/* Open Analytical Field */}
          <div className="living-profile-v4-field" role="region" aria-live="polite">
            {activeLens === 'personality' && (
              <div id="panel-personality" role="tabpanel" aria-labelledby="tab-personality" className="profile-lens-view">
                <div className="profile-view-head">
                  <h3 className="profile-view-title">Big Five Dimensional Spectrum</h3>
                  <span className="profile-view-meta">Calibrated 0–100 continuous scale</span>
                </div>
                <div className="profile-lollipops-list">
                  {bigFive.map(([trait, score, desc]) => (
                    <div key={trait} className="profile-lollipop-item">
                      <div className="profile-lollipop-label-row">
                        <span className="profile-lollipop-name">{trait}</span>
                        <span className="profile-lollipop-value tabular-nums">{score}</span>
                      </div>
                      <div className="profile-lollipop-track" role="meter" aria-valuenow={score} aria-valuemin="0" aria-valuemax="100" aria-label={trait}>
                        <div className="profile-lollipop-line" style={{ width: `${score}%` }} />
                        <div className="profile-lollipop-point" style={{ left: `${score}%` }} />
                      </div>
                      <p className="profile-lollipop-desc">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeLens === 'interests' && (
              <div id="panel-interests" role="tabpanel" aria-labelledby="tab-interests" className="profile-lens-view">
                <div className="profile-view-head">
                  <h3 className="profile-view-title">RIASEC Vocational Territories</h3>
                  <span className="profile-view-meta">Ranked territory alignment</span>
                </div>
                <div className="profile-bars-list">
                  {riasec.map(([territory, score, desc], idx) => (
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
                      <p className="profile-bar-desc">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeLens === 'values' && (
              <div id="panel-values" role="tabpanel" aria-labelledby="tab-values" className="profile-lens-view">
                <div className="profile-view-head">
                  <h3 className="profile-view-title">Work Values Priority Hierarchy</h3>
                  <span className="profile-view-meta">Ordered motivational preferences</span>
                </div>
                <div className="profile-values-grid">
                  {values.map(([val, score, desc], idx) => (
                    <div key={val} className="profile-value-cell">
                      <div className="profile-value-cell__top">
                        <span className="profile-value-rank">#{idx + 1}</span>
                        <span className="profile-value-title">{val}</span>
                        <span className="profile-value-score tabular-nums">{score}</span>
                      </div>
                      <div className="profile-bar-track">
                        <div className="profile-bar-fill" style={{ width: `${score}%` }} />
                      </div>
                      <p className="profile-value-desc">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeLens === 'signals' && (
              <div id="panel-signals" role="tabpanel" aria-labelledby="tab-signals" className="profile-lens-view">
                <div className="profile-view-head">
                  <h3 className="profile-view-title">Demonstrated Career Signals</h3>
                  <span className="profile-view-meta">Synthesized practical capabilities</span>
                </div>
                <div className="profile-lollipops-list">
                  {signals.map(([signal, score, desc]) => (
                    <div key={signal} className="profile-lollipop-item">
                      <div className="profile-lollipop-label-row">
                        <span className="profile-lollipop-name">{signal}</span>
                        <span className="profile-lollipop-value tabular-nums">{score}/100</span>
                      </div>
                      <div className="profile-lollipop-track">
                        <div className="profile-lollipop-line" style={{ width: `${score}%` }} />
                        <div className="profile-lollipop-point" style={{ left: `${score}%` }} />
                      </div>
                      <p className="profile-lollipop-desc">{desc}</p>
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
