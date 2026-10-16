import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { observeScrollProgress } from './scrollProgress';

gsap.registerPlugin(ScrollTrigger);

const HOME_HANDOFFS = [
  [0.07, 0.11],
  [0.17, 0.21],
  [0.27, 0.31],
  [0.57, 0.61],
  [0.68, 0.72],
  [0.78, 0.82],
  [0.88, 0.92],
];
const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const range = (value, start, end) => smooth((value - start) / Math.max(0.0001, end - start));
const mix = (a, b, value) => a + (b - a) * clamp(value);

const SHOT_GRAMMAR = [
  { enterX: 0, enterY: 0, enterScale: 1, exitX: -2, exitY: -4, exitScale: 0.985, enterClip: [0, 0, 0, 0], exitClip: [0, 0, 8, 0] },
  { enterX: 0, enterY: 9, enterScale: 1.035, exitX: -3, exitY: -7, exitScale: 0.97, enterClip: [16, 0, 0, 0], exitClip: [0, 0, 12, 0] },
  { enterX: 7, enterY: 2, enterScale: 1.02, exitX: -8, exitY: -2, exitScale: 0.98, enterClip: [0, 18, 0, 0], exitClip: [0, 0, 0, 14] },
  { enterX: 11, enterY: 0, enterScale: 1.04, exitX: -9, exitY: 0, exitScale: 0.985, enterClip: [0, 24, 0, 0], exitClip: [0, 0, 0, 12] },
  { enterX: 0, enterY: 8, enterScale: 1.03, exitX: 0, exitY: -8, exitScale: 0.975, enterClip: [14, 0, 0, 0], exitClip: [0, 0, 12, 0] },
  { enterX: 8, enterY: 0, enterScale: 1.025, exitX: -8, exitY: 0, exitScale: 0.98, enterClip: [0, 18, 0, 0], exitClip: [0, 0, 0, 14] },
  { enterX: -8, enterY: 0, enterScale: 1.025, exitX: 8, exitY: 0, exitScale: 0.98, enterClip: [0, 0, 0, 18], exitClip: [0, 14, 0, 0] },
  { enterX: 0, enterY: 10, enterScale: 0.965, exitX: 0, exitY: 0, exitScale: 1, enterClip: [18, 0, 0, 0], exitClip: [0, 0, 0, 0] },
];

function sceneWeights(progress) {
  const p = clamp(progress);
  const weights = Array.from({ length: HOME_HANDOFFS.length + 1 }, () => 0);

  for (let index = 0; index < HOME_HANDOFFS.length; index += 1) {
    const [start, end] = HOME_HANDOFFS[index];
    if (p < start) {
      weights[index] = 1;
      return weights;
    }
    if (p <= end) {
      const local = smooth((p - start) / Math.max(0.0001, end - start));
      weights[index] = 1 - local;
      weights[index + 1] = local;
      return weights;
    }
  }

  weights[weights.length - 1] = 1;
  return weights;
}

function dominantIndex(weights) {
  let best = 0;
  for (let i = 1; i < weights.length; i += 1) {
    if (weights[i] > weights[best]) best = i;
  }
  return best;
}

function clipPath(values) {
  return `inset(${values.map((value) => `${Math.max(0, value).toFixed(2)}%`).join(' ')})`;
}

function paintScene(scene, index, progress, weight, dominant) {
  const previousHandoff = HOME_HANDOFFS[index - 1];
  const enter = index === 0 ? 1 : range(progress, previousHandoff[0], previousHandoff[1]);
  const visible = weight > 0.001;
  scene.style.opacity = visible ? '1' : '0';
  scene.style.visibility = visible ? 'visible' : 'hidden';
  scene.style.pointerEvents = index === dominant ? 'auto' : 'none';
  scene.style.transform = 'none';
  scene.style.clipPath = `inset(0 ${((1 - enter) * 100).toFixed(3)}% 0 0)`;
  scene.style.zIndex = String(index + 1);
  scene.setAttribute('aria-hidden', String(index !== dominant));
  scene.querySelectorAll('h1,h2').forEach((heading) => {
    heading.style.transform = `translate3d(0, ${((1 - enter) * 30).toFixed(2)}px, 0)`;
  });
}

function setActiveWorld(items, labels, progress) {
  const position = clamp(progress) * Math.max(0, items.length - 1);
  const current = Math.min(items.length - 1, Math.round(position));

  items.forEach((item, index) => {
    const delta = index - position;
    const distance = Math.abs(delta);
    const visible = distance < 1.06;
    const arrival = clamp(1 - distance);
    item.style.opacity = visible ? '1' : '0';
    item.style.visibility = visible ? 'visible' : 'hidden';
    item.style.transform = `translate3d(${delta * 100}%, 0, 0) scale(${mix(1.06, 1, arrival)})`;
    item.style.clipPath = 'none';
    item.style.zIndex = String(index === current ? 3 : 2);
    item.setAttribute('aria-hidden', String(index !== current));
  });

  labels.forEach((label, index) => {
    label.classList.toggle('is-active', index === current);
  });
}

function removeInlineStyles(element, properties) {
  if (!element) return;
  properties.forEach((property) => element.style.removeProperty(property));
}

export function mountHomeHumanTrace(root) {
  if (!root) return () => {};

  const track = root.querySelector('[data-home-track]');
  const stage = root.querySelector('[data-home-stage]');
  const scenes = [...root.querySelectorAll('[data-home-scene]')];
  const source = root.querySelector('[data-home-source-actor]');
  const worldMedia = root.querySelector('[data-home-world-media]');
  const scrollCue = root.querySelector('[data-home-scroll-cue]');
  const worldItems = [...root.querySelectorAll('[data-home-world]')];
  const worldLabels = [...root.querySelectorAll('[data-home-world-label]')];
  const branchPaths = [...root.querySelectorAll('[data-home-branch-path]')];
  const masses = [...root.querySelectorAll('[data-home-mass]')];
  const timeFrame = root.querySelector('[data-home-time-frame]');
  const timeLater = root.querySelector('[data-home-time-later]');
  const timeBaseImage = timeFrame?.querySelector(':scope > img');
  const timeLaterImage = timeLater?.querySelector('img');
  const provenanceSteps = [...root.querySelectorAll('[data-home-provenance-step]')];
  const recordObject = root.querySelector('[data-home-record-object]');

  if (!track || !stage || !scenes.length) return () => {};

  branchPaths.forEach((path) => {
    const length = typeof path.getTotalLength === 'function' ? path.getTotalLength() : 1000;
    path.style.strokeDasharray = `${length} ${length}`;
    path.dataset.pathLength = String(length);
  });

  const mm = gsap.matchMedia();

  mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
    const heroCopy = root.querySelector('.vt-home-human-copy');
    const render = (progress) => {
      const p = clamp(progress);
      const weights = sceneWeights(p);
      const dominant = dominantIndex(weights);
      stage.dataset.homeDominant = scenes[dominant]?.dataset.homeSceneId || 'human';
      stage.style.setProperty('--home-progress', String(p));

      scenes.forEach((scene, index) => paintScene(scene, index, p, weights[index], dominant));

      if (scrollCue) {
        const cueOpacity = 1 - range(p, 0.015, 0.07);
        scrollCue.style.opacity = String(cueOpacity);
        scrollCue.style.visibility = cueOpacity > 0.01 ? 'visible' : 'hidden';
      }

      if (worldMedia) {
        const sourceTakeover = range(p, 0, 0.17);
        const cropResolve = range(p, 0.17, 0.27);
        const darken = range(p, 0.17, 0.57);
        const returnPulse = range(p, 0.78, 0.88);
        worldMedia.style.transform = `translate3d(${mix(0, -2.5, p)}%, ${mix(0, -3.5, p)}%, 0) scale(${mix(1.025, 1.16, sourceTakeover)})`;
        const opening = range(p, 0, 0.07);
        worldMedia.style.clipPath = `inset(${mix(14, 0, opening)}% ${mix(5, 0, opening)}% ${mix(10, 0, opening)}% ${mix(30, 0, opening)}%)`;
        if (heroCopy) heroCopy.style.transform = `translate3d(0, ${mix(0, -5, opening)}vh, 0)`;
        worldMedia.style.setProperty('--home-veil-opacity', String(mix(0.55, 0.82, darken)));
        const baseOpacity = mix(1, 0.2, range(p, 0.27, 0.68));
        worldMedia.style.opacity = String(mix(baseOpacity, 0.5, returnPulse));
      }

      if (source) {
        const enter = range(p, 0.07, 0.11);
        const travel = range(p, 0.11, 0.17);
        const settle = range(p, 0.17, 0.21);
        const residueFade = range(p, 0.17, 0.21);
        const provenanceReturn = range(p, 0.78, 0.82);
        const finalResolve = range(p, 0.88, 0.92);
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const x = mix(vw * 0.56, vw * 0.555, travel);
        const y = mix(vh * 0.68, vh * 0.105, travel);
        const scale = mix(1.03, 0.63, travel);
        const rotate = mix(-0.45, 0.2, travel) * (1 - settle);
        const residueOpacity = mix(1, 0, residueFade);
        const restoredOpacity = residueOpacity;
        const sourceOpacity = enter * restoredOpacity * (1 - finalResolve);
        source.style.opacity = String(sourceOpacity);
        source.style.visibility = sourceOpacity > 0.02 ? 'visible' : 'hidden';
        source.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
      }

      const branchProgress = range(p, 0.17, 0.27);
      branchPaths.forEach((path, index) => {
        const length = Number(path.dataset.pathLength || 1000);
        const staggered = range(branchProgress, index * 0.07, 0.58 + index * 0.07);
        path.style.strokeDashoffset = String(length * (1 - staggered));
        path.style.opacity = String(mix(0.22, 0.92, staggered));
      });

      setActiveWorld(worldItems, worldLabels, range(p, 0.31, 0.57));

      const weightProgress = range(p, 0.57, 0.68);
      masses.forEach((mass, index) => {
        const stagger = range(weightProgress, index * 0.05, 0.52 + index * 0.05);
        mass.style.transform = `translate3d(0, ${mix(8, 0, stagger)}%, 0) scaleY(${mix(0.045, 1, stagger)})`;
        mass.style.opacity = String(mix(0.12, 1, stagger));
      });

      if (timeLater) {
        const timeProgress = range(p, 0.68, 0.78);
        const split = mix(100, 48, timeProgress);
        timeLater.style.clipPath = `inset(0 0 0 ${split}%)`;
        timeFrame?.style.setProperty('--home-time-split', `${split}%`);
        if (timeBaseImage) timeBaseImage.style.transform = `translate3d(${mix(0, -3.8, timeProgress)}%, 0, 0) scale(${mix(1.035, 1.085, timeProgress)})`;
        if (timeLaterImage) timeLaterImage.style.transform = `translate3d(${mix(4.5, 0, timeProgress)}%, 0, 0) scale(${mix(1.085, 1.035, timeProgress)})`;
      }

      const provenanceProgress = range(p, 0.78, 0.88);
      provenanceSteps.forEach((step, index) => {
        const reveal = range(provenanceProgress, index * 0.1, 0.39 + index * 0.1);
        step.style.opacity = String(reveal);
        step.style.transform = `translate3d(${mix(52, 0, reveal)}px, ${mix(8, 0, reveal)}px, 0)`;
      });

      if (recordObject) {
        const recordProgress = range(p, 0.88, 0.98);
        recordObject.style.transform = `translate3d(${mix(7, 0, recordProgress)}vw, ${mix(60, 0, recordProgress)}px, 0) scale(${mix(0.925, 1, recordProgress)}) rotate(${mix(0.8, 0, recordProgress)}deg)`;
        recordObject.style.opacity = String(recordProgress);
      }
    };

    render(0);

    const stop = observeScrollProgress(track, render, { response: 190 });

    return () => {
      stop();
      heroCopy?.style.removeProperty('transform');
      delete stage.dataset.homeDominant;
      stage.style.removeProperty('--home-progress');
      scenes.forEach((scene) => {
        removeInlineStyles(scene, ['opacity', 'visibility', 'pointer-events', 'transform', 'clip-path', 'z-index']);
        scene.removeAttribute('aria-hidden');
        scene.querySelectorAll('h1,h2').forEach((heading) => heading.style.removeProperty('transform'));
      });
      removeInlineStyles(scrollCue, ['opacity', 'visibility']);
      removeInlineStyles(worldMedia, ['transform', 'clip-path', 'opacity', '--home-veil-opacity']);
      removeInlineStyles(source, ['opacity', 'visibility', 'transform']);
      branchPaths.forEach((path) => removeInlineStyles(path, ['stroke-dasharray', 'stroke-dashoffset', 'opacity']));
      worldItems.forEach((item) => {
        removeInlineStyles(item, ['opacity', 'visibility', 'transform', 'clip-path', 'z-index']);
        item.removeAttribute('aria-hidden');
      });
      worldLabels.forEach((label) => label.classList.remove('is-active'));
      masses.forEach((mass) => removeInlineStyles(mass, ['transform', 'opacity']));
      removeInlineStyles(timeLater, ['clip-path']);
      removeInlineStyles(timeBaseImage, ['transform']);
      removeInlineStyles(timeLaterImage, ['transform']);
      timeFrame?.style.removeProperty('--home-time-split');
      provenanceSteps.forEach((step) => removeInlineStyles(step, ['opacity', 'transform']));
      removeInlineStyles(recordObject, ['transform', 'opacity']);
    };
  });

  mm.add('(max-width:900px) and (prefers-reduced-motion:no-preference)', () => {
    const context = gsap.context(() => {
      root.querySelectorAll('.vt-home-scene h2').forEach((heading) => {
        gsap.fromTo(heading, { y: 40, opacity: 0.4 }, { y: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: heading, start: 'top 95%', end: 'top 55%', scrub: 0.6 } });
      });
      worldItems.forEach((item) => gsap.fromTo(item.querySelector('img'), { yPercent: -7, scale: 1.16 },
        { yPercent: 7, scale: 1.05, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }));
    }, root);
    return () => context.revert();
  });

  return () => mm.revert();
}

export default mountHomeHumanTrace;
