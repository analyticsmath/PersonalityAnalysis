// frontend/src/editorial-visual-contract.test.jsx
// Personality Assessor — Evidence in Context Visual Architecture & Product Truth Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeDecisionChapter from './components/personality-v7/home/HomeDecisionChapter';
import { MEDIA_ASSETS_V7 } from './content/personality-v7/mediaManifest';
import { getSafeNextUrl, getSignupAcquisitionUrl, getLoginUrl } from './utils/personality-v4/navigation';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Personality Assessor — Evidence in Context Visual Architecture & Product Truth Guardrails', () => {
  const home = readFile('src/pages/editorial/EditorialHomePage.jsx');
  const howItWorks = readFile('src/pages/editorial/EditorialHowItWorksPage.jsx');
  const careerIntelligence = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const methodology = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const trustRoute = readFile('src/pages/editorial/EditorialTrustPage.jsx');
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

  // Guardrail 2: Newsreader Variable & Instrument Sans Variable loaded in fonts.css
  it('2. loads Newsreader and Instrument Sans variable fonts', () => {
    expect(fontsCss).toContain('@fontsource-variable/newsreader');
    expect(fontsCss).toContain('@fontsource-variable/instrument-sans');
    expect(tokensCss).toContain('--pa-font-serif');
    expect(tokensCss).toContain('--pa-font-sans');
  });

  // Guardrail 3: Tokens use approved Evidence in Context palette
  it('3. tokens define approved Carbon, Graphite, Mineral, Pewter, Oxblood palette', () => {
    expect(tokensCss).toContain('--pa-carbon: #0D0F0E');
    expect(tokensCss).toContain('--pa-graphite: #222724');
    expect(tokensCss).toContain('--pa-mineral: #F3F5F2');
    expect(tokensCss).toContain('--pa-pewter: #AEB4AF');
    expect(tokensCss).toContain('--pa-oxblood: #642832');
  });

  // Guardrail 4: Contextual decision initializes with NO preselected answer
  it('4. contextual decision demo initializes with no preselected radio and remains a native radio group', () => {
    let currentSelection = null;
    const { rerender } = render(
      <BrowserRouter>
        <HomeDecisionChapter
          selectedChoice={currentSelection}
          onSelectChoice={(c) => {
            currentSelection = c;
          }}
        />
      </BrowserRouter>
    );
    const options = screen.getAllByRole('radio');
    expect(options.length).toBe(4);
    for (const opt of options) {
      expect(opt.checked).toBe(false);
    }
    fireEvent.click(options[0]);
    rerender(
      <BrowserRouter>
        <HomeDecisionChapter
          selectedChoice={currentSelection}
          onSelectChoice={(c) => {
            currentSelection = c;
          }}
        />
      </BrowserRouter>
    );
    expect(options[0].checked).toBe(true);
  });

  // Guardrail 5: Illustrative scenario contains NO fake person or fake testimonial persona
  it('5. contains no fabricated testimonial persona on public surfaces', () => {
    const allPublic = [
      home,
      howItWorks,
      careerIntelligence,
      methodology,
      trustRoute,
      progress,
      privacy,
      notFound,
      login,
      signup,
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
      progress,
      privacy,
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

  // Guardrail 7: Media Manifest satisfies all asset requirements
  it('7. media manifest contains all 10 unwatermarked photographic assets with dimensions and focal points', () => {
    const expectedKeys = [
      'homeContext',
      'signupWorkshop',
      'careerComplex',
      'careerOpen',
      'evidenceVisible',
      'howItWorksCraft',
      'careerShared',
      'careerAutonomy',
      'progressStudio',
      'trustInspection',
    ];
    for (const key of expectedKeys) {
      expect(MEDIA_ASSETS_V7).toHaveProperty(key);
      expect(MEDIA_ASSETS_V7[key].widths.length).toBeGreaterThan(0);
      expect(MEDIA_ASSETS_V7[key].focalPoint).toBeDefined();
      expect(MEDIA_ASSETS_V7[key].source).toBeTruthy();
    }
  });

  // Guardrail 8: Safe Next URL navigation utility enforces security rules
  it('8. safe next URL utility allows valid relative paths and rejects external/dangerous URLs', () => {
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

  // Guardrail 9: Trust page links export and deletion items directly to /account/privacy
  it('9. trust page links export and deletion items directly to /account/privacy', () => {
    expect(trustRoute).toContain('/account/privacy');
  });

  // Guardrail 10: Login page omits deceptive password reset link
  it('10. login page omits forgot password link as backend does not have recovery endpoint', () => {
    expect(login).not.toContain('Forgot password?');
    expect(login).not.toContain('/forgot-password');
  });

  // Guardrail 11: Signup page is a single-screen layout with truthful 6-char password helper
  it('11. signup page has truthful 6-char helper and accessible validation', () => {
    expect(signup).toContain('Minimum 6 characters.');
    expect(signup).not.toContain('At least 8 characters');
    expect(signup).not.toContain('One uppercase letter');
    expect(signup).not.toContain('One number');
    expect(signup).not.toContain('One special character');
    expect(signup).not.toContain('step === 2');
    expect(signup).not.toContain('Step 1 of');
  });

  // Guardrail 12: CSS styling is properly isolated
  it('12. foundation and V7 CSS are properly defined', () => {
    expect(foundationCss).toContain('.pa-v7-root');
    expect(foundationCss).toContain('.pa-btn-primary');
    expect(chromeCss).toContain('.pa-header');
    expect(homeCss).toContain('.pa-home-opening');
  });
});
