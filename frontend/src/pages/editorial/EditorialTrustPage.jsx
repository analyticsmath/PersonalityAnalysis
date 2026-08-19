import React from 'react';
import PublicLayout from '../../components/personality-v6/chrome/PublicLayout';
import TrustEvidenceChain from '../../components/personality-v6/routes/TrustEvidenceChain';

export const EditorialTrustPage = () => {
  return (
    <PublicLayout headerTheme="dark">
      <TrustEvidenceChain />
    </PublicLayout>
  );
};

export default EditorialTrustPage;
