// frontend/src/editorial-visual-contract.test.jsx
// Personality Assessor — Under Different Conditions Visual Architecture & Product Truth Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Calibration } from './components/public-experience/home/Calibration';
import { getSafeNextUrl } from './content/public-experience/navigation';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Personality Assessor — Under Different Conditions Visual Architecture & Product Truth Guardrails', () => {
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

  it('2. loads Bricolage Grotesque variable font in fonts.css', () => {
    expect(fontsCss).toContain('@fontsource-variable/bricolage-grotesque');
    expect(tokensCss).toContain('--px-font-family');
  });

  it('3. tokens define approved interface neutrals', () => {
    expect(tokensCss).toContain('--px-ink: #121416;');
    expect(tokensCss).toContain('--px-white: #F7F8F8;');
    expect(tokensCss).toContain('--px-soft: #DDE1E3;');
  });

  it('4. renders Calibration with 25/25/20/15/10/5 deterministic layers', () => {
    render(<Calibration />);
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
