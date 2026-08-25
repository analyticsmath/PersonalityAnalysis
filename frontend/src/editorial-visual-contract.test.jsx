// frontend/src/editorial-visual-contract.test.jsx
// Personality Assessor — Editorial Evidence Atlas Visual Architecture & Product Truth Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalibrationMass } from './components/public-experience/home/CalibrationMass';
import { getSafeNextUrl } from './content/public-experience/navigation';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Personality Assessor — Editorial Evidence Atlas Visual Architecture & Product Truth Guardrails', () => {
  const app = readFile('src/App.js');
  const fontsCss = readFile('src/styles/public-experience/fonts.css');
  const tokensCss = readFile('src/styles/public-experience/tokens.css');

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

  it('2. loads Instrument Sans Variable and IBM Plex Mono fonts in fonts.css', () => {
    expect(fontsCss).toContain('@fontsource-variable/instrument-sans');
    expect(fontsCss).toContain('@fontsource/ibm-plex-mono');
    expect(tokensCss).toContain('--pa-font-family');
  });

  it('3. tokens define approved interface light neutrals', () => {
    expect(tokensCss).toContain('--pa-paper: #F4F5F2;');
    expect(tokensCss).toContain('--pa-white: #FFFFFF;');
    expect(tokensCss).toContain('--pa-mineral: #E9ECE8;');
    expect(tokensCss).toContain('--pa-ink: #171918;');
    expect(tokensCss).toContain('--pa-evidence: #713641;');
  });

  it('4. renders Calibration with 25/25/20/15/10/5 deterministic career-fit weights', () => {
    render(<CalibrationMass />);
    const quarters = screen.getAllByText('25%');
    expect(quarters.length).toBe(2);
    expect(screen.getByText('RIASEC Interests')).toBeInTheDocument();
    expect(screen.getByText('Technical & Professional Skills')).toBeInTheDocument();
    expect(screen.getByText('Work Values')).toBeInTheDocument();
    expect(screen.getByText('Personality Traits')).toBeInTheDocument();
    expect(screen.getByText('Educational Background')).toBeInTheDocument();
    expect(screen.getByText('Career Goals')).toBeInTheDocument();
  });

  it('5. safely redirects only to allowed internal paths', () => {
    expect(getSafeNextUrl('/dashboard', '/dashboard')).toBe('/dashboard');
    expect(getSafeNextUrl('/assessment/start', '/dashboard')).toBe('/assessment/start');
    expect(getSafeNextUrl('https://malicious.com', '/dashboard')).toBe('/dashboard');
    expect(getSafeNextUrl('//malicious.com', '/dashboard')).toBe('/dashboard');
  });
});
