import React from 'react';
import { HomeHeroSource, HeroThesisPoster } from './HomeHeroSource';
import { SourceSplitJourney, OneResponseSpread } from './SourceSplitJourney';
import { EvidenceConstellation, EvidenceDeck } from './EvidenceConstellation';
import { ProfessionalConditionsJourney } from './ProfessionalConditionsJourney';
import { CareerMediaField, CareerRoleAtlasTeaser } from './CareerMediaField';
import { RecordTimeTrustFinale, ProgressTeaser, SourceLedgerTeaser, HomeFinale } from './RecordTimeTrustFinale';
import { ModelAtlas } from './ModelAtlas';
import { CalibrationMass } from './CalibrationMass';

/**
 * Personality Assessor — Home Editorial Experience
 * 6 Continuous Visual Movements:
 * 1. HomeHeroSource (Hero + Source Protagonist)
 * 2. SourceSplitJourney (One Answer Splits)
 * 3. EvidenceConstellation (Evidence Readings & Proportional Mass)
 * 4. ProfessionalConditionsJourney (Flagship Multi-Plane Working Conditions)
 * 5. CareerMediaField (17-Role Spatial Stream & Media Emergence)
 * 6. RecordTimeTrustFinale (Time Scrub + Provenance Aperture + Reused Finale)
 */
export const HomeEditorialExperience = () => {
  return (
    <div className="pa-px-home-container" data-route="home">
      {/* ── Movement 1: Hero & Source Protagonist ── */}
      <HomeHeroSource />

      {/* ── Movement 2: One Answer Splits ── */}
      <SourceSplitJourney />

      {/* ── Movement 3: Evidence Constellation & Calibration Mass ── */}
      <EvidenceConstellation />

      {/* ── Movement 4: Professional Conditions Journey ── */}
      <ProfessionalConditionsJourney />

      {/* ── Movement 5: Career Media Field ── */}
      <CareerMediaField />

      {/* ── Movement 6: Time Exposure, Trust Inspection & Finale ── */}
      <RecordTimeTrustFinale />
    </div>
  );
};

export {
  HeroThesisPoster,
  OneResponseSpread,
  EvidenceDeck,
  ModelAtlas,
  CalibrationMass,
  CareerRoleAtlasTeaser,
  ProgressTeaser,
  SourceLedgerTeaser,
  HomeFinale,
};

export default HomeEditorialExperience;
