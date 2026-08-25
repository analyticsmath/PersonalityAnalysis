import React from 'react';
import { HeroThesisPoster } from './HeroThesisPoster';
import { OneResponseSpread } from './OneResponseSpread';
import { EvidenceDeck } from './EvidenceDeck';
import { ProfessionalConditionsJourney } from './ProfessionalConditionsJourney';
import { ModelAtlas } from './ModelAtlas';
import { CalibrationMass } from './CalibrationMass';
import { CareerRoleAtlasTeaser } from './CareerRoleAtlasTeaser';
import { ProgressTeaser } from './ProgressTeaser';
import { SourceLedgerTeaser } from './SourceLedgerTeaser';
import { HomeFinale } from './HomeFinale';

export const HomeEditorialExperience = () => {
  return (
    <div className="pa-px-home-container" data-route="home">
      {/* ── Chapter 1: Thesis Poster ── */}
      <HeroThesisPoster />

      {/* ── Chapter 2: One Response Spread ── */}
      <OneResponseSpread />

      {/* ── Chapter 3: Evidence Deck ── */}
      <EvidenceDeck />

      {/* ── Chapter 4: Professional Conditions Journey ── */}
      <ProfessionalConditionsJourney />

      {/* ── Chapter 5: Multi-Model Psychometric Atlas ── */}
      <ModelAtlas />

      {/* ── Chapter 6: Deterministic Calibration Mass ── */}
      <CalibrationMass />

      {/* ── Chapter 7: Career Role Atlas Teaser ── */}
      <CareerRoleAtlasTeaser />

      {/* ── Chapter 8: Progress Longitudinal Teaser ── */}
      <ProgressTeaser />

      {/* ── Chapter 9: Source Ledger & Trust Teaser ── */}
      <SourceLedgerTeaser />

      {/* ── Chapter 10: Synthesis Finale ── */}
      <HomeFinale />
    </div>
  );
};

export default HomeEditorialExperience;
