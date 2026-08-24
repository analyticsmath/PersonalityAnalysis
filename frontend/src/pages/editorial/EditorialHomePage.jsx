import React from 'react';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import FieldEntryChapter from '../../components/personality-atlas/home/FieldEntryChapter';
import BranchingChapter from '../../components/personality-atlas/home/BranchingChapter';
import WorkworldDriftChapter from '../../components/personality-atlas/home/WorkworldDriftChapter';
import TemporalLayersChapter from '../../components/personality-atlas/home/TemporalLayersChapter';
import ResolutionChapter from '../../components/personality-atlas/home/ResolutionChapter';

export const EditorialHomePage = () => {
  return (
    <AtlasScrollProvider>
      <AtlasLayout>
        <FieldEntryChapter />
        <BranchingChapter />
        <WorkworldDriftChapter />
        <TemporalLayersChapter />
        <ResolutionChapter />
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default EditorialHomePage;
