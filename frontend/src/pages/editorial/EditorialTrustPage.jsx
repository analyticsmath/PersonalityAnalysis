import React from 'react';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { TrustInspectionStage } from '../../components/public-experience/trust/TrustInspectionStage';

export const EditorialTrustPage = () => {
  return (
    <PublicExperienceRoot withFooter={true}>
      <TrustInspectionStage />
    </PublicExperienceRoot>
  );
};

export default EditorialTrustPage;
