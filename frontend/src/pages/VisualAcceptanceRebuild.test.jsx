import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Phase 4 Production Corrective Contract Verification', () => {
  it('verifies all local photographic assets and derivatives exist', () => {
    const heroDominant = resolve(process.cwd(), 'public/media/personality-imprint/hero/hero-dominant-1440.webp');
    const blueprintLift = resolve(process.cwd(), 'public/media/personality-imprint/fragments/blueprint-lift-640.webp');
    const worldBuild = resolve(process.cwd(), 'public/media/personality-imprint/worlds/world-build-1440.webp');

    expect(existsSync(heroDominant), 'Missing hero-dominant-1440.webp').toBe(true);
    expect(existsSync(blueprintLift), 'Missing blueprint-lift-640.webp').toBe(true);
    expect(existsSync(worldBuild), 'Missing world-build-1440.webp').toBe(true);
  });

  it('verifies Source Sans 3 and Source Serif 4 variable font packages are imported', () => {
    const fontsCss = readFileSync(resolve(process.cwd(), 'src/styles/fonts.css'), 'utf8');
    expect(fontsCss).toContain('@fontsource-variable/source-sans-3');
    expect(fontsCss).toContain('@fontsource-variable/source-serif-4');
  });

  it('verifies color tokens in foundation-imprint.css match exact Phase 4 Neutral specification', () => {
    const foundationCss = readFileSync(resolve(process.cwd(), 'src/styles/imprint/foundation-imprint.css'), 'utf8');
    expect(foundationCss).toContain('--pa-white: #FFFFFF');
    expect(foundationCss).toContain('--pa-soft: #F4F5F6');
    expect(foundationCss).toContain('--pa-ink: #0B0B0B');
    expect(foundationCss).toContain('--pa-ink-2: #171717');
    expect(foundationCss).toContain('--pa-text: #4F5358');
    expect(foundationCss).toContain('--pa-muted: #767B81');
    expect(foundationCss).toContain('--pa-rule: #D9DDE1');
  });

  it('verifies Phase 4 Corrective contract rules: no fake scores, no prohibited class patterns, honest data fallbacks', () => {
    const hero = readFileSync(resolve(process.cwd(), 'src/components/public/imprint/EvidenceHero.jsx'), 'utf8');
    const worlds = readFileSync(resolve(process.cwd(), 'src/components/public/imprint/WorkWorldsExperience.jsx'), 'utf8');
    const eqs = readFileSync(resolve(process.cwd(), 'src/components/public/imprint/EvidenceQuestionTransform.jsx'), 'utf8');
    const profile = readFileSync(resolve(process.cwd(), 'src/components/public/imprint/ProfileInstrumentField.jsx'), 'utf8');
    const career = readFileSync(resolve(process.cwd(), 'src/components/public/imprint/CareerRelationshipField.jsx'), 'utf8');
    const devLoop = readFileSync(resolve(process.cwd(), 'src/components/public/imprint/DevelopmentReturnLoop.jsx'), 'utf8');
    const trust = readFileSync(resolve(process.cwd(), 'src/components/public/imprint/TrustCutaway.jsx'), 'utf8');
    const dashboard = readFileSync(resolve(process.cwd(), 'src/pages/Dashboard/index.js'), 'utf8');

    // 1. Hero contains no 88/100, Artifact #, or fake signal score
    expect(hero).not.toContain('88/100');
    expect(hero).not.toContain('Artifact #');
    expect(hero).not.toContain('Signal:');

    // 2. Context demo starts with zero selected radio choices and contains no fabricated weights/records
    expect(eqs).toContain('useState(null)');
    expect(eqs).not.toContain('Reliability Weight');
    expect(eqs).not.toContain('Agility Weight');
    expect(eqs).not.toContain('Governance Weight');
    expect(eqs).not.toContain('Verified Background Record #');

    // 3. Work Worlds contains semantic settled labels and no pills / World: tag
    expect(worlds).toContain('-settled');
    expect(worlds).not.toContain('world-nav-pill');
    expect(worlds).not.toContain('World:');

    // 4. Living Profile contains no value cells
    expect(profile).not.toContain('profile-value-cell');

    // 5. Career scene contains no badges
    expect(career).not.toContain('career-active-badge');

    // 6. Development loop has no placeholder step card
    expect(devLoop).not.toContain('dev-loop-card');

    // 7. Trust cutaway contains no fake completeness bars
    expect(trust).not.toContain('completeness-bar');

    // 8. Dashboard does not fabricate fallbacks
    expect(dashboard).not.toContain('score: 50');
    expect(dashboard).not.toContain('match: 80');
  });
});
