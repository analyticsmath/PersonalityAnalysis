import React from 'react';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { WorldEntry } from '../../components/public-experience/home/WorldEntry';
import { ProfessionalSituation } from '../../components/public-experience/home/ProfessionalSituation';
import { MultipleReadings } from '../../components/public-experience/home/MultipleReadings';
import { WorkworldJourney } from '../../components/public-experience/media/WorkworldJourney';
import { Calibration } from '../../components/public-experience/home/Calibration';
import { TimeExposure } from '../../components/public-experience/home/TimeExposure';
import { ProvenanceReveal } from '../../components/public-experience/home/ProvenanceReveal';
import { Finale } from '../../components/public-experience/home/Finale';

export const EditorialHomePage = () => {
  return (
    <PublicExperienceRoot withFooter={true}>
      <WorldEntry />
      <ProfessionalSituation />
      <MultipleReadings />
      <WorkworldJourney />
      <Calibration />
      <TimeExposure />
      <ProvenanceReveal />
      <Finale />
    </PublicExperienceRoot>
  );
};

export default EditorialHomePage;
