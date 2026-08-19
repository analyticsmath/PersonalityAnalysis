import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import PrivacyDocument from '../../components/personality-v7/routes/PrivacyDocument';

export const EditorialPrivacyPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light" withFooter={true}>
        <PrivacyDocument />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialPrivacyPage;
