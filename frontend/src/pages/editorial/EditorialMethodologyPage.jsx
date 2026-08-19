import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import MethodologyReadingRoom from '../../components/personality-v7/routes/MethodologyReadingRoom';

export const EditorialMethodologyPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light" withFooter={true}>
        <MethodologyReadingRoom />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialMethodologyPage;
