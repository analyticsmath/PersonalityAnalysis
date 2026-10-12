import { flushSync } from 'react-dom';

let active;
/** Native snapshots retain the actual source/destination rectangles, including image-led links. */
export function navigateCinematic(navigate, path, origin) {
  if (window.location.pathname + window.location.search === path) return;
  const root = origin?.getRootNode() || document;
  const current = root.querySelector('[data-transition-media], .vt-cover-media');
  const selected = origin?.closest('[data-transition-media]') || origin?.querySelector('img') || current;
  if (current) current.style.viewTransitionName = 'none';
  if (selected) selected.style.viewTransitionName = 'scene-media';
  let applied = false;
  const update = () => {
    if (applied) return;
    applied = true;
    flushSync(() => navigate(path));
    window.scrollTo({ top: 0, behavior: 'instant' });
    const destination = document.querySelector('.vt-cover-media') || document.querySelector('.vt-human-trace-host')?.shadowRoot?.querySelector('#hero-actor');
    if (destination) destination.style.viewTransitionName = 'scene-media';
    const heading = document.querySelector('main h1') || document.querySelector('.vt-human-trace-host')?.shadowRoot?.querySelector('h1');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
  };
  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      active?.skipTransition();
      const transition = document.startViewTransition(update);
      active = transition;
      transition.ready.catch(() => {});
      transition.updateCallbackDone.catch(update);
      transition.finished.catch(() => {}).finally(() => {
        if (selected?.isConnected) selected.style.viewTransitionName = '';
        if (active === transition) active = null;
      });
      window.setTimeout(update, 450);
    } catch { update(); }
  } else update();
}
