import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8');
const app = read('../App.js');
const home = read('./PublicHomePage.jsx');
const homeNarrative = read('../components/public/marketing/HomeNarrativeV3.jsx');
const publicChrome = read('../components/public/PublicChrome.jsx');
const motionRoot = read('../components/public/PublicMotionRoot.jsx');
const publicCss = read('./PublicSite.css');
const homeCss = read('./PublicHomePage.css');

describe('Pass 3 public surface contracts', () => {
  it('keeps every public marketing route registered', () => {
    ['/', '/how-it-works', '/career-intelligence', '/progress', '/methodology', '/trust', '/privacy'].forEach((route) => expect(app).toContain(`path="${route}"`));
  });

  it('retires the rejected public font, identity colors, and context architecture', () => {
    const publicSources = `${publicCss}\n${homeCss}\n${homeNarrative}`;
    expect(publicSources).not.toMatch(/Source Serif|Source Sans|#F0E84A|pa2-|290svh/i);
  });

  it('keeps CTA foreground explicit and uses eager priority only through the responsive image contract', () => {
    expect(publicCss).toContain('.pa-public .pa-button--primary{color:#fff}');
    expect(publicChrome).toContain("loading={priority ? 'eager' : 'lazy'}");
    expect(homeNarrative).toContain('priority sizes="(min-width: 1280px) 68vw, 100vw"');
  });

  it('preserves accessible interactive states and mobile menu Escape restoration', () => {
    expect(homeNarrative).toContain('aria-pressed={lens === key}');
    expect(homeNarrative).toContain('aria-pressed={item.name === career.name}');
    expect(publicChrome).toContain("event.key === 'Escape'");
    expect(publicChrome).toContain('toggle.current?.focus()');
  });

  it('limits ScrollSmoother to the desktop fine-pointer homepage and avoids global trigger cleanup', () => {
    expect(motionRoot).toContain("location.pathname === '/'");
    expect(motionRoot).toContain("(min-width: 1024px) and (pointer: fine)");
    expect(motionRoot).toContain('!reducedMotion');
    expect(motionRoot).not.toContain('ScrollTrigger.getAll()');
  });

  it('uses one ContextTrace actor and an opaque pinned stage for the controlled handoff', () => {
    expect(homeNarrative).toContain('function ContextTrace');
    expect(homeNarrative).not.toContain('EvidencePieces');
    expect(homeCss).toContain('.pv-context-stage__pin{z-index:2;background:var(--pa-white)}');
    expect(home).toContain('footerMode="integrated"');
  });
});
