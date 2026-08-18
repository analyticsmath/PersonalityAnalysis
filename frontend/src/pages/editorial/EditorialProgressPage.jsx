import React from 'react';
import PublicLayout from '../../components/personality-v4/chrome/PublicLayout';
import ProgressRecord from '../../components/personality-v4/routes/ProgressRecord';

export const EditorialProgressPage = () => {
  return (
    <PublicLayout headerTheme="light">
      <ProgressRecord />
    </PublicLayout>
  );
};

export default EditorialProgressPage;
