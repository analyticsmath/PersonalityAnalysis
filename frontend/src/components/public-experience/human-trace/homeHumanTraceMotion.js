import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HOME_KNOTS = [0, 0.12, 0.28, 0.49, 0.64, 0.76, 0.88, 1];
const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const range = (value, start, end) => smooth((value - start) / Math.max(0.0001, end - start));
const mix = (a, b, value) => a + (b - a) * clamp(value);

function sceneWeights(progress) {
  const p = clamp(progress);
  const weights = HOME_KNOTS.map(() => 0);

  if (p <= HOME_KNOTS[0]) {
    weights[0] = 1;
    return weights;
  }
  if (p >= HOME_KNOTS.at(-1)) {
    weights[weights.length - 1] = 1;
    return weights;
  }

  for (let index = 0; index < HOME_KNOTS.length - 1; index += 1) {
    const start = HOME_KNOTS[index];
    const end = HOME_KNOTS[index + 1];
    if (p < start || p > end) continue;
    const local = smooth((p - start) / Math.max(0.0001, end - start));
    weights[index] = 1 - local;
    weights[index + 1] = local;
    return weights;
  }

  weights[0] = 1;
  return weights;
}

function dominantIndex(weights) {
  let best = 0;
  for (let i = 1; i < weights.length; i += 1) {
    if (weights[i] > weights[best]) best = i;
  }
  return best;
}

function setActiveWorld(items, labels, progress) {
  const position = clamp(progress) * Math.max(0, items.length - 1);
  const current = Math.min(items.length - 1, Math.round(position));

  items.forEach((item, index) => {
    const delta = index - position;
    const distance = Math.abs(delta);
    const visible = distance < 1.05;
    item.style.opacity = visible ? String(Math.max(0, 1 - distance * 0.88)) : '0';
    item.style.visibility = visible ? 'visible' : 'hidden';
    item.style.transform = `translate3d(0, ${delta * 16}%, 0) scale(${1 + Math.max(-0.04, 0.035 * (1 - distance))})`;
    item.style.clipPath = delta > 0 ? `inset(${Math.min(100, distance * 45)}% 0 0 0)` : 'inset(0)';
    item.setAttribute('aria-hidden', String(index !== current));
  });

  labels.forEach((label, index) => {
    label.classList.toggle('is-active', index === current);
  });
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
  const timeLater = root.querySelector('[data-home-time-later]');
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
    const render = (progress) => {
      const p = clamp(progress);
      const weights = sceneWeights(p);
      const dominant = dominantIndex(weights);
      stage.dataset.homeDominant = scenes[dominant]?.dataset.homeSceneId || 'human';

      scenes.forEach((scene, index) => {
        const weight = weights[index];
        const visible = weight > 0.015;
        const direction = index < dominant ? -1 : index > dominant ? 1 : 0;
        scene.style.opacity = String(weight);
        scene.style.visibility = visible ? 'visible' : 'hidden';
        scene.style.pointerEvents = weight > 0.62 ? 'auto' : 'none';
        scene.style.transform = `translate3d(0, ${direction * (1 - weight) * 38}px, 0)`;
        scene.setAttribute('aria-hidden', String(!visible));
      });

      if (scrollCue) {
        const cueOpacity = 1 - range(p, 0.015, 0.07);
        scrollCue.style.opacity = String(cueOpacity);
        scrollCue.style.visibility = cueOpacity > 0.01 ? 'visible' : 'hidden';
      }

      if (worldMedia) {
        const sourceTakeover = range(p, 0.08, 0.2);
        const darken = range(p, 0.12, 0.33);
        worldMedia.style.transform = `scale(${mix(1.02, 1.13, sourceTakeover)}) translate3d(0, ${mix(0, -2.5, p)}%, 0)`;
        worldMedia.style.setProperty('--home-veil-opacity', String(mix(0.08, 0.72, darken)));
        worldMedia.style.opacity = String(mix(1, 0.22, range(p, 0.3, 0.58)) + mix(0, 0.36, range(p, 0.7, 0.84)));
      }

      if (source) {
        const enter = range(p, 0.075, 0.16);
        const travel = range(p, 0.22, 0.46);
        const residueFade = range(p, 0.42, 0.58);
        const provenanceReturn = range(p, 0.80, 0.89);
        const finalResolve = range(p, 0.93, 0.985);
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const x = mix(vw * 0.08, vw * 0.56, travel);
        const y = mix(vh * 0.66, vh * 0.09, travel);
        const scale = mix(1, 0.64, travel);
        const residueOpacity = mix(1, 0.3, residueFade);
        const restoredOpacity = mix(residueOpacity, 0.58, provenanceReturn);
        const sourceOpacity = enter * restoredOpacity * (1 - finalResolve);
        source.style.opacity = String(sourceOpacity);
        source.style.visibility = sourceOpacity > 0.02 ? 'visible' : 'hidden';
        source.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      }

      const branchProgress = range(p, 0.245, 0.39);
      branchPaths.forEach((path, index) => {
        const length = Number(path.dataset.pathLength || 1000);
        const staggered = range(branchProgress, index * 0.08, 0.62 + index * 0.08);
        path.style.strokeDashoffset = String(length * (1 - staggered));
      });

      setActiveWorld(worldItems, worldLabels, range(p, 0.39, 0.59));

      const weightProgress = range(p, 0.565, 0.72);
      masses.forEach((mass, index) => {
        const stagger = range(weightProgress, index * 0.055, 0.55 + index * 0.055);
        mass.style.transform = `scaleY(${mix(0.08, 1, stagger)})`;
        mass.style.opacity = String(mix(0.18, 1, stagger));
      });

      if (timeLater) {
        const timeProgress = range(p, 0.7, 0.835);
        timeLater.style.clipPath = `inset(0 0 0 ${mix(100, 47, timeProgress)}%)`;
      }

      const provenanceProgress = range(p, 0.805, 0.93);
      provenanceSteps.forEach((step, index) => {
        const reveal = range(provenanceProgress, index * 0.12, 0.42 + index * 0.12);
        step.style.opacity = String(reveal);
        step.style.transform = `translate3d(${mix(40, 0, reveal)}px, 0, 0)`;
      });

      if (recordObject) {
        const recordProgress = range(p, 0.91, 1);
        recordObject.style.transform = `translate3d(0, ${mix(70, 0, recordProgress)}px, 0) scale(${mix(0.94, 1, recordProgress)})`;
        recordObject.style.opacity = String(recordProgress);
      }
    };

    render(0);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.32,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });

    return () => {
      trigger.kill();
      scenes.forEach((scene) => {
        scene.style.removeProperty('opacity');
        scene.style.removeProperty('visibility');
        scene.style.removeProperty('pointer-events');
        scene.style.removeProperty('transform');
        scene.removeAttribute('aria-hidden');
      });
    };
  });

  return () => mm.revert();
}

export default mountHomeHumanTrace;