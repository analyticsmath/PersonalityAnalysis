import { describe, expect, it } from 'vitest';
import { lensFrame, lensProgress } from './lensSequence';
import { filmMarkup, perspectiveLenses } from './filmContent';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

describe('one professional context, three model perspectives',()=>{
  it('places each direct choice inside a complete reading composition',()=>{
    for(let i=0;i<3;i++) {
      const frame=lensFrame(lensProgress(i));
      expect(frame.active).toBe(i);
      expect(frame.outgoing).toBe(1);
      expect(frame.incoming).toBe(0);
      expect(frame.shift).toBe(0);
    }
  });
  it('keeps the photographic handoff continuous and avoids competing full titles',()=>{
    let previous=0;
    for(let sample=0;sample<=1000;sample++) {
      const frame=lensFrame(sample/1000);
      const position=frame.from+frame.shift;
      expect(position).toBeGreaterThanOrEqual(previous);
      expect(position-previous).toBeLessThan(.02);
      expect(frame.outgoing+frame.incoming).toBeLessThanOrEqual(1.00001);
      expect(frame.active).toBeGreaterThanOrEqual(0);
      expect(frame.active).toBeLessThanOrEqual(2);
      previous=position;
    }
    expect(lensFrame(-1).active).toBe(0);
    expect(lensFrame(2).active).toBe(2);
  });
  it('renders canonical dimensions and links without fictional participant data',()=>{
    const root=document.createElement('div'); root.innerHTML=filmMarkup;
    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(root.querySelectorAll('[data-lens]')).toHaveLength(3);
    expect(perspectiveLenses.map(lens=>lens.terms)).toEqual([
      PUBLIC_CONTENT.methodology.sections.bigFive.dimensions,
      PUBLIC_CONTENT.methodology.sections.riasec.orbit,
      PUBLIC_CONTENT.methodology.sections.workValues.priorities,
    ]);
    for(const lens of perspectiveLenses) for(const term of lens.terms) expect(root.querySelector('#stage-evidence').textContent).toContain(term);
    expect(root.textContent).not.toContain(PUBLIC_CONTENT.home.worldEntry.response);
    expect(root.querySelector('#time input[type="range"]')).toBeNull();
    expect(root.querySelector('#time a').getAttribute('href')).toBe('/progress');
    expect(root.querySelector('#time').textContent).toContain('two complete assessments');
  });
});
