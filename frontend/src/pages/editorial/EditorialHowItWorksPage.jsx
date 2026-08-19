import React from 'react';
import PublicLayout from '../../components/personality-v4/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v5/motion/SmoothScrollProvider';
import HowItWorksCanvas from '../../components/personality-v5/routes/HowItWorksCanvas';

export const EditorialHowItWorksPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark">
        <HowItWorksCanvas />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHowItWorksPage;
