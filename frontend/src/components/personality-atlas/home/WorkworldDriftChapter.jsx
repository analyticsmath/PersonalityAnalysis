import React from 'react';
import AtlasImageJourney from '../media/AtlasImageJourney';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

const WorkworldDriftChapter = () => {
  const environments = PUBLIC_CONTENT.home.chapter3.environments;

  return (
    <section className="pa-atlas-workworld-drift" aria-label="Workworld Drift">
      <AtlasImageJourney environments={environments} />
    </section>
  );
};

export default React.memo(WorkworldDriftChapter);
