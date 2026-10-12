// Valtum Studio: source-of-truth contracts for the active cinematic public route family.
// These tests validate substantive data/behavior rather than obsolete component names.
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import careersData from './content/careers.json';
import { PUBLIC_CONTENT } from './content/public-experience/publicContent';

const readFile = relative => {
  const full = resolve(process.cwd(),relative);
  return existsSync(full) ? readFileSync(full,'utf8') : '';
};

describe('Personality Assessor: evidence-led marketing contracts', () => {
  const routes = readFile('src/components/public-experience/human-trace/CinematicRoutes.jsx');
  const home = readFile('src/components/public-experience/human-trace/filmContent.js');
  const homeMotion = readFile('src/components/public-experience/human-trace/filmMotion.js');
  const shell = readFile('src/components/public-experience/human-trace/CinematicPublicShell.jsx');
  const layout = readFile('src/components/public-experience/shell/PublicExperienceLayout.jsx');
  const pages = [
    ['EditorialHowItWorksPage','HowCinematicPage'],
    ['EditorialCareerIntelligencePage','CareerCinematicPage'],
    ['EditorialProgressPage','ProgressCinematicPage'],
    ['EditorialTrustPage','TrustCinematicPage'],
    ['EditorialMethodologyPage','MethodologyCinematicPage'],
    ['EditorialPrivacyPage','PrivacyCinematicPage'],
  ];

  it('0. mounts the active cinematic homepage and retains the source across narrative chapters', () => {
    const homeRoute = readFile('src/pages/editorial/EditorialHomePage.jsx');
    expect(homeRoute).toContain('HumanTraceFilm');
    expect(home).toContain('stage-question');
    expect(home).toContain('stage-evidence');
    expect(home).toContain('source-trace');
    expect(home).toContain('career-track');
    expect(home).toContain('time-scene');
    expect(home).toContain('trust');
    expect(home).toContain('finale');
    expect(homeMotion).toContain('prefers-reduced-motion');
  });

  it('1. uses the current marketing routes and keeps the auth layout isolated', () => {
    pages.forEach(([filename,component]) => {
      expect(readFile('src/pages/editorial/'+filename+'.jsx')).toContain(component);
      expect(routes).toContain('export function '+component);
    });
    expect(layout).toContain('CinematicPublicShell');
    expect(layout).toContain("location.pathname === '/login'");
    expect(layout).toContain('<PublicMotionRoot>');
    expect(shell).toContain('startViewTransition');
    expect(shell).toContain('transition.ready.catch');
  });

  it('2. uses first-party Unsplash photographs, with no new 3D or generated-image dependency', () => {
    const activeSource = routes + home + homeMotion;
    expect(activeSource).toContain('/media/public-experience/cinematic/');
    expect(activeSource).not.toContain('image_gen');
    expect(activeSource).not.toContain('@react-three/fiber');
    expect(activeSource).not.toContain('Canvas3D');
    expect(activeSource).not.toContain('growthPotential');
  });

  it('3. reads exactly 17 canonical occupational profiles with keyboard-accessible selection', () => {
    expect(Object.keys(careersData)).toHaveLength(17);
    expect(routes).toContain('Object.keys(careersData)');
    expect(routes).toContain('aria-selected');
    expect(routes).toContain('ArrowDown');
    expect(routes).toContain('role="tabpanel"');
  });

  it('4. explains five stages without invented responses or personal scores', () => {
    expect(PUBLIC_CONTENT.how.movements).toHaveLength(5);
    expect(routes).toContain('PUBLIC_CONTENT.how.movements');
    expect(routes).toContain('Your responses remain part of the record.');
    expect(routes).not.toContain('I clarify the constraints first');
    expect(routes).toContain('Read the interpretation alongside its evidence and limits.');
    expect(routes).not.toContain('Conscientiousness: 78');
  });

  it('5. keeps comparison illustrative and keyboard/pointer controllable', () => {
    expect(routes).toContain('type="range"');
    expect(routes).toContain('onChange={e=>setSplit');
    expect(routes).toContain('A genuine personal change requires at least two');
    expect(PUBLIC_CONTENT.progress.emptyState).toHaveProperty('headline');
  });

  it('6. preserves five provenance stages, authenticated rights links, and validity checks', () => {
    expect(PUBLIC_CONTENT.trust.recordStateSteps).toHaveLength(5);
    expect(routes).toContain('PUBLIC_CONTENT.trust.recordStateSteps');
    expect(routes).toContain('PUBLIC_CONTENT.trust.rightsActions');
    expect(routes).toContain('aria-pressed');
    expect(routes).toContain('evidence-sufficiency checks');
  });

  it('7. does not alter existing authentication page compositions', () => {
    const login = readFile('src/pages/Auth/LoginPage.js');
    const signup = readFile('src/pages/Auth/SignupPage.js');
    expect(login).not.toContain('grid-template-columns: 1fr 1fr');
    expect(signup).not.toContain('grid-template-columns: 1fr 1fr');
    expect(layout).toContain('isAuthRoute');
  });

  it('8. preserves deterministic career-fit weights and the non-clinical limit', () => {
    const weights = PUBLIC_CONTENT.home.calibration.weights;
    expect(weights.map(w=>w.percentage)).toEqual([25,25,20,15,10,5]);
    expect(weights.reduce((s,w)=>s+w.percentage,0)).toBe(100);
    expect(routes).toContain('PUBLIC_CONTENT.home.calibration.weights');
    expect(PUBLIC_CONTENT.methodology.sections.limits.description).toContain('does not provide clinical psychological diagnoses');
    expect(routes).toContain('PUBLIC_CONTENT.methodology.sections');
  });
});
