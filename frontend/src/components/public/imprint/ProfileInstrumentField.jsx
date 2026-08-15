// frontend/src/components/public/imprint/ProfileInstrumentField.jsx
// Living Profile Field — 4 Independent Instruments Kept Separate

import React, { useState } from 'react';
import { demoInstruments, illustrativeDisclaimer } from './imprintData';
import '../../../styles/imprint/instruments-imprint.css';

export default function ProfileInstrumentField() {
  const [activeTab, setActiveTab] = useState('bigFive');
  const { bigFive, riasec, workValues, signals } = demoInstruments;

  return (
    <section className="profile-instrument-field" aria-label="Profile Instrument Field">
      <div className="instruments-container">
        {/* ── Section Header ── */}
        <header className="instruments-header">
          <h2 className="instruments-title">Four readings. Kept separate.</h2>
          <p className="instruments-support">
            Personality, interests, values and career signals answer different questions.
          </p>
        </header>

        {/* ── Open Text Instrument Selector ── */}
        <nav className="instruments-selector" aria-label="Instrument modes">
          <button
            type="button"
            className={`instrument-tab-btn ${activeTab === 'bigFive' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('bigFive')}
          >
            Personality
          </button>
          <button
            type="button"
            className={`instrument-tab-btn ${activeTab === 'riasec' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('riasec')}
          >
            Vocational Interests
          </button>
          <button
            type="button"
            className={`instrument-tab-btn ${activeTab === 'values' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('values')}
          >
            Work Values
          </button>
          <button
            type="button"
            className={`instrument-tab-btn ${activeTab === 'signals' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('signals')}
          >
            Career Signals
          </button>
        </nav>

        {/* ── Instrument Stage ── */}
        <div className="instrument-stage">
          {/* 1. Big Five (Lollipop Spectrum Measures) */}
          {activeTab === 'bigFive' && (
            <div className="big-five-field" aria-label="Big Five Tendencies">
              {bigFive.map((item) => (
                <div key={item.trait} className="lollipop-row">
                  <span className="lollipop-label">{item.trait}</span>
                  <div className="lollipop-track" role="progressbar" aria-valuenow={item.score} aria-valuemin="0" aria-valuemax="100">
                    <div className="lollipop-stem" style={{ width: `${item.score}%` }} />
                    <div className="lollipop-head" style={{ left: `${item.score}%` }} />
                  </div>
                  <span className="lollipop-value">{item.score}</span>
                </div>
              ))}
            </div>
          )}

          {/* 2. RIASEC (Radar / Territory & Ranked List) */}
          {activeTab === 'riasec' && (
            <div className="riasec-field" aria-label="RIASEC Vocational Interests">
              <div className="riasec-radar-wrap">
                <svg viewBox="0 0 300 300" width="100%" height="100%">
                  {/* Hexagon Grid Background */}
                  <polygon
                    points="150,30 254,90 254,210 150,270 46,210 46,90"
                    fill="none"
                    stroke="#D9DDE1"
                    strokeWidth="1"
                  />
                  <polygon
                    points="150,70 219,110 219,190 150,230 81,190 81,110"
                    fill="none"
                    stroke="#D9DDE1"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  {/* Data Shape */}
                  <polygon
                    points="150,45 230,105 210,195 150,220 75,185 65,100"
                    fill="rgba(11, 11, 11, 0.08)"
                    stroke="#0B0B0B"
                    strokeWidth="2"
                  />
                  {/* Labels */}
                  <text x="150" y="20" textAnchor="middle" fontSize="12" fill="#4F5358">I</text>
                  <text x="268" y="95" textAnchor="start" fontSize="12" fill="#4F5358">A</text>
                  <text x="268" y="215" textAnchor="start" fontSize="12" fill="#4F5358">S</text>
                  <text x="150" y="290" textAnchor="middle" fontSize="12" fill="#4F5358">E</text>
                  <text x="32" y="215" textAnchor="end" fontSize="12" fill="#4F5358">C</text>
                  <text x="32" y="95" textAnchor="end" fontSize="12" fill="#4F5358">R</text>
                </svg>
              </div>

              <div className="riasec-ranked-list">
                {riasec.map((item) => (
                  <div key={item.name} className="riasec-ranked-item">
                    <span className="riasec-name">{item.name}</span>
                    <span className="riasec-score">{item.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Work Values Ranked Hierarchy */}
          {activeTab === 'values' && (
            <div className="values-field" aria-label="Work Values Hierarchy">
              {workValues.map((item) => (
                <div key={item.name} className="value-hierarchy-item">
                  <div className="value-hierarchy-head">
                    <span className="value-title">{item.name}</span>
                    <span className="value-rank">Priority #{item.rank}</span>
                  </div>
                  <p className="value-desc">{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* 4. Career Signals */}
          {activeTab === 'signals' && (
            <div className="signals-field" aria-label="Evidence-Linked Career Signals">
              {signals.map((sig) => (
                <div key={sig.name} className="signal-evidence-row">
                  <div className="signal-meta-line">
                    <span className="signal-name">{sig.name}</span>
                    <span className="signal-strength">{sig.strength}</span>
                  </div>
                  <p className="signal-evidence-source">{sig.source}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
