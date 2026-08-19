import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import OrientationChapter from '../../components/personality-v7/home/OrientationChapter';
import EvidenceChapter from '../../components/personality-v7/home/EvidenceChapter';
import FourLensesAtlasChapter from '../../components/personality-v7/home/FourLensesAtlasChapter';
import CareerEnvironmentsChapter from '../../components/personality-v7/home/CareerEnvironmentsChapter';
import ProfileChangeChapter from '../../components/personality-v7/home/ProfileChangeChapter';
import InspectabilityEntryChapter from '../../components/personality-v7/home/InspectabilityEntryChapter';

export const EditorialHomePage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark" withFooter={false}>
        {/* Chapter 01 — The Orientation Field */}
        <OrientationChapter />

        {/* Chapter 02 — Evidence Is the Material */}
        <EvidenceChapter />

        {/* Chapter 03 — Four Lenses Atlas */}
        <FourLensesAtlasChapter />

        {/* Chapter 04 — Career Environments */}
        <CareerEnvironmentsChapter />

        {/* Chapter 05 — A Profile Can Change */}
        <ProfileChangeChapter />

        {/* Chapter 06 — Inspectability and Entry (Includes Integrated Final CTA & Footer) */}
        <InspectabilityEntryChapter />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHomePage;
