import React from 'react';
import PublicLayout from '../../components/personality-v6/chrome/PublicLayout';
import ProgressRecord from '../../components/personality-v6/routes/ProgressRecord';

export const EditorialProgressPage = () => {
  return (
    <PublicLayout headerTheme="dark">
      <ProgressRecord />
    </PublicLayout>
  );
};

export default EditorialProgressPage;
