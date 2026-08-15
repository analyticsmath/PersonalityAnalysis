import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8');
const app = read('../App.js');
const hero = read('../components/public/v4/EvidenceHero.jsx');

const worlds = read('../components/public/v4/WorkWorldsTheatre.jsx');
const eqs = read('../components/public/v4/EvidenceQuestionSignal.jsx');
const profile = read('../components/public/v4/LivingProfileField.jsx');
const career = read('../components/public/v4/CareerRelationshipScene.jsx');
const devLoop = read('../components/public/v4/DevelopmentEvidenceLoop.jsx');
const trust = read('../components/public/v4/TrustResolution.jsx');
const chrome = read('../components/public/PublicChrome.jsx');
const motion = read('../components/public/PublicMotionRoot.jsx');
const content = read('../content/personalityMarketingDemo.js');

describe('Phase 4 Public Rebuild visual contract', () => {
  it('keeps every required public route registered', () => {
    ['/', '/how-it-works', '/career-intelligence', '/progress', '/methodology', '/trust', '/privacy'].forEach((route) =>
      expect(app).toContain(`path="${route}"`)
    );
  });

  it('uses the exact Phase 4 home copy and no rejected headline treatment', () => {
    expect(hero).toContain('Your work');
    expect(hero).toContain('leaves evidence.');
    expect(hero).toContain('Professional context becomes adaptive questions, distinct profile readings and career direction you can inspect.');
    expect(worlds).toContain('Work changes the evidence.');
    expect(eqs).toContain('Context changes the question.');
    expect(profile).toContain('Four readings. Kept separate.');
    expect(career).toContain('A fit score should explain itself.');
    expect(devLoop).toContain('New work changes the profile.');
    expect(trust).toContain('See what shaped the result.');
    expect(chrome).toContain('Build a profile');
    expect(chrome).toContain('Your work changes. Your evidence can change with it.');
  });

  it('registers the v3 media system with locked Pexels 34804003 build asset and no rejected assets', () => {
    expect(content).toContain('34804003');
    expect(content).toContain('build');
    expect(content).toContain('make');
    expect(content).toContain('shape');
    expect(content).toContain('structure');
    expect(content).toContain('collaborate');
    // Ensure rejected 7988086 is never used
    expect(content).not.toContain('7988086');
    expect(content).toContain('/media/personality-v3/');
  });


  it('uses native scrolling with GSAP ScrollTrigger and reduced-motion safety', () => {
    expect(motion).toContain('reducedMotion');
    expect(motion).toContain('scrollTo');
    expect(motion).toContain('ScrollTrigger');
  });

  it('keeps accessible controls and mobile menu Escape restoration', () => {
    expect(eqs).toContain('role="radiogroup"');
    expect(profile).toContain('role="tablist"');
    expect(chrome).toContain("event.key === 'Escape'");
    expect(chrome).toContain('toggle.current?.focus()');
  });
});
