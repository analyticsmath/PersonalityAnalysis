// frontend/src/pages/public/MethodologyPage.jsx
// Methodology Public Secondary Route — Instrument Bench

import React from 'react';
import PublicHeader from '../../components/public/imprint/PublicHeader';
import { ImprintSceneProvider } from '../../components/public/imprint/ImprintSceneContext';
import ProfileInstrumentField from '../../components/public/imprint/ProfileInstrumentField';
import '../../styles/imprint/foundation-imprint.css';
import '../../styles/imprint/public-routes-imprint.css';

export default function MethodologyPage() {
  return (
    <ImprintSceneProvider>
      <div className="public-route-page">
        <PublicHeader forceReleased />

        <header className="public-route-header">
          <h1 className="public-route-title">The Instrument Bench</h1>
          <p className="public-route-lead">
            Four independent psychometric and professional frameworks kept strictly uncollapsed, backed by deterministic scoring logic and verified evidence.
          </p>
        </header>

        <main className="methodology-bench-container">
          <div className="methodology-bench-field">
            {/* Interactive Instrument Field */}
            <section aria-labelledby="interactive-bench-heading">
              <h2 id="interactive-bench-heading" style={{ display: 'none' }}>Instrument Field</h2>
              <ProfileInstrumentField />
            </section>

            {/* Framework 1: Big Five Model */}
            <article className="methodology-framework-section">
              <header className="methodology-framework-header">
                <h3 className="methodology-framework-title">Big Five Personality Dimensions</h3>
                <p className="methodology-framework-desc">
                  Measures core behavioral tendencies across Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Steadiness on a standardized 0–100 scale.
                </p>
              </header>
              <details className="methodology-details-toggle">
                <summary>Inspect Scoring &amp; Calibration Rules</summary>
                <div className="methodology-details-content">
                  <p>
                    Responses are evaluated deterministically using standard psychometric scoring vectors. AI models do not override raw response point computations.
                  </p>
                </div>
              </details>
            </article>

            {/* Framework 2: RIASEC Vocational Interests */}
            <article className="methodology-framework-section">
              <header className="methodology-framework-header">
                <h3 className="methodology-framework-title">RIASEC Vocational Interest Model</h3>
                <p className="methodology-framework-desc">
                  Maps preferred work activities across Holland's hexagonal typology: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.
                </p>
              </header>
              <details className="methodology-details-toggle">
                <summary>Inspect Hexagonal Distance &amp; Congruence</summary>
                <div className="methodology-details-content">
                  <p>
                    Calculates primary, secondary, and tertiary interest codes alongside adjacent vector congruence for career domain mapping.
                  </p>
                </div>
              </details>
            </article>

            {/* Framework 3: Work Values */}
            <article className="methodology-framework-section">
              <header className="methodology-framework-header">
                <h3 className="methodology-framework-title">Work Values Hierarchy</h3>
                <p className="methodology-framework-desc">
                  Ranked prioritization of intrinsic and extrinsic motivators (e.g. Autonomy, Mastery, Purpose, Collaboration, Stability).
                </p>
              </header>
              <details className="methodology-details-toggle">
                <summary>Inspect Value Prioritization Mechanics</summary>
                <div className="methodology-details-content">
                  <p>
                    Values are ranked through trade-off prioritization scenarios to differentiate non-negotiable operational needs from secondary preferences.
                  </p>
                </div>
              </details>
            </article>

            {/* Framework 4: Scoring Boundary & AI Role */}
            <article className="methodology-framework-section">
              <header className="methodology-framework-header">
                <h3 className="methodology-framework-title">Deterministic Scoring vs. AI Assistance Boundary</h3>
                <p className="methodology-framework-desc">
                  Clear separation between deterministic mathematical scoring engines and explanatory generative AI layers.
                </p>
              </header>
              <details className="methodology-details-toggle">
                <summary>Inspect Provenance &amp; Air-Gap Policy</summary>
                <div className="methodology-details-content">
                  <p>
                    Structured scores are computed by deterministic algorithms from verified inputs. Generative AI is employed solely for qualitative context parsing and synthesis explanation, and cannot modify structured numerical traits.
                  </p>
                </div>
              </details>
            </article>
          </div>
        </main>
      </div>
    </ImprintSceneProvider>
  );
}
