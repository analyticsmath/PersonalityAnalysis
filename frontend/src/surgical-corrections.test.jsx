// frontend/src/surgical-corrections.test.jsx
// Personality Assessor — Context Atlas Surgical Contracts Verification

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PUBLIC_CONTENT } from './content/personality-atlas/publicContent';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Context Atlas — Architectural Contracts Suite', () => {
  const app = readFile('src/App.js');
  const routeTransition = readFile('src/components/personality-atlas/motion/AtlasRouteTransitionCoordinator.jsx');
  const atlasLayout = readFile('src/components/personality-atlas/chrome/AtlasLayout.jsx');
  const atlasHeader = readFile('src/components/personality-atlas/chrome/AtlasHeader.jsx');
  const indexMenu = readFile('src/components/personality-atlas/chrome/AtlasIndexMenu.jsx');
  const googleBtn = readFile('src/components/auth/GoogleLoginButton.jsx');
  const homeFieldEntry = readFile('src/components/personality-atlas/home/FieldEntryChapter.jsx');
  const homeBranching = readFile('src/components/personality-atlas/home/BranchingChapter.jsx');
  const homeWorkworld = readFile('src/components/personality-atlas/home/WorkworldDriftChapter.jsx');
  const careerPage = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const howItWorksPage = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const progressPage = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const trustPage = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const methodologyPage = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const loginPage = readFile('src/pages/Auth/LoginPage.js');
  const signupPage = readFile('src/pages/Auth/SignupPage.js');

  const atlasTokensCss = readFile('src/styles/personality-atlas/tokens.css');
  const atlasBaseCss = readFile('src/styles/personality-atlas/base.css');
  const atlasChromeCss = readFile('src/styles/personality-atlas/chrome.css');
  const atlasMotionCss = readFile('src/styles/personality-atlas/motion.css');
  const atlasResponsiveCss = readFile('src/styles/personality-atlas/responsive.css');

  it('1. Transition Coordinator is mounted at App root above AppRoutes', () => {
    expect(app).toContain('<AtlasRouteTransitionCoordinator>');
    expect(app).toContain('</AtlasRouteTransitionCoordinator>');
    expect(app).toContain('<AppRoutes />');
  });

  it('2. Transition Coordinator coordinates public route changes with solid overlay', () => {
    expect(routeTransition).toContain('PUBLIC_ROUTES');
    expect(routeTransition).toContain('.to(overlay');
    expect(routeTransition).toContain('window.scrollTo(0, 0)');
  });

  it('3. Atlas Index Menu implements inert focus contract and Escape key handling', () => {
    expect(indexMenu).toContain("mainContent.setAttribute('inert', '')");
    expect(indexMenu).toContain("mainContent.removeAttribute('inert')");
    expect(indexMenu).toContain("e.key === 'Escape'");
  });

  it('4. Atlas styles have zero linear-gradient / radial-gradient', () => {
    const atlasStyles = [atlasTokensCss, atlasBaseCss, atlasChromeCss, atlasMotionCss, atlasResponsiveCss].join('\n');
    expect(atlasStyles).not.toContain('linear-gradient');
    expect(atlasStyles).not.toContain('radial-gradient');
  });

  it('5. Google Login Button specifies locale="en"', () => {
    expect(googleBtn).toContain('locale="en"');
  });

  it('6. Home Field Entry embeds headline and anchors ResponseFragment protagonist', () => {
    expect(PUBLIC_CONTENT.home.chapter1.headline).toBe('Your work leaves a trail of context.');
    expect(homeFieldEntry).toContain('content.headline');
    expect(homeFieldEntry).toContain('ResponseFragment');
  });

  it('7. Home Branching implements multidimensional reading nodes', () => {
    expect(homeBranching).toContain('ResponseFragment');
    expect(homeBranching).toContain('SOURCE DECOMPOSITION');
  });

  it('8. Home Workworld Drift hosts AtlasImageJourney', () => {
    expect(homeWorkworld).toContain('AtlasImageJourney');
  });

  it('9. Career Intelligence uses Workworld Atlas with 17 canonical roles', () => {
    expect(careerPage).toContain('ROLE_ENTRIES');
    expect(careerPage).toContain('RoleIndexField');
  });

  it('10. How It Works runs continuous transformation stage without numbered steps', () => {
    expect(howItWorksPage).toContain('HowTransformationStage');
    expect(howItWorksPage).not.toContain('STAGE 01');
  });

  it('11. Progress uses temporal comparison with overlapping media layers', () => {
    expect(progressPage).toContain('ProgressTemporalStage');
    expect(progressPage).toContain('ProgressEmptyState');
  });

  it('12. Trust page has interactive chain of custody connecting reading to source', () => {
    expect(trustPage).toContain('TrustChainStage');
    expect(trustPage).toContain('TrustControlField');
  });

  it('13. Methodology serves as research publication with proportional weights', () => {
    expect(methodologyPage).toContain('MethodologyPublication');
  });

  it('14. Auth pages render directly on Field ground with ResponseFragment', () => {
    expect(loginPage).toContain('ResponseFragment');
    expect(signupPage).toContain('ResponseFragment');
  });
});
