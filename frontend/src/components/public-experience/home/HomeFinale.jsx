/**
 * Personality Assessor - Home Finale Stage
 * Asymmetric synthesis: exactly 3 curated visual evidence fragments,
 * one persistent source phrase mark, one calibration mark, and the final narrative statement.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { PersistentMediaSlot } from '../canvas/PersistentMediaSlot';

export const HomeFinale = () => {
  return (
    <div className="pa-px-finale-stage" aria-label="Journey Resolution">
      <div className="pa-px-finale-composition">
        {/* Fragment 1: Wide World Origin */}
        <div className="pa-px-finale-fragment pa-px-fragment--1">
          <PersistentMediaSlot
            actorId="home-finale-frag-1"
            slotId="finale-frag-1-slot"
            assetKey="homeWorldEntry"
            alt="Contextual architectural design studio environment"
          />
        </div>

        {/* Fragment 2: Precision Operation Detail */}
        <div className="pa-px-finale-fragment pa-px-fragment--2">
          <PersistentMediaSlot
            actorId="home-finale-frag-2"
            slotId="finale-frag-2-slot"
            assetKey="workworldPrecision"
            alt="Precision lathe workshop operation"
          />
        </div>

        {/* Fragment 3: Deep Technical Inquiry */}
        <div className="pa-px-finale-fragment pa-px-fragment--3">
          <PersistentMediaSlot
            actorId="home-finale-frag-3"
            slotId="finale-frag-3-slot"
            assetKey="careerDeepInquiry"
            alt="Technical diagnostics investigation"
          />
        </div>

        {/* Persistent Provenance Trace Mark */}
        <div className="pa-px-finale-trace-mark">
          <span className="pa-px-trace-mark-pill">Source Evidence Trace</span>
          <p className="pa-px-trace-mark-sentence">
            &ldquo;I clarify the constraints first, then choose the smallest reversible step.&rdquo;
          </p>
        </div>

        {/* Final Typographic Statement & Core CTA */}
        <div className="pa-px-finale-content">
          <h2 className="pa-px-finale-headline">
            SEE WHAT HOLDS UNDER DIFFERENT CONDITIONS.
          </h2>
          <p className="pa-px-finale-support">
            Build a profile you can inspect, compare and revisit as your work changes.
          </p>
          <div className="pa-px-finale-actions">
            <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary pa-px-btn-primary--large">
              Build my profile
            </Link>
            <Link to="/how-it-works" className="pa-px-btn-secondary">
              Explore how it works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFinale;
