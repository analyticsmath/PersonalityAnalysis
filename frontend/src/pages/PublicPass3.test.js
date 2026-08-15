import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8');
const app = read('../App.js');
const hero = read('../components/public/imprint/EvidenceHero.jsx');
const worlds = read('../components/public/imprint/WorkWorldsExperience.jsx');
const eqs = read('../components/public/imprint/EvidenceQuestionTransform.jsx');
const profile = read('../components/public/imprint/ProfileInstrumentField.jsx');
const career = read('../components/public/imprint/CareerRelationshipField.jsx');
const devLoop = read('../components/public/imprint/DevelopmentReturnLoop.jsx');
const trust = read('../components/public/imprint/TrustCutaway.jsx');
const media = read('../content/personalityImprintMedia.js');

describe('Phase 4 Public Rebuild visual contract', () => {
  it('keeps every required public route registered', () => {
    ['/', '/how-it-works', '/career-intelligence', '/progress', '/methodology', '/trust', '/privacy'].forEach((route) =>
      expect(app).toContain(`path="${route}"`)
    );
  });

  it('uses the exact Phase 4 home copy and no rejected headline treatment', () => {
    expect(hero).toContain('Your work');
    expect(hero).toContain('leaves evidence.');
    expect(hero).toContain('See how professional context becomes questions, readings and career direction you can inspect.');
    expect(worlds).toContain('Work changes the evidence.');
    expect(eqs).toContain('Context changes the question.');
    expect(profile).toContain('Four readings. Kept separate.');
    expect(career).toContain('A fit score should explain itself.');
    expect(devLoop).toContain('New work changes the profile.');
    expect(trust).toContain('See what shaped the result.');
  });

  it('registers the imprint media system with locked Pexels 34804003 build asset and no rejected assets', () => {
    expect(media).toContain('34804003');
    expect(media).toContain('build');
    expect(media).toContain('make');
    expect(media).toContain('shape');
    expect(media).toContain('structure');
    expect(media).toContain('collaborate');
    // Ensure rejected 7988086 is never used
    expect(media).not.toContain('7988086');
    expect(media).toContain('/media/personality-imprint/');
  });

  it('keeps accessible controls and radiogroup attributes', () => {
    expect(eqs).toContain('role="radiogroup"');
  });
});
