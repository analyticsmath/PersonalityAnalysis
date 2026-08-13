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
    ['/', '/how-it-works', '/career-intelligence', '/progress', '/methodology', '/trust', '/privacy'].forEach((route) => expect(app).toContain(`path="${route}"`));
  });
  it('uses the exact home copy and no rejected headline treatment', () => {
    expect(narrative).toContain('Your work leaves clues.');
    expect(narrative).toContain('Start with the work you already do. Personality Assessor uses professional context');
    expect(narrative).toContain('Work changes what matters.');
    expect(narrative).toContain('One profile. Four ways to read it.');
    expect(narrative).not.toMatch(/eyebrow|REAL CONTEXT|faded|highlighted/i);
  });
  it('registers the v2 media system with all required source families', () => {
    expect(content).toContain('hero-h1');
    expect(content).toContain('world-w10');
    expect(content).toContain('career-c8');
    expect(content).toContain('progress-p6');
    expect(content).toContain('auth-signup');
    expect(chrome).toContain('/media/personality-v2/');
  });
  it('retired the rejected public selectors and image IDs from active source', () => {
    const source = `${narrative}\n${home}\n${homeCss}\n${siteCss}`;
    expect(source).not.toMatch(/pv-hero|pv-worlds|pv-transform|pv-lenses|\bpi-|pa-closing|pa-home-trust|pa-context-pro-01|pa-work-01-analysis-plans/i);
  });
  it('keeps public motion scoped and reduced-motion safe', () => {
    expect(motion).toContain('gsap.context(');
    expect(motion).toContain('smooth: 0.85');
    expect(motion).toContain('if (reducedMotion)');
    expect(motion).not.toContain('ScrollTrigger.getAll()');
  });
  it('keeps accessible controls and mobile menu Escape restoration', () => {
    expect(narrative).toContain('aria-pressed={answered === answer}');
    expect(narrative).toContain('aria-selected={tab === key}');
    expect(chrome).toContain("event.key === 'Escape'");
    expect(chrome).toContain('toggle.current?.focus()');
  });
});
