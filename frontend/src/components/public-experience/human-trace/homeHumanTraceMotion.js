import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { observeScrollProgress, readingPosition } from './scrollProgress';

gsap.registerPlugin(ScrollTrigger);

// The first entry retires the old hero slot. Every subsequent interval has a
// complete reading hold; progress never depends on snapping or wheel callbacks.
const HOME_HANDOFFS = [
  [-0.05, 0], [0.10, 0.15], [0.25, 0.30],
  [0.64, 0.69], [0.77, 0.82], [0.89, 0.94],
];
const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const range = (value, start, end) => smooth((value - start) / Math.max(0.0001, end - start));
const mix = (a, b, value) => a + (b - a) * clamp(value);

function sceneReveal(index, enter) {
  const remaining = ((1 - enter) * 100).toFixed(3);
  if (enter >= 0.9999) return 'none';
  if (index === 1) return `inset(${remaining}% 0 0 0)`;
  if (index === 2) return `circle(${(enter * 150).toFixed(3)}% at 70% 46%)`;
  if (index === 4) return `inset(0 0 ${remaining}% 0)`;
  if (index === 5) return `inset(${((1 - enter) * 48).toFixed(3)}% ${((1 - enter) * 46).toFixed(3)}%)`;
  if (index === 6) return `inset(0 0 0 ${remaining}%)`;
  if (index === 7) return `inset(${remaining}% 0 0 0)`;
  return `inset(0 ${remaining}% 0 0)`;
}

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


function paintScene(scene, index, progress, weight, dominant, headings) {
  const previousHandoff = HOME_HANDOFFS[index - 1];
  const enter = index === 0 ? 1 : range(progress, previousHandoff[0], previousHandoff[1]);
  const visible = weight > 0.001;
  scene.style.opacity = visible ? '1' : '0';
  scene.style.visibility = visible ? 'visible' : 'hidden';
  scene.style.pointerEvents = index === dominant ? 'auto' : 'none';
  scene.style.transform = 'none';
  scene.style.clipPath = sceneReveal(index, enter);
  scene.style.zIndex = String(index + 1);
  scene.setAttribute('aria-hidden', String(index !== dominant));
  scene.inert = index !== dominant;
  const textEnter = index === 1 ? 1 : range(progress, previousHandoff[0] + 0.012, previousHandoff[1] + 0.014);
  headings.forEach((heading) => {
    const distance = index === 1 ? 48 : index === 2 || index === 4 ? 0 : 24;
    heading.style.transform = `translate3d(0, ${((1 - textEnter) * Math.max(26, distance)).toFixed(2)}px, 0)`;
    heading.style.clipPath = `inset(0 0 ${((1 - textEnter) * 100).toFixed(2)}% 0)`;
  });
}

function setActiveWorld(items, labels, progress) {
  const position = readingPosition(progress, items.length);
  const current = Math.min(items.length - 1, Math.round(position));

  items.forEach((item, index) => {
    const delta = index - position;
    const distance = Math.abs(delta);
    const visible = distance < 1.06;
    item.style.opacity = visible ? '1' : '0';
    item.style.visibility = visible ? 'visible' : 'hidden';
    item.style.transform = `translate3d(${delta * 100}%, 0, 0)`;
    item.style.clipPath = 'none';
    item.style.zIndex = String(index === current ? 3 : 2);
    item.setAttribute('aria-hidden', String(index !== current));
    const image = item.querySelector('img');
    if (image) image.style.transform = `translate3d(${delta * -7}%, 0, 0) scale(1.09)`;
    const copy = item.querySelector('.vt-home-world__copy');
    if (copy) { copy.style.transform = `translate3d(${delta * 32}px, 0, 0)`; copy.style.opacity = String(1 - Math.min(1, distance * 1.5)); }
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
  const sceneHeadings = scenes.map((scene) => [...scene.querySelectorAll('h1,h2')]);
  const worldItems = [...root.querySelectorAll('[data-home-world]')];
  const worldLabels = [...root.querySelectorAll('[data-home-world-label]')];
  const branchPaths = [...root.querySelectorAll('[data-home-branch-path]')];
  const masses = [...root.querySelectorAll('[data-home-mass]')];
  const timeFrame = root.querySelector('[data-home-time-frame]');
  const timeLater = root.querySelector('[data-home-time-later]');
  const timeBaseImage = timeFrame?.querySelector(':scope > picture img');
  const timeLaterImage = timeLater?.querySelector('img');
  const provenanceSteps = [...root.querySelectorAll('[data-home-provenance-step]')];

  if (!track || !stage || !scenes.length) return () => {};

  branchPaths.forEach((path) => {
    const length = typeof path.getTotalLength === 'function' ? path.getTotalLength() : 1000;
    path.style.strokeDasharray = `${length} ${length}`;
    path.dataset.pathLength = String(length);
  });

  const mm = gsap.matchMedia();

  mm.add({ desktop: '(min-width:901px)', motion: '(prefers-reduced-motion:no-preference)' }, (mediaContext) => {
    if (!mediaContext.conditions.motion) return undefined;
    const opening = root.querySelector('[data-home-opening]');
    const media = root.querySelector('[data-opening-media]');
    const detail = root.querySelector('[data-opening-detail]');
    const openingCopy = root.querySelector('.vt-home-opening-copy');
    const perspectiveTrack = root.querySelector('[data-home-perspectives]');
    const words = [...root.querySelectorAll('.vt-home-reveal-word')];
    const perspectivePhotos = [...root.querySelectorAll('.vt-home-perspectives-photos figure')];
    const bookTrack = root.querySelector('[data-home-book-track]');
    const book = root.querySelector('[data-home-book]');
    const cover = root.querySelector('[data-home-book-cover]');
    const bookPage = book?.querySelector('.vt-home-book-page');
    const desktop = mediaContext.conditions.desktop;
    const context = gsap.context(() => {
      gsap.fromTo('.vt-home-opening-copy h1 span', { y: 42, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.45, stagger: 0.16, ease: 'power2.out', clearProps: 'transform,opacity,clipPath' });
      gsap.fromTo('.vt-home-opening-copy .vt-home-human-bottom', { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.45, ease: 'power2.out', clearProps: 'transform,opacity' });
    }, root);
    const stops = [];
    if (desktop) {
      stops.push(observeScrollProgress(opening, (p) => {
        const movement = range(p, 0.08, 0.85);
        media.style.clipPath = `inset(${mix(12, 0, movement)}% ${mix(4, 0, movement)}% ${mix(10, 0, movement)}% ${mix(32, 0, movement)}%)`;
        media.querySelector('img').style.transform = `scale(${mix(1.08, 1, movement)})`;
        openingCopy.style.transform = `translate3d(0, ${mix(0, -8, movement)}vh, 0)`;
        detail.style.transform = `translate3d(0, ${mix(0, -15, movement)}vh, 0) rotate(${mix(-3, 0, movement)}deg)`;
        detail.style.opacity = String(1 - range(p, 0.45, 0.85));
      }, { response: 280 }));
    }
    stops.push(observeScrollProgress(perspectiveTrack, (p) => {
      const reading = range(p, 0.10, 0.72);
      words.forEach((word, index) => { word.style.opacity = String(mix(0.2, 1, range(reading, index / words.length * 0.8, (index + 2) / words.length * 0.8))); });
      perspectivePhotos.forEach((photo, index) => {
        const directions = [-1, 1, -1];
        const fromY = desktop ? 10 + index * 3 : 2 + index;
        const toY = desktop ? -14 - index * 5 : -4 - index;
        photo.style.transform = `translate3d(${mix(0, directions[index] * 5, p)}vw, ${mix(fromY, toY, p)}vh, 0) rotate(${mix(directions[index] * 4, 0, p)}deg)`;
        photo.style.opacity = String(1 - range(p, 0.78, 1));
      });
    }, { response: 280 }));
    stops.push(observeScrollProgress(bookTrack, (p) => {
      const open = range(p, 0.12, 0.66);
      if (desktop) {
        book.style.transform = `translate3d(0, ${mix(5, 0, open)}vh, 0) rotate(${mix(4, 0, open)}deg)`;
        cover.style.transform = `rotateY(${mix(0, 156, open)}deg)`;
        bookPage.inert = open < 0.55 && !bookPage.contains(document.activeElement);
        cover.style.visibility = open > 0.99 ? 'hidden' : 'visible';
      } else {
        cover.style.opacity = String(1 - range(p, 0, 0.38));
        cover.style.visibility = p > 0.4 ? 'hidden' : 'visible';
      }
    }, { response: 260 }));
    return () => {
      stops.forEach((stop) => stop());
      if (bookPage) bookPage.inert = false;
      context.revert();
      [media, detail, openingCopy, book, cover, ...words, ...perspectivePhotos].forEach((element) => removeInlineStyles(element, ['transform', 'opacity', 'clip-path', 'visibility']));
      removeInlineStyles(media?.querySelector('img'), ['transform']);
    };
  });

  mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
    const render = (progress) => {
      const p = clamp(progress);
      const weights = sceneWeights(p);
      const dominant = dominantIndex(weights);
      stage.dataset.homeDominant = scenes.find((scene) => Number(scene.dataset.homeScene) === dominant)?.dataset.homeSceneId || 'source';
      stage.style.setProperty('--home-progress', String(p));

      scenes.forEach((scene, index) => paintScene(scene, Number(scene.dataset.homeScene), p, weights[Number(scene.dataset.homeScene)], dominant, sceneHeadings[index]));

      const branchProgress = range(p, 0.14, 0.23);
      branchPaths.forEach((path, index) => {
        const length = Number(path.dataset.pathLength || 1000);
        const staggered = range(branchProgress, index * 0.07, 0.58 + index * 0.07);
        path.style.strokeDashoffset = String(length * (1 - staggered));
        path.style.opacity = String(mix(0.22, 0.92, staggered));
      });

      setActiveWorld(worldItems, worldLabels, clamp((p - 0.31) / 0.32));

      const weightProgress = range(p, 0.68, 0.74);
      masses.forEach((mass, index) => {
        const stagger = range(weightProgress, index * 0.05, 0.52 + index * 0.05);
        mass.style.setProperty('--bar-reveal', String(stagger));
      });

      if (timeLater) {
        const timeProgress = range(p, 0.81, 0.86);
        const split = mix(100, 48, timeProgress);
        timeLater.style.clipPath = `inset(0 0 0 ${split}%)`;
        timeFrame?.style.setProperty('--home-time-split', `${split}%`);
        if (timeBaseImage) timeBaseImage.style.transform = `translate3d(${mix(0, -3.8, timeProgress)}%, 0, 0) scale(${mix(1.035, 1.085, timeProgress)})`;
        if (timeLaterImage) timeLaterImage.style.transform = `translate3d(${mix(4.5, 0, timeProgress)}%, 0, 0) scale(${mix(1.085, 1.035, timeProgress)})`;
      }

      const provenanceProgress = range(p, 0.93, 0.975);
      provenanceSteps.forEach((step, index) => {
        const reveal = range(provenanceProgress, index * 0.1, 0.39 + index * 0.1);
        step.style.opacity = String(reveal);
        step.style.transform = `translate3d(${mix(52, 0, reveal)}px, ${mix(8, 0, reveal)}px, 0)`;
      });


    };

    render(0);

    const stop = observeScrollProgress(track, render, { response: 280 });

    return () => {
      stop();
      delete stage.dataset.homeDominant;
      stage.style.removeProperty('--home-progress');
      scenes.forEach((scene) => {
        removeInlineStyles(scene, ['opacity', 'visibility', 'pointer-events', 'transform', 'clip-path', 'z-index']);
        scene.removeAttribute('aria-hidden');
        scene.inert = false;
        scene.querySelectorAll('h1,h2').forEach((heading) => removeInlineStyles(heading, ['transform', 'clip-path']));
      });
      branchPaths.forEach((path) => removeInlineStyles(path, ['stroke-dasharray', 'stroke-dashoffset', 'opacity']));
      worldItems.forEach((item) => {
        removeInlineStyles(item, ['opacity', 'visibility', 'transform', 'clip-path', 'z-index']);
        item.removeAttribute('aria-hidden');
        removeInlineStyles(item.querySelector('img'), ['transform']);
        removeInlineStyles(item.querySelector('.vt-home-world__copy'), ['transform', 'opacity']);
      });
      worldLabels.forEach((label) => label.classList.remove('is-active'));
      masses.forEach((mass) => removeInlineStyles(mass, ['transform', 'opacity', '--bar-reveal']));
      removeInlineStyles(timeLater, ['clip-path']);
      removeInlineStyles(timeBaseImage, ['transform']);
      removeInlineStyles(timeLaterImage, ['transform']);
      timeFrame?.style.removeProperty('--home-time-split');
      provenanceSteps.forEach((step) => removeInlineStyles(step, ['opacity', 'transform']));
    };
  });

  mm.add('(max-width:900px) and (prefers-reduced-motion:no-preference)', () => {
    const context = gsap.context(() => {
      root.querySelectorAll('.vt-home-scene h2').forEach((heading) => {
        gsap.fromTo(heading, { y: 40, opacity: 0.4 }, { y: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: heading, start: 'top 95%', end: 'top 55%', scrub: 0.9 } });
      });
      worldItems.forEach((item) => gsap.fromTo(item.querySelector('img'), { yPercent: -7, scale: 1.16 },
        { yPercent: 7, scale: 1.05, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 0.9 } }));
    }, root);
    return () => context.revert();
  });

  return () => mm.revert();
}

export default mountHomeHumanTrace;
