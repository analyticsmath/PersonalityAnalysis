import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Phase 4 Production Corrective Contract Verification', () => {
  it('verifies all 13 local Pexels photographic assets (including locked build 34804003) and derivatives exist', () => {
    const mediaManifestPath = resolve(process.cwd(), 'public/media/personality-v3/media-provenance.json');
    expect(existsSync(mediaManifestPath)).toBe(true);

    const manifest = JSON.parse(readFileSync(mediaManifestPath, 'utf8'));
    expect(manifest.assets.length).toBeGreaterThanOrEqual(12);

    const expectedFiles = [
      'hero/hero-a',
      'hero/hero-b',
      'actors/developer',
      'actors/scientist',
      'actors/student',
      'worlds/build',
      'worlds/make',
      'worlds/shape',
      'worlds/structure',
      'worlds/collaborate',
      'editorial/student-group',
      'editorial/process',
      'editorial/science-detail',
    ];

    for (const fileKey of expectedFiles) {
      const jpg1440 = resolve(process.cwd(), `public/media/personality-v3/${fileKey}-1440.jpg`);
      const avif1440 = resolve(process.cwd(), `public/media/personality-v3/${fileKey}-1440.avif`);
      const webp1440 = resolve(process.cwd(), `public/media/personality-v3/${fileKey}-1440.webp`);

      expect(existsSync(jpg1440), `Missing ${fileKey}-1440.jpg`).toBe(true);
      expect(existsSync(avif1440), `Missing ${fileKey}-1440.avif`).toBe(true);
      expect(existsSync(webp1440), `Missing ${fileKey}-1440.webp`).toBe(true);
    }
  });

  it('verifies Source Sans 3 and Source Serif 4 variable font packages are imported', () => {
    const fontsCss = readFileSync(resolve(process.cwd(), 'src/styles/fonts.css'), 'utf8');
    expect(fontsCss).toContain('@fontsource-variable/source-sans-3');
    expect(fontsCss).toContain('@fontsource-variable/source-serif-4');
  });

  it('verifies color tokens in foundation.css match exact Phase 4 Neutral Gallery specification', () => {
    const foundationCss = readFileSync(resolve(process.cwd(), 'src/styles/foundation.css'), 'utf8');
    expect(foundationCss).toContain('--pa-bg: #FFFFFF');
    expect(foundationCss).toContain('--pa-bg-soft: #F4F5F6');
    expect(foundationCss).toContain('--pa-surface: #ECEFF1');
    expect(foundationCss).toContain('--pa-ink: #0B0B0B');
    expect(foundationCss).toContain('--pa-ink-2: #171717');
    expect(foundationCss).toContain('--pa-text: #4F5358');
    expect(foundationCss).toContain('--pa-muted: #767B81');
    expect(foundationCss).toContain('--pa-rule: #D9DDE1');
    expect(foundationCss).toContain('--pa-dark: #0B0B0B');
    expect(foundationCss).toContain('--pa-dark-text: #F7F7F5');
    expect(foundationCss).toContain('--pa-dark-muted: #B7BBC0');
    expect(foundationCss).toContain('--pa-info: #2F5D91');
    expect(foundationCss).toContain('--pa-success: #15704E');
    expect(foundationCss).toContain('--pa-warning: #94610C');
    expect(foundationCss).toContain('--pa-error: #A33A45');
    expect(foundationCss).toContain('--pa-focus: #245BD6');
  });

  it('verifies Phase 4 Corrective contract rules: no fake scores, no prohibited class patterns, honest data fallbacks', () => {
    const hero = readFileSync(resolve(process.cwd(), 'src/components/public/v4/EvidenceHero.jsx'), 'utf8');
    const worlds = readFileSync(resolve(process.cwd(), 'src/components/public/v4/WorkWorldsTheatre.jsx'), 'utf8');
    const eqs = readFileSync(resolve(process.cwd(), 'src/components/public/v4/EvidenceQuestionSignal.jsx'), 'utf8');
    const profile = readFileSync(resolve(process.cwd(), 'src/components/public/v4/LivingProfileField.jsx'), 'utf8');
    const career = readFileSync(resolve(process.cwd(), 'src/components/public/v4/CareerRelationshipScene.jsx'), 'utf8');
    const devLoop = readFileSync(resolve(process.cwd(), 'src/components/public/v4/DevelopmentEvidenceLoop.jsx'), 'utf8');
    const trust = readFileSync(resolve(process.cwd(), 'src/components/public/v4/TrustResolution.jsx'), 'utf8');
    const chrome = readFileSync(resolve(process.cwd(), 'src/components/public/PublicChrome.jsx'), 'utf8');
    const motion = readFileSync(resolve(process.cwd(), 'src/components/public/PublicMotionRoot.jsx'), 'utf8');
    const marketing = readFileSync(resolve(process.cwd(), 'src/pages/PublicMarketingPage.jsx'), 'utf8');
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
    expect(career).not.toContain('Methodology Boundary:');

    // 6. Development loop contains no 01-05 numbered steps
    expect(devLoop).not.toContain('01');
    expect(devLoop).not.toContain('05');

    // 7. Trust resolution contains single provenance flow, no pipeline cards
    expect(trust).toContain('trust-provenance-flow');
    expect(trust).not.toContain('trust-pipeline-node');

    // 8. Methodology route does not render .methodology-atlas-card or Framework #
    expect(marketing).not.toContain('methodology-atlas-card');
    expect(marketing).not.toContain('Framework #');

    // 9. Public header does not use window.scrollY > 120 as hero release logic
    expect(chrome).not.toContain('window.scrollY > 120');

    // 10. Global PublicMotionRoot does not instantiate ScrollSmoother
    expect(motion).not.toContain('ScrollSmoother.create');

    // 11. Dashboard presentation does not fall back missing trait to 50 or career fit to 80
    expect(dashboard).not.toContain('?? 50');
    expect(dashboard).not.toContain('|| 80');
    expect(dashboard).toContain('toFiniteNumberOrNull');
  });
});
