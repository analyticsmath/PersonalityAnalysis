import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import TrustLedger from '../../components/personality-v7/routes/TrustLedger';

export const EditorialTrustPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light" withFooter={true}>
        <TrustLedger />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialTrustPage;
