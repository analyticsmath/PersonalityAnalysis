import React from 'react';
import PublicLayout from '../../components/personality-v4/chrome/PublicLayout';
import ProfileHeroTheatre from '../../components/personality-v4/home/ProfileHeroTheatre';
import EvidenceToSignalTheatre from '../../components/personality-v4/home/EvidenceToSignalTheatre';
import IndependentReadingsField from '../../components/personality-v4/home/IndependentReadingsField';
import CareerWorldsTheatre from '../../components/personality-v4/home/CareerWorldsTheatre';
import DevelopmentEchoScene from '../../components/personality-v4/home/DevelopmentEchoScene';
import InspectableTrustScene from '../../components/personality-v4/home/InspectableTrustScene';
import FinalProfileScene from '../../components/personality-v4/home/FinalProfileScene';

export const EditorialHomePage = () => {
  return (
    <PublicLayout headerTheme="dark">
      <ProfileHeroTheatre />
      <EvidenceToSignalTheatre />
      <IndependentReadingsField />
      <CareerWorldsTheatre />
      <DevelopmentEchoScene />
      <InspectableTrustScene />
      <FinalProfileScene />
    </PublicLayout>
  );
};

export default EditorialHomePage;
