import React from 'react';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import HowTransformationStage from '../../components/personality-atlas/how/HowTransformationStage';

export const EditorialHowItWorksPage = () => {
  return (
    <AtlasScrollProvider>
      <AtlasLayout>
        <HowTransformationStage />
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default EditorialHowItWorksPage;
