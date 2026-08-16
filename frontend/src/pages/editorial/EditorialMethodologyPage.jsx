// frontend/src/pages/editorial/EditorialMethodologyPage.jsx
// Personality Assessor — Methodology & Psychometric Models Route

import React from 'react';
import { Link } from 'react-router-dom';
import EditorialHeader from '../../components/editorial/EditorialHeader';
import EditorialFooter from '../../components/editorial/EditorialFooter';
import '../../styles/editorial/editorial-foundation.css';
import '../../styles/editorial/editorial-routes.css';

export default function EditorialMethodologyPage() {
  const frameworks = [
    {
      id: 'big-five',
      tag: 'Trait Psychology',
      title: 'Big Five Framework (OCEAN)',
      desc: 'The gold standard in empirical personality assessment. Evaluates Openness to experience, Conscientiousness in execution, Extraversion in alignment, Agreeableness in team dynamics, and Emotional Stability under pressure.',
      details: ['Openness & Paradigm Exploration', 'Conscientiousness & Craftsmanship', 'Extraversion & Communication Pacing', 'Agreeableness & Collaborative Empathy', 'Emotional Stability under Volatility'],
    },
    {
      id: 'riasec',
      tag: 'Vocational Theory',
      title: 'Holland RIASEC Vocational Model',
      desc: 'Developed by John Holland to map affinity with distinct work environments: Realistic (tactile systems), Investigative (empirical discovery), Artistic (synthesis & design), Social (interpersonal coordination), Enterprising (strategic leadership), and Conventional (structured precision).',
      details: ['Investigative Problem Solving', 'Realistic Engineering Implementation', 'Enterprising Strategic Leadership', 'Artistic Interface Synthesis'],
    },
    {
      id: 'work-values',
      tag: 'Occupational Science',
      title: 'O*NET Work Values Framework',
      desc: 'Derived from the U.S. Department of Labor occupational database. Inspects the core motivational conditions required for sustained performance and career satisfaction.',
      details: ['Autonomy & Independent Implementation', 'Achievement & Concrete Mastery', 'Support & Predictable Engineering Standards'],
    },
    {
      id: 'scoring-engine',
      tag: 'Algorithmic Integrity',
      title: 'Deterministic Scoring & Behavioral Signals',
      desc: 'Our scoring algorithms are strictly deterministic. Telemetry such as response pacing, trade-off selections, and ambiguity navigation are evaluated via transparent mathematical models without black-box mutations.',
      details: ['Zero Generative Score Hallucination', 'Inspectable Response Weights', 'Consistent Multi-Trait Calibration'],
    },
  ];

  return (
    <div className="ed-route-page">
      <EditorialHeader />

      <header className="ed-route-hero">
        <span className="ed-tag">SCIENTIFIC FOUNDATION</span>
        <h1 className="ed-route-hero__headline">
          Validated psychometrics, deterministic scoring, separated models.
        </h1>
        <p className="ed-route-hero__lead">
          We reject opaque composite scores. Each model operates independently, allowing you to inspect specific cognitive and behavioral traits with total clarity.
        </p>
      </header>

      <main className="ed-route-body">
        <div className="ed-methodology-grid">
          {frameworks.map((f) => (
            <div key={f.id} className="ed-methodology-card">
              <span className="ed-methodology-card__tag">{f.tag}</span>
              <h2 className="ed-methodology-card__title">{f.title}</h2>
              <p className="ed-methodology-card__desc">{f.desc}</p>
              <ul style={{ paddingLeft: '18px', margin: '8px 0 0 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {f.details.map((d) => (
                  <li key={d} style={{ fontSize: '13px', color: 'var(--ed-text-secondary)' }}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link to="/assessment/start" className="ed-btn ed-btn--primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
            Experience the adaptive assessment →
          </Link>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
