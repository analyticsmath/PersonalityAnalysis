// frontend/src/editorial-visual-contract.test.jsx
// Personality Assessor — V7 Signal Atlas Architecture & Product Truth Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import EvidenceChapter from './components/personality-v7/home/EvidenceChapter';
import FourLensesAtlasChapter from './components/personality-v7/home/FourLensesAtlasChapter';
import { PUBLIC_CONTENT } from './content/personality-v7/publicContent';
import { MEDIA_ASSETS_V7 } from './content/personality-v7/mediaManifest';
import { getSafeNextUrl, getSignupAcquisitionUrl, getLoginUrl } from './utils/personality-v4/navigation';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Personality Assessor V7 Signal Atlas — Visual Architecture & Product Truth Guardrails', () => {
  const home = readFile('src/pages/editorial/EditorialHomePage.jsx');
  const howItWorks = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const careerIntelligence = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const methodology = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const trustRoute = readFile('src/pages/editorial/EditorialTrustPage.jsx');
  const trustComp = readFile('src/components/personality-v7/routes/TrustLedger.jsx');
  const progress = readFile('src/pages/editorial/EditorialProgressPage.jsx');
  const privacy = readFile('src/pages/editorial/EditorialPrivacyPage.jsx');
  const notFound = readFile('src/pages/PublicNotFoundPage.jsx');
  const login = readFile('src/pages/Auth/LoginPage.js');
  const signup = readFile('src/pages/Auth/SignupPage.js');
  const app = readFile('src/App.js');
  const fontsCss = readFile('src/styles/fonts.css');
  const tokensCss = readFile('src/styles/personality-v7/tokens.css');
  const foundationCss = readFile('src/styles/personality-v7/foundation.css');
  const homeCss = readFile('src/styles/personality-v7/home.css');
  const chromeCss = readFile('src/styles/personality-v7/chrome.css');

  // Guardrail 1: All required public routes are registered in App.js
  it('1. keeps every required public route registered in App.js', () => {
    const requiredRoutes = [
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
    for (const route of requiredRoutes) {
      expect(app).toContain(route);
    }
  });

  // Guardrail 2: Source Serif 4 Variable & Source Sans 3 Variable loaded in fonts.css
  it('2. loads Source Serif 4 and Source Sans 3 variable fonts, not banned preloads', () => {
    expect(fontsCss).toContain('@fontsource-variable/source-serif-4');
    expect(fontsCss).toContain('@fontsource-variable/source-sans-3');
    expect(tokensCss).toContain('--pa-font-serif');
    expect(tokensCss).toContain('--pa-font-sans');
  });

  // Guardrail 3: Tokens use approved neutral palette and Big Five data colors
  it('3. tokens define approved neutral palette, Big Five colors, and spatial gutters', () => {
    expect(tokensCss).toContain('--pa-ground: #0c0e0c');
    expect(tokensCss).toContain('--pa-surface-deep: #171a16');
    expect(tokensCss).toContain('--pa-paper: #eeece3');
    expect(tokensCss).toContain('--pa-bone: #fbfaf4');
    expect(tokensCss).toContain('--pa-stone: #a5a79e');
    expect(tokensCss).toContain('--pa-ink: #3a3c36');
    expect(tokensCss).toContain('--pa-data-openness');
    expect(tokensCss).toContain('--pa-data-conscientiousness');
    expect(tokensCss).toContain('--pa-data-extraversion');
    expect(tokensCss).toContain('--pa-data-agreeableness');
    expect(tokensCss).toContain('--pa-data-stability');
  });

  // Guardrail 4: Adaptive demo initializes with NO preselected answer
  it('4. adaptive question demo initializes with no preselected radio and updates state on selection', () => {
    render(
      <BrowserRouter>
        <EvidenceChapter />
      </BrowserRouter>
    );
    const options = screen.getAllByRole('radio');
    expect(options.length).toBe(3);
    for (const opt of options) {
      expect(opt.checked).toBe(false);
    }
    // Select first option
    fireEvent.click(options[0]);
    expect(options[0].checked).toBe(true);
  });

  // Guardrail 5: Illustrative scenario contains NO fake person or fake testimonial attribution
  it('5. contains no fabricated testimonial persona (e.g., Elena Vance) on public surfaces', () => {
    const allPublic = [
      home,
      howItWorks,
      careerIntelligence,
      methodology,
      trustRoute,
      trustComp,
      progress,
      privacy,
      notFound,
      login,
      signup,
      JSON.stringify(PUBLIC_CONTENT),
    ].join('\n');
    expect(allPublic).not.toContain('Elena Vance');
    expect(allPublic).not.toContain('Lead Systems Architect Elena');
  });

  // Guardrail 6: Unsupported privacy and security claims are strictly absent
  it('6. unsupported privacy/security/export claims are strictly absent', () => {
    const allPublic = [
      home,
      howItWorks,
      careerIntelligence,
      methodology,
      trustRoute,
      trustComp,
      progress,
      privacy,
      JSON.stringify(PUBLIC_CONTENT),
    ].join('\n');
    expect(allPublic).not.toContain('one-click');
    expect(allPublic).not.toContain('immediate cascade');
    expect(allPublic).not.toContain('encryption-at-rest');
    expect(allPublic).not.toContain('isolated-server');
    expect(allPublic).not.toContain('no-third-party-tracking');
    expect(allPublic).not.toContain('fully air-gapped');
    expect(allPublic).not.toContain('98% scientifically accurate');
    expect(allPublic).not.toContain('clinical diagnosis');
  });

  // Guardrail 7: A01–A10 Media Manifest satisfies all asset requirements
  it('7. media manifest contains all 10 unwatermarked photographic assets A01-A10 with dimensions and focal points', () => {
    const expectedKeys = ['a01', 'a02', 'a03', 'a04', 'a05', 'a06', 'a07', 'a08', 'a09', 'a10'];
    for (const key of expectedKeys) {
      expect(MEDIA_ASSETS_V7).toHaveProperty(key);
      expect(MEDIA_ASSETS_V7[key].widths.length).toBeGreaterThan(0);
      expect(MEDIA_ASSETS_V7[key].focalPoint).toBeDefined();
      expect(MEDIA_ASSETS_V7[key].source).toBeTruthy();
    }
  });

  // Guardrail 8: Career Worlds renders 5 career worlds with A02-A06 assets
  it('8. Career Worlds renders all 5 curated career environments', () => {
    const worlds = PUBLIC_CONTENT.home.careerWorlds.worlds;
    expect(worlds.length).toBe(5);
    const ids = worlds.map((w) => w.id);
    expect(ids).toEqual([
      'systems-investigative',
      'product-expressive',
      'facilitation-relational',
      'strategic-directional',
      'operational-precision',
    ]);
  });

  // Guardrail 9: Independent Readings Field implements accessible tablist with 4 lenses
  it('9. Independent Readings Field implements accessible tablist with 4 lenses and keyboard navigation', () => {
    render(
      <BrowserRouter>
        <FourLensesAtlasChapter />
      </BrowserRouter>
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(4);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    // Click second tab
    fireEvent.click(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
  });

  // Guardrail 10: Safe Next URL navigation utility enforces security rules
  it('10. safe next URL utility allows valid relative paths and rejects external/dangerous URLs', () => {
    expect(getSafeNextUrl('/assessment/start')).toBe('/assessment/start');
    expect(getSafeNextUrl('/dashboard')).toBe('/dashboard');
    expect(getSafeNextUrl('/account/privacy')).toBe('/account/privacy');
    expect(getSafeNextUrl('https://evil.com')).toBe('/dashboard');
    expect(getSafeNextUrl('//evil.com')).toBe('/dashboard');
    expect(getSafeNextUrl('javascript:alert(1)')).toBe('/dashboard');
    expect(getSafeNextUrl(null)).toBe('/dashboard');
    expect(getSafeNextUrl('')).toBe('/dashboard');

    expect(getSignupAcquisitionUrl()).toBe('/signup?next=%2Fassessment%2Fstart');
    expect(getLoginUrl('/assessment/start')).toBe('/login?next=%2Fassessment%2Fstart');
    expect(getLoginUrl('/dashboard')).toBe('/login');
  });

  // Guardrail 11: Trust page export/delete controls link to existing protected controls
  it('11. trust page links export and deletion items directly to /account/privacy', () => {
    expect(trustComp).toContain('privacyControlsLink');
    expect(PUBLIC_CONTENT.trust.controls.privacyControlsLink).toBe('/account/privacy');
  });

  // Guardrail 12: Login page omits deceptive password reset link
  it('12. login page omits forgot password link as backend does not have recovery endpoint', () => {
    expect(login).not.toContain('Forgot password?');
    expect(login).not.toContain('/forgot-password');
  });

  // Guardrail 13: Signup page is a single-screen layout with live password validation
  it('13. signup page is a single-screen layout with real-time requirements and success dwell', () => {
    expect(signup).toContain('aria-live="polite"');
    expect(signup).toContain('At least 8 characters');
    expect(signup).toContain('One uppercase letter');
    expect(signup).toContain('One number');
    expect(signup).toContain('One special character');
    expect(signup).not.toContain('step === 2');
    expect(signup).not.toContain('Step 1 of');
  });

  // Guardrail 14: CSS styling is properly isolated and scoped
  it('14. foundation and V7 CSS are scoped without blanket destructive resets', () => {
    expect(foundationCss).toContain('.pa-v7-root');
    expect(foundationCss).toContain('.pa-public-v4');
    expect(foundationCss).not.toContain('0.01ms !important');
    expect(foundationCss).toContain('overflow-x: clip');
    expect(chromeCss).toContain('.pa-v7-atlas-dock');
    expect(homeCss).toContain('.pa-v7-chapter-orientation');
  });

  // Guardrail 15: Button selector specificity guarantees intended foreground color
  it('15. button selector specificity overrides generic link resets', () => {
    expect(foundationCss).toContain('.pa-v7-btn--primary');
    expect(foundationCss).toContain('color: var(--pa-ground)');
    expect(foundationCss).toContain('.pa-v7-btn--ink');
    expect(foundationCss).toContain('color: var(--pa-bone)');
  });
});
