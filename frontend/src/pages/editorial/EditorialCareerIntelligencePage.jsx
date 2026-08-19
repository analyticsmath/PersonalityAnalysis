import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import CareerIntelligenceIndex from '../../components/personality-v7/routes/CareerIntelligenceIndex';

export const EditorialCareerIntelligencePage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark" withFooter={true}>
        <CareerIntelligenceIndex />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialCareerIntelligencePage;
