import React from 'react';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import MethodologyPublication from '../../components/personality-atlas/methodology/MethodologyPublication';

export const EditorialMethodologyPage = () => {
  return (
    <AtlasScrollProvider>
      <AtlasLayout>
        <MethodologyPublication />
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default EditorialMethodologyPage;
