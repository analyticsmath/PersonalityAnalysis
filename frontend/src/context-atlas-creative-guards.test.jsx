import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ResponseFragment from './components/personality-atlas/fragments/ResponseFragment';
import careersData from './content/careers.json';
import { ROLE_ENTRIES } from './pages/editorial/EditorialCareerIntelligencePage';
import { PUBLIC_CONTENT } from './content/personality-atlas/publicContent';

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn(), getVelocity: vi.fn(() => 0), progress: 0 }),
    refresh: vi.fn(),
    update: vi.fn(),
  },
}));

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Personality Assessor — Context Atlas Creative Guards & System Contracts', () => {
  const appJs = readFile('src/App.js');
  const tokensCss = readFile('src/styles/personality-atlas/tokens.css');
  const fontsCss = readFile('src/styles/personality-atlas/fonts.css');
  const baseCss = readFile('src/styles/personality-atlas/base.css');
  const chromeCss = readFile('src/styles/personality-atlas/chrome.css');
  const motionCss = readFile('src/styles/personality-atlas/motion.css');
  const responsiveCss = readFile('src/styles/personality-atlas/responsive.css');
  const publicContentJs = readFile('src/content/personality-atlas/publicContent.js');
  const mediaManifestJs = readFile('src/content/personality-atlas/mediaManifest.js');

  const homeJsx = readFile('src/pages/editorial/EditorialHomePage.jsx');
  const howItWorksJsx = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const careerJsx = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const methodologyJsx = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const trustJsx = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const progressJsx = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const privacyJsx = readFile('src/pages/editorial/EditorialPrivacyPage.jsx');
  const loginJs = readFile('src/pages/Auth/LoginPage.js');
  const signupJs = readFile('src/pages/Auth/SignupPage.js');

  // Guard 1: All 9 public routes registered
  it('1. registers all 9 canonical public routes in App.js', () => {
    const routes = [
      '/',
      'how-it-works',
      'career-intelligence',
      'progress',
      'methodology',
      'trust',
      'privacy',
      'login',
      'signup',
    ];
    for (const r of routes) {
      expect(appJs).toContain(r);
    }
  });

  // Guard 2: Dedicated font layer loads Schibsted Grotesk, Fraunces, and IBM Plex Mono
  it('2. loads dedicated variable and mono fonts in personality-atlas/fonts.css', () => {
    expect(fontsCss).toContain('@fontsource-variable/schibsted-grotesk');
    expect(fontsCss).toContain('@fontsource-variable/fraunces');
    expect(fontsCss).toContain('@fontsource/ibm-plex-mono');
    expect(tokensCss).toContain('--atlas-font-sans');
    expect(tokensCss).toContain('--atlas-font-evidence');
    expect(tokensCss).toContain('--atlas-font-mono');
  });

  // Guard 3: Authoritative chromatic palette tokens
  it('3. defines approved Context Atlas chromatic ground tokens', () => {
    expect(tokensCss).toContain('--atlas-field: #163D35;');
    expect(tokensCss).toContain('--atlas-ink: #24302E;');
    expect(tokensCss).toContain('--atlas-tide: #4F6D78;');
    expect(tokensCss).toContain('--atlas-lichen: #95A87F;');
    expect(tokensCss).toContain('--atlas-paper: #EFF5F2;');
    expect(tokensCss).toContain('--atlas-fog: #D9E5E0;');
    expect(tokensCss).toContain('--atlas-signal: #CDD86A;');
  });

  // Guard 4: Prohibit em dashes in visible copy
  it('4. strictly prohibits em dashes (—) in publicContent.js', () => {
    expect(publicContentJs).not.toContain('—');
  });

  // Guard 5: Prohibit CSS gradients across all Atlas stylesheets
  it('5. strictly prohibits linear-gradient, radial-gradient, and conic-gradient in Atlas styles', () => {
    const atlasStyles = [tokensCss, baseCss, chromeCss, motionCss, responsiveCss].join('\n');
    expect(atlasStyles).not.toContain('linear-gradient');
    expect(atlasStyles).not.toContain('radial-gradient');
    expect(atlasStyles).not.toContain('conic-gradient');
  });

  // Guard 6: Prohibit heavy font weights (700/800/900) in Atlas typography tokens
  it('6. respects 580 max font weight ceiling on public typography tokens', () => {
    expect(tokensCss).not.toContain('font-weight: 700');
    expect(tokensCss).not.toContain('font-weight: 800');
    expect(tokensCss).not.toContain('font-weight: 900');
    expect(tokensCss).toContain('--atlas-weight-hero: 520');
  });

  // Guard 7: Prohibit old cream / ivory / burgundy color tokens in Atlas
  it('7. prohibits legacy cream/burgundy tokens in Atlas styles', () => {
    const atlasStyles = [tokensCss, baseCss, chromeCss, motionCss, responsiveCss].join('\n');
    expect(atlasStyles).not.toContain('#642832');
    expect(atlasStyles).not.toContain('#D67D8C');
  });

  // Guard 8: How It Works has zero numbered 01-06 steps
  it('8. confirms How It Works has no numbered 01-06 steppers', () => {
    expect(howItWorksJsx).not.toContain('STAGE 01');
    expect(howItWorksJsx).not.toContain('01 / 06');
    expect(howItWorksJsx).not.toContain('01.');
  });

  // Guard 9: Career reads 17 canonical roles from careers.json
  it('9. confirms Career Intelligence reads 17 canonical roles matching careers.json exactly', () => {
    expect(ROLE_ENTRIES).toHaveLength(17);
    const expectedTitles = Object.values(careersData).map((p) => p.title);
    const actualTitles = ROLE_ENTRIES.map((r) => r.title);
    expect(actualTitles).toEqual(expectedTitles);
  });

  // Guard 10: Polymorphic ResponseFragment renders with scoped desktop anti-collapse contract
  it('10. renders ResponseFragment protagonist across variants with scoped desktop anti-collapse contract', () => {
    const { container: respContainer } = render(
      <ResponseFragment variant="response" text="“I clarify responsibilities before committing work.”" />
    );
    expect(respContainer.querySelector('.pa-atlas-fragment--response')).toBeInTheDocument();
    expect(motionCss).toContain('.pa-atlas-fragment--response');
    expect(motionCss).toContain('min-width: 22rem;');

    const { container: clauseContainer } = render(
      <ResponseFragment variant="clause" text="I clarify responsibilities" />
    );
    expect(clauseContainer.querySelector('.pa-atlas-fragment--clause')).toBeInTheDocument();
  });

  // Guard 11: Single <main id="main-content"> hierarchy across AtlasLayout
  it('11. verifies AtlasLayout renders single main#main-content semantic element', () => {
    const atlasLayout = readFile('src/components/personality-atlas/chrome/AtlasLayout.jsx');
    expect(atlasLayout).toContain('<main id="main-content"');

    const pages = [homeJsx, howItWorksJsx, careerJsx, methodologyJsx, trustJsx, progressJsx, privacyJsx, loginJs, signupJs];
    pages.forEach((page) => {
      expect(page).not.toMatch(/<main[\s>]/);
    });
  });

  // Guard 12: Public media manifest uses locally supplied licensed Unsplash Plus originals
  it('12. confirms Media Manifest provenance header', () => {
    expect(mediaManifestJs).toContain('Sourced from locally supplied licensed Unsplash Plus originals with per-asset provenance recorded below.');
  });
});
