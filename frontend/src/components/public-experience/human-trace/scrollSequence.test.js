import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { createElement } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgressCinematicPage } from './CinematicRoutes';
import { sequencePosition, sequenceProgress, trustSequenceFrame, trustScenePhase } from './useScrollSequence';

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

describe('trust photograph, split and reading choreography',()=>{
  it('finishes the reading composition before any horizontal departure',()=>{
    for(let index=0;index<5;index++) {
      const frame=trustSequenceFrame((index+.56)/4.75,5);
      expect(frame.position).toBe(index);
      expect(trustScenePhase(frame.units-index)).toEqual({split:1,titleExit:1,heading:1,body:1});
      expect(trustSequenceFrame(sequenceProgress(index,5,'trust'),5).position).toBe(index);
    }
    expect(trustScenePhase(0)).toEqual({split:0,titleExit:0,heading:0,body:0});
    expect(trustScenePhase(.24).split).toBeGreaterThan(0);
    expect(trustScenePhase(.24).split).toBeLessThan(1);
  });
  it('holds a complete split while allowing continuous reversible handoffs',()=>{
    let previous=0;
    for(let sample=0;sample<=1000;sample++) {
      const progress=sample/1000;
      const frame=trustSequenceFrame(progress,5);
      expect(frame.position).toBeGreaterThanOrEqual(previous);
      expect(frame.position-previous).toBeLessThan(.03);
      if(frame.position%1!==0) expect(trustScenePhase(frame.units-Math.floor(frame.units)).body).toBe(1);
      previous=frame.position;
    }
    expect(trustSequenceFrame(-1,5).position).toBe(0);
    expect(trustSequenceFrame(2,5).position).toBe(4);
    expect(trustScenePhase(trustSequenceFrame(1,5).units-4).body).toBe(1);
  });
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
      expect(stage.querySelector(':scope > img').getAttribute('src')).toContain('code-detail-1920.webp');
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
