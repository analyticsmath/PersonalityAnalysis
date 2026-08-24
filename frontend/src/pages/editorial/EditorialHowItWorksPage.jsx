import React from 'react';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { HowContinuousTransformation } from '../../components/public-experience/how/HowContinuousTransformation';

export const EditorialHowItWorksPage = () => {
  return (
    <PublicExperienceRoot withFooter={true}>
      <div className="pa-px-how-root">
        <HowContinuousTransformation />
      </div>
    </PublicExperienceRoot>
  );
};

export default EditorialHowItWorksPage;
