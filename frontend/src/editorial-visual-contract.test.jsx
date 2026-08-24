// frontend/src/editorial-visual-contract.test.jsx
// Personality Assessor — Context Atlas Visual Architecture & Product Truth Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ResponseFragment from './components/personality-atlas/fragments/ResponseFragment';
import ProportionalWeights from './components/personality-atlas/methodology/ProportionalWeights';
import { getSafeNextUrl } from './utils/personality-v4/navigation';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Personality Assessor — Context Atlas Visual Architecture & Product Truth Guardrails', () => {
  const app = readFile('src/App.js');
  const fontsCss = readFile('src/styles/personality-atlas/fonts.css');
  const tokensCss = readFile('src/styles/personality-atlas/tokens.css');

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

  // Guardrail 2: Schibsted Grotesk & Fraunces Variable loaded in fonts.css
  it('2. loads Schibsted Grotesk, Fraunces, and IBM Plex Mono fonts', () => {
    expect(fontsCss).toContain('@fontsource-variable/schibsted-grotesk');
    expect(fontsCss).toContain('@fontsource-variable/fraunces');
    expect(fontsCss).toContain('@fontsource/ibm-plex-mono');
    expect(tokensCss).toContain('--atlas-font-evidence');
    expect(tokensCss).toContain('--atlas-font-sans');
  });

  // Guardrail 3: Tokens use approved Context Atlas palette
  it('3. tokens define approved Field, Ink, Tide, Lichen, Paper, Fog, Signal palette', () => {
    expect(tokensCss).toContain('--atlas-field: #163D35;');
    expect(tokensCss).toContain('--atlas-ink: #24302E;');
    expect(tokensCss).toContain('--atlas-tide: #4F6D78;');
    expect(tokensCss).toContain('--atlas-lichen: #95A87F;');
    expect(tokensCss).toContain('--atlas-paper: #EFF5F2;');
    expect(tokensCss).toContain('--atlas-fog: #D9E5E0;');
    expect(tokensCss).toContain('--atlas-signal: #CDD86A;');
  });

  // Guardrail 4: ResponseFragment renders with proper semantic quote and metadata
  it('4. renders ResponseFragment protagonist with Fraunces quote and metadata', () => {
    render(
      <ResponseFragment
        text="“I clarify responsibilities before committing work.”"
        sourceId="0x8F4A"
        date="2026-08"
      />
    );
    expect(screen.getByText('“I clarify responsibilities before committing work.”')).toBeInTheDocument();
    expect(screen.getByText('REF: 0x8F4A')).toBeInTheDocument();
    expect(screen.getByText('RECORDED: 2026-08')).toBeInTheDocument();
  });

  // Guardrail 5: ProportionalWeights renders deterministic career fit weights
  it('5. renders ProportionalWeights with 25/25/20/15/10/5 deterministic layers', () => {
    render(<ProportionalWeights />);
    const quarters = screen.getAllByText('25%');
    expect(quarters.length).toBe(2);
    expect(screen.getByText('RIASEC Interests')).toBeInTheDocument();
    expect(screen.getByText('Technical & Professional Skills')).toBeInTheDocument();
    expect(screen.getByText('Work Values')).toBeInTheDocument();
    expect(screen.getByText('Personality Traits')).toBeInTheDocument();
    expect(screen.getByText('Educational Background')).toBeInTheDocument();
    expect(screen.getByText('Career Goals')).toBeInTheDocument();
  });

  // Guardrail 6: Safe navigation protects external redirects
  it('6. safely redirects only to allowed internal paths', () => {
    expect(getSafeNextUrl('/dashboard', '/dashboard')).toBe('/dashboard');
    expect(getSafeNextUrl('/assessment/start', '/dashboard')).toBe('/assessment/start');
    expect(getSafeNextUrl('https://malicious.com', '/dashboard')).toBe('/dashboard');
    expect(getSafeNextUrl('//malicious.com', '/dashboard')).toBe('/dashboard');
  });
});
