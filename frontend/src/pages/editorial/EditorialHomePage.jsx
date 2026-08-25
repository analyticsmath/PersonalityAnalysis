import React from 'react';
import { HomeEditorialExperience } from '../../components/public-experience/home/HomeEditorialExperience';

/**
 * Editorial Home Page - Editorial Evidence Atlas
 * Sequence of 10 authored chapters:
 * 1. Thesis Poster (Hero)
 * 2. One Response Spread
 * 3. Evidence Deck
 * 4. Professional Conditions Journey
 * 5. Multi-Model Psychometric Atlas
 * 6. Deterministic Calibration Mass
 * 7. Career Role Atlas Teaser
 * 8. Progress Longitudinal Teaser
 * 9. Source Ledger & Trust Teaser
 * 10. Synthesis Finale
 */
export const EditorialHomePage = () => {
  return (
    <div className="pa-px-home-page-container">
      <HomeEditorialExperience />
    </div>
  );
};

export default EditorialHomePage;
