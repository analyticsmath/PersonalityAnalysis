import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import HomeWorldEntryScene from '../../components/personality-v7/home/HomeWorldEntryScene';
import HomeSourceQuietScene from '../../components/personality-v7/home/HomeSourceQuietScene';
import HomeBranchingScene from '../../components/personality-v7/home/HomeBranchingScene';
import HomeCareerTakeoverScene from '../../components/personality-v7/home/HomeCareerTakeoverScene';
import HomeCalibrationScene from '../../components/personality-v7/home/HomeCalibrationScene';
import HomeTimeRevisitScene from '../../components/personality-v7/home/HomeTimeRevisitScene';
import HomeTracebackScene from '../../components/personality-v7/home/HomeTracebackScene';
import HomeFinaleScene from '../../components/personality-v7/home/HomeFinaleScene';

/**
 * EditorialHomePage
 * The Living Record flagship master narrative.
 * 1. World Entry (0-100)
 * 2. Source Quiet (3/10)
 * 3. Branching Evidence (8/10)
 * 4. Career World Takeover (9/10)
 * 5. Calibration Quiet (4/10)
 * 6. Time Revisit (7/10)
 * 7. Traceback (6/10)
 * 8. Finale (8/10)
 */
export const EditorialHomePage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        {/* Scene 1 — World Entry */}
        <HomeWorldEntryScene />

        {/* Scene 2 — Source Quiet */}
        <HomeSourceQuietScene />

        {/* Scene 3 — Branching Evidence */}
        <HomeBranchingScene />

        {/* Scene 4 — Career World Takeover */}
        <HomeCareerTakeoverScene />

        {/* Scene 5 — Calibration Quiet */}
        <HomeCalibrationScene />

        {/* Scene 6 — Time Revisit */}
        <HomeTimeRevisitScene />

        {/* Scene 7 — Traceback */}
        <HomeTracebackScene />

        {/* Scene 8 — Finale */}
        <HomeFinaleScene />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHomePage;
