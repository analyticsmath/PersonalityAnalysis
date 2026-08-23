// frontend/src/living-record-source-contracts.test.jsx
// Personality Assessor — The Living Record Comprehensive Source Contract Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import EvidenceStrip from './components/personality-v7/living-record/EvidenceStrip';
import careersData from './content/careers.json';
import { ROLE_ENTRIES } from './pages/editorial/EditorialCareerIntelligencePage';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('The Living Record — Source & Architecture Contract Guardrails', () => {
  const homeEntryCss = readFile('src/components/personality-v7/home/HomeWorldEntryScene.css');
  const homeBranchingCss = readFile('src/components/personality-v7/home/HomeBranchingScene.css');
  const homeCareerTakeoverJsx = readFile('src/components/personality-v7/home/HomeCareerTakeoverScene.jsx');
  const homeTimeRevisitCss = readFile('src/components/personality-v7/home/HomeTimeRevisitScene.css');
  const homeTracebackCss = readFile('src/components/personality-v7/home/HomeTracebackScene.css');
  const homeFinaleCss = readFile('src/components/personality-v7/home/HomeFinaleScene.css');
  const evidenceStripCss = readFile('src/components/personality-v7/living-record/EvidenceStrip.css');
  const provenanceTraceCss = readFile('src/components/personality-v7/living-record/ProvenanceTrace.css');
  const calibrationCss = readFile('src/components/personality-v7/living-record/CalibrationBaseline.css');
  const mobileSpineCss = readFile('src/components/personality-v7/living-record/MobileEvidenceSpine.css');
  const mediaManifestJs = readFile('src/content/personality-v7/mediaManifest.js');

  const home = readFile('src/pages/editorial/EditorialHomePage.jsx');
  const howItWorks = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const howItWorksCss = readFile('src/pages/editorial/EditorialHowItWorksPage.css');
  const careerIntelligence = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const careerIntelligenceCss = readFile('src/pages/editorial/EditorialCareerIntelligencePage.css');
  const methodology = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const methodologyCss = readFile('src/pages/editorial/EditorialMethodologyPage.css');
  const trustRoute = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const trustRouteCss = readFile('src/pages/editorial/EditorialTrustPage.css');
  const progress = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const progressCss = readFile('src/pages/editorial/EditorialProgressPage.css');
  const login = readFile('src/pages/Auth/LoginPage.js');
  const signup = readFile('src/pages/Auth/SignupPage.js');
  const authCss = readFile('src/styles/personality-v7/auth.css');

  // Contract 0: Home page continuous 8-scene sequence
  it('0. confirms Home page contains the continuous 8-scene Living Record architecture', () => {
    expect(home).toContain('HomeWorldEntryScene');
    expect(home).toContain('HomeSourceQuietScene');
    expect(home).toContain('HomeBranchingScene');
    expect(home).toContain('HomeCareerTakeoverScene');
    expect(home).toContain('HomeCalibrationScene');
    expect(home).toContain('HomeTimeRevisitScene');
    expect(home).toContain('HomeTracebackScene');
    expect(home).toContain('HomeFinaleScene');
    expect(home).not.toContain('pa-home-opening__split-grid');
  });

  // Contract 1: Prohibit off-palette #D67D8C everywhere
  it('1. prohibits #D67D8C across all styles and scenes', () => {
    const allStyles = [
      homeEntryCss,
      homeBranchingCss,
      homeTimeRevisitCss,
      homeTracebackCss,
      homeFinaleCss,
      evidenceStripCss,
      provenanceTraceCss,
      calibrationCss,
      mobileSpineCss,
      careerIntelligenceCss,
      howItWorksCss,
      methodologyCss,
      trustRouteCss,
      progressCss,
      authCss,
    ].join('\n');

    expect(allStyles).not.toContain('#D67D8C');
  });

  // Contract 2: Prohibit radial-gradient in entry and finale scenes
  it('2. prohibits radial-gradient in HomeWorldEntryScene and HomeFinaleScene', () => {
    expect(homeEntryCss).not.toContain('radial-gradient');
    expect(homeFinaleCss).not.toContain('radial-gradient');
  });

  // Contract 3: EvidenceStrip has zero outer borders and zero box-shadows
  it('3. ensures EvidenceStrip has no outer border, no drawer top-border, and no box-shadow', () => {
    expect(evidenceStripCss).not.toContain('border: 1px solid');
    expect(evidenceStripCss).not.toContain('box-shadow');
    expect(evidenceStripCss).not.toContain('border-top: 1px solid');
  });

  // Contract 4: Home Career Takeover uses mutable ref for scroll updates
  it('4. confirms HomeCareerTakeoverScene uses mutable ref to prevent per-frame React updates', () => {
    expect(homeCareerTakeoverJsx).toContain('activeIdxRef');
    expect(homeCareerTakeoverJsx).toContain('if (nextIdx !== activeIdxRef.current)');
  });

  // Contract 5: Career reads canonical 17 roles directly from careers.json
  it('5. confirms Career Intelligence reads canonical 17 roles from careers.json matching exact titles', () => {
    expect(ROLE_ENTRIES).toHaveLength(17);
    const expectedTitles = Object.values(careersData).map((p) => p.title);
    const actualTitles = ROLE_ENTRIES.map((r) => r.title);
    expect(actualTitles).toEqual(expectedTitles);
    expect(careerIntelligence).toContain('Embedded Engineer');
    expect(careerIntelligence).toContain('Business Analyst');
    expect(careerIntelligence).not.toContain('Cloud Architect');
    expect(careerIntelligence).not.toContain('Embedded Systems Engineer');
  });

  // Contract 6: Career relationships are asymmetric, not 3-equal columns
  it('6. prohibits Career three-equal-column relationship layout', () => {
    expect(careerIntelligenceCss).not.toContain('grid-template-columns: repeat(3, 1fr)');
    expect(careerIntelligenceCss).toContain('pa-career-atlas__rel-node--alignment');
    expect(careerIntelligenceCss).toContain('pa-career-atlas__rel-node--tension');
    expect(careerIntelligenceCss).toContain('pa-career-atlas__rel-node--develop');
  });

  // Contract 7: How It Works is continuous pipeline with initiative-pattern-intermediate specimen
  it('7. confirms How It Works uses initiative-pattern-intermediate without synthetic numbers', () => {
    expect(howItWorks).toContain('initiative-pattern-intermediate');
    expect(howItWorks).toContain('When team ownership is ambiguous');
    expect(howItWorks).not.toContain('+0.6');
    expect(howItWorks).not.toContain('+0.5');
    expect(howItWorks).not.toContain('+0.7');
    expect(howItWorks).not.toContain('+0.8');
    expect(howItWorks).not.toContain('0.88');
    expect(howItWorks).not.toContain('STAGE 01');
  });

  // Contract 8: Progress uses overlapping crops and zero synthetic deltas
  it('8. confirms Progress has no synthetic deltas (+0.75 / +0.42) and labels comparative record', () => {
    expect(progress).not.toContain('+0.75');
    expect(progress).not.toContain('+0.42');
    expect(progress).toContain('ILLUSTRATIVE EXAMPLE — COMPARATIVE RECORD');
    expect(progress).toContain('Not enough history yet.');
    expect(progressCss).not.toContain('grid-template-columns: repeat(3, 1fr)');
  });

  // Contract 9: Methodology uses Lenis scroll and has no header/section border dividers
  it('9. confirms Methodology uses useScrollContext Lenis scroll without border dividers', () => {
    expect(methodology).toContain('useScrollContext');
    expect(methodology).toContain('scrollTo');
    expect(methodologyCss).not.toContain('border-bottom: 1px solid');
  });

  // Contract 10: Trust uses verified claims and zero unsupported claims
  it('10. confirms Trust contains only verified claims and no unsupported security marketing', () => {
    expect(trustRoute).not.toContain('AES-256 at rest');
    expect(trustRoute).not.toContain('Immediate purge');
    expect(trustRoute).not.toContain('JSON / PDF export');
    expect(trustRoute).not.toContain('full evidence graph export');
    expect(trustRoute).toContain('primary database');
    expect(provenanceTraceCss).not.toContain('box-shadow');
    expect(trustRouteCss).not.toContain('grid-template-columns: repeat(3, 1fr)');
  });

  // Contract 11: Auth pages use asymmetric non-split layouts
  it('11. confirms Signup does not use 1fr 1fr split and Login has no floating fragment cloud', () => {
    expect(authCss).not.toContain('grid-template-columns: 1fr 1fr;');
    expect(login).not.toContain('EVIDENCE_FRAGMENTS');
    expect(authCss).not.toContain('pa-auth-login__fragment-field');
    expect(signup).toContain('variant="new-record"');
  });

  // Contract 12: Media manifest header is neutral Unsplash Plus license statement
  it('12. confirms Media Manifest header matches neutral licensing description', () => {
    expect(mediaManifestJs).toContain('Sourced from locally supplied licensed Unsplash Plus originals with per-asset provenance recorded below.');
  });

  // Contract 13: EvidenceStrip renders all 6 core variants
  it('13. confirms EvidenceStrip protagonist supports all required variants', () => {
    const variants = ['source', 'branched', 'compared', 'dated', 'inspect', 'new-record'];
    variants.forEach((v) => {
      const { container } = render(<EvidenceStrip variant={v} />);
      expect(container.querySelector(`.pa-evidence-strip--${v}`)).toBeDefined();
    });
  });

  // Contract 14: Semantic single-main rule across all public routes
  it('14. verifies only PublicLayout renders main#main-content with zero inner duplicates', () => {
    const publicLayout = readFile('src/components/personality-v7/chrome/PublicLayout.jsx');
    const appJs = readFile('src/App.js');
    const privacy = readFile('src/pages/editorial/EditorialPrivacyPage.jsx');

    expect(publicLayout).toContain('<main id="main-content"');

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
      expect(src).not.toMatch(/role=["']main["']/);
      expect(src).not.toMatch(/id=["']main-content["']/);
    });
  });

  // Contract 15: Route transition timeline-native execution and pointer-events
  it('15. confirms route transition timeline-native execution and pointer-events', () => {
    const coordinator = readFile('src/components/personality-v7/motion/RouteTransitionCoordinator.jsx');
    const chromeCss = readFile('src/styles/personality-v7/chrome.css');

    expect(coordinator).toContain('tl.call');
    expect(coordinator).toContain('totalDuration * 0.48');
    expect(coordinator).toContain('readyRoutesRef.current.delete');
    expect(coordinator).toContain('variant="transition"');
    expect(chromeCss).toContain('.pa-route-transition-overlay');
    expect(chromeCss).toContain('pointer-events: none;');
  });

  // Contract 16: WebGL gating and lifecycle contract
  it('16. confirms CareerSpatialCanvas WebGL capability gating and cleanup lifecycle', () => {
    const canvasJsx = readFile('src/components/personality-v7/career/CareerSpatialCanvas.jsx');

    expect(canvasJsx).toContain('window.innerWidth > 1024');
    expect(canvasJsx).toContain('pointer: fine');
    expect(canvasJsx).toContain('prefers-reduced-motion: reduce');
    expect(canvasJsx).toContain('document.hidden');
    expect(canvasJsx).toContain('onCanvasReady');
    expect(canvasJsx).toContain('onCanvasUnavailable');
    expect(canvasJsx).toContain('renderer.dispose');
  });

  // Contract 17: Route tone mapping contract
  it('17. confirms route tone mapping across all public routes and Suspense fallback', () => {
    const appJs = readFile('src/App.js');

    expect(appJs).toContain("'/career-intelligence': 'dark'");
    expect(appJs).toContain("'/how-it-works': 'dark'");
    expect(appJs).toContain("'/progress': 'dark'");
    expect(appJs).toContain("'/trust': 'dark'");
    expect(appJs).toContain("'/login': 'dark'");
    expect(appJs).toContain("'/methodology': 'light'");
    expect(appJs).toContain("'/privacy': 'light'");
    expect(appJs).toContain("'/signup': 'light'");
  });

  // Contract 18: Typography and structural dividers
  it('18. confirms footer has no horizontal divider lines and H1/H2 use Mona Sans', () => {
    const chromeCss = readFile('src/styles/personality-v7/chrome.css');

    expect(chromeCss).not.toContain('border-bottom: 1px solid var(--pa-carbon-border');
    expect(careerIntelligenceCss).toContain('var(--pa-font-display');
    expect(howItWorksCss).toContain('var(--pa-font-display');
    expect(methodologyCss).toContain('var(--pa-font-display');
    expect(trustRouteCss).toContain('var(--pa-font-display');
    expect(progressCss).toContain('var(--pa-font-display');
    expect(authCss).toContain('var(--pa-font-display');
  });

  // Contract 19: Reduced motion auto scroll fallback
  it('19. confirms SmoothScrollProvider falls back to auto scrolling under reduced motion', () => {
    const smoothScroll = readFile('src/components/personality-v7/motion/SmoothScrollProvider.jsx');

    expect(smoothScroll).toContain('prefers-reduced-motion: reduce');
    expect(smoothScroll).toContain("prefersReduced ? 'auto' : 'smooth'");
  });

  // Contract 20: Route transition idempotency guard
  it('20. confirms RouteTransitionCoordinator guards against double entrance', () => {
    const coordinator = readFile('src/components/personality-v7/motion/RouteTransitionCoordinator.jsx');

    expect(coordinator).toContain('let entranceStarted = false;');
    expect(coordinator).toContain('if (entranceStarted) return;');
    expect(coordinator).toContain('safetyTimerRef.current = null;');
  });

  // Contract 21: useHeaderTone scopes queries to content and excludes header itself
  it('21. confirms useHeaderTone excludes header, menu, and transition overlays', () => {
    const headerTone = readFile('src/components/personality-v7/chrome/useHeaderTone.js');

    expect(headerTone).toContain('#main-content [data-tone]');
    expect(headerTone).toContain("!el.classList.contains('pa-header')");
    expect(headerTone).toContain("!el.closest('header.pa-header')");
  });

  // Contract 22: HowItWorks spatial field and discrete state
  it('22. confirms HowItWorks uses spatial field without 2x2 grid and discrete activeSegment state', () => {
    expect(howItWorksCss).not.toContain('repeat(2, 1fr)');
    expect(howItWorks).not.toContain('setEngineProgress(self.progress)');
    expect(howItWorks).toContain('activeSegmentRef');
    expect(howItWorks).toContain('pa-engine-pipeline__persistent-strip-wrap');
  });

  // Contract 23: Trust shared hero field and asymmetric rights layout
  it('23. confirms Trust page uses shared spatial field and asymmetric rights layout', () => {
    expect(trustRouteCss).not.toContain('1fr 1.25fr');
    expect(trustRouteCss).not.toContain('repeat(auto-fit, minmax(280px, 1fr))');
    expect(trustRouteCss).toContain('.pa-trust-rights__asymmetric-field');
    expect(trustRoute).toContain('pa-trust-hero__stage-field');
  });

  // Contract 24: Career takeover separate opacity ownership
  it('24. confirms Career takeover scene separates GSAP desktop opacity from React state', () => {
    expect(homeCareerTakeoverJsx).not.toContain('opacity: idx === activeIdx ? 1 : 0');
    expect(homeCareerTakeoverJsx).toContain('pa-home-career-scene__env-nav');
    expect(homeCareerTakeoverJsx).toContain('pa-home-career-scene__env-btn');
  });

  // Contract 25: Career DOM fallback renders dominant and support crops
  it('25. confirms Career intelligence page renders dominant and secondary DOM planes', () => {
    expect(careerIntelligence).toContain('pa-career-atlas__dom-primary');
    expect(careerIntelligence).toContain('pa-career-atlas__dom-secondary');
  });
});
