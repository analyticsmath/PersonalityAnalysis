import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import HowItWorksSequence from '../../components/personality-v7/routes/HowItWorksSequence';

export const EditorialHowItWorksPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light" withFooter={true}>
        <HowItWorksSequence />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHowItWorksPage;
