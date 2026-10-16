import { flushSync } from 'react-dom';
import { preloadRoute } from '../motion/routePreloadRegistry';
import {
  TRANSITION_FAMILIES,
  clearTransitionName,
  findSemanticActor,
  resolveTransitionFamily,
  semanticActorFromOrigin,
} from './semanticTransitions';

let activeTransition = null;
let activeFallbackAnimation = null;
let activePendingTimer = null;
let activePendingRequest = 0;
let epoch = 0;

function clearPendingIndicator(request) {
  if (activePendingRequest !== request) return;
  if (activePendingTimer) window.clearTimeout(activePendingTimer);
  activePendingTimer = null;
  delete document.documentElement.dataset.cinematicPending;
}

function routeMain() {
  return document.querySelector('#cinema-main, #main-content');
}

function focusDestination() {
  const heading = document.querySelector('#cinema-main h1, #main-content h1');
  if (!heading) return;
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
}

function resetTransitionDocumentState() {
  delete document.documentElement.dataset.cinematicTransition;
  delete document.documentElement.dataset.cinematicTransitionFamily;
}

function waitForDestination(family, preferredKey, request) {
  const started = performance.now();

  return new Promise((resolve) => {
    const inspect = () => {
      const expired = performance.now() - started >= 1000;
      if (request !== epoch || expired) {
        resolve(family === TRANSITION_FAMILIES.QUIET
          ? null
          : findSemanticActor(document, family, preferredKey));
        return;
      }

      const main = routeMain();
      const heading = main?.querySelector('h1');
      const page = main?.querySelector('.vt-route, [data-route-ready="true"]');
      const actor = family === TRANSITION_FAMILIES.QUIET
        ? null
        : findSemanticActor(document, family, preferredKey);

      if (heading || page) {
        resolve(actor);
        return;
      }

      window.requestAnimationFrame(inspect);
    };

    inspect();
  });
}

function animateRouteNode(element, keyframes, duration) {
  if (!element?.animate) return null;
  return element.animate(keyframes, {
    duration,
    easing: 'cubic-bezier(.76, 0, .24, 1)',
    fill: 'both',
  });
}

async function updateRoute(navigate, path, family, preferredKey, request) {
  flushSync(() => navigate(path));
  window.scrollTo({ top: 0, behavior: 'auto' });

  const destination = await waitForDestination(family, preferredKey, request);
  if (request !== epoch) return null;

  if (family !== TRANSITION_FAMILIES.QUIET && destination) {
    destination.style.viewTransitionName = 'vt-semantic-actor';
    const image = destination.querySelector('img');
    if (image && !image.complete && typeof image.decode === 'function') {
      await Promise.race([
        image.decode().catch(() => {}),
        new Promise((resolve) => window.setTimeout(resolve, 280)),
      ]);
    }
  }

  if (request === epoch) focusDestination();
  return destination;
}

async function runFallbackTransition(navigate, path, family, preferredKey, request, update) {
  const outgoing = routeMain();
  const distance = family === TRANSITION_FAMILIES.QUIET ? 8 : 18;
  const exit = animateRouteNode(outgoing, [
    { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
    { opacity: 0, transform: `translate3d(-${distance}px, 0, 0) scale(.996)` },
  ], 320);

  activeFallbackAnimation = exit;
  if (exit) await exit.finished.catch(() => {});
  if (request !== epoch) {
    exit?.cancel();
    return;
  }

  const destination = await update();
  exit?.cancel();
  if (activeFallbackAnimation === exit) activeFallbackAnimation = null;
  if (request !== epoch) return;

  const incoming = routeMain();
  if (!incoming) return;
  const enterDistance = family === TRANSITION_FAMILIES.QUIET ? 8 : 18;
  const enter = animateRouteNode(incoming, [
    { opacity: 0, transform: `translate3d(${enterDistance}px, 0, 0) scale(.996)` },
    { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
  ], 720);
  activeFallbackAnimation = enter;
  if (enter) await enter.finished.catch(() => {});
  enter?.cancel();
  if (activeFallbackAnimation === enter) activeFallbackAnimation = null;
}

/**
 * Preload the destination while the current page remains visible, then animate
 * the route change with the native API or an equivalent Web Animations fallback.
 */
export function navigateCinematic(navigate, path, origin) {
  const currentUrl = window.location.pathname + window.location.search;
  if (currentUrl === path) return;

  const request = ++epoch;
  if (activePendingTimer) window.clearTimeout(activePendingTimer);
  activePendingTimer = null;
  activePendingRequest = request;
  delete document.documentElement.dataset.cinematicPending;
  activeTransition?.skipTransition?.();
  activeFallbackAnimation?.cancel();
  activeFallbackAnimation = null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sourceRoot = origin?.getRootNode?.() || document;
  const explicitActor = semanticActorFromOrigin(origin);
  const explicitFamily = explicitActor?.dataset.transitionFamily;
  const preferredKey = explicitActor?.dataset.transitionKey;
  const family = resolveTransitionFamily(window.location.pathname, path, explicitFamily);
  const source = family === TRANSITION_FAMILIES.QUIET
    ? null
    : (explicitActor || findSemanticActor(sourceRoot, family, preferredKey));

  let destination = null;
  let applied = false;

  const cleanup = () => {
    clearPendingIndicator(request);
    clearTransitionName(source);
    clearTransitionName(destination);
    resetTransitionDocumentState();
  };

  const update = async () => {
    if (applied || request !== epoch) return null;
    applied = true;
    destination = await updateRoute(navigate, path, family, preferredKey, request);
    return destination;
  };

  const begin = async () => {
    activePendingTimer = window.setTimeout(() => {
      activePendingTimer = null;
      if (request === epoch && activePendingRequest === request) {
        document.documentElement.dataset.cinematicPending = String(request);
      }
    }, 140);
    await preloadRoute(path).catch(() => {});
    clearPendingIndicator(request);
    if (request !== epoch) return;

    if (reducedMotion) {
      cleanup();
      await update();
      return;
    }

    if (!document.startViewTransition) {
      try {
        await runFallbackTransition(navigate, path, family, preferredKey, request, update);
      } finally {
        if (request === epoch) cleanup();
      }
      return;
    }

    try {
      if (source) source.style.viewTransitionName = 'vt-semantic-actor';
      document.documentElement.dataset.cinematicTransition = String(request);
      document.documentElement.dataset.cinematicTransitionFamily = family;

      const transition = document.startViewTransition(update);
      activeTransition = transition;
      transition.ready.catch(() => {});
      transition.updateCallbackDone.catch(update);
      transition.finished
        .catch(() => {})
        .finally(() => {
          cleanup();
          if (activeTransition === transition) activeTransition = null;
        });
    } catch {
      cleanup();
      await runFallbackTransition(navigate, path, family, preferredKey, request, update);
      if (request === epoch) cleanup();
    }
  };

  begin().catch(() => {
    if (request === epoch) cleanup();
    else clearPendingIndicator(request);
  });
}
