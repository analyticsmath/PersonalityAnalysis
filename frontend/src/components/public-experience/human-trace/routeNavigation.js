import { flushSync } from 'react-dom';

let active, epoch=0;
const owners=new WeakMap();
const visibleArea = element => {
  const rect=element.getBoundingClientRect();
  return Math.max(0,Math.min(rect.right,window.innerWidth)-Math.max(rect.left,0))*Math.max(0,Math.min(rect.bottom,window.innerHeight)-Math.max(rect.top,0));
};
/** One request owns navigation and its snapshots. A later click supersedes pending callbacks. */
export function navigateCinematic(navigate, path, origin) {
  if (window.location.pathname + window.location.search === path) return;
  const request=++epoch;
  const root = origin?.getRootNode() || document;
  const current = root.querySelector('[data-transition-media], .vt-cover-media');
  const explicit = origin?.closest('[data-transition-media]') || origin?.querySelector('img');
  const visible=[...root.querySelectorAll('[data-transition-media], .vt-cover-media')].sort((a,b)=>visibleArea(b)-visibleArea(a))[0];
  const selected=explicit || (visible && visibleArea(visible)>0 ? visible : null);
  let applied = false, timer;
  const update = async () => {
    if (applied || request!==epoch) return;
    applied = true;
    flushSync(() => navigate(path));
    window.scrollTo({ top: 0, behavior: 'instant' });
    const destination = document.querySelector('.vt-cover-media') || document.querySelector('.vt-human-trace-host')?.shadowRoot?.querySelector('#hero-actor');
    if (destination) destination.style.viewTransitionName = 'scene-media';
    const image = destination?.querySelector('img');
    if (image && !image.complete && typeof image.decode === 'function') {
      await Promise.race([image.decode().catch(() => {}), new Promise(resolve => window.setTimeout(resolve, 350))]);
    }
    if (request!==epoch) return;
    const heading = document.querySelector('main h1') || document.querySelector('.vt-human-trace-host')?.shadowRoot?.querySelector('h1');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
  };
  const finish = () => {
    if (!applied && request===epoch) update();
    window.clearTimeout(timer);
    if (selected?.isConnected && owners.get(selected)===request) {selected.style.viewTransitionName='';owners.delete(selected);}
    if (document.documentElement.dataset.cinematicTransition===String(request)) delete document.documentElement.dataset.cinematicTransition;
  };
  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      active?.skipTransition();
      if (current) current.style.viewTransitionName = 'none';
      if (selected) {selected.style.viewTransitionName = 'scene-media';owners.set(selected,request);}
      document.documentElement.dataset.cinematicTransition=String(request);
      const transition = document.startViewTransition(update);
      active = transition;
      transition.ready.catch(() => {});
      transition.updateCallbackDone.catch(update);
      transition.finished.catch(() => {}).finally(() => {finish();if(active===transition)active=null;});
      timer=window.setTimeout(update,450);
    } catch {finish();update();}
  } else {active?.skipTransition();delete document.documentElement.dataset.cinematicTransition;update();}
}
