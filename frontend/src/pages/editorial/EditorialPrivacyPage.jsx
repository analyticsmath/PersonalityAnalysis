import React from 'react';
import PublicLayout from '../../components/personality-v4/chrome/PublicLayout';
import PrivacyDocument from '../../components/personality-v4/routes/PrivacyDocument';

export const EditorialPrivacyPage = () => {
  return (
    <PublicLayout headerTheme="light">
      <PrivacyDocument />
    </PublicLayout>
  );
};

export default EditorialPrivacyPage;
