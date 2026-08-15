// frontend/src/pages/public/HowItWorksPage.jsx
// Exploded Evidence Engine Page

import React, { useState } from 'react';
import PublicHeader from '../../components/public/imprint/PublicHeader';
import { ImprintSceneProvider } from '../../components/public/imprint/ImprintSceneContext';
import '../../styles/imprint/foundation-imprint.css';
import '../../styles/imprint/public-routes-imprint.css';

const STEPS = [
  {
    id: 'context',
    title: '01. Professional Context',
    desc: 'Verified project work, technical documentation, and CV artifacts establish the authentic evidence baseline.',
    image: '/media/personality-imprint/hero/hero-dominant-960.webp',
  },
  {
    id: 'isolation',
    title: '02. Evidence Isolation',
    desc: 'The system locates trade-off patterns and isolates key behavioral signals from non-essential noise.',
    image: '/media/personality-imprint/fragments/blueprint-lift-960.webp',
  },
  {
    id: 'adaptive',
    title: '03. Adaptive Questioning',
    desc: 'Targeted prompt scenarios adapt dynamically to explore dimensions requiring additional coverage.',
    image: '/media/personality-imprint/worlds/world-build-960.webp',
  },
  {
    id: 'instruments',
    title: '04. Four Uncollapsed Readings',
    desc: 'Personality, Vocational Interests, Work Values, and Career Signals are calibrated and kept strictly distinct.',
    image: '/media/personality-imprint/worlds/world-investigate-960.webp',
  },
  {
    id: 'relationship',
    title: '05. Explainable Career Direction',
    desc: 'Inspect where your dimensional profile aligns with target roles, where it stretches, and how to strengthen it.',
    image: '/media/personality-imprint/worlds/world-collaborate-960.webp',
  },
];

export default function HowItWorksPage() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = STEPS[activeStepIdx];

  return (
    <ImprintSceneProvider>
      <div className="public-route-page">
        <PublicHeader />

        <header className="public-route-header">
          <h1 className="public-route-title">The Exploded Evidence Engine</h1>
          <p className="public-route-lead">
            See how authentic professional context is transformed through adaptive questioning into calibrated dimensional readings and explainable career fit.
          </p>
        </header>

        <main className="hiw-engine-container">
          <div className="hiw-engine-stage">
            {/* Step Navigation Rail */}
            <nav className="hiw-steps-nav" aria-label="Engine stages">
              {STEPS.map((step, idx) => {
                const isActive = activeStepIdx === idx;
                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`hiw-step-button ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveStepIdx(idx)}
                  >
                    <span className="hiw-step-title">{step.title}</span>
                    <p className="hiw-step-desc">{step.desc}</p>
                  </button>
                );
              })}
            </nav>

            {/* Persistent Visual Stage Viewport */}
            <div className="hiw-engine-viewport">
              <img src={activeStep.image} alt={activeStep.title} />
            </div>
          </div>
        </main>
      </div>
    </ImprintSceneProvider>
  );
}
