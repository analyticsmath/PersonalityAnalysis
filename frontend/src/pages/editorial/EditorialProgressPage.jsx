import React from 'react';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { ProgressTemporalStage } from '../../components/public-experience/progress/ProgressTemporalStage';

export const EditorialProgressPage = () => {
  return (
    <PublicExperienceRoot withFooter={true}>
      <ProgressTemporalStage />
    </PublicExperienceRoot>
  );
};

export default EditorialProgressPage;
