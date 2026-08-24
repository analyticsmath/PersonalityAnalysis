// frontend/src/living-record-source-contracts.test.jsx
// Personality Assessor — Context Atlas Source & Architecture Contract Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import ResponseFragment from './components/personality-atlas/fragments/ResponseFragment';
import careersData from './content/careers.json';
import { ROLE_ENTRIES } from './pages/editorial/EditorialCareerIntelligencePage';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Context Atlas — Source & Architecture Contract Guardrails', () => {
  const home = readFile('src/pages/editorial/EditorialHomePage.jsx');
  const howItWorks = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const careerIntelligence = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const methodology = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const trustRoute = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const progress = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const privacy = readFile('src/pages/editorial/EditorialPrivacyPage.jsx');
  const login = readFile('src/pages/Auth/LoginPage.js');
  const signup = readFile('src/pages/Auth/SignupPage.js');
  const atlasTokensCss = readFile('src/styles/personality-atlas/tokens.css');
  const atlasBaseCss = readFile('src/styles/personality-atlas/base.css');
  const atlasChromeCss = readFile('src/styles/personality-atlas/chrome.css');
  const atlasMotionCss = readFile('src/styles/personality-atlas/motion.css');
  const atlasResponsiveCss = readFile('src/styles/personality-atlas/responsive.css');
  const mediaManifestJs = readFile('src/content/personality-atlas/mediaManifest.js');

  // Contract 0: Home page continuous 5-chapter Context Atlas architecture
  it('0. confirms Home page contains the continuous 5-chapter Context Atlas architecture', () => {
    expect(home).toContain('FieldEntryChapter');
    expect(home).toContain('BranchingChapter');
    expect(home).toContain('WorkworldDriftChapter');
    expect(home).toContain('TemporalLayersChapter');
    expect(home).toContain('ResolutionChapter');
  });

  // Contract 1: Prohibit legacy #D67D8C in Atlas styles
  it('1. prohibits legacy #D67D8C across Atlas styles', () => {
    const atlasStyles = [atlasTokensCss, atlasBaseCss, atlasChromeCss, atlasMotionCss, atlasResponsiveCss].join('\n');
    expect(atlasStyles).not.toContain('#D67D8C');
  });

  // Contract 2: Prohibit gradients in Atlas styles
  it('2. prohibits gradients in Atlas styling', () => {
    const atlasStyles = [atlasTokensCss, atlasBaseCss, atlasChromeCss, atlasMotionCss, atlasResponsiveCss].join('\n');
    expect(atlasStyles).not.toContain('radial-gradient');
    expect(atlasStyles).not.toContain('linear-gradient');
  });

  // Contract 3: Career reads canonical 17 roles directly from careers.json
  it('3. confirms Career Intelligence reads canonical 17 roles from careers.json matching exact titles', () => {
    expect(ROLE_ENTRIES).toHaveLength(17);
    const expectedTitles = Object.values(careersData).map((p) => p.title);
    const actualTitles = ROLE_ENTRIES.map((r) => r.title);
    expect(actualTitles).toEqual(expectedTitles);
    expect(careerIntelligence).toContain('ROLE_ENTRIES');
  });

  // Contract 4: How It Works has no synthetic numbers or visible 01-06 step index
  it('4. confirms How It Works contains no synthetic numbers and no 01-06 stepper', () => {
    expect(howItWorks).not.toContain('01 / 06');
    expect(howItWorks).not.toContain('STAGE 01');
  });

  // Contract 5: Progress contains longitudinal comparison and calm empty-history state
  it('5. confirms Progress contains comparative record and calm empty state', () => {
    expect(progress).toContain('ProgressTemporalStage');
    expect(progress).toContain('ProgressEmptyState');
  });

  // Contract 6: Trust contains chain of custody and sovereign user rights
  it('6. confirms Trust contains chain of custody and data rights', () => {
    expect(trustRoute).toContain('TrustChainStage');
    expect(trustRoute).toContain('TrustControlField');
  });

  // Contract 7: Auth pages use non-split layouts
  it('7. confirms Auth pages do not use 50/50 split partitions', () => {
    expect(login).not.toContain('grid-template-columns: 1fr 1fr');
    expect(signup).not.toContain('grid-template-columns: 1fr 1fr');
    expect(login).toContain('ResponseFragment');
    expect(signup).toContain('ResponseFragment');
  });

  // Contract 8: Media manifest header is neutral Unsplash Plus license statement
  it('8. confirms Media Manifest header matches neutral licensing description', () => {
    expect(mediaManifestJs).toContain('Sourced from locally supplied licensed Unsplash Plus originals with per-asset provenance recorded below.');
  });

  // Contract 9: ResponseFragment renders polymorphic variants
  it('9. confirms ResponseFragment supports all required variants', () => {
    const variants = ['response', 'clause', 'annotation', 'provenance', 'echo'];
    variants.forEach((v) => {
      const { container } = render(<ResponseFragment variant={v} text="Sample fragment" />);
      expect(container.querySelector(`.pa-atlas-fragment--${v}`)).toBeDefined();
    });
  });

  // Contract 10: Semantic single-main rule across all public routes
  it('10. verifies only AtlasLayout renders main#main-content with zero inner duplicates', () => {
    const atlasLayout = readFile('src/components/personality-atlas/chrome/AtlasLayout.jsx');
    const appJs = readFile('src/App.js');

    expect(atlasLayout).toContain('<main id="main-content"');

    const innerPages = [
      home,
      howItWorks,
      careerIntelligence,
      methodology,
      trustRoute,
      progress,
      login,
      signup,
      privacy,
      appJs,
    ];

    innerPages.forEach((src) => {
      expect(src).not.toMatch(/<main[\s>]/);
    });
  });

  // Contract 11: Route transition coordinator and overlay
  it('11. confirms route transition coordinator and pointer-events contract', () => {
    const coordinator = readFile('src/components/personality-atlas/motion/AtlasRouteTransitionCoordinator.jsx');
    const chromeCss = readFile('src/styles/personality-atlas/chrome.css');

    expect(coordinator).toContain('PUBLIC_ROUTES');
    expect(coordinator).toContain('.to(overlay');
    expect(coordinator).toContain('setDisplayChildren');
    expect(chromeCss).toContain('.pa-atlas-transition-overlay');
    expect(chromeCss).toContain('pointer-events: none;');
  });

  // Contract 12: Career spatial 3D gating and DOM fallback
  it('12. confirms Career Intelligence 3D capability gating and DOM fallback', () => {
    expect(careerIntelligence).toContain('LazyCareerWorldCanvas');
    expect(careerIntelligence).toContain('CareerWorldFallback');
    expect(careerIntelligence).toContain('pointer: fine');
    expect(careerIntelligence).toContain('prefers-reduced-motion: reduce');
  });

  // Contract 13: Reduced motion smooth scroll fallback
  it('13. confirms AtlasScrollProvider falls back to auto scrolling under reduced motion', () => {
    const scrollProvider = readFile('src/components/personality-atlas/motion/AtlasScrollProvider.jsx');
    expect(scrollProvider).toContain('prefers-reduced-motion: reduce');
  });
});
