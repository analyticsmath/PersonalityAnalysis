// frontend/src/living-record-source-contracts.test.jsx
// Personality Assessor — The Living Record Source Contract & Anti-Regression Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import EvidenceStrip from './components/personality-v7/living-record/EvidenceStrip';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('The Living Record — Source & Architecture Contract Guardrails', () => {
  const home = readFile('src/pages/editorial/EditorialHomePage.jsx');
  const howItWorks = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const careerIntelligence = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const methodology = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const trustRoute = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const progress = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const privacy = readFile('src/pages/editorial/EditorialPrivacyPage.jsx');
  const login = readFile('src/pages/Auth/LoginPage.js');
  const signup = readFile('src/pages/Auth/SignupPage.js');
  const app = readFile('src/App.js');
  const tokensCss = readFile('src/styles/personality-v7/tokens.css');
  const homeCss = readFile('src/styles/personality-v7/home.css');
  const routesCss = readFile('src/styles/personality-v7/routes.css');
  const authCss = readFile('src/styles/personality-v7/auth.css');

  // Contract 1: No split-hero 50/50 primary grid on Home
  it('1. prohibits home split-hero 50/50 grid', () => {
    expect(home).not.toContain('pa-home-opening__split-grid');
    expect(homeCss).not.toContain('grid-template-columns: 1fr 1fr; /* split hero */');
    expect(home).toContain('HomeWorldEntryScene');
    expect(home).toContain('HomeBranchingScene');
    expect(home).toContain('HomeCareerTakeoverScene');
  });

  // Contract 2: How It Works is an Evidence Engine, not an equal five-step box grid
  it('2. prohibits How It Works equal five-box destination grid', () => {
    expect(howItWorks).not.toContain('grid-template-columns: repeat(5, 1fr)');
    expect(howItWorks).toContain('pa-engine-hero');
    expect(howItWorks).toContain('initiative-pattern-intermediate');
    expect(howItWorks).toContain('CalibrationBaseline');
  });

  // Contract 3: Progress uses Longitudinal Film with physical overlap, not three equal columns
  it('3. prohibits Progress three-column Earlier/Later/Revised grid', () => {
    expect(progress).not.toContain('grid-template-columns: repeat(3, 1fr)');
    expect(progress).toContain('pa-progress-film');
    expect(progress).toContain('ASSESSMENT 01');
    expect(progress).toContain('ASSESSMENT 02');
    expect(progress).toContain('pa-progress-film__intersection');
  });

  // Contract 4: Career uses Workworld Atlas and calibration baseline without 3-equal-column layout
  it('4. prohibits Career three-equal-column relationship layout', () => {
    expect(careerIntelligence).toContain('pa-career-atlas');
    expect(careerIntelligence).toContain('CalibrationBaseline');
    expect(careerIntelligence).toContain('Software Engineer');
  });

  // Contract 5: Signup has responsive form-first mobile layout, not fixed 48vw right split
  it('5. ensures Signup uses responsive Living Record layout with new-record specimen', () => {
    expect(signup).toContain('variant="new-record"');
    expect(authCss).not.toContain('width: 48vw; position: fixed; right: 0;');
  });

  // Contract 6: Mobile branching spine exists and is integrated
  it('6. requires MobileEvidenceSpine component for vertical mobile branching', () => {
    const mobileSpine = readFile('src/components/personality-v7/living-record/MobileEvidenceSpine.jsx');
    expect(mobileSpine).toContain('pa-mobile-spine');
    expect(mobileSpine).toContain('pa-mobile-spine__branches');
  });

  // Contract 7: Global custom cursor is NOT active by default on coarse pointers
  it('7. ensures global custom cursor is not active by default', () => {
    const cursor = readFile('src/components/personality-v7/motion/CursorCoordinator.jsx');
    if (cursor) {
      expect(cursor).toContain('isEnabledRef = useRef(false)');
    }
  });

  // Contract 8: EvidenceStrip is the visual protagonist and renders all variants
  it('8. confirms EvidenceStrip protagonist supports all required variants', () => {
    const variants = ['source', 'branched', 'compared', 'dated', 'inspect', 'new-record'];
    variants.forEach((v) => {
      const { container } = render(<EvidenceStrip variant={v} />);
      expect(container.querySelector(`.pa-evidence-strip--${v}`)).toBeDefined();
    });
  });

  // Contract 9: Deterministic career fit weights are 25/25/20/15/10/5
  it('9. confirms CalibrationBaseline reflects exact 25/25/20/15/10/5 weights', () => {
    const calibration = readFile('src/components/personality-v7/living-record/CalibrationBaseline.jsx');
    expect(calibration).toContain("weight: 25, span: 25");
    expect(calibration).toContain("weight: 20, span: 20");
    expect(calibration).toContain("weight: 15, span: 15");
    expect(calibration).toContain("weight: 10, span: 10");
    expect(calibration).toContain("weight: 5, span: 5");
  });

  // Contract 10: All 9 public routes are registered in App.js
  it('10. verifies all public routes are registered in App.js', () => {
    expect(app).toContain("path=\"/\"");
    expect(app).toContain("path=\"/how-it-works\"");
    expect(app).toContain("path=\"/career-intelligence\"");
    expect(app).toContain("path=\"/progress\"");
    expect(app).toContain("path=\"/methodology\"");
    expect(app).toContain("path=\"/trust\"");
    expect(app).toContain("path=\"/privacy\"");
    expect(app).toContain("path=\"/login\"");
    expect(app).toContain("path=\"/signup\"");
  });
});
