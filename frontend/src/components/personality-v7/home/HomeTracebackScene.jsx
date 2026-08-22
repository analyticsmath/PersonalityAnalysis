import React, { useState } from 'react';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import EnvironmentPlane from '../living-record/EnvironmentPlane';
import EvidenceStrip from '../living-record/EvidenceStrip';
import ProvenanceTrace from '../living-record/ProvenanceTrace';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';
import './HomeTracebackScene.css';

/**
 * HomeTracebackScene (Scene 7)
 * Trust & Provenance inspection state:
 * Allows user to trace a scored conclusion backward to the original source.
 */
export const HomeTracebackScene = () => {
  const { navigateWithTransition } = useRouteTransition();
  const [isInspecting, setIsInspecting] = useState(false);
  const [activeStage, setActiveStage] = useState('supplied');

  const provenanceData = {
    source: 'answer',
    sourceId: 'initiative-pattern-intermediate',
    dimension: 'bigFive',
    key: 'conscientiousness',
    direction: 'positive',
    scoringSource: 'deterministic',
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigateWithTransition('/trust');
  };

  return (
    <section
      id="home-scene-traceback"
      className="pa-home-traceback-scene"
      aria-label="Traceback: Inspect evidence provenance"
    >
      <div className="pa-home-traceback-scene__inner">
        {/* Inspection Media Planes */}
        <div className="pa-home-traceback-scene__media-grid">
          <div className="pa-home-traceback-scene__primary-media">
            <EnvironmentPlane
              asset={MEDIA_ASSETS_V7.trustInspection}
              role="primary"
              caption="INSPECTION / HUMAN EVIDENCE"
            />
          </div>
          <div className="pa-home-traceback-scene__diag-media">
            <EnvironmentPlane
              asset={MEDIA_ASSETS_V7.trustDiagnostic}
              role="support"
              caption="DIAGNOSTIC TRACE"
            />
          </div>
        </div>

        {/* Inspection Interaction Area */}
        <div className="pa-home-traceback-scene__content">
          <div className="pa-home-traceback-scene__header">
            <span className="pa-home-traceback-scene__eyebrow">VERIFIED PROVENANCE</span>
            <h2 className="pa-home-traceback-scene__h2">
              Trace a reading back
              <br />
              to what created it.
            </h2>
          </div>

          <div className="pa-home-traceback-scene__strip-wrap">
            <EvidenceStrip
              quote="“Reading assembled from retained evidence.”"
              eyebrow="TRACE SPECIMEN"
              sourceLabel="REVERSIBLE PROVENANCE"
              theme="carbon"
              variant="inspect"
              isInspecting={isInspecting}
              onToggleInspect={() => setIsInspecting(!isInspecting)}
              provenanceData={provenanceData}
            />
          </div>

          <div className="pa-home-traceback-scene__trace-nav">
            <ProvenanceTrace
              activeStage={activeStage}
              onSelectStage={(k) => {
                setActiveStage(k);
                setIsInspecting(true);
              }}
            />
          </div>

          <div className="pa-home-traceback-scene__footer">
            <a
              href="/trust"
              className="pa-btn pa-btn--primary"
              onClick={handleCtaClick}
            >
              See trust and methodology →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTracebackScene;
