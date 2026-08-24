import React from 'react';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import ProgressTemporalStage from '../../components/personality-atlas/progress/ProgressTemporalStage';
import ProgressEmptyState from '../../components/personality-atlas/progress/ProgressEmptyState';

export const EditorialProgressPage = () => {
  return (
    <AtlasScrollProvider>
      <AtlasLayout>
        <ProgressTemporalStage />
        <ProgressEmptyState />
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default EditorialProgressPage;
