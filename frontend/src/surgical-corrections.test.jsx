// frontend/src/surgical-corrections.test.jsx
// Valtum Studio / Personality Assessor — Post-Live-QA Surgical Corrections Verification

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Valtum Studio Post-Live-QA Surgical Corrections Suite', () => {
  const app = readFile('src/App.js');
  const routeTransition = readFile('src/components/personality-v7/motion/RouteTransitionCoordinator.jsx');
  const publicLayout = readFile('src/components/personality-v7/chrome/PublicLayout.jsx');
  const publicHeader = readFile('src/components/personality-v7/chrome/PublicHeader.jsx');
  const mobileNav = readFile('src/components/personality-v7/chrome/MobileNavigation.jsx');
  const curvedMenu = readFile('src/components/personality-v7/chrome/CurvedMenu.jsx');
  const googleBtn = readFile('src/components/auth/GoogleLoginButton.jsx');
  const homeOpening = readFile('src/components/personality-v7/home/HomeOpeningChapter.jsx');
  const homeDecision = readFile('src/components/personality-v7/home/HomeDecisionChapter.jsx');
  const homeTransform = readFile('src/components/personality-v7/home/HomeTransformationChapter.jsx');
  const careerPage = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const howItWorksPage = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const progressPage = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const trustPage = readFile('src/pages/editorial/EditorialTrustPage.jsx');
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
    // PublicLayout must consume coordinator from context, not wrap its own
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

    const allV7Css = [homeCss, routesCss, authCss, chromeCss].join('\n');
    expect(allV7Css).not.toContain('linear-gradient');
    expect(allV7Css).not.toContain('radial-gradient');
    expect(allV7Css).not.toContain('backdrop-filter');
  });

  it('5. Google Login Button specifies locale="en"', () => {
    expect(googleBtn).toContain('locale="en"');
  });

  it('6. Home Hero evidence is an open typographic object without panel backgrounds or large box shadows', () => {
    expect(homeOpening).toContain('pa-home-opening__evidence-open');
    expect(homeOpening).toContain('pa-home-opening__provenance-mark');
    expect(homeOpening).not.toContain('pa-home-opening__evidence-card');
    expect(homeCss).toContain('.pa-home-opening__evidence-open');
    expect(homeCss).not.toContain('.pa-home-opening__evidence-card');
  });

  it('7. Home Decision implements desktop spatial coordinates and unboxed choices', () => {
    expect(homeDecision).toContain('desktopPos');
    expect(homeDecision).toContain('--choice-left');
    expect(homeDecision).toContain('--choice-top');
    expect(homeCss).toContain('.pa-home-decision__choices');
    expect(homeCss).toContain('min-height: 640px');
  });

  it('8. Home Transformation uses 4 traveling evidence fragments along SVG trajectories without linearGradient defs', () => {
    expect(homeTransform).toContain('fragBigFiveRef');
    expect(homeTransform).toContain('fragRiasecRef');
    expect(homeTransform).toContain('fragValuesRef');
    expect(homeTransform).toContain('fragCareerRef');
    expect(homeTransform).not.toContain('<linearGradient');
    expect(homeCss).toContain('.pa-home-transformation__stage');
  });

  it('9. Career Intelligence uses GSAP 3D depth, integrated pixel transition, and open mineral triad', () => {
    expect(careerPage).toContain('pa-career-triad__item');
    expect(careerPage).toContain('pa-career-roles-disclosure');
    expect(careerPage).toContain('pa-career-role-plain');
    expect(careerPage).not.toContain('pa-career-role-pill');
    expect(routesCss).toContain('.pa-career-triad__item');
    expect(routesCss).toContain('transform-style: preserve-3d');
  });

  it('10. How It Works has positioned destinations along SVG curve with node markers and dedicated mobile track', () => {
    expect(howItWorksPage).toContain('pa-hiw-destinations-stage');
    expect(howItWorksPage).toContain('pa-hiw-destination__node-marker');
    expect(howItWorksPage).toContain('pa-hiw-mobile-track');
    expect(routesCss).toContain('.pa-hiw-destination__node-marker');
  });

  it('11. Progress uses open overlapping spatial states for Longitudinal Re-evaluation without cards', () => {
    expect(progressPage).toContain('pa-progress-recomposition__field');
    expect(progressPage).toContain('pa-progress-plane');
    expect(progressPage).toContain('pa-progress-trace-track');
    expect(routesCss).toContain('.pa-progress-recomposition__field');
  });

  it('12. Trust page has open tier display and honest non-fabricated inspection copy with provenance trace', () => {
    expect(trustPage).toContain('pa-trust-trace-nodes');
    expect(trustPage).toContain('pa-trust-tier-display__open');
    expect(trustPage).not.toContain('0.82');
    expect(routesCss).toContain('.pa-trust-tier-display__open');
  });

  it('13. Auth pages render forms directly on Carbon / Mineral ground without cards or heavy shadows', () => {
    expect(loginPage).toContain('pa-auth-login__form-container');
    expect(signupPage).toContain('pa-auth-signup__step-labels');
    expect(signupPage).toContain('BACKGROUND');
    expect(signupPage).toContain('CONTEXT');
    expect(signupPage).toContain('FIRST ASSESSMENT');
    expect(authCss).toContain('.pa-auth-signup__step-labels');
  });
});
