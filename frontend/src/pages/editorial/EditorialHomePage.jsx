import React from 'react';
import PublicLayout from '../../components/personality-v6/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v6/motion/SmoothScrollProvider';
import ProfileEmergenceScene from '../../components/personality-v6/home/ProfileEmergenceScene';
import EvidenceCanvasScene from '../../components/personality-v6/home/EvidenceCanvasScene';
import IndependentReadingsCanvas from '../../components/personality-v6/home/IndependentReadingsCanvas';
import CareerWorldsCanvas from '../../components/personality-v6/home/CareerWorldsCanvas';
import DevelopmentEchoScene from '../../components/personality-v6/home/DevelopmentEchoScene';
import InspectableTrustScene from '../../components/personality-v6/home/InspectableTrustScene';
import FinalProfileScene from '../../components/personality-v6/home/FinalProfileScene';

export const EditorialHomePage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark">
        <ProfileEmergenceScene />
        <EvidenceCanvasScene />
        <IndependentReadingsCanvas />
        <CareerWorldsCanvas />
        <DevelopmentEchoScene />
        <InspectableTrustScene />
        <FinalProfileScene />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHomePage;
