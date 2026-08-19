import React from 'react';
import PublicLayout from '../../components/personality-v6/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v6/motion/SmoothScrollProvider';
import HowItWorksCanvas from '../../components/personality-v6/routes/HowItWorksCanvas';

export const EditorialHowItWorksPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light">
        <HowItWorksCanvas />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHowItWorksPage;
