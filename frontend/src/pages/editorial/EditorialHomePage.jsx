import React from 'react';
import { HomeCinematicExperience } from '../../components/public-experience/home/HomeCinematicExperience';

/**
 * Editorial Home Page - Continuous Cinematic Journey
 * Integrates 8 continuous movements in one unified experience:
 * - WorldEntry (S0)
 * - ProfessionalSituation (S1 & S2)
 * - MultipleReadings (S3)
 * - WorkworldJourney (S4)
 * - Calibration (S5)
 * - TimeExposure (S6)
 * - ProvenanceReveal (S7)
 * - Finale (S8)
 */
export const EditorialHomePage = () => {
  return (
    <div className="pa-px-home-page-container">
      <HomeCinematicExperience />
    </div>
  );
};

export default EditorialHomePage;
