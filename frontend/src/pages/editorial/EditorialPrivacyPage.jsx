import React from 'react';
import PublicLayout from '../../components/personality-v6/chrome/PublicLayout';
import PrivacyDocument from '../../components/personality-v6/routes/PrivacyDocument';

export const EditorialPrivacyPage = () => {
  return (
    <PublicLayout headerTheme="light">
      <PrivacyDocument />
    </PublicLayout>
  );
};

export default EditorialPrivacyPage;
