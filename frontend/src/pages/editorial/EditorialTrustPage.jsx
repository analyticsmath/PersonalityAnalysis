import React from 'react';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import TrustChainStage from '../../components/personality-atlas/trust/TrustChainStage';
import TrustControlField from '../../components/personality-atlas/trust/TrustControlField';

export const EditorialTrustPage = () => {
  return (
    <AtlasScrollProvider>
      <AtlasLayout>
        <TrustChainStage />
        <TrustControlField />
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default EditorialTrustPage;
