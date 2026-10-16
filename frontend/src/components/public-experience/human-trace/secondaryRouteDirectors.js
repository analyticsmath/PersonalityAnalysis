import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const mix = (a, b, value) => a + (b - a) * clamp(value);

function clear(element, properties) {
  if (!element) return;
  properties.forEach((property) => element.style.removeProperty(property));
}

function mountCareer(root) {
  const route = root.querySelector?.('.vt-route--career');
  const track = route?.querySelector('[data-career-world-track]');
  const stage = track?.querySelector('.vt-career-worlds-stage');
  const worlds = [...(track?.querySelectorAll('.vt-career-world') || [])];
  const labels = [...(track?.querySelectorAll('.vt-career-world-index > span') || [])];
  if (!track || !stage || worlds.length < 2) return () => {};

  const mm = gsap.matchMedia();
  mm.add('(min-width:901px) and (min-height:700px) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
    stage.dataset.careerDirected = 'true';

    const render = (value) => {
      const p = clamp(value);
      const position = p * (worlds.length - 1);
      const dominant = Math.round(position);
      stage.style.setProperty('--career-progress', String(p));

      worlds.forEach((world, index) => {
        const delta = index - position;
        const distance = Math.abs(delta);
        const visible = distance < 1.02;
        const proximity = smooth(1 - Math.min(1, distance));
        const incoming = delta > 0;
        const ownsInteraction = index === dominant && distance < 0.56;
        const media = world.querySelector('.vt-career-world-media');
        const image = media?.querySelector('img');
        const copy = world.querySelector('.vt-career-world-copy');
        const roleField = world.querySelector('.vt-career-role-field');

        world.style.opacity = visible ? String(Math.max(0, 1 - distance * 0.9)) : '0';
        world.style.visibility = visible ? 'visible' : 'hidden';
        world.style.pointerEvents = ownsInteraction ? 'auto' : 'none';
        world.style.zIndex = String(index === dominant ? 3 : incoming ? 2 : 1);
        world.style.transform = `translate3d(${delta * 8.5}%, ${delta * 2.2}%, 0) scale(${mix(0.972, 1, proximity)})`;
        world.style.clipPath = incoming
          ? `inset(0 0 0 ${Math.min(100, distance * 32)}%)`
          : `inset(0 ${Math.min(100, distance * 22)}% 0 0)`;
        world.setAttribute('aria-hidden', String(!ownsInteraction));
        world.inert = !ownsInteraction;

        if (image) {
          image.style.transform = `translate3d(${delta * -3.8}%, 0, 0) scale(${mix(1.09, 1.015, proximity)})`;
        }
        if (copy) {
          copy.style.transform = `translate3d(${delta * 4.2}%, ${mix(18, 0, proximity)}px, 0)`;
          copy.style.opacity = String(mix(0.56, 1, proximity));
        }
        if (roleField) {
          roleField.style.transform = `translate3d(0, ${mix(28, 0, proximity)}px, 0)`;
          roleField.style.opacity = String(mix(0.42, 1, proximity));
        }
      });

      labels.forEach((label, index) => {
        const distance = Math.abs(index - position);
        const proximity = smooth(1 - Math.min(1, distance));
        label.style.color = `rgba(255,255,255,${mix(0.3, 1, proximity)})`;
        label.style.transform = `translate3d(${mix(0, 9, proximity)}px,0,0)`;
      });
    };

    render(0);
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top 84px',
      end: 'bottom bottom',
      scrub: 0.22,
      fastScrollEnd: 1800,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });

    return () => {
      trigger.kill();
      delete stage.dataset.careerDirected;
      stage.style.removeProperty('--career-progress');
      worlds.forEach((world) => {
        clear(world, ['opacity', 'visibility', 'pointer-events', 'z-index', 'transform', 'clip-path']);
        world.removeAttribute('aria-hidden');
        world.inert = false;
        clear(world.querySelector('.vt-career-world-media img'), ['transform']);
        clear(world.querySelector('.vt-career-world-copy'), ['transform', 'opacity']);
        clear(world.querySelector('.vt-career-role-field'), ['transform', 'opacity']);
      });
      labels.forEach((label) => clear(label, ['color', 'transform']));
    };
  });

  return () => mm.revert();
}

function boundaryVisibility(position) {
  const fraction = position - Math.floor(position);
  const distanceToCut = Math.min(Math.abs(fraction - 0.5), Math.abs(fraction + 0.5), Math.abs(fraction - 1.5));
  return smooth(clamp((distanceToCut - 0.035) / 0.16));
}

function mountTrust(root) {
  const route = root.querySelector?.('.vt-route--trust');
  const track = route?.querySelector('[data-trust-track]');
  const stage = track?.querySelector('.vt-trust-stage');
  const record = stage?.querySelector('.vt-trust-record');
  const source = record?.querySelector('blockquote');
  const reading = record?.querySelector('.vt-trust-record__reading');
  const pipeline = [...(record?.querySelectorAll('.vt-trust-record__pipeline span') || [])];
  const inspectorButtons = [...(stage?.querySelectorAll('.vt-trust-inspector button') || [])];
  if (!track || !stage || !record || !reading || pipeline.length < 2) return () => {};

  const mm = gsap.matchMedia();
  mm.add('(min-width:901px) and (min-height:700px) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
    stage.dataset.trustDirected = 'true';

    const render = (value) => {
      const p = clamp(value);
      const position = p * (pipeline.length - 1);
      const active = Math.round(position);
      const fractional = position - Math.floor(position);
      const cutVisibility = boundaryVisibility(position);
      const cutDirection = fractional < 0.5 ? 1 : -1;
      stage.style.setProperty('--trust-progress', String(p));

      record.style.transform = `translate3d(${mix(0, -1.2, p)}%, 0, 0)`;
      if (source) source.style.transform = `translate3d(${mix(0, -2.8, p)}%, ${mix(0, -8, p)}px, 0) scale(${mix(1, 0.985, p)})`;
      reading.style.opacity = String(mix(0.08, 1, cutVisibility));
      reading.style.transform = `translate3d(${mix(cutDirection * 26, 0, cutVisibility)}px,0,0)`;

      pipeline.forEach((step, index) => {
        const distance = Math.abs(index - position);
        const proximity = smooth(1 - Math.min(1, distance));
        const passed = index < position ? 1 : 0;
        step.style.opacity = String(Math.max(0.22, proximity, passed * 0.68));
        step.style.transform = `translate3d(0,${mix(5, 0, Math.max(proximity, passed))}px,0)`;
        step.style.background = index <= active ? 'var(--vt-accent)' : 'transparent';
      });

      inspectorButtons.forEach((button, index) => {
        const distance = Math.abs(index - position);
        const proximity = smooth(1 - Math.min(1, distance));
        button.style.opacity = String(mix(0.3, 1, proximity));
        button.style.transform = `translate3d(${mix(0, 8, proximity)}px,0,0)`;
      });
    };

    render(0);
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top 84px',
      end: 'bottom bottom',
      scrub: 0.22,
      fastScrollEnd: 1800,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });

    return () => {
      trigger.kill();
      delete stage.dataset.trustDirected;
      stage.style.removeProperty('--trust-progress');
      clear(record, ['transform']);
      clear(source, ['transform']);
      clear(reading, ['opacity', 'transform']);
      pipeline.forEach((step) => clear(step, ['opacity', 'transform', 'background']));
      inspectorButtons.forEach((button) => clear(button, ['opacity', 'transform']));
    };
  });

  return () => mm.revert();
}

export function mountSecondaryRouteDirector(root = document, pathname = window.location.pathname) {
  if (pathname === '/career-intelligence') return mountCareer(root);
  if (pathname === '/trust') return mountTrust(root);
  return () => {};
}

export default mountSecondaryRouteDirector;
