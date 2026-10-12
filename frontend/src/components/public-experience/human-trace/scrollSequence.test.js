import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { sequencePosition, sequenceProgress } from './useScrollSequence';

describe('scroll narrative reading and navigation',()=>{
  for(const count of [5,17]) {
    it(`keeps all ${count} selection controls inside their reading holds`,()=>{
      for(let i=0;i<count;i++) expect(sequencePosition(sequenceProgress(i,count),count)).toBe(i);
    });
    it(`traverses ${count} scenes continuously in either direction without overshoot`,()=>{
      expect(sequencePosition(-1,count)).toBe(0); expect(sequencePosition(2,count)).toBe(count-1);
      let previous=0;
      for(let i=0;i<=1000;i++){const value=sequencePosition(i/1000,count);expect(value).toBeGreaterThanOrEqual(previous);expect(value-previous).toBeLessThan(.07);previous=value;}
      expect(sequencePosition(.3/(count-.4),count)).toBe(0);
      expect(sequencePosition(.7/(count-.4),count)).toBeGreaterThan(0);
    });
  }
});

describe('progress photograph ownership',()=>{
  it('places the collaborative mask to the right of the divider',()=>{
    const css=readFileSync(resolve('src/components/public-experience/human-trace/cinematicRoutes.css'),'utf8');
    const dom=new JSDOM(`<style>${css}</style><div class="vt-cinema"><div class="vt-time-stage" style="--split:55%"><div class="vt-time-mask"></div></div></div>`);
    expect(dom.window.getComputedStyle(dom.window.document.querySelector('.vt-time-mask')).getPropertyValue('clip-path')).toBe('inset(0 0 0 var(--split))');
    dom.window.close();
  });
});
