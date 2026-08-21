import React, { useState } from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import HomeOpeningChapter from '../../components/personality-v7/home/HomeOpeningChapter';
import HomeDecisionChapter from '../../components/personality-v7/home/HomeDecisionChapter';
import HomeTransformationChapter from '../../components/personality-v7/home/HomeTransformationChapter';
import HomeEnvironmentChapter from '../../components/personality-v7/home/HomeEnvironmentChapter';
import HomeChangeChapter from '../../components/personality-v7/home/HomeChangeChapter';
import HomeInspectionChapter from '../../components/personality-v7/home/HomeInspectionChapter';
import HomeFinaleChapter from '../../components/personality-v7/home/HomeFinaleChapter';

export const EditorialHomePage = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        {/* Chapter 1 — Orientation & Initial Context */}
        <HomeOpeningChapter
          evidenceText={
            selectedChoice
              ? `“${selectedChoice.text}”`
              : '“I prefer clear ownership before committing work.”'
          }
        />

        {/* Chapter 2 — Contextual Decision */}
        <HomeDecisionChapter
          selectedChoice={selectedChoice}
          onSelectChoice={setSelectedChoice}
        />

        {/* Chapter 3 — Evidence Transformation (Pinned Signature Sequence) */}
        <HomeTransformationChapter selectedChoice={selectedChoice} />

        {/* Chapter 4 — Career Environment */}
        <HomeEnvironmentChapter />

        {/* Chapter 5 — Change Over Time */}
        <HomeChangeChapter />

        {/* Chapter 6 — Inspection & Provenance */}
        <HomeInspectionChapter />

        {/* Chapter 7 — Finale & Closure */}
        <HomeFinaleChapter />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHomePage;
