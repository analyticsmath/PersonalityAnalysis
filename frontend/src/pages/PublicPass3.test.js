import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8');
const app = read('../App.js');
const home = read('./PublicHomePage.jsx');
const narrative = read('../components/public/marketing/HomeNarrativeV3.jsx');
const chrome = read('../components/public/PublicChrome.jsx');
const motion = read('../components/public/PublicMotionRoot.jsx');
const homeCss = read('./PublicHomePage.css');
const siteCss = read('./PublicSite.css');
const content = read('../content/personalityMarketingDemo.js');

describe('Public rebuild visual contract', () => {
  it('keeps every required public route registered', () => {
    ['/', '/how-it-works', '/career-intelligence', '/progress', '/methodology', '/trust', '/privacy'].forEach((route) =>
      expect(app).toContain(`path="${route}"`)
    );
  });

  it('uses the exact Phase 3A home copy and no rejected headline treatment', () => {
    expect(narrative).toContain('Your work');
    expect(narrative).toContain('leaves evidence.');
    expect(narrative).toContain('Personality Assessor brings professional context and adaptive responses together');
    expect(narrative).toContain('Context changes the question.');
    expect(narrative).toContain('One profile. Four distinct readings.');
    expect(narrative).toContain('Direction needs reasons.');
    expect(narrative).toContain('Your next move becomes new evidence.');
    expect(chrome).toContain('Bring new');
    expect(chrome).toContain('Your profile can change when your work does.');
  });

  it('registers the v2 media system with required source families and no rejected factory assets', () => {
    expect(content).toContain('hero-h2');
    expect(content).toContain('world-w8');
    expect(content).toContain('career-c8');
    expect(content).toContain('progress-p6');
    expect(content).toContain('auth-signup');
    expect(content).not.toContain('RLDjPI-r5fU');
    expect(content).not.toContain('career-c5');
    expect(chrome).toContain('/media/personality-v2/');
  });

  it('retired the rejected public selectors and image IDs from active source', () => {
    const source = `${narrative}\n${home}\n${homeCss}\n${siteCss}`;
    expect(source).not.toMatch(/pv-hero|pv-worlds|pv-transform|\bpi-|pa-closing|pa-home-trust|pa-context-pro-01/i);
  });

  it('keeps public motion scoped, native, and reduced-motion safe', () => {
    expect(motion).toContain('gsap.context(');
    expect(motion).toContain('reducedMotion');
    expect(motion).not.toContain('ScrollSmoother');
  });

  it('keeps accessible controls and mobile menu Escape restoration', () => {
    expect(narrative).toContain('role="radiogroup"');
    expect(narrative).toContain('role="tablist"');
    expect(chrome).toContain("event.key === 'Escape'");
    expect(chrome).toContain('toggle.current?.focus()');
  });
});
