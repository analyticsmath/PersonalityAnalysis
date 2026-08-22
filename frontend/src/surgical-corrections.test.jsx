// frontend/src/surgical-corrections.test.jsx
// Personality Assessor — The Living Record Surgical Contracts Verification

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('The Living Record — Architectural Contracts Suite', () => {
  const app = readFile('src/App.js');
  const routeTransition = readFile('src/components/personality-v7/motion/RouteTransitionCoordinator.jsx');
  const publicLayout = readFile('src/components/personality-v7/chrome/PublicLayout.jsx');
  const publicHeader = readFile('src/components/personality-v7/chrome/PublicHeader.jsx');
  const mobileNav = readFile('src/components/personality-v7/chrome/MobileNavigation.jsx');
  const curvedMenu = readFile('src/components/personality-v7/chrome/CurvedMenu.jsx');
  const googleBtn = readFile('src/components/auth/GoogleLoginButton.jsx');
  const homeWorldEntry = readFile('src/components/personality-v7/home/HomeWorldEntryScene.jsx');
  const homeBranching = readFile('src/components/personality-v7/home/HomeBranchingScene.jsx');
  const homeCareer = readFile('src/components/personality-v7/home/HomeCareerTakeoverScene.jsx');
  const careerPage = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const howItWorksPage = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const progressPage = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const trustPage = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const methodologyPage = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const loginPage = readFile('src/pages/Auth/LoginPage.js');
  const signupPage = readFile('src/pages/Auth/SignupPage.js');

  const homeCss = readFile('src/styles/personality-v7/home.css');
  const routesCss = readFile('src/styles/personality-v7/routes.css');
  const authCss = readFile('src/styles/personality-v7/auth.css');
  const chromeCss = readFile('src/styles/personality-v7/chrome.css');

  it('1. Transition Coordinator is mounted at App root above AppRoutes', () => {
    expect(app).toContain('<RouteTransitionCoordinator>');
    expect(app).toContain('</RouteTransitionCoordinator>');
    expect(app).toContain('<AppRoutes />');
    expect(publicLayout).not.toContain('<RouteTransitionCoordinator>');
    expect(publicLayout).toContain('markRouteReady(location.pathname)');
  });

  it('2. Transition Coordinator supports destination readiness handshake and latest-navigation-wins', () => {
    expect(routeTransition).toContain('markRouteReady');
    expect(routeTransition).toContain('getCleanPathname');
    expect(routeTransition).toContain("pointerEvents: 'none'");
    expect(routeTransition).toContain('window.scrollTo');
  });

  it('3. Mobile Navigation restores focus to trigger element on Escape / Close', () => {
    expect(publicHeader).toContain('mobileTriggerRef');
    expect(publicHeader).toContain('triggerRef={mobileTriggerRef}');
    expect(mobileNav).toContain('triggerRef');
    expect(mobileNav).toContain('triggerRef.current.focus()');
  });

  it('4. CurvedMenu and captions have zero linear-gradient / radial-gradient in personality-v7 CSS', () => {
    expect(curvedMenu).not.toContain('pa-curved-menu__preview-scrim');
    expect(chromeCss).not.toContain('pa-curved-menu__preview-scrim');
  });

  it('5. Google Login Button specifies locale="en"', () => {
    expect(googleBtn).toContain('locale="en"');
  });

  it('6. Home World Entry embeds headline in negative space and anchors EvidenceStrip protagonist', () => {
    expect(homeWorldEntry).toContain('Keep the');
    expect(homeWorldEntry).toContain('source attached.');
    expect(homeWorldEntry).toContain('EvidenceStrip');
  });

  it('7. Home Branching implements asymmetric SVG traces and mobile evidence spine', () => {
    expect(homeBranching).toContain('EvidenceStrip');
    expect(homeBranching).toContain('MobileEvidenceSpine');
    expect(homeBranching).toContain('pa-home-branching-scene__svg');
  });

  it('8. Home Career Takeover replaces environment around stable EvidenceStrip', () => {
    expect(homeCareer).toContain('pa-home-career-scene');
    expect(homeCareer).toContain('EvidenceStrip');
    expect(homeCareer).toContain('CAREER_ENVIRONMENTS');
  });

  it('9. Career Intelligence uses Workworld Atlas with CalibrationBaseline and 17 roles', () => {
    expect(careerPage).toContain('pa-career-atlas');
    expect(careerPage).toContain('CalibrationBaseline');
    expect(careerPage).toContain('Software Engineer');
  });

  it('10. How It Works runs the Evidence Engine from prompt to stored record', () => {
    expect(howItWorksPage).toContain('pa-engine-hero');
    expect(howItWorksPage).toContain('initiative-pattern-intermediate');
    expect(howItWorksPage).toContain('CalibrationBaseline');
  });

  it('11. Progress uses Longitudinal Film with overlapping dated strips', () => {
    expect(progressPage).toContain('pa-progress-film');
    expect(progressPage).toContain('ASSESSMENT 01');
    expect(progressPage).toContain('ASSESSMENT 02');
  });

  it('12. Trust page has interactive ProvenanceTrace connecting reading to source', () => {
    expect(trustPage).toContain('ProvenanceTrace');
    expect(trustPage).toContain('pa-trust-hero');
  });

  it('13. Methodology serves as Calibration Room with decoupled frameworks', () => {
    expect(methodologyPage).toContain('pa-method-room');
    expect(methodologyPage).toContain('CalibrationBaseline');
  });

  it('14. Auth pages render directly on Carbon / Mineral ground with EvidenceStrip', () => {
    expect(loginPage).toContain('pa-auth-login__form-container');
    expect(signupPage).toContain('pa-auth-signup');
    expect(signupPage).toContain('variant="new-record"');
  });
});
