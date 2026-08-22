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
 * Demonstrates temporal accumulation: A later assessment adds a record without erasing the first.
 * Longitudinal trends require >= 2 eligible assessments before trend vectors can be calculated.
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
        <div className="pa-progress-page" role="main" id="main-content">
          {/* Longitudinal Film Hero Stage with Physical Photographic Crop Overlap */}
          <section className="pa-progress-film" aria-label="Longitudinal Film: Recomposition over time">
            <div className="pa-progress-film__crops">
              {/* Crop A: Earlier time point (x -8vw, y 7vh, w 68vw, h 82vh) */}
              <div className="pa-progress-film__crop pa-progress-film__crop--a">
                <EnvironmentPlane
                  asset={MEDIA_ASSETS_V7.progressStudio}
                  role="primary"
                  focalPoint="25% 35%"
                  priority={true}
                  caption="ASSESSMENT 01 / HISTORICAL BASELINE"
                />
              </div>

              {/* Crop B: Later time point (x 45vw, y -4vh, w 64vw, h 78vh) */}
              <div className="pa-progress-film__crop pa-progress-film__crop--b">
                <EnvironmentPlane
                  asset={MEDIA_ASSETS_V7.progressStudio}
                  role="primary"
                  focalPoint="75% 65%"
                  caption="ASSESSMENT 02 / SUBSEQUENT OBSERVATION"
                />
              </div>
            </div>

            <div className="pa-progress-film__overlay">
              <div className="pa-progress-film__header">
                <span className="pa-progress-film__meta-tag">TEMPORAL CONTINUITY</span>
                <h1 className="pa-progress-film__h1">
                  A later assessment adds a record.
                  <br />
                  It does not erase the first.
                </h1>
                <p className="pa-progress-film__lead">
                  Personality Assessor preserves historical baselines so you can inspect stability alongside
                  growth as your role and environment evolve.
                </p>
              </div>

              {/* Overlapping Dated Strips (Illustrative Comparative Record) */}
              <div className="pa-progress-film__stack">
                <span className="pa-progress-film__demo-label">
                  ILLUSTRATIVE EXAMPLE — COMPARATIVE RECORD
                </span>

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

                {/* Qualitative Intersection Readout at the Physical Overlap Boundary */}
                <div className="pa-progress-film__intersection">
                  <span className="pa-progress-film__int-label">INTERSECTION READOUT</span>
                  <p className="pa-progress-film__int-text">
                    Foundational procedural conscientiousness remains stable, while cross-functional
                    communication and shared artifact ownership expand into active working habits.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quiet Insufficient-History State Composition (No two side-by-side cards) */}
          <section className="pa-progress-insufficient" aria-label="Eligibility threshold requirements">
            <div className="pa-progress-insufficient__inner">
              <div className="pa-progress-insufficient__content">
                <span className="pa-progress-insufficient__meta-tag">ELIGIBILITY THRESHOLD</span>
                <h2 className="pa-progress-insufficient__h2">Not enough history yet.</h2>
                <p className="pa-progress-insufficient__desc">
                  Complete another eligible assessment before longitudinal trends can be calculated.
                  A single completed session preserves atomic evidence but holds trend vectors in reserve.
                </p>
              </div>

              <div className="pa-progress-insufficient__field">
                {/* 1 Completed Evidence Strip */}
                <div className="pa-progress-insufficient__strip-active">
                  <EvidenceStrip
                    quote="“I clarify responsibilities before committing work.”"
                    eyebrow="FIRST ASSESSMENT COMPLETE"
                    dateLabel="ASSESSMENT 01"
                    sourceLabel="BASELINE PRESERVED"
                    theme="mineral"
                    variant="dated"
                  />
                </div>

                {/* 1 Empty Future Registration Position */}
                <div className="pa-progress-insufficient__strip-future">
                  <div className="pa-progress-insufficient__future-notch" aria-hidden="true" />
                  <div className="pa-progress-insufficient__future-body">
                    <span className="pa-progress-insufficient__future-tag">PENDING ASSESSMENT 02</span>
                    <p className="pa-progress-insufficient__future-prompt">
                      Future responses will register here to calculate temporal stability and career trajectory.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pa-progress-insufficient__actions">
                <a
                  href="/signup"
                  className="pa-btn pa-btn--primary"
                  onClick={(e) => handleCtaClick(e, '/signup')}
                >
                  Create your first baseline &rarr;
                </a>
              </div>
            </div>
          </section>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialProgressPage;
