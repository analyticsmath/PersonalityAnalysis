import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { createElement } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgressCinematicPage } from './CinematicRoutes';
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
  it('keeps the solo and collaborative sources under their own labels as the range changes',()=>{
    const view=render(createElement(MemoryRouter,null,createElement(ProgressCinematicPage)));
    try {
      const stage=view.container.querySelector('.vt-time-stage');
      expect(stage.querySelector(':scope > img').getAttribute('src')).toContain('1742440710402-721332ea7898.jpg');
      expect(stage.querySelector('.vt-time-mask img').getAttribute('src')).toContain('collaborate-1920.webp');
      const slider=view.getByRole('slider');
      fireEvent.change(slider,{target:{value:'25'}});
      expect(slider.getAttribute('aria-valuetext')).toBe('25 percent independent work, 75 percent working together');
      expect(stage.style.getPropertyValue('--split')).toBe('25%');
      fireEvent.change(slider,{target:{value:'75'}});
      expect(slider.getAttribute('aria-valuetext')).toBe('75 percent independent work, 25 percent working together');
    } finally {cleanup();}
  });

});
