import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';

export default function TrustTransparencyPage() {
  return (
    <main className="app-page privacy-page">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Trust"
          title="Trust, safety, and boundaries"
          subtitle="How to interpret this platform responsibly."
          actions={
            <Link className="history-item__link" to="/account/privacy">
              Privacy controls
            </Link>
          }
        />

        <section className="analytics-section">
          <h2 className="section-header__title">Not a diagnostic or hiring system</h2>
          <p className="page-header__subtitle">
            Scores and narratives are exploratory self-insight tools. They are not certifications of competence,
            clinical mental health assessments, or automated hiring decisions.
          </p>
        </section>

        <section className="analytics-section">
          <h2 className="section-header__title">AI reliability</h2>
          <p className="page-header__subtitle">
            When AI is enabled, outputs can contain errors or biases. Deterministic scoring and your own judgment should
            anchor important choices.
          </p>
        </section>

        <section className="analytics-section">
          <h2 className="section-header__title">Compliance stance</h2>
          <p className="page-header__subtitle">
            This repository describes technical and product practices; it does not assert GDPR, SOC 2, HIPAA, or other
            regulatory compliance.
          </p>
        </section>
      </div>
    </main>
  );
}
