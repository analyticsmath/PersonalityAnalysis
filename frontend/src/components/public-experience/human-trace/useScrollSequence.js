import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCinemaScroll } from './CinematicPublicShell';

gsap.registerPlugin(ScrollTrigger);
const clamp = value => Math.max(0, Math.min(1, value));
const easeBetween = (value, from, to) => {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};
export const sequencePosition = (progress, count) => {
  const units = clamp(progress) * (count - .4);
  const index = Math.min(count - 1, Math.floor(units));
  return Math.min(count - 1, index + easeBetween(units - index, .55, 1));
};
export const sequenceProgress = (index, count, kind = 'career') => kind === 'trust'
  ? (index + .56) / (count - .25)
  : index === 0 ? 0 : Math.min(1, (index + .2) / (count - .4));

/** Image owns the frame, opens into a split, holds for reading, then hands off horizontally. */
export const trustSequenceFrame = (progress, count) => {
  const units = clamp(progress) * (count - .25);
  const index = Math.min(count - 1, Math.floor(units));
  const position = Math.min(count - 1, index + easeBetween(units - index, .72, 1));
  return { units, position };
};
export const trustScenePhase = local => ({
  split: easeBetween(local, .08, .44),
  titleExit: easeBetween(local, .12, .3),
  heading: easeBetween(local, .22, .44),
  body: easeBetween(local, .3, .48),
});

/** One GSAP clock follows native page progress. Direct choices animate only the two chosen scenes. */
export function useScrollSequence(ref, count, onSelect, kind) {
  const scrollTo = useCinemaScroll();
  const controller = useRef({ select: onSelect });
  const [driven, setDriven] = useState(false);
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    let disposed = false;
    const fallbackSelect = index => {
      onSelect(index);
      if (kind === 'trust') track.querySelectorAll('[data-sequence-panel]')[index]?.scrollIntoView({ behavior: 'auto', block: 'start' });
    };
    controller.current.select = fallbackSelect;
    const mm = gsap.matchMedia();
    mm.add('(min-height:740px) and (prefers-reduced-motion:no-preference)', () => {
      let running = true;
      track.classList.add('is-scroll-driven');
      setDriven(true);
      const belt = track.querySelector('[data-sequence-belt]');
      const panelWindow = belt.parentElement;
      const indexWindow = track.querySelector('[data-sequence-index-window]');
      const indexBelt = track.querySelector('[data-sequence-index]');
      const buttons = indexBelt ? [...indexBelt.querySelectorAll('button')] : [];
      const panels = [...track.querySelectorAll('[data-sequence-panel]')];
      const images = panels.map(panel => panel.querySelector('img'));
      const proxy = { progress: 0 };
      let selected = -1, travel = 0, selectionTimeline, overlay;
      const cancelSelection = () => {
        selectionTimeline?.kill();
        selectionTimeline = null;
        overlay?.remove();
        overlay = null;
        belt.style.opacity = '';
        track.classList.remove('is-selecting');
      };
      const measure = () => {
        travel = (count - (kind === 'trust' ? .25 : .4)) * Math.max(260, window.innerHeight * (kind === 'career' ? .38 : 1.35));
        track.style.setProperty('--sequence-travel', travel + 'px');
        indexBelt?.setAttribute('aria-orientation', window.innerWidth <= 800 ? 'horizontal' : 'vertical');
      };
      const paint = () => {
        const frame = kind === 'trust' ? trustSequenceFrame(proxy.progress, count) : null;
        const position = frame ? frame.position : sequencePosition(proxy.progress, count);
        const next = Math.round(position);
        if (selected !== next) { selected = next; onSelect(next); }
        const stride = panels[1] ? panels[1].offsetLeft - panels[0].offsetLeft : 0;
        belt.style.transform = `translate3d(${-position * stride}px,0,0)`;
        panels.forEach((panel, i) => {
          const image = images[i];
          if (image) {
            image.style.transform = `translate3d(${Math.max(-4, Math.min(4, (position - i) * 4))}%,0,0) scale(1.1)`;
            if (Math.abs(next - i) < 2) image.loading = 'eager';
          }
          if (frame) {
            const phase = trustScenePhase(frame.units - i);
            panel.style.setProperty('--scene-split', phase.split);
            panel.style.setProperty('--scene-title-exit', phase.titleExit);
            panel.style.setProperty('--scene-heading', phase.heading);
            panel.style.setProperty('--scene-body', phase.body);
          }
        });
        if (indexBelt && buttons.length && !selectionTimeline) {
          const lower = Math.floor(position), upper = Math.min(count - 1, lower + 1), fraction = position - lower;
          if (window.innerWidth > 800) {
            const center = i => buttons[i].offsetTop + buttons[i].offsetHeight / 2;
            const offset = indexWindow.clientHeight * .38 - (center(lower) + (center(upper) - center(lower)) * fraction);
            indexBelt.style.transform = `translate3d(0,${offset}px,0)`;
          } else {
            const center = i => buttons[i].offsetLeft + buttons[i].offsetWidth / 2;
            const offset = indexWindow.clientWidth / 2 - (center(lower) + (center(upper) - center(lower)) * fraction);
            indexBelt.style.transform = `translate3d(${offset}px,0,0)`;
          }
        }
      };
      measure();
      const animation = gsap.to(proxy, { progress: 1, ease: 'none', onUpdate: paint, scrollTrigger: {
        trigger: track, start: () => `top ${window.innerWidth <= 800 ? 75 : 84}`, end: () => '+=' + travel, scrub: .3,
        invalidateOnRefresh: true, onRefreshInit: measure, onRefresh: () => { cancelSelection(); paint(); },
      } });
      const trigger = animation.scrollTrigger;
      controller.current.select = index => {
        if (index < 0 || index >= count) return;
        // The old composition is measured before seeking the real page position.
        // Clones are visual only; canonical content and focus remain in the live panels.
        const from = Math.max(0, selected);
        cancelSelection();
        const old = panels[from].cloneNode(true);
        const oldIndexTransform = indexBelt?.style.transform;
        const progress = sequenceProgress(index, count, kind);
        images[index].loading = 'eager';
        if (from === index) {
          scrollTo(trigger.start + (trigger.end - trigger.start) * progress);
          return;
        }
        scrollTo(trigger.start + (trigger.end - trigger.start) * progress, { immediate: true });
        trigger.update();
        trigger.getTween()?.progress(1);
        animation.progress(progress);
        paint();
        const next = panels[index].cloneNode(true);
        overlay = document.createElement('div');
        overlay.className = 'vt-selection-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.inert = true;
        [old, next].forEach(panel => {
          panel.removeAttribute('aria-hidden');
          panel.querySelectorAll('[data-transition-media]').forEach(el => el.removeAttribute('data-transition-media'));
          panel.style.viewTransitionName = 'none';
          panel.classList.add('vt-selection-plane');
          panel.style.width = panels[index].offsetWidth + 'px';
          overlay.append(panel);
        });
        panelWindow.append(overlay);
        belt.style.opacity = '0';
        track.classList.add('is-selecting');
        const direction = index > from ? 1 : -1;
        const finish = () => { cancelSelection(); paint(); };
        selectionTimeline = gsap.timeline({ onComplete: finish });
        selectionTimeline.to(old, { xPercent: -direction * 105, duration: .85, ease: 'power3.inOut' }, 0)
          .fromTo(next, { xPercent: direction * 105 }, { xPercent: 0, duration: .85, ease: 'power3.inOut' }, 0);
        if (indexBelt) {
          const destination = indexBelt.style.transform;
          selectionTimeline.fromTo(indexBelt, { transform: oldIndexTransform }, { transform: destination, duration: .85, ease: 'power3.inOut' }, 0);
        }
      };
      // A viewer's new gesture owns progress immediately, even during a direct-selection transition.
      const interrupt = () => { if (selectionTimeline) { cancelSelection(); paint(); } };
      track.addEventListener('wheel', interrupt, { passive: true });
      track.addEventListener('touchstart', interrupt, { passive: true });
      paint();
      document.fonts?.ready.then(() => { if (!disposed && running) { trigger.refresh(); paint(); } });
      return () => {
        running = false;
        cancelSelection();
        track.removeEventListener('wheel', interrupt);
        track.removeEventListener('touchstart', interrupt);
        animation.kill(); trigger.kill();
        track.classList.remove('is-scroll-driven'); track.style.removeProperty('--sequence-travel');
        belt.style.transform = ''; if (indexBelt) indexBelt.style.transform = '';
        panels.forEach((panel, i) => {
          images[i].style.transform = '';
          ['--scene-split', '--scene-title-exit', '--scene-heading', '--scene-body'].forEach(name => panel.style.removeProperty(name));
        });
        setDriven(false);
        controller.current.select = fallbackSelect;
      };
    });
    return () => { disposed = true; mm.revert(); };
  }, [ref, count, onSelect, kind, scrollTo]);
  return { controller, driven };
}
