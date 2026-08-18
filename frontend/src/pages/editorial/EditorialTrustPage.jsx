import React from 'react';
import PublicLayout from '../../components/personality-v4/chrome/PublicLayout';
import TrustEvidenceChain from '../../components/personality-v4/routes/TrustEvidenceChain';

export const EditorialTrustPage = () => {
  return (
    <PublicLayout headerTheme="light">
      <TrustEvidenceChain />
    </PublicLayout>
  );
};

export default EditorialTrustPage;
