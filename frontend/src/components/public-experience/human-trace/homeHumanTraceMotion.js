import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HOME_SCENE_STOPS = [0.04, 0.16, 0.285, 0.41, 0.535, 0.66, 0.785, 0.935];

function closestSceneStop(progress) {
  return HOME_SCENE_STOPS.reduce((best, stop, index) =>
    Math.abs(stop - progress) < Math.abs(HOME_SCENE_STOPS[best] - progress) ? index : best, 0);
}

const HOME_HANDOFFS = [
  [0.08, 0.115],
  [0.205, 0.24],
  [0.33, 0.365],
  [0.455, 0.49],
  [0.58, 0.615],
  [0.705, 0.74],
  [0.83, 0.865],
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
  const nextHandoff = HOME_HANDOFFS[index];
  const enter = index === 0 ? 1 : range(progress, previousHandoff[0], previousHandoff[1]);
  const exit = index === HOME_HANDOFFS.length ? 0 : range(progress, nextHandoff[0], nextHandoff[1]);
  const shot = SHOT_GRAMMAR[index] || SHOT_GRAMMAR[0];

  let x = mix(shot.enterX, 0, enter);
  let y = mix(shot.enterY, 0, enter);
  let scale = mix(shot.enterScale, 1, enter);
  const enteringClip = shot.enterClip.map((value) => mix(value, 0, enter));

  x = mix(x, shot.exitX, exit);
  y = mix(y, shot.exitY, exit);
  scale = mix(scale, shot.exitScale, exit);
  const finalClip = enteringClip.map((value, clipIndex) => mix(value, shot.exitClip[clipIndex], exit));

  const visible = weight > 0.012;
  scene.style.opacity = String(weight);
  scene.style.visibility = visible ? 'visible' : 'hidden';
  scene.style.pointerEvents = weight > 0.62 ? 'auto' : 'none';
  scene.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${scale})`;
  scene.style.clipPath = clipPath(finalClip);
  scene.style.zIndex = String(index === dominant ? 3 : index < dominant ? 1 : 2);
  scene.setAttribute('aria-hidden', String(!visible));
}

function setActiveWorld(items, labels, progress) {
  const position = clamp(progress) * Math.max(0, items.length - 1);
  const current = Math.min(items.length - 1, Math.round(position));

  items.forEach((item, index) => {
    const delta = index - position;
    const distance = Math.abs(delta);
    const visible = distance < 1.06;
    const arrival = clamp(1 - distance);
    item.style.opacity = visible ? String(Math.max(0, 1 - distance * 0.82)) : '0';
    item.style.visibility = visible ? 'visible' : 'hidden';
    item.style.transform = `translate3d(${delta * 8}%, ${delta * 24}%, 0) scale(${mix(0.94, 1.035, arrival)})`;
    item.style.clipPath = delta >= 0
      ? `inset(${Math.min(100, distance * 58)}% 0 0 0)`
      : `inset(0 0 ${Math.min(100, distance * 34)}% 0)`;
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

  mm.add('(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const lastScene = HOME_SCENE_STOPS.length - 1;
    let settledScene = 0;
    let initialized = false;
    const boundedProgress = (progress) => {
      const lower = settledScene === 0 ? 0 : HOME_SCENE_STOPS[settledScene - 1];
      const upper = settledScene === lastScene ? 1 : HOME_SCENE_STOPS[settledScene + 1];
      return Math.max(lower, Math.min(upper, clamp(progress)));
    };
    const boundedSnapStop = (progress) => {
      const requested = closestSceneStop(clamp(progress));
      const allowed = Math.max(settledScene - 1, Math.min(settledScene + 1, requested));
      return HOME_SCENE_STOPS[allowed];
    };
    const render = (progress) => {
      const p = boundedProgress(progress);
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
        const sourceTakeover = range(p, 0.08, 0.205);
        const cropResolve = range(p, 0.205, 0.33);
        const darken = range(p, 0.205, 0.455);
        const returnPulse = range(p, 0.705, 0.83);
        worldMedia.style.transform = `translate3d(${mix(0, -2.5, p)}%, ${mix(0, -3.5, p)}%, 0) scale(${mix(1.025, 1.16, sourceTakeover)})`;
        worldMedia.style.clipPath = `inset(${mix(0, 4.5, cropResolve)}% ${mix(0, 6, cropResolve)}% ${mix(0, 4.5, cropResolve)}% ${mix(0, 6, cropResolve)}%)`;
        worldMedia.style.setProperty('--home-veil-opacity', String(mix(0.08, 0.74, darken)));
        const baseOpacity = mix(1, 0.2, range(p, 0.33, 0.58));
        worldMedia.style.opacity = String(mix(baseOpacity, 0.5, returnPulse));
      }

      if (source) {
        const enter = range(p, 0.08, 0.115);
        const travel = range(p, 0.115, 0.205);
        const settle = range(p, 0.205, 0.24);
        const residueFade = range(p, 0.33, 0.365);
        const provenanceReturn = range(p, 0.705, 0.74);
        const finalResolve = range(p, 0.83, 0.865);
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const x = mix(vw * 0.56, vw * 0.555, travel);
        const y = mix(vh * 0.68, vh * 0.105, travel);
        const scale = mix(1.03, 0.63, travel);
        const rotate = mix(-0.45, 0.2, travel) * (1 - settle);
        const residueOpacity = mix(1, 0.24, residueFade);
        const restoredOpacity = mix(residueOpacity, 0.64, provenanceReturn);
        const sourceOpacity = enter * restoredOpacity * (1 - finalResolve);
        source.style.opacity = String(sourceOpacity);
        source.style.visibility = sourceOpacity > 0.02 ? 'visible' : 'hidden';
        source.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
      }

      const branchProgress = range(p, 0.205, 0.33);
      branchPaths.forEach((path, index) => {
        const length = Number(path.dataset.pathLength || 1000);
        const staggered = range(branchProgress, index * 0.07, 0.58 + index * 0.07);
        path.style.strokeDashoffset = String(length * (1 - staggered));
        path.style.opacity = String(mix(0.22, 0.92, staggered));
      });

      setActiveWorld(worldItems, worldLabels, range(p, 0.33, 0.455));

      const weightProgress = range(p, 0.455, 0.58);
      masses.forEach((mass, index) => {
        const stagger = range(weightProgress, index * 0.05, 0.52 + index * 0.05);
        mass.style.transform = `translate3d(0, ${mix(8, 0, stagger)}%, 0) scaleY(${mix(0.045, 1, stagger)})`;
        mass.style.opacity = String(mix(0.12, 1, stagger));
      });

      if (timeLater) {
        const timeProgress = range(p, 0.58, 0.705);
        const split = mix(100, 48, timeProgress);
        timeLater.style.clipPath = `inset(0 0 0 ${split}%)`;
        timeFrame?.style.setProperty('--home-time-split', `${split}%`);
        if (timeBaseImage) timeBaseImage.style.transform = `translate3d(${mix(0, -3.8, timeProgress)}%, 0, 0) scale(${mix(1.035, 1.085, timeProgress)})`;
        if (timeLaterImage) timeLaterImage.style.transform = `translate3d(${mix(4.5, 0, timeProgress)}%, 0, 0) scale(${mix(1.085, 1.035, timeProgress)})`;
      }

      const provenanceProgress = range(p, 0.705, 0.83);
      provenanceSteps.forEach((step, index) => {
        const reveal = range(provenanceProgress, index * 0.1, 0.39 + index * 0.1);
        step.style.opacity = String(reveal);
        step.style.transform = `translate3d(${mix(52, 0, reveal)}px, ${mix(8, 0, reveal)}px, 0)`;
      });

      if (recordObject) {
        const recordProgress = range(p, 0.83, 0.965);
        recordObject.style.transform = `translate3d(${mix(7, 0, recordProgress)}vw, ${mix(60, 0, recordProgress)}px, 0) scale(${mix(0.925, 1, recordProgress)}) rotate(${mix(0.8, 0, recordProgress)}deg)`;
        recordObject.style.opacity = String(recordProgress);
      }
    };

    render(0);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      snap: {
        snapTo: boundedSnapStop,
        duration: { min: 0.78, max: 1.15 },
        delay: 0.3,
        ease: 'power2.out',
      },
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
      onSnapComplete: (self) => { settledScene = closestSceneStop(self.progress); },
      onRefresh: (self) => {
        if (!initialized) {
          settledScene = closestSceneStop(self.progress);
          initialized = true;
        }
        render(self.progress);
      },
    });

    return () => {
      trigger.kill();
      delete stage.dataset.homeDominant;
      stage.style.removeProperty('--home-progress');
      scenes.forEach((scene) => {
        removeInlineStyles(scene, ['opacity', 'visibility', 'pointer-events', 'transform', 'clip-path', 'z-index']);
        scene.removeAttribute('aria-hidden');
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

  return () => mm.revert();
}

export default mountHomeHumanTrace;
