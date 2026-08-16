// frontend/src/editorial-visual-contract.test.jsx
// Personality Assessor — Reference-Locked Visual Contract & Product Truth Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ChapterAdaptiveAssessment from './components/editorial/ChapterAdaptiveAssessment';
import { EDITORIAL_CONTENT } from './content/editorial/editorialContent';
import { EDITORIAL_MEDIA_ASSETS } from './content/editorial/editorialMedia';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Editorial Visual Architecture & Product Truth Guardrails', () => {
  const home = readFile('src/pages/editorial/EditorialHomePage.jsx');
  const hero = readFile('src/components/editorial/EditorialHero.jsx');
  const adaptive = readFile('src/components/editorial/ChapterAdaptiveAssessment.jsx');
  const readings = readFile('src/components/editorial/ChapterFourReadings.jsx');
  const careers = readFile('src/components/editorial/ChapterCareerWorlds.jsx');
  const progress = readFile('src/components/editorial/ChapterProgressEvidence.jsx');
  const story = readFile('src/components/editorial/ChapterResultStory.jsx');
  const trust = readFile('src/components/editorial/ChapterTrustPrivacy.jsx');
  const closingCta = readFile('src/components/editorial/ChapterClosingCta.jsx');
  const footer = readFile('src/components/editorial/EditorialFooter.jsx');
  const methodology = readFile('src/pages/editorial/EditorialMethodologyPage.jsx');
  const privacy = readFile('src/pages/editorial/EditorialPrivacyPage.jsx');
  const careerRoute = readFile('src/pages/editorial/EditorialCareerIntelligencePage.jsx');
  const contentFile = readFile('src/content/editorial/editorialContent.js');
  const mediaFile = readFile('src/content/editorial/editorialMedia.js');
  const dashboard = readFile('src/pages/Dashboard/index.js');
  const app = readFile('src/App.js');
  const fontsCss = readFile('src/styles/fonts.css');
  const tokensCss = readFile('src/styles/editorial/tokens.css');
  const heroCss = readFile('src/styles/editorial/editorial-hero.css');
  const foundationCss = readFile('src/styles/editorial/editorial-foundation.css');
  const themeCss = readFile('src/styles/theme.css');

  // Guardrail 1: All required public routes are registered in App.js
  it('1. keeps every required public route registered in App.js', () => {
    const requiredRoutes = [
      '/',
      '/how-it-works',
      '/career-intelligence',
      '/progress',
      '/methodology',
      '/trust',
      '/privacy',
      '/login',
      '/signup',
    ];
    for (const route of requiredRoutes) {
      expect(app).toContain(`path="${route}"`);
    }
  });

  // Guardrail 2: Hero matches Reference A grammar and approved headline
  it('2. hero matches Reference A bold sans centered headline and copy', () => {
    expect(EDITORIAL_CONTENT.hero.headline).toBe('See the professional patterns behind your decisions.');
    expect(EDITORIAL_CONTENT.hero.lead).toBe('Adaptive questions turn real professional context into a profile and career direction you can inspect.');
    expect(EDITORIAL_CONTENT.hero.microControl).toBe('SEE HOW IT ADAPTS');
    expect(EDITORIAL_CONTENT.hero.communityLabel).toBe('Built for students, graduates and professionals');
    expect(EDITORIAL_CONTENT.hero.ctaPrimary).toBe('Build my profile →');
    expect(heroCss).toContain('grid-template-columns: 1.1fr 1.35fr 1.65fr 1.35fr 1.1fr');
  });

  // Guardrail 3: Adaptive demo must initialize with NO preselected answer
  it('3. adaptive demo initializes with no preselected answer', () => {
    expect(adaptive).toContain('useState(null)');
    render(
      <BrowserRouter>
        <ChapterAdaptiveAssessment />
      </BrowserRouter>
    );
    const options = screen.getAllByRole('radio');
    for (const opt of options) {
      expect(opt.getAttribute('aria-checked')).toBe('false');
    }
  });

  // Guardrail 4: Illustrative scenario contains NO fake person or fake testimonial attribution
  it('4. illustrative scenario chapter contains no fabricated person or fake testimonial', () => {
    const allPublic = [home, hero, adaptive, readings, careers, progress, story, trust, closingCta, footer, contentFile, mediaFile].join('\n');
    expect(allPublic).not.toContain('Elena Vance');
    expect(allPublic).not.toContain('Lead Systems Architect');
    expect(EDITORIAL_CONTENT.story.chapterTag).toBe('ILLUSTRATIVE SCENARIO');
    expect(EDITORIAL_CONTENT.story.disclaimer).toContain('Illustrative product scenario');
  });

  // Guardrail 5: Unsupported privacy and security claims are strictly absent
  it('5. unsupported privacy/security/export claims are removed', () => {
    const allPublic = [home, hero, adaptive, readings, careers, progress, story, trust, methodology, privacy, contentFile].join('\n');
    expect(allPublic).not.toContain('one-click');
    expect(allPublic).not.toContain('immediate cascade');
    expect(allPublic).not.toContain('encryption-at-rest');
    expect(allPublic).not.toContain('isolated-server');
    expect(allPublic).not.toContain('no-third-party-tracking');
    expect(allPublic).not.toContain('complete portable-history-export');
    expect(allPublic).not.toContain('fully air-gapped');
    expect(allPublic).not.toContain('98% scientifically accurate');
    expect(allPublic).not.toContain('clinical diagnosis');
  });

  // Guardrail 6: Pre-locked marketing accent (#FF4800) is removed in favor of neutral tokens
  it('6. pre-locked marketing accent #FF4800 is removed', () => {
    expect(tokensCss).not.toContain('#FF4800');
    expect(tokensCss).toContain('--ed-accent: #111827');
  });

  // Guardrail 7: Pexels 7988086 / generic developer is not used as hero/readings actor
  it('7. Pexels 7988086 is excluded from hero and readings assets', () => {
    const allPublic = [mediaFile, hero, readings, home].join('\n');
    expect(allPublic).not.toContain('7988086');
    expect(EDITORIAL_MEDIA_ASSETS.hero.actor4.id).toBe('build');
  });

  // Guardrail 8: Overflow-x hidden is removed from body, maintaining native container containment
  it('8. overflow-x: hidden is removed from body and html', () => {
    expect(foundationCss).not.toContain('overflow-x: hidden');
    expect(themeCss).not.toContain('overflow-x: hidden');
  });

  // Guardrail 9: Blanket 0.01ms reduced motion reset is removed in favor of component-level rules
  it('9. blanket 0.01ms reduced motion reset is replaced with component-level rules', () => {
    expect(foundationCss).not.toContain('0.01ms !important');
    expect(foundationCss).toContain('@media (prefers-reduced-motion: reduce)');
  });

  // Guardrail 10: Routine numbered chapter eyebrows (01, 02, 03) are removed
  it('10. routine numbered chapter eyebrows are removed from content tags', () => {
    expect(EDITORIAL_CONTENT.adaptive.chapterTag).not.toMatch(/^0\d/);
    expect(EDITORIAL_CONTENT.readings.chapterTag).not.toMatch(/^0\d/);
    expect(EDITORIAL_CONTENT.careers.chapterTag).not.toMatch(/^0\d/);
    expect(EDITORIAL_CONTENT.progress.chapterTag).not.toMatch(/^0\d/);
    expect(EDITORIAL_CONTENT.story.chapterTag).not.toMatch(/^0\d/);
    expect(EDITORIAL_CONTENT.trust.chapterTag).not.toMatch(/^0\d/);
  });

  // Guardrail 11: Missing dashboard data does not fabricate artificial score values
  it('11. missing dashboard data does not fabricate artificial score values', () => {
    expect(dashboard).toContain('Not available');
    expect(dashboard).not.toContain('score || 50');
    expect(dashboard).not.toContain('score: 50');
    expect(dashboard).not.toContain('fitScore || 80');
  });

  // Guardrail 12: Public components contain no ManyPixels reference
  it('12. public components contain no ManyPixels reference', () => {
    const allPublic = [home, hero, adaptive, readings, careers, progress, story, trust, closingCta, footer, methodology, privacy, careerRoute, contentFile, mediaFile].join('\n');
    expect(allPublic.toLowerCase()).not.toContain('manypixels');
  });

  // Guardrail 13: Career Worlds renders 5 career rows and dynamic floating image card
  it('13. Career Worlds renders 5 career rows and dynamic floating image card', () => {
    const careerNames = EDITORIAL_MEDIA_ASSETS.careers.slice(0, 5).map((c) => c.name);
    expect(careerNames).toContain('Systems Architect');
    expect(careerNames).toContain('Product Strategist');
    expect(careerNames).toContain('UX Researcher');
    expect(careerNames).toContain('Data & Evidence Analyst');
    expect(careerNames).toContain('Technical Operations Lead');
    expect(careers).toContain('floatingCardRef');
  });

  // Guardrail 14: Methodology renders four native psychometric framework breakdowns
  it('14. Methodology renders four native psychometric framework breakdowns', () => {
    expect(methodology).toContain('Big Five');
    expect(methodology).toContain('RIASEC');
    expect(methodology).toContain('Work Values');
    expect(methodology).toContain('Deterministic Scoring');
  });

  // Guardrail 15: Inter Tight and Inter fonts are loaded in fonts.css
  it('15. Inter Tight and Inter fonts are loaded in fonts.css', () => {
    expect(fontsCss).toContain('@fontsource-variable/inter');
    expect(fontsCss).toContain('@fontsource/inter-tight');
  });
});
