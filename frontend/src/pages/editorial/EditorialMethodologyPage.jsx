import React from 'react';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { MethodologyEditorial } from '../../components/public-experience/methodology/MethodologyEditorial';

export const EditorialMethodologyPage = () => {
  return (
    <PublicExperienceRoot withFooter={true}>
      <MethodologyEditorial />
    </PublicExperienceRoot>
  );
};

export default EditorialMethodologyPage;
