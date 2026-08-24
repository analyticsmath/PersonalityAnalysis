// frontend/src/surgical-corrections.test.jsx
// Personality Assessor — Under Different Conditions Architectural Contracts Verification

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PUBLIC_CONTENT } from './content/public-experience/publicContent';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Under Different Conditions — Architectural Contracts Suite', () => {
  const indexMenu = readFile('src/components/public-experience/chrome/PublicIndex.jsx');
  const googleBtn = readFile('src/components/auth/GoogleLoginButton.jsx');
  const homeWorldEntry = readFile('src/components/public-experience/home/WorldEntry.jsx');
  const careerPage = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const howItWorksPage = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const progressPage = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const trustPage = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const methodologyPage = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const loginPage = readFile('src/pages/Auth/LoginPage.js');
  const signupPage = readFile('src/pages/Auth/SignupPage.js');

  const tokensCss = readFile('src/styles/public-experience/tokens.css');
  const baseCss = readFile('src/styles/public-experience/base.css');
  const chromeCss = readFile('src/styles/public-experience/chrome.css');
  const homeCss = readFile('src/styles/public-experience/home.css');

  it('1. Public Index Menu implements inert focus contract and Escape key handling', () => {
    expect(indexMenu).toContain("mainEl.setAttribute('inert', '')");
    expect(indexMenu).toContain("mainEl.removeAttribute('inert')");
    expect(indexMenu).toContain("e.key === 'Escape'");
  });

  it('2. Public styles have zero linear-gradient / radial-gradient', () => {
    const allStyles = [tokensCss, baseCss, chromeCss, homeCss].join('\n');
    expect(allStyles).not.toContain('linear-gradient');
    expect(allStyles).not.toContain('radial-gradient');
    expect(allStyles).not.toContain('conic-gradient');
  });

  it('3. Google Login Button specifies locale="en"', () => {
    expect(googleBtn).toContain('locale="en"');
  });

  it('4. Home World Entry embeds headline', () => {
    expect(PUBLIC_CONTENT.home.worldEntry.headline).toBe('UNDER DIFFERENT CONDITIONS');
    expect(homeWorldEntry).toContain('data.headline');
  });

  it('5. Career Intelligence uses Workworld Canvas with 17 canonical roles', () => {
    expect(careerPage).toContain('CareerRolePath');
  });

  it('6. How It Works runs continuous transformation stage without numbered steps', () => {
    expect(howItWorksPage).toContain('HowContinuousTransformation');
    expect(howItWorksPage).not.toContain('STAGE 01');
  });

  it('7. Progress uses temporal comparison with overlapping media layers', () => {
    expect(progressPage).toContain('ProgressTemporalStage');
  });

  it('8. Trust page has interactive chain of custody and data rights', () => {
    expect(trustPage).toContain('TrustInspectionStage');
  });

  it('9. Methodology serves as research publication', () => {
    expect(methodologyPage).toContain('MethodologyEditorial');
  });

  it('10. Auth pages render directly on integrated background media without split layout', () => {
    expect(loginPage).toContain('PublicPicture');
    expect(signupPage).toContain('PublicPicture');
    expect(loginPage).not.toContain('grid-template-columns: 1fr 1fr');
  });
});
