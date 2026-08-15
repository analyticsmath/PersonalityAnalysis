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

  it('uses the exact Phase 3C home copy and no rejected headline treatment', () => {
    expect(narrative).toContain('Your work');
    expect(narrative).toContain('leaves evidence.');
    expect(narrative).toContain('Professional context and adaptive responses become independent readings');
    expect(narrative).toContain('Context changes the question.');
    expect(narrative).toContain('One profile. Four distinct readings.');
    expect(narrative).toContain('Direction needs reasons.');
    expect(narrative).toContain('Your next move becomes new evidence.');
    expect(chrome).toContain('Bring new');
    expect(chrome).toContain('Your profile can change when your work does.');
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
    expect(chrome).toContain('/media/personality-v3/');
  });

  it('retired the rejected public selectors and image IDs from active source', () => {
    const source = `${narrative}\n${home}\n${homeCss}\n${siteCss}`;
    expect(source).not.toMatch(/pv-hero|pv-worlds|pv-transform|\bpi-|pa-closing|pa-home-trust|pa-context-pro-01/i);
  });

  it('keeps public motion scoped, ScrollSmoother integrated for desktop, and reduced-motion safe', () => {
    expect(motion).toContain('gsap.context(');
    expect(motion).toContain('reducedMotion');
    expect(motion).toContain('ScrollSmoother');
  });

  it('keeps accessible controls and mobile menu Escape restoration', () => {
    expect(narrative).toContain('role="radiogroup"');
    expect(narrative).toContain('role="tablist"');
    expect(chrome).toContain("event.key === 'Escape'");
    expect(chrome).toContain('toggle.current?.focus()');
  });
});
