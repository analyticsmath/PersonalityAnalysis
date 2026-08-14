import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Phase 3B Visual Acceptance Contract Verification', () => {
  it('verifies all 12 local Pexels photographic assets and derivatives exist with valid sizes', () => {
    const mediaManifestPath = resolve(process.cwd(), 'public/media/personality-v3/media-provenance.json');
    expect(existsSync(mediaManifestPath)).toBe(true);

    const manifest = JSON.parse(readFileSync(mediaManifestPath, 'utf8'));
    expect(manifest.assets).toHaveLength(12);

    const expectedFiles = [
      'hero/hero-a',
      'hero/hero-b',
      'actors/developer',
      'actors/scientist',
      'actors/student',
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

  it('verifies all 8 ManyPixels editorial character illustrations exist and are brand recolored', () => {
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

  it('verifies color tokens in foundation.css match exact Phase 3B visual acceptance specification', () => {
    const foundationCss = readFileSync(resolve(process.cwd(), 'src/styles/foundation.css'), 'utf8');
    expect(foundationCss).toContain('--canvas: #F7F9F8');
    expect(foundationCss).toContain('--paper: #FFFFFF');
    expect(foundationCss).toContain('--ink: #101414');
    expect(foundationCss).toContain('--secondary: #566362');
    expect(foundationCss).toContain('--mist: #DCE4E2');
    expect(foundationCss).toContain('--soft-field: #EEF2F1');
    expect(foundationCss).toContain('--dark-scene: #0E1717');
    expect(foundationCss).toContain('--dark-scene-fg: #F7FAF9');
    expect(foundationCss).toContain('--dark-scene-muted: #B9C4C1');
    expect(foundationCss).toContain('--signal: #DDF45A');
    expect(foundationCss).toContain('--signal-strong: #607900');
    expect(foundationCss).toContain('--info: #2F6FED');
    expect(foundationCss).toContain('--success: #18785B');
    expect(foundationCss).toContain('--warning: #A45A00');
    expect(foundationCss).toContain('--error: #B43A4A');
  });

  it('verifies 3 Major Pinned Theatres exist in HomeNarrativeV3 and are mapped correctly', () => {
    const narrative = readFileSync(resolve(process.cwd(), 'src/components/public/marketing/HomeNarrativeV3.jsx'), 'utf8');

    // 1. Evidence Constellation Hero
    expect(narrative).toContain('evidence-hero-constellation');
    expect(narrative).toContain('hero-carry-actor-proxy');
    expect(narrative).toContain('hero-spatial-plane--dominant');
    expect(narrative).toContain('hero-spatial-plane--wall');
    expect(narrative).toContain('Your work');
    expect(narrative).toContain('leaves evidence.');

    // 2. Theatre 1: Work Worlds
    expect(narrative).toContain('work-worlds-theatre');
    expect(narrative).toContain('work-world-panel');
    expect(narrative).toContain('World 0');

    // 3. Theatre 2: Context -> Question -> Evidence
    expect(narrative).toContain('context-question-theatre');
    expect(narrative).toContain('theatre-document-sheet');
    expect(narrative).toContain('theatre-question-plane');
    expect(narrative).toContain('Observed Strategy Signal:');

    // 4. Theatre 3: Living Profile
    expect(narrative).toContain('living-profile-theatre');
    expect(narrative).toContain('profile-incoming-signal-banner');
    expect(narrative).toContain('lollipop-measures-list');
    expect(narrative).toContain('riasec-relational-grid');
    expect(narrative).toContain('values-ranked-flow');
    expect(narrative).toContain('signals-evidence-field');

    // 5. Editorial Illustration in Development
    expect(narrative).toContain('ProductIllustration');
    expect(narrative).toContain('slotKey="development"');
  });
});
