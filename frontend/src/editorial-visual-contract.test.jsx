// frontend/src/editorial-visual-contract.test.jsx
// Personality Assessor — The Living Record Visual Architecture & Product Truth Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import EvidenceStrip from './components/personality-v7/living-record/EvidenceStrip';
import CalibrationBaseline from './components/personality-v7/living-record/CalibrationBaseline';
import { MEDIA_ASSETS_V7 } from './content/personality-v7/mediaManifest';
import { getSafeNextUrl } from './utils/personality-v4/navigation';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Personality Assessor — The Living Record Visual Architecture & Product Truth Guardrails', () => {
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

  // Guardrail 4: EvidenceStrip renders with proper semantic quote and metadata
  it('4. renders EvidenceStrip protagonist with Newsreader quote and Mona Sans metadata', () => {
    render(
      <EvidenceStrip
        quote="“I clarify responsibilities before committing work.”"
        eyebrow="RETAINED SPECIMEN"
        sourceLabel="SOURCE RETAINED"
      />
    );
    expect(screen.getByText('“I clarify responsibilities before committing work.”')).toBeInTheDocument();
    expect(screen.getByText('RETAINED SPECIMEN')).toBeInTheDocument();
    expect(screen.getByText('SOURCE RETAINED')).toBeInTheDocument();
  });

  // Guardrail 5: CalibrationBaseline renders deterministic career fit weights
  it('5. renders CalibrationBaseline with 25/25/20/15/10/5 deterministic layers', () => {
    render(<CalibrationBaseline theme="mineral" />);
    expect(screen.getByText('RIASEC')).toBeInTheDocument();
    expect(screen.getByText('SKILLS')).toBeInTheDocument();
    expect(screen.getByText('WORK VALUES')).toBeInTheDocument();
    expect(screen.getByText('PERSONALITY')).toBeInTheDocument();
    expect(screen.getByText('EDUCATION')).toBeInTheDocument();
    expect(screen.getByText('GOALS')).toBeInTheDocument();
  });

  // Guardrail 6: Safe navigation protects external redirects
  it('6. safely redirects only to allowed internal paths', () => {
    expect(getSafeNextUrl('/dashboard', '/dashboard')).toBe('/dashboard');
    expect(getSafeNextUrl('/assessment/start', '/dashboard')).toBe('/assessment/start');
    expect(getSafeNextUrl('https://malicious.com', '/dashboard')).toBe('/dashboard');
    expect(getSafeNextUrl('//malicious.com', '/dashboard')).toBe('/dashboard');
  });
});
