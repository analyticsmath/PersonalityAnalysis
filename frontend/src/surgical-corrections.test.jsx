// frontend/src/surgical-corrections.test.jsx
// Personality Assessor — Editorial Evidence Atlas Architectural Contracts Verification

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PUBLIC_CONTENT } from './content/public-experience/publicContent';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Editorial Evidence Atlas — Architectural Contracts Suite', () => {
  const indexMenu = readFile('src/components/public-experience/chrome/PublicIndex.jsx');
  const googleBtn = readFile('src/components/auth/GoogleLoginButton.jsx');
  const heroPoster = readFile('src/components/public-experience/home/HeroThesisPoster.jsx');
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

  it('4. Home Thesis Poster embeds headline', () => {
    expect(PUBLIC_CONTENT.home.worldEntry.headline).toBe('ONE ANSWER IS NOT ONE RESULT.');
    expect(heroPoster).toContain('ONE ANSWER');
  });

  it('5. Career Intelligence uses CareerAtlasExperience with 17 canonical roles', () => {
    expect(careerPage).toContain('CareerAtlasExperience');
  });

  it('6. How It Works runs causal essay stage without numbered 01-06 stepper', () => {
    expect(howItWorksPage).toContain('HowCausalEssay');
    expect(howItWorksPage).not.toContain('STAGE 01');
  });

  it('7. Progress uses longitudinal comparison with temporal control', () => {
    expect(progressPage).toContain('ProgressLongitudinalExperience');
  });

  it('8. Trust page has interactive provenance chain and data rights', () => {
    expect(trustPage).toContain('TrustSourceInspection');
  });

  it('9. Methodology serves as research publication', () => {
    expect(methodologyPage).toContain('MethodologyPublication');
  });

  it('10. Auth pages render directly on integrated background media without split layout', () => {
    expect(loginPage).toContain('AuthFrame');
    expect(signupPage).toContain('AuthFrame');
    expect(loginPage).not.toContain('grid-template-columns: 1fr 1fr');
  });
});
