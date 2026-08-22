import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EnvironmentPlane from '../../components/personality-v7/living-record/EnvironmentPlane';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import './EditorialProgressPage.css';

/**
 * EditorialProgressPage
 * Operating Mode: Longitudinal Film
 * Demonstrates how multi-session assessments accumulate over time.
 * Retains earlier baselines and calculates intersection trends only after >=2 eligible assessments.
 */
export const EditorialProgressPage = () => {
  const { navigateWithTransition } = useRouteTransition();

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        {/* ── Longitudinal Film Hero ── */}
        <section className="pa-progress-film" aria-label="Longitudinal Film: Recomposition over time">
          <div className="pa-progress-film__crops">
            <div className="pa-progress-film__crop pa-progress-film__crop--a">
              <EnvironmentPlane
                asset={MEDIA_ASSETS_V7.progressStudio}
                role="primary"
                focalPoint="25% 35%"
                priority={true}
                caption="EARLIER TIME POINT / ASSESSMENT 01"
              />
            </div>
            <div className="pa-progress-film__crop pa-progress-film__crop--b">
              <EnvironmentPlane
                asset={MEDIA_ASSETS_V7.progressStudio}
                role="primary"
                focalPoint="75% 65%"
                caption="LATER TIME POINT / ASSESSMENT 02"
              />
            </div>
          </div>

          <div className="pa-progress-film__overlay">
            <div className="pa-progress-film__header">
              <span className="pa-progress-film__eyebrow">LONGITUDINAL FILM</span>
              <h1 className="pa-progress-film__h1">
                A later assessment adds a record.
                <br />
                It does not erase the first.
              </h1>
              <p className="pa-progress-film__lead">
                Personality Assessor preserves historical baselines so you can inspect stability alongside growth as your role and environment evolve.
              </p>
            </div>

            {/* Overlapping Dated Strips */}
            <div className="pa-progress-film__stack">
              <div className="pa-progress-film__strip pa-progress-film__strip--one">
                <EvidenceStrip
                  quote="“I clarify responsibilities before committing work.”"
                  eyebrow="RETAINED BASELINE"
                  dateLabel="ASSESSMENT 01 — 2024"
                  sourceLabel="BASELINE SPECIMEN"
                  theme="mineral"
                  variant="dated"
                />
              </div>

              <div className="pa-progress-film__strip pa-progress-film__strip--two">
                <EvidenceStrip
                  quote="“I coordinate across functions when goals require shared ownership.”"
                  eyebrow="SUBSEQUENT OBSERVATION"
                  dateLabel="ASSESSMENT 02 — 2025"
                  sourceLabel="LONGITUDINAL REVISIT"
                  theme="carbon"
                  variant="dated"
                />
              </div>

              {/* Physical Overlap Intersection Reading */}
              <div className="pa-progress-film__intersection">
                <span className="pa-progress-film__int-label">REVISED INTERSECTION READING</span>
                <p className="pa-progress-film__int-text">
                  Conscientiousness remains the foundational baseline (+0.75), while collaborative initiative and cross-functional leadership expand (+0.42).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Longitudinal Contract & Empty State Disclosure ── */}
        <section className="pa-progress-contract" aria-label="Longitudinal Trend Rules">
          <div className="pa-progress-contract__inner">
            <div className="pa-progress-contract__header">
              <span className="pa-progress-contract__eyebrow">DATA MODEL CONTRACT</span>
              <h2 className="pa-progress-contract__h2">Longitudinal Trends Require Two Assessments</h2>
              <p className="pa-progress-contract__lead">
                The analytics system enforces a minimum of two completed assessments before calculating trend trajectories or delta vectors.
              </p>
            </div>

            <div className="pa-progress-contract__states-grid">
              {/* Single Assessment State (Insufficient history) */}
              <div className="pa-progress-contract__state-card">
                <div className="pa-progress-contract__card-header">
                  <span className="pa-progress-contract__status pa-progress-contract__status--single">
                    ASSESSMENT 01 ONLY
                  </span>
                  <strong className="pa-progress-contract__card-title">Initial Baseline Established</strong>
                </div>
                <p className="pa-progress-contract__card-desc">
                  Retains atomic evidence records. Trend vectors remain inactive with status <code>insufficient_history</code>.
                </p>
                <div className="pa-progress-contract__sample-pill">Trend Status: Pending second assessment</div>
              </div>

              {/* Multi-Assessment State (Active trends) */}
              <div className="pa-progress-contract__state-card pa-progress-contract__state-card--active">
                <div className="pa-progress-contract__card-header">
                  <span className="pa-progress-contract__status pa-progress-contract__status--active">
                    ASSESSMENT 02+
                  </span>
                  <strong className="pa-progress-contract__card-title">Longitudinal Delta Calculated</strong>
                </div>
                <p className="pa-progress-contract__card-desc">
                  Calculates trajectory points across Big Five, RIASEC, and Work Values while preserving historical provenance.
                </p>
                <div className="pa-progress-contract__sample-pill pa-progress-contract__sample-pill--green">
                  Trend Status: Active trajectory (2 data points)
                </div>
              </div>
            </div>

            <div className="pa-progress-contract__footer">
              <a
                href="/signup"
                className="pa-btn pa-btn--primary"
                onClick={(e) => handleCtaClick(e, '/signup')}
              >
                Start your baseline assessment →
              </a>
            </div>
          </div>
        </section>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialProgressPage;
