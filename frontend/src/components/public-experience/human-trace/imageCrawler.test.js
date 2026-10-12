import { describe, it, expect, vi } from 'vitest';
import { wrapDistance, dampVelocity, mountImageCrawler } from './imageCrawler';
vi.mock('gsap', () => ({default:{ticker:{add:vi.fn(),remove:vi.fn()}}}));

describe('continuous image conveyor', () => {
  it('wraps both directions and large drags onto the identical cycle', () => {
    expect(wrapDistance(1201, 1200)).toBe(1);
    expect(wrapDistance(-1, 1200)).toBe(1199);
    expect(wrapDistance(7200003, 1200)).toBe(3);
    expect(wrapDistance(-7200003, 1200)).toBe(1197);
    expect(wrapDistance(999, 0)).toBe(0);
  });
  it('damps momentum independently of rendering frame rate', () => {
    let fine = 600, coarse = 600;
    for (let i=0;i<120;i++) fine = dampVelocity(fine, 1/120);
    for (let i=0;i<30;i++) coarse = dampVelocity(coarse, 1/30);
    expect(fine).toBeCloseTo(coarse, 8);
    expect(fine).toBeLessThan(5);
    expect(dampVelocity(-600, 1)).toBeCloseTo(-fine, 8);
  });
});


describe('crawler pointer and keyboard focus', () => {
  it('keeps a clicked image stationary, centers keyboard focus, and suppresses navigation after dragging', () => {
    const original = {matchMedia:window.matchMedia, ResizeObserver:window.ResizeObserver, IntersectionObserver:window.IntersectionObserver};
    window.matchMedia = () => ({matches:true,addEventListener:vi.fn(),removeEventListener:vi.fn()});
    window.ResizeObserver = class { observe(){} disconnect(){} };
    window.IntersectionObserver = class { observe(){} disconnect(){} };
    const root = document.createElement('div');
    root.innerHTML = '<button id="crawler-pause"></button><div id="image-crawler"><div class="crawler-belt"><div><a class="career-image" href="/career-intelligence">Explore</a></div></div></div>';
    const viewport=root.querySelector('#image-crawler'), group=root.querySelector('.crawler-belt').firstElementChild, link=root.querySelector('a'), belt=root.querySelector('.crawler-belt');
    group.getBoundingClientRect = () => ({width:1500});
    Object.defineProperty(viewport,'clientWidth',{value:1000});
    Object.defineProperty(link,'offsetLeft',{value:600});
    Object.defineProperty(link,'offsetWidth',{value:200});
    viewport.setPointerCapture=vi.fn(); viewport.hasPointerCapture=()=>false; viewport.releasePointerCapture=vi.fn();
    const pointer = (type,x) => { const event=new window.MouseEvent(type,{bubbles:true,clientX:x,button:0}); Object.defineProperties(event,{pointerType:{value:'mouse'},pointerId:{value:1}}); link.dispatchEvent(event); };
    const dispose=mountImageCrawler(root);
    try {
      pointer('pointerdown',200);
      link.dispatchEvent(new window.FocusEvent('focusin',{bubbles:true}));
      expect(belt.style.transform).toBe('translate3d(0px,0,0)');
      pointer('pointerup',200);
      const click=new window.MouseEvent('click',{bubbles:true,cancelable:true}); link.dispatchEvent(click);
      expect(click.defaultPrevented).toBe(false);
      link.dispatchEvent(new window.FocusEvent('focusin',{bubbles:true}));
      expect(belt.style.transform).toBe('translate3d(-200px,0,0)');
      pointer('pointerdown',200); pointer('pointermove',150); pointer('pointerup',150);
      const draggedClick=new window.MouseEvent('click',{bubbles:true,cancelable:true}); link.dispatchEvent(draggedClick);
      expect(draggedClick.defaultPrevented).toBe(true);
    } finally { dispose(); Object.assign(window,original); }
  });
});
