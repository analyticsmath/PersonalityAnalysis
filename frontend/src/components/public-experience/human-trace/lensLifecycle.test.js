import { expect, it, vi } from 'vitest';
import { mountLensSequence } from './lensSequence';

const clock=vi.hoisted(()=>({animation:null}));
vi.mock('gsap/ScrollTrigger',()=>({ScrollTrigger:{}}));
vi.mock('gsap',()=>({default:{registerPlugin:vi.fn(),to:()=>{
  clock.animation={scrollTrigger:{start:100,end:1100,kill:vi.fn()},kill:vi.fn()};
  return clock.animation;
}}}));

it('releases the lens after its owning GSAP context has already detached ScrollTrigger',()=>{
  const root=document.createElement('div');
  root.innerHTML='<section id="stage-evidence"><div class="lenses-stage"><figure class="lens-photo"><img /></figure>'+[0,1,2].map(i=>`<article data-lens="${i}"></article><button data-lens-select="${i}"></button>`).join('')+'</div></section>';
  const controller=mountLensSequence(root,vi.fn());
  const trigger=clock.animation.scrollTrigger;
  // GSAP context reversion kills owned animations before invoking custom cleanup.
  clock.animation.scrollTrigger=null;
  expect(()=>controller.dispose()).not.toThrow();
  expect(()=>controller.dispose()).not.toThrow();
  expect(trigger.kill).toHaveBeenCalled();
  expect(root.querySelector('#stage-evidence').classList.contains('is-driven')).toBe(false);
  for(const scene of root.querySelectorAll('[data-lens]')){
    expect(scene.inert).toBe(false);
    expect(scene.hasAttribute('aria-hidden')).toBe(false);
    expect(scene.style.visibility).toBe('');
  }
});
