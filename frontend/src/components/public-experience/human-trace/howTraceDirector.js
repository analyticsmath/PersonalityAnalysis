import gsap from 'gsap';
import { observeScrollProgress } from './scrollProgress';

const clamp = (value) => Math.max(0, Math.min(1, value));
const ease = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const STATES = ['capture', 'isolate', 'branch', 'weight', 'recompose'];

/** One owner for both the evidence display and the explanation beside it. */
export function mountHowTraceDirector(root = document) {
  const route = root.matches?.('.vt-route--how') ? root : root.querySelector?.('.vt-route--how');
  const sequence = route?.querySelector('.vt-how-sequence');
  const stage = route?.querySelector('[data-how-stage]');
  const steps = [...(route?.querySelectorAll('[data-how-step]') || [])];
  if (!sequence || !stage || steps.length !== STATES.length) return () => {};

  const actors = ['.vt-how-source-card', '.vt-how-clause-stage', '.vt-how-branch-stage', '.vt-how-weight-stage', '.vt-how-record-stage'].map((selector) => stage.querySelector(selector));
  const image = stage.querySelector('.vt-how-context img');
  const bars = [...stage.querySelectorAll('.vt-how-weight-stage i')];
  if (actors.some((actor) => !actor)) return () => {};

  const mm = gsap.matchMedia();
  mm.add('(min-width:901px) and (prefers-reduced-motion:no-preference)', () => {
    let anchors = [];
    let active = -1;
    const headerHeight = () => document.querySelector('.vt-header')?.offsetHeight || 84;
    const measure = () => {
      const origin = sequence.getBoundingClientRect().top;
      const viewport = window.innerHeight - headerHeight();
      const travel = Math.max(1, sequence.offsetHeight - viewport);
      anchors = steps.map((step) => clamp((step.getBoundingClientRect().top - origin + step.offsetHeight / 2 - viewport / 2) / travel));
    };
    const positionAt = (progress) => {
      for (let i = 0; i < anchors.length - 1; i += 1) {
        if (progress <= anchors[i + 1]) {
          const phase = clamp((progress - anchors[i]) / Math.max(0.001, anchors[i + 1] - anchors[i]));
          // A settled explanation, a long handoff, then a settled next state.
          return i + ease((phase - 0.24) / 0.62);
        }
      }
      return STATES.length - 1;
    };
    const render = (progress) => {
      const position = positionAt(progress);
      const index = Math.min(STATES.length - 1, Math.round(position));
      if (index !== active) {
        active = index;
        stage.dataset.howState = STATES[index];
        steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
      }
      stage.style.setProperty('--how-progress', String(progress));
      actors.forEach((actor, i) => {
        const delta = position - i;
        const enter = delta < 0 ? ease((delta + 0.6) / 0.6) : 1;
        const leave = delta > 0 ? 1 - ease(delta / 0.42) : 1;
        const opacity = enter * leave;
        actor.style.opacity = String(opacity);
        actor.style.visibility = opacity > 0.005 ? 'visible' : 'hidden';
        actor.style.transform = `translate3d(0, ${(1 - enter) * 24 - (1 - leave) * 12}px, 0)`;
      });
      // Only the bar surfaces grow. Percentages and labels retain their size.
      bars.forEach((bar, i) => {
        const reveal = ease((position - 2.5 - i * 0.035) / 0.38);
        bar.style.setProperty('--how-bar-reveal', String(reveal));
      });
      if (image) image.style.transform = `scale(${1.035 + progress * 0.025})`;
    };

    stage.dataset.howDirected = 'true';
    measure();
    const resize = new window.ResizeObserver(measure);
    resize.observe(sequence);
    steps.forEach((step) => resize.observe(step));
    window.addEventListener('resize', measure, { passive: true });
    const stop = observeScrollProgress(sequence, render, { offset: headerHeight, response: 300 });
    return () => {
      stop();
      resize.disconnect();
      window.removeEventListener('resize', measure);
      delete stage.dataset.howDirected;
      stage.dataset.howState = 'capture';
      stage.style.removeProperty('--how-progress');
      actors.forEach((actor) => ['opacity', 'visibility', 'transform'].forEach((property) => actor.style.removeProperty(property)));
      bars.forEach((bar) => bar.style.removeProperty('--how-bar-reveal'));
      image?.style.removeProperty('transform');
      steps.forEach((step) => step.classList.remove('is-active'));
    };
  });
  return () => mm.revert();
}
