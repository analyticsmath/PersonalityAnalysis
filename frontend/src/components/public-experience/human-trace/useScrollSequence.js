import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCinemaScroll } from './CinematicPublicShell';

gsap.registerPlugin(ScrollTrigger);
export const sequencePosition = (progress, count) => {
  const units = Math.max(0, Math.min(1, progress)) * (count - .4);
  const index = Math.min(count - 1, Math.floor(units));
  const transition = Math.max(0, Math.min(1, (units - index - .55) / .45));
  return Math.min(count - 1, index + transition * transition * (3 - 2 * transition));
};
export const sequenceProgress = (index, count) => index === 0 ? 0 : Math.min(1, (index + .2) / (count - .4));

/** Page scrolling advances a finite sequence. No wheel handlers, snapping or nested scrollers. */
export function useScrollSequence(ref, count, onSelect, kind) {
  const scrollTo = useCinemaScroll();
  const controller = useRef({ select:onSelect });
  const [driven, setDriven] = useState(false);
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    let disposed = false;
    controller.current.select = index => {
      onSelect(index);
      if (kind === 'trust') track.querySelectorAll('[data-sequence-panel]')[index]?.scrollIntoView({behavior:'auto',block:'start'});
    };
    const mm = gsap.matchMedia();
    mm.add('(min-height:740px) and (prefers-reduced-motion:no-preference)', () => {
      track.classList.add('is-scroll-driven'); setDriven(true);
      const belt = track.querySelector('[data-sequence-belt]');
      const indexWindow = track.querySelector('[data-sequence-index-window]');
      const indexBelt = track.querySelector('[data-sequence-index]');
      const buttons = indexBelt ? [...indexBelt.querySelectorAll('button')] : [];
      const panels = [...track.querySelectorAll('[data-sequence-panel]')];
      const proxy = { progress:0 };
      let selected = -1, travel = 0;
      const measure = () => {
        travel = (count - .4) * Math.max(260, window.innerHeight * (kind === 'career' ? .42 : .72));
        track.style.setProperty('--sequence-travel', travel + 'px');
        indexBelt?.setAttribute('aria-orientation',window.innerWidth<=800?'horizontal':'vertical');
      };
      const paint = () => {
        const position = sequencePosition(proxy.progress, count);
        const next = Math.round(position);
        if (selected !== next) { selected = next; onSelect(next); }
        const stride = panels[1] ? panels[1].offsetLeft - panels[0].offsetLeft : 0;
        belt.style.transform = `translate3d(${-position * stride}px,0,0)`;
        panels.forEach((panel, i) => {
          const image = panel.querySelector('img');
          if (image) { image.style.transform = `translate3d(${Math.max(-5,Math.min(5,(position-i)*5))}%,0,0) scale(1.12)`; if (Math.abs(next-i)<2) image.loading='eager'; }
        });
        if (indexBelt && buttons.length) {
          const lower = Math.floor(position), upper = Math.min(count-1,lower+1), fraction = position-lower;
          if (window.innerWidth > 800) {
            const center = i => buttons[i].offsetTop + buttons[i].offsetHeight/2;
            const offset = indexWindow.clientHeight*.34 - (center(lower)+(center(upper)-center(lower))*fraction);
            indexBelt.style.transform = `translate3d(0,${offset}px,0)`;
          } else {
            const center = i => buttons[i].offsetLeft + buttons[i].offsetWidth/2;
            const offset = indexWindow.clientWidth/2 - (center(lower)+(center(upper)-center(lower))*fraction);
            indexBelt.style.transform = `translate3d(${offset}px,0,0)`;
          }
        }
      };
      measure();
      const animation = gsap.to(proxy, {progress:1,ease:'none',onUpdate:paint,scrollTrigger:{
        trigger:track,start:()=>`top ${window.innerWidth<=800?75:84}`,end:()=>'+='+travel,scrub:.22,
        invalidateOnRefresh:true,onRefreshInit:measure,onRefresh:paint,
      }});
      const trigger = animation.scrollTrigger;
      controller.current.select = index => {
        const progress=sequenceProgress(index,count);
        const immediate=Math.abs(index-selected)>2;
        onSelect(index);
        scrollTo(trigger.start + (trigger.end-trigger.start)*progress,{immediate});
        // Home/End and distant selections seek directly instead of flashing through every intervening chapter.
        if(immediate){trigger.update();trigger.getTween()?.progress(1);animation.progress(progress);paint();}
      };
      paint();
      document.fonts?.ready.then(() => { if (!disposed) { trigger.refresh(); paint(); } });
      return () => {
        animation.kill(); trigger.kill(); track.classList.remove('is-scroll-driven'); track.style.removeProperty('--sequence-travel');
        belt.style.transform=''; if(indexBelt) indexBelt.style.transform='';
        panels.forEach(panel=>{ const img=panel.querySelector('img'); if(img)img.style.transform=''; });
        setDriven(false);
        controller.current.select = index => {onSelect(index); if(kind==='trust') panels[index]?.scrollIntoView({behavior:'auto',block:'start'});};
      };
    });
    return () => { disposed=true; mm.revert(); };
  }, [ref,count,onSelect,kind,scrollTo]);
  return {controller,driven};
}
