// frontend/src/pages/editorial/EditorialHowItWorksPage.jsx
// Personality Assessor — How It Works Visual Storyboard

import React from 'react';
import { Link } from 'react-router-dom';
import EditorialHeader from '../../components/editorial/EditorialHeader';
import EditorialFooter from '../../components/editorial/EditorialFooter';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-foundation.css';
import '../../styles/editorial/editorial-routes.css';

export default function EditorialHowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Contextual Intake',
      tag: 'Professional Foundation',
      desc: 'Instead of starting in a vacuum, you anchor the assessment in your real domain by uploading a CV, selecting focus areas, or sharing recent project experience.',
      image: EDITORIAL_MEDIA_ASSETS.hero.actor1.src,
      imageAlt: 'Contextual intake and professional review',
    },
    {
      step: '02',
      title: 'Adaptive Scenario Branching',
      tag: 'Dynamic Depth',
      desc: 'Questions evolve dynamically based on previous responses, exploring how you navigate technical trade-offs, team friction, ambiguity, and strategic priorities.',
      image: EDITORIAL_MEDIA_ASSETS.hero.actor4.src,
      imageAlt: 'Adaptive problem solving in complex environments',
    },
    {
      step: '03',
      title: 'Four-Model Psychometric Analysis',
      tag: 'Multi-Framework Separation',
      desc: 'Responses are evaluated across Big Five personality dimensions, Holland RIASEC interests, and Work Values without collapsing distinct signals into an arbitrary single score.',
      image: EDITORIAL_MEDIA_ASSETS.hero.actor3.src,
      imageAlt: 'Rigorous empirical evaluation and modeling',
    },
    {
      step: '04',
      title: 'Inspectable Career Alignment',
      tag: 'Verifiable Fit',
      desc: 'Explore career trajectories, dimensional fits, and stretch capability targets where every recommendation links directly to your decision patterns.',
      image: EDITORIAL_MEDIA_ASSETS.hero.actor5.src,
      imageAlt: 'Collaborative strategy and career trajectory mapping',
    },
  ];

  return (
    <div className="ed-route-page">
      <EditorialHeader />

      <header className="ed-route-hero">
        <span className="ed-tag">PROCESS &amp; METHODOLOGY</span>
        <h1 className="ed-route-hero__headline">
          How professional context becomes inspectable intelligence.
        </h1>
        <p className="ed-route-hero__lead">
          A four-step adaptive architecture designed for students, graduates, and experienced practitioners seeking dimensional career clarity.
        </p>
      </header>

      <main className="ed-route-body">
        {steps.map((step, idx) => (
          <div
            key={step.step}
            className={`ed-storyboard-step ${idx % 2 === 1 ? 'ed-storyboard-step--reversed' : ''}`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--ed-font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--ed-ink)' }}>
                  {step.step}
                </span>
                <span className="ed-tag" style={{ margin: 0 }}>{step.tag}</span>
              </div>
              <h2 className="ed-h2" style={{ margin: 0 }}>
                {step.title}
              </h2>
              <p className="ed-lead" style={{ fontSize: '15px' }}>
                {step.desc}
              </p>
            </div>

            <div className="ed-storyboard-step__visual">
              <img src={step.image} alt={step.imageAlt} loading="lazy" />
            </div>
          </div>
        ))}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link to="/assessment/start" className="ed-btn ed-btn--primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
            Build my profile now →
          </Link>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
