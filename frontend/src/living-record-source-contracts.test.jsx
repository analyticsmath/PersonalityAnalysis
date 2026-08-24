// frontend/src/living-record-source-contracts.test.jsx
// Personality Assessor — Under Different Conditions Source & Architecture Contract Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import careersData from './content/careers.json';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Under Different Conditions — Source & Architecture Contract Guardrails', () => {
  const home = readFile('src/pages/editorial/EditorialHomePage.jsx');
  const howItWorks = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const careerIntelligence = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const methodology = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const trustRoute = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const progress = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const privacy = readFile('src/pages/editorial/EditorialPrivacyPage.jsx');
  const login = readFile('src/pages/Auth/LoginPage.js');
  const signup = readFile('src/pages/Auth/SignupPage.js');
  const tokensCss = readFile('src/styles/public-experience/tokens.css');
  const baseCss = readFile('src/styles/public-experience/base.css');
  const chromeCss = readFile('src/styles/public-experience/chrome.css');
  const homeCss = readFile('src/styles/public-experience/home.css');
  const mediaManifestJs = readFile('src/content/public-experience/mediaManifest.js');

  it('0. confirms Home page contains continuous 8-movement architecture', () => {
    expect(home).toContain('WorldEntry');
    expect(home).toContain('ProfessionalSituation');
    expect(home).toContain('MultipleReadings');
    expect(home).toContain('WorkworldJourney');
    expect(home).toContain('Calibration');
    expect(home).toContain('TimeExposure');
    expect(home).toContain('ProvenanceReveal');
    expect(home).toContain('Finale');
  });

  it('1. prohibits legacy color tokens across public styles', () => {
    const allStyles = [tokensCss, baseCss, chromeCss, homeCss].join('\n');
    expect(allStyles).not.toContain('#D67D8C');
    expect(allStyles).not.toContain('#163D35');
  });

  it('2. prohibits CSS gradients in public styling', () => {
    const allStyles = [tokensCss, baseCss, chromeCss, homeCss].join('\n');
    expect(allStyles).not.toContain('radial-gradient');
    expect(allStyles).not.toContain('linear-gradient');
    expect(allStyles).not.toContain('conic-gradient');
  });

  it('3. confirms Career Intelligence reads canonical 17 roles from careers.json', () => {
    expect(Object.keys(careersData).length).toBe(17);
    expect(careerIntelligence).toContain('CareerRolePath');
  });

  it('4. confirms How It Works contains no synthetic numbers and no 01-06 stepper', () => {
    expect(howItWorks).not.toContain('01 / 06');
    expect(howItWorks).not.toContain('STAGE 01');
    expect(howItWorks).toContain('HowContinuousTransformation');
  });

  it('5. confirms Progress contains comparative record and calm empty state', () => {
    expect(progress).toContain('ProgressTemporalStage');
  });

  it('6. confirms Trust contains chain of custody and data rights', () => {
    expect(trustRoute).toContain('TrustInspectionStage');
  });

  it('7. confirms Auth pages do not use 50/50 split partitions', () => {
    expect(login).not.toContain('grid-template-columns: 1fr 1fr');
    expect(signup).not.toContain('grid-template-columns: 1fr 1fr');
  });

  it('8. confirms Media Manifest header matches neutral licensing description', () => {
    expect(mediaManifestJs).toContain('Sourced from licensed Unsplash Plus originals with per-asset provenance recorded below.');
  });
});
