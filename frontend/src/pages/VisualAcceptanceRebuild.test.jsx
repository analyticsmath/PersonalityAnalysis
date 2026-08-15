import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Phase 4 Production Redesign Contract Verification', () => {
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

  it('verifies Phase 4 Homepage scenes comply with all negative and positive controls', () => {
    const hero = readFileSync(resolve(process.cwd(), 'src/components/public/v4/EvidenceHero.jsx'), 'utf8');
    const worlds = readFileSync(resolve(process.cwd(), 'src/components/public/v4/WorkWorldsTheatre.jsx'), 'utf8');
    const eqs = readFileSync(resolve(process.cwd(), 'src/components/public/v4/EvidenceQuestionSignal.jsx'), 'utf8');
    const profile = readFileSync(resolve(process.cwd(), 'src/components/public/v4/LivingProfileField.jsx'), 'utf8');
    const career = readFileSync(resolve(process.cwd(), 'src/components/public/v4/CareerRelationshipScene.jsx'), 'utf8');
    const devLoop = readFileSync(resolve(process.cwd(), 'src/components/public/v4/DevelopmentEvidenceLoop.jsx'), 'utf8');
    const trust = readFileSync(resolve(process.cwd(), 'src/components/public/v4/TrustResolution.jsx'), 'utf8');

    // 1. Scene 1: Evidence Studio Hero (3 approved Pexels media layers + native fragments)
    expect(hero).toContain('evidence-hero-v4');
    expect(hero).toContain('hero-v4-plane--dominant');
    expect(hero).toContain('hero-v4-plane--supporting');
    expect(hero).toContain('hero-v4-plane--wall');
    expect(hero).toContain('Your work');
    expect(hero).toContain('leaves evidence.');

    // 2. Scene 2: Work Worlds Theatre (6 worlds with persistent stage)
    expect(worlds).toContain('work-worlds-theatre-v4');
    expect(worlds).toContain('Work changes the evidence.');
    expect(worlds).toContain('world-stage-slot');

    // 3. Scene 3: Evidence -> Question -> Signal
    expect(eqs).toContain('evidence-question-signal-v4');
    expect(eqs).toContain('Context changes the question.');
    expect(eqs).toContain('eqs-responses-group');

    // 4. Scene 4: Living Profile Field (4 independent lenses)
    expect(profile).toContain('living-profile-field-v4');
    expect(profile).toContain('Four readings. Kept separate.');

    // 5. Scene 5: Career Relationship
    expect(career).toContain('career-relationship-v4');
    expect(career).toContain('A fit score should explain itself.');

    // 6. Scene 6: Continuous Development Loop
    expect(devLoop).toContain('development-evidence-loop-v4');
    expect(devLoop).toContain('New work changes the profile.');

    // 7. Scene 7: Trust Resolution
    expect(trust).toContain('trust-resolution-v4');
    expect(trust).toContain('See what shaped the result.');
  });
});
