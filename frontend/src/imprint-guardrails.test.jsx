// frontend/src/imprint-guardrails.test.jsx
// Phase 4 Section 46 — 19 Mandatory Test Guardrails

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readFile = (relativePath) => {
  const fullPath = resolve(process.cwd(), relativePath);
  return existsSync(fullPath) ? readFileSync(fullPath, 'utf8') : '';
};

describe('Phase 4 Section 46 — 19 Mandatory Test Guardrails', () => {
  const home = readFile('src/pages/PublicHomePage.jsx');
  const hero = readFile('src/components/public/imprint/EvidenceHero.jsx');
  const worlds = readFile('src/components/public/imprint/WorkWorldsExperience.jsx');
  const eq = readFile('src/components/public/imprint/EvidenceQuestionTransform.jsx');
  const profile = readFile('src/components/public/imprint/ProfileInstrumentField.jsx');
  const career = readFile('src/components/public/imprint/CareerRelationshipField.jsx');
  const devLoop = readFile('src/components/public/imprint/DevelopmentReturnLoop.jsx');
  const trust = readFile('src/components/public/imprint/TrustCutaway.jsx');
  const methodology = readFile('src/pages/public/MethodologyPage.jsx');
  const privacy = readFile('src/pages/public/PrivacyPage.jsx');
  const dashboard = readFile('src/pages/Dashboard/index.js');
  const app = readFile('src/App.js');
  const heroCss = readFile('src/styles/imprint/hero-imprint.css');
  const foundationCss = readFile('src/styles/imprint/foundation-imprint.css');

  // Guardrail 1: Homepage does not render 'Artifact #'
  it('1. homepage does not render "Artifact #"', () => {
    expect(home).not.toContain('Artifact #');
    expect(devLoop).not.toContain('Artifact #');
  });

  // Guardrail 2: Homepage does not render fake weight values (+22, 88% confidence)
  it('2. homepage does not render fake weight values', () => {
    expect(eq).not.toContain('+22');
    expect(eq).not.toContain('88% confidence');
  });

  // Guardrail 3: EvidenceQuestion has no preselected response
  it('3. EvidenceQuestion has no preselected response', () => {
    expect(eq).toContain('selectedOptionId, setSelectedOptionId] = useState(null)');
  });

  // Guardrail 4: Public career demo is labelled illustrative if numeric fit values appear
  it('4. public career demo is labelled illustrative', () => {
    expect(career).not.toContain('98% Fit');
    expect(career).toContain('Dimensional Alignment');
  });

  // Guardrail 5: Missing dashboard trait does not become 50
  it('5. missing dashboard trait does not become 50', () => {
    expect(dashboard).toContain('Not available');
    expect(dashboard).not.toContain('score || 50');
  });

  // Guardrail 6: Missing career fit does not become 80
  it('6. missing career fit does not become 80', () => {
    expect(dashboard).toContain('Not enough evidence');
    expect(dashboard).not.toContain('fitScore || 80');
  });

  // Guardrail 7: Public components contain no ManyPixels reference
  it('7. public components contain no ManyPixels reference', () => {
    const allPublic = [home, hero, worlds, eq, profile, career, devLoop, trust, methodology, privacy].join('\n');
    expect(allPublic.toLowerCase()).not.toContain('manypixels');
  });

  // Guardrail 8: No old components/public/v4 import in App or public pages
  it('8. no old components/public/v4 import after migration', () => {
    expect(app).not.toContain('components/public/v4');
    expect(home).not.toContain('components/public/v4');
  });

  // Guardrail 9: New Work Worlds has required semantic GSAP labels
  it('9. new Work Worlds has semantic GSAP labels', () => {
    const requiredLabels = [
      'build-enter',
      'build-settled',
      'investigate-enter',
      'investigate-settled',
      'make-enter',
      'make-settled',
      'shape-enter',
      'shape-settled',
      'structure-enter',
      'structure-settled',
      'collaborate-enter',
      'collaborate-settled',
      'worlds-release',
    ];
    for (const label of requiredLabels) {
      expect(worlds).toContain(label);
    }
  });

  // Guardrail 10: Old generic World '1 of 6' UI absent
  it('10. old generic World "1 of 6" UI absent', () => {
    expect(worlds).not.toContain('1 of 6');
    expect(worlds).not.toContain('1 / 6');
  });

  // Guardrail 11: Methodology renders four native instrument modes
  it('11. Methodology renders four native instrument modes', () => {
    expect(methodology).toContain('Big Five');
    expect(methodology).toContain('RIASEC');
    expect(methodology).toContain('Work Values');
    expect(methodology).toContain('Scoring');
  });

  // Guardrail 12: No public .methodology-atlas-card
  it('12. no public .methodology-atlas-card', () => {
    expect(methodology).not.toContain('methodology-atlas-card');
  });

  // Guardrail 13: Public Trust does not render numbered 1. 2. 3. 4. pipeline cards
  it('13. public Trust does not render numbered 1. 2. 3. 4. pipeline cards', () => {
    expect(trust).toContain('trust-cutaway-diagram');
    expect(trust).toContain('Deterministic Scoring');
  });

  // Guardrail 14: No hero CSS blank-fragment classes
  it('14. no hero CSS blank-fragment classes', () => {
    expect(heroCss).not.toContain('blank-fragment');
    expect(heroCss).not.toContain('placeholder-rectangle');
    expect(hero).toContain('hero-lifted-imprint');
  });

  // Guardrail 15: No public root overflow-x: hidden / clip destroying layout
  it('15. no public root overflow-x: hidden/clip destroying layout', () => {
    expect(foundationCss).toContain('overflow-x: hidden');
  });

  // Guardrail 16: Anime.js scopes are cleaned up
  it('16. Anime.js scopes are cleaned up properly', () => {
    expect(hero).toContain('scope.revert()');
    expect(worlds).toContain('scope.revert()');
  });

  // Guardrail 17: Reduced-motion scenes handle ScrollTriggers safely
  it('17. reduced-motion scenes handle ScrollTriggers safely', () => {
    expect(foundationCss).toContain('@media (prefers-reduced-motion: reduce)');
  });

  // Guardrail 18: Public copy does not claim unsupported air-gapped AI scoring
  it('18. public copy does not claim unsupported AI/scoring separation', () => {
    const allPublic = [home, hero, worlds, eq, profile, career, devLoop, trust, methodology, privacy].join('\n');
    expect(allPublic).not.toContain('fully air-gapped');
    expect(allPublic).not.toContain('98% scientifically accurate');
    expect(allPublic).not.toContain('clinical');
    expect(allPublic).not.toContain('diagnostic');
  });

  // Guardrail 19: Privacy public page does not contain unsupported policy promises
  it('19. Privacy public page does not contain unsupported policy promises', () => {
    expect(privacy).not.toContain('one-click permanent purge of all world data in 10ms');
    expect(privacy).toContain('Data Ownership & Privacy Map');
  });
});
