import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Phase 3C Production Redesign Contract Verification', () => {
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

  it('verifies all 8 ManyPixels editorial character illustrations exist in public/illustrations', () => {
    const illusManifestPath = resolve(process.cwd(), 'public/illustrations/illustrations-provenance.json');
    expect(existsSync(illusManifestPath)).toBe(true);

    const manifest = JSON.parse(readFileSync(illusManifestPath, 'utf8'));
    expect(manifest.assets).toHaveLength(8);

    const expectedSvgs = [
      'welcome-career-1.svg',
      'analytics-empty-analyst.svg',
      'profile-analysis.svg',
      'development-team-work.svg',
      'assessment-completed.svg',
      'research-science.svg',
      'ux-interface.svg',
      'report-analysis.svg',
    ];

    for (const svgName of expectedSvgs) {
      const svgPath = resolve(process.cwd(), `public/illustrations/${svgName}`);
      expect(existsSync(svgPath), `Missing ${svgName}`).toBe(true);
      const content = readFileSync(svgPath, 'utf8');
      expect(content).toContain('<svg');
      expect(content).toContain('</svg>');
    }
  });

  it('verifies Mona Sans 2 variable font files and OFL license are present', () => {
    const fontWoff2 = resolve(process.cwd(), 'public/fonts/MonaSansVF_wdth_wght_opsz_ital_.woff2');
    const oflLicense = resolve(process.cwd(), 'public/fonts/OFL.txt');

    expect(existsSync(fontWoff2)).toBe(true);
    expect(existsSync(oflLicense)).toBe(true);

    const oflContent = readFileSync(oflLicense, 'utf8');
    expect(oflContent).toContain('SIL OPEN FONT LICENSE Version 1.1');
  });

  it('verifies color tokens in foundation.css match exact Phase 3C Mineral Editorial specification', () => {
    const foundationCss = readFileSync(resolve(process.cwd(), 'src/styles/foundation.css'), 'utf8');
    expect(foundationCss).toContain('--pa-canvas: #F6F8F7');
    expect(foundationCss).toContain('--pa-paper: #FFFFFF');
    expect(foundationCss).toContain('--pa-ink: #101313');
    expect(foundationCss).toContain('--pa-ink-dense: #2B3230');
    expect(foundationCss).toContain('--pa-text-secondary: #596360');
    expect(foundationCss).toContain('--pa-mist: #DDE3E1');
    expect(foundationCss).toContain('--pa-field: #EEF2F0');
    expect(foundationCss).toContain('--pa-dark: #101615');
    expect(foundationCss).toContain('--pa-dark-text: #F6F8F7');
    expect(foundationCss).toContain('--pa-dark-muted: #BBC4C1');
    expect(foundationCss).toContain('--pa-info: #315E8A');
    expect(foundationCss).toContain('--pa-success: #1E6B50');
    expect(foundationCss).toContain('--pa-warning: #9A630F');
    expect(foundationCss).toContain('--pa-error: #A33A45');
    expect(foundationCss).toContain('--pa-focus: #285FD0');
  });

  it('verifies Phase 3C Homepage scenes in HomeNarrativeV3 comply with all negative and positive controls', () => {
    const narrative = readFileSync(resolve(process.cwd(), 'src/components/public/marketing/HomeNarrativeV3.jsx'), 'utf8');

    // 1. Scene 1: 2-actor hero
    expect(narrative).toContain('evidence-hero-field');
    expect(narrative).toContain('hero-actor-plane--dominant');
    expect(narrative).toContain('hero-actor-plane--supporting');
    expect(narrative).toContain('Your work');
    expect(narrative).toContain('leaves evidence.');

    // Negative control: No 5-actor constellation or eyebrow pill
    expect(narrative).not.toContain('evidence-hero-constellation');

    // 2. Scene 2: Work Worlds Theatre (6 worlds, Build = 34804003, no decorative World 01 numbers)
    expect(narrative).toContain('work-worlds-theatre-scene');
    expect(narrative).toContain('Different work. Same signal.');
    expect(narrative).not.toContain('World 0');

    // 3. Scene 4: Persistent Context -> Question -> Signal Artifact
    expect(narrative).toContain('context-question-signal-scene');
    expect(narrative).toContain('cqs-persistent-artifact');
    expect(narrative).toContain('Demonstrated Signal:');

    // 4. Scene 5: Living Multidimensional Profile
    expect(narrative).toContain('living-profile-scene');
    expect(narrative).toContain('One profile. Four distinct readings.');

    // 5. Scene 6: Evidence & Confidence Open Field
    expect(narrative).toContain('evidence-inspection-scene');
    expect(narrative).toContain('See what shaped the interpretation.');

    // 6. Scene 7: Career Relationships Master-Detail
    expect(narrative).toContain('career-relationships-scene');
    expect(narrative).toContain('Direction needs reasons.');

    // 7. Scene 8: Continuous Development Loop
    expect(narrative).toContain('development-loop-scene');
    expect(narrative).toContain('Your next move becomes new evidence.');

    // 8. Scene 9: Trust & Boundaries
    expect(narrative).toContain('trust-boundaries-scene');
  });
});
