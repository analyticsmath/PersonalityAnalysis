import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import ProgressRecord from '../../components/personality-v7/routes/ProgressRecord';

export const EditorialProgressPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light" withFooter={true}>
        <ProgressRecord />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialProgressPage;
