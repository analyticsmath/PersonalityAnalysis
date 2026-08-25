import React from 'react';
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { PublicExperienceRoot } from './components/public-experience/chrome/PublicExperienceRoot';
import { MEDIA_MANIFEST_PX } from './content/public-experience/mediaManifest';
import { ROUTE_TRANSITION_MAP } from './content/public-experience/transitionMap';
import careersData from './content/careers.json';

function readFile(relPath) {
  return fs.readFileSync(path.resolve(process.cwd(), relPath), 'utf-8');
}

describe('Public Experience (Editorial Evidence Atlas) — Creative Guards & Architecture Contracts', () => {
  const tokensCss = readFile('src/styles/public-experience/tokens.css');
  const fontsCss = readFile('src/styles/public-experience/fonts.css');
  const baseCss = readFile('src/styles/public-experience/base.css');
  const chromeCss = readFile('src/styles/public-experience/chrome.css');
  const homeCss = readFile('src/styles/public-experience/home.css');
  const careerCss = readFile('src/styles/public-experience/career.css');
  const howCss = readFile('src/styles/public-experience/how.css');
  const progressCss = readFile('src/styles/public-experience/progress.css');
  const trustCss = readFile('src/styles/public-experience/trust.css');
  const methodologyCss = readFile('src/styles/public-experience/methodology.css');
  const privacyCss = readFile('src/styles/public-experience/privacy.css');
  const authCss = readFile('src/styles/public-experience/auth.css');
  const responsiveCss = readFile('src/styles/public-experience/responsive.css');
  const reducedMotionCss = readFile('src/styles/public-experience/reduced-motion.css');

  const publicContentJs = readFile('src/content/public-experience/publicContent.js');

  it('1. contains strictly zero em dashes in public content text', () => {
    expect(publicContentJs).not.toContain('—');
    expect(publicContentJs).not.toContain('&mdash;');
    expect(publicContentJs).not.toContain('\u2014');
  });

  it('2. contains strictly zero CSS gradients across all public stylesheets', () => {
    const allCss = [
      tokensCss,
      fontsCss,
      baseCss,
      chromeCss,
      homeCss,
      careerCss,
      howCss,
      progressCss,
      trustCss,
      methodologyCss,
      privacyCss,
      authCss,
      responsiveCss,
      reducedMotionCss,
    ].join('\n');

    expect(allCss).not.toMatch(/linear-gradient/i);
    expect(allCss).not.toMatch(/radial-gradient/i);
    expect(allCss).not.toMatch(/conic-gradient/i);
  });

  it('3. loads dedicated variable font Instrument Sans in fonts.css', () => {
    expect(fontsCss).toContain('@fontsource-variable/instrument-sans');
  });

  it('4. enforces font weight ceiling <= 580 in tokens.css', () => {
    expect(tokensCss).toContain('--px-weight-bold: 580');
    expect(tokensCss).not.toContain('font-weight: 700');
    expect(tokensCss).not.toContain('font-weight: 800');
    expect(tokensCss).not.toContain('font-weight: 900');
  });

  it('5. contains light interface neutrals and no green brand wash in tokens.css', () => {
    expect(tokensCss).toContain('--pa-paper: #F4F5F2');
    expect(tokensCss).toContain('--pa-white: #FFFFFF');
    expect(tokensCss).toContain('--pa-ink: #171918');
    expect(tokensCss).not.toContain('--atlas-field: #163D35');
    expect(tokensCss).not.toContain('--atlas-signal: #CDD86A');
  });

  it('6. verifies media manifest contains approved licensed sources with provenance', () => {
    const keys = Object.keys(MEDIA_MANIFEST_PX);
    expect(keys.length).toBeGreaterThanOrEqual(10);
    keys.forEach((key) => {
      const asset = MEDIA_MANIFEST_PX[key];
      expect(asset.id).toBeDefined();
      expect(asset.sourcePlatform).toBe('Unsplash Plus');
      expect(asset.sceneTone).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('7. verifies 17 canonical career profiles are present in careers.json', () => {
    expect(Object.keys(careersData).length).toBe(17);
  });

  it('8. verifies single main id="main-content" in PublicExperienceRoot', () => {
    render(
      <MemoryRouter>
        <PublicExperienceRoot>
          <div data-testid="child-content">Test Child</div>
        </PublicExperienceRoot>
      </MemoryRouter>
    );

    const main = document.getElementById('main-content');
    expect(main).not.toBeNull();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('9. verifies route transition map definitions', () => {
    expect(ROUTE_TRANSITION_MAP['/_to_/career-intelligence']).toBeDefined();
    expect(ROUTE_TRANSITION_MAP['/_to_/how-it-works']).toBeDefined();
    expect(ROUTE_TRANSITION_MAP['/login_to_/signup']).toBeDefined();
  });
});
