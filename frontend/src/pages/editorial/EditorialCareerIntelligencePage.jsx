import React from 'react';
import { CareerAtlasExperience } from '../../components/public-experience/career/CareerAtlasExperience';

/**
 * Editorial Career Intelligence Page - Professional Field Atlas
 * Spatial exploration of 17 canonical occupational profiles with deterministic fit weights.
 */
export const EditorialCareerIntelligencePage = () => {
  return (
    <div className="pa-px-career-page-container">
      <CareerAtlasExperience />
    </div>
  );
};

export default EditorialCareerIntelligencePage;
