// frontend/src/editorial-visual-contract.test.jsx
// Personality Assessor — Reference-Locked Visual Contract & Product Truth Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
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

  // Guardrail 1: All 7 Public routes are registered in App.js
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

  // Guardrail 3: Homepage does not render fake metrics, 'Artifact #', or fake confidence weights
  it('3. homepage contains no fabricated weights, fake user counts, or "Artifact #"', () => {
    const allPublic = [home, hero, adaptive, readings, careers, progress, story, trust, closingCta, footer, contentFile, mediaFile].join('\n');
    expect(allPublic).not.toContain('Artifact #');
    expect(allPublic).not.toContain('+22');
    expect(allPublic).not.toContain('88% confidence');
    expect(allPublic).not.toContain('350K+ users');
    expect(allPublic).not.toContain('98% Fit');
  });

  // Guardrail 4: Testimonial is explicitly labeled as illustrative
  it('4. testimonial/story chapter is truthfully labeled as illustrative product case', () => {
    expect(EDITORIAL_CONTENT.story.role).toContain('Illustrative product case');
    expect(EDITORIAL_CONTENT.story.disclaimer).toContain('Illustrative product case');
  });

  // Guardrail 5: Missing dashboard trait or career fit handles fallbacks honestly
  it('5. missing dashboard data does not fabricate artificial score values', () => {
    expect(dashboard).toContain('Not available');
    expect(dashboard).not.toContain('score || 50');
    expect(dashboard).not.toContain('score: 50');
    expect(dashboard).not.toContain('fitScore || 80');
  });

  // Guardrail 6: Public components contain no ManyPixels reference
  it('6. public components contain no ManyPixels reference', () => {
    const allPublic = [home, hero, adaptive, readings, careers, progress, story, trust, closingCta, footer, methodology, privacy, careerRoute, contentFile, mediaFile].join('\n');
    expect(allPublic.toLowerCase()).not.toContain('manypixels');
  });

  // Guardrail 7: Career Worlds renders 5 career rows and dynamic floating image card
  it('7. Career Worlds renders 5 career rows and dynamic floating image card', () => {
    const careerNames = EDITORIAL_MEDIA_ASSETS.careers.slice(0, 5).map((c) => c.name);
    expect(careerNames).toContain('Systems Architect');
    expect(careerNames).toContain('Product Strategist');
    expect(careerNames).toContain('UX Researcher');
    expect(careerNames).toContain('Data & Evidence Analyst');
    expect(careerNames).toContain('Technical Operations Lead');
    expect(careers).toContain('floatingCardRef');
    expect(careers).toContain('requestAnimationFrame');
  });

  // Guardrail 8: Methodology renders four native psychometric framework breakdowns
  it('8. Methodology renders four native psychometric framework breakdowns', () => {
    expect(methodology).toContain('Big Five');
    expect(methodology).toContain('RIASEC');
    expect(methodology).toContain('Work Values');
    expect(methodology).toContain('Deterministic Scoring');
  });

  // Guardrail 9: Public Trust provides verifiable pipeline stages without fake claims
  it('9. Trust page provides inspectable pipeline without unsupported claims', () => {
    expect(contentFile).toContain('Structured scoring');
    expect(contentFile).toContain('Deterministic');
  });

  // Guardrail 10: Public copy does not claim unsupported clinical or air-gapped promises
  it('10. public copy does not claim unsupported clinical or diagnostic certainty', () => {
    const allPublic = [home, hero, adaptive, readings, careers, progress, story, trust, methodology, privacy, contentFile].join('\n');
    expect(allPublic).not.toContain('fully air-gapped');
    expect(allPublic).not.toContain('98% scientifically accurate');
    expect(allPublic).not.toContain('clinical diagnosis');
    expect(allPublic).not.toContain('medical-grade');
  });

  // Guardrail 11: Privacy public page explains controls while linking to authenticated execution
  it('11. Privacy public page explains controls and links to account privacy', () => {
    expect(privacy).toContain('DATA OWNERSHIP LIFECYCLE');
    expect(privacy).toContain('/account/privacy');
  });

  // Guardrail 12: Inter Tight and Inter fonts imported in fonts.css
  it('12. Inter Tight and Inter fonts are loaded in fonts.css', () => {
    expect(fontsCss).toContain('@fontsource-variable/inter');
    expect(fontsCss).toContain('@fontsource/inter-tight');
  });

  // Guardrail 13: Designed Footer contains oversized wordmark moment
  it('13. Designed Footer contains oversized wordmark moment', () => {
    expect(EDITORIAL_CONTENT.footer.wordmarkPrimary).toBe('PERSONALITY');
    expect(EDITORIAL_CONTENT.footer.wordmarkSecondary).toBe('ASSESSOR');
  });

  // Guardrail 14: Tokens contain cool-gray canvas, pure white surface, true black ink, and controlled radii
  it('14. Design tokens match reference color palette and controlled radii', () => {
    expect(tokensCss).toContain('--ed-canvas: #F4F5F6');
    expect(tokensCss).toContain('--ed-surface: #FFFFFF');
    expect(tokensCss).toContain('--ed-ink: #0B0B0B');
    expect(tokensCss).toContain('--ed-radius-pill: 9999px');
  });

  // Guardrail 15: Reduced motion support is present in foundation CSS
  it('15. Reduced motion support is present in foundation CSS', () => {
    expect(foundationCss).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
