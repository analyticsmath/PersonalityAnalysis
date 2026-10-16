import { flushSync } from 'react-dom';
import { preloadRoute } from '../motion/routePreloadRegistry';

let epoch = 0;
let cancelActive = () => {};

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
const main = () => document.querySelector('#cinema-main, #main-content');

async function destinationReady(request) {
  const started = performance.now();
  while (request === epoch && performance.now() - started < 4000) {
    const root = main();
    if (root?.querySelector('h1, [data-route-ready="true"], form')) {
      await nextFrame();
      return root;
    }
    await nextFrame();
  }
  return main();
}

function play(element, frames, duration, delay = 0) {
  const animation = element.animate(frames, {
    duration, delay, fill: 'both', easing: 'cubic-bezier(.76,0,.24,1)',
  });
  return animation;
}

export function navigateCinematic(navigate, path) {
  if (window.location.pathname + window.location.search === path) return;
  const request = ++epoch;
  cancelActive();
  const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const documentRoot = document.documentElement;
  const animations = [];
  const curtain = document.createElement('div');
  curtain.className = 'vt-route-curtain';
  curtain.setAttribute('aria-hidden', 'true');
  curtain.innerHTML = '<div class="vt-route-curtain__accent"></div><div class="vt-route-curtain__surface"><span class="vt-route-curtain__orbit"></span></div>';
  const accent = curtain.firstElementChild;
  const surface = curtain.lastElementChild;
  const outgoing = main();
  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    animations.forEach((animation) => animation.cancel());
    curtain.remove();
    if (request === epoch) delete documentRoot.dataset.cinematicTransition;
  };
  cancelActive = cleanup;

  const run = async () => {
    const preload = preloadRoute(path).catch(() => {});
    if (!reduced) {
      documentRoot.dataset.cinematicTransition = String(request);
      document.body.appendChild(curtain);
      const from = { transform: 'translate3d(0,110%,0)', borderRadius: '48% 48% 0 0' };
      const to = { transform: 'translate3d(0,0,0)', borderRadius: '0' };
      const first = play(accent, [from, to], 630);
      const cover = play(surface, [from, to], 680, 80);
      animations.push(first, cover);
      if (outgoing) animations.push(play(outgoing, [
        { transform: 'translate3d(0,0,0)', opacity: 1 },
        { transform: 'translate3d(0,-35px,0)', opacity: 0.55 },
      ], 650));
      await Promise.all([cover.finished.catch(() => {}), preload]);
    } else await preload;
    if (request !== epoch) return;
    flushSync(() => navigate(path));
    window.scrollTo({ top: 0, behavior: 'instant' });
    const incoming = await destinationReady(request);
    if (request !== epoch) return;
    window.dispatchEvent(new Event('cinematic:reveal'));
    if (!reduced) {
      const reveal = play(surface, [
        { transform: 'translate3d(0,0,0)', borderRadius: '0' },
        { transform: 'translate3d(0,-110%,0)', borderRadius: '0 0 45% 45%' },
      ], 950);
      animations.push(reveal, play(accent, [
        { transform: 'translate3d(0,0,0)' },
        { transform: 'translate3d(0,-110%,0)' },
      ], 820));
      if (incoming) animations.push(play(incoming, [
        { transform: 'translate3d(0,55px,0)' }, { transform: 'translate3d(0,0,0)' },
      ], 1100));
      await reveal.finished.catch(() => {});
    }
    const heading = incoming?.querySelector('h1');
    heading?.setAttribute('tabindex', '-1');
    heading?.focus({ preventScroll: true });
    cleanup();
  };
  run().catch(() => {
    cleanup();
    if (request === epoch) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
}
