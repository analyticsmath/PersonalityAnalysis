import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChartResearchLab, DashboardMaturityLab, LivingProfileLab } from './Phase3CChartsLab';
import Phase3CMotionLab from './Phase3CMotionLab';
import { PaletteResearchControls, PHASE3C_STATIC_LAYOUT_IDENTITY } from './PaletteResearchControls';
import { ContextStoryboardFixture, HeroFixture, MobileFixtures, TypographyFixture, WorkWorldsFixture } from './Phase3CStaticFixtures';
import './Phase3CLab.css';

export default function Phase3CLabPage() {
  const [palette, setPalette] = useState('mineral');
  const [typeTreatment, setTypeTreatment] = useState('balanced');

  useLayoutEffect(() => {
    document.title = 'Phase 3C Visual + Motion Lab | Personality Assessor';
    const existing = document.head.querySelector('meta[name="robots"]');
    const robots = existing || document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex,nofollow';
    if (!existing) document.head.append(robots);
  }, []);

  return (
    <div
      className="phase3c-lab"
      data-palette={palette}
      data-layout-identity={PHASE3C_STATIC_LAYOUT_IDENTITY}
      data-testid="phase3c-lab-root"
    >
      <div className="phase3c-lab__utility" aria-label="Lab controls">
        <span>Phase 3C — isolated research route</span>
        <PaletteResearchControls palette={palette} onPaletteChange={setPalette} />
        <Link to="/__phase3c-lab/transition" viewTransition>View Transition spike</Link>
      </div>
      <div id="phase3c-smooth-wrapper">
        <div id="phase3c-smooth-content">
          <main>
            <HeroFixture typeTreatment={typeTreatment} onTypeTreatment={setTypeTreatment} />
            <TypographyFixture />
            <WorkWorldsFixture />
            <ContextStoryboardFixture />
            <LivingProfileLab />
            <DashboardMaturityLab />
            <ChartResearchLab />
            <MobileFixtures />
            <Phase3CMotionLab />
          </main>
          <footer className="phase3c-lab-footer">
            <p>Isolated Phase 3C visual and motion research. Not a production product surface.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
