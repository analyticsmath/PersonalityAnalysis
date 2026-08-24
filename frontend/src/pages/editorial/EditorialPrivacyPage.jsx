import React from 'react';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { PrivacyEditorial } from '../../components/public-experience/privacy/PrivacyEditorial';

export const EditorialPrivacyPage = () => {
  return (
    <PublicExperienceRoot withFooter={true}>
      <PrivacyEditorial />
    </PublicExperienceRoot>
  );
};

export default EditorialPrivacyPage;
