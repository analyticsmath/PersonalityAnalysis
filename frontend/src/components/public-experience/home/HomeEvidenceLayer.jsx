/**
 * Personality Assessor - Home Evidence Layer
 * DOM Anchor and layout slots for persistent media actors:
 * - True 4:5 Evidence Plate Target Slot
 * - Support Detail Plate
 * - 4 Workworld Environments (Precision, Autonomy, Collaboration, Operational Pressure)
 */

import React from 'react';
import { PersistentMediaSlot } from '../canvas/PersistentMediaSlot';

export const HomeEvidenceLayer = () => {
  return (
    <div className="pa-px-home-evidence-root" aria-hidden="false">
      {/* ── S0 & S1: World Entry & True 4:5 Evidence Target Slot ── */}
      <div className="pa-px-home-world-primary-wrapper">
        <div className="home-evidence-target pa-px-evidence-target-slot">
          <PersistentMediaSlot
            actorId="home-observation-primary"
            slotId="home-evidence-target-slot"
            assetKey="homeWorldEntry"
            alt="Contextual architectural design studio environment"
            priority={true}
            transitionRole="shared"
          />
        </div>
      </div>

      {/* ── S1: Secondary Support Detail Plate ── */}
      <div className="pa-px-home-world-secondary-wrapper">
        <div className="pa-px-support-detail-slot">
          <PersistentMediaSlot
            actorId="home-observation-secondary"
            slotId="home-support-detail-slot"
            assetKey="homeSituationDetail"
            alt="Close analytical inspection of engineering materials"
            priority={true}
          />
        </div>
      </div>

      {/* ── S4: Workworld 4-Environment Centerpiece Layer ── */}
      <div className="pa-px-workworld-layer" aria-label="Workworld Environments">
        {/* Environment 1: Precision */}
        <div className="pa-px-workworld-env pa-px-env--precision">
          <div className="pa-px-workworld-media-slot">
            <PersistentMediaSlot
              actorId="home-workworld-precision"
              slotId="workworld-precision-slot"
              assetKey="workworldPrecision"
              alt="Precision lathe operation in engineering workshop"
            />
          </div>
          <div className="pa-px-workworld-copy">
            <h2 className="pa-px-env-title">Precision</h2>
            <p className="pa-px-env-support">When detail is unforgiving.</p>
          </div>
        </div>

        {/* Environment 2: Autonomy */}
        <div className="pa-px-workworld-env pa-px-env--autonomy">
          <div className="pa-px-workworld-media-slot">
            <PersistentMediaSlot
              actorId="home-workworld-autonomy"
              slotId="workworld-autonomy-slot"
              assetKey="workworldAutonomy"
              alt="Autonomous focused work in studio"
            />
          </div>
          <div className="pa-px-workworld-copy">
            <h2 className="pa-px-env-title">Autonomy</h2>
            <p className="pa-px-env-support">When self-direction sets the standard.</p>
          </div>
        </div>

        {/* Environment 3: Collaboration */}
        <div className="pa-px-workworld-env pa-px-env--collaboration">
          <div className="pa-px-workworld-media-slot">
            <PersistentMediaSlot
              actorId="home-workworld-collaboration"
              slotId="workworld-collaboration-slot"
              assetKey="workworldCollaboration"
              alt="Collaborative design alignment across shared artifacts"
            />
          </div>
          <div className="pa-px-workworld-copy">
            <h2 className="pa-px-env-title">Collaboration</h2>
            <p className="pa-px-env-support">When the work depends on alignment.</p>
          </div>
        </div>

        {/* Environment 4: Operational Pressure */}
        <div className="pa-px-workworld-env pa-px-env--pressure">
          <div className="pa-px-workworld-media-slot">
            <PersistentMediaSlot
              actorId="home-workworld-pressure"
              slotId="workworld-pressure-slot"
              assetKey="workworldPressure"
              alt="Real-time operational control room coordination"
            />
          </div>
          <div className="pa-px-workworld-copy">
            <h2 className="pa-px-env-title">Operational pressure</h2>
            <p className="pa-px-env-support">When timing becomes part of the decision.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEvidenceLayer;
