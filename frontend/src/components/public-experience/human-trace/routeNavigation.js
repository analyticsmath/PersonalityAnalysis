import { flushSync } from 'react-dom';
import {
  TRANSITION_FAMILIES,
  clearTransitionName,
  findSemanticActor,
  resolveTransitionFamily,
  semanticActorFromOrigin,
} from './semanticTransitions';

let activeTransition = null;
let epoch = 0;

function focusDestination() {
  const heading = document.querySelector('#cinema-main h1');
  if (!heading) return;
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
}

function resetTransitionDocumentState() {
  delete document.documentElement.dataset.cinematicTransition;
  delete document.documentElement.dataset.cinematicTransitionFamily;
}

/**
 * Same-document navigation with authored semantic carries.
 * Missing matching actors deliberately fall back to a quiet route transition rather
 * than guessing a target rectangle or selecting the largest visible image.
 */
export function navigateCinematic(navigate, path, origin) {
  const currentUrl = window.location.pathname + window.location.search;
  if (currentUrl === path) return;

  const request = ++epoch;
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
  let timer = null;

  const cleanup = () => {
    clearTransitionName(source);
    clearTransitionName(destination);
    resetTransitionDocumentState();
    if (timer) window.clearTimeout(timer);
  };

  const update = async () => {
    if (applied || request !== epoch) return;
    applied = true;
    flushSync(() => navigate(path));
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (family !== TRANSITION_FAMILIES.QUIET) {
      destination = findSemanticActor(document, family, preferredKey) || findSemanticActor(document, family);
      if (destination) destination.style.viewTransitionName = 'vt-semantic-actor';
      const image = destination?.querySelector?.('img');
      if (image && !image.complete && typeof image.decode === 'function') {
        await Promise.race([
          image.decode().catch(() => {}),
          new Promise((resolve) => window.setTimeout(resolve, 280)),
        ]);
      }
    }

    if (request === epoch) focusDestination();
  };

  if (!document.startViewTransition || reducedMotion) {
    activeTransition?.skipTransition?.();
    cleanup();
    update();
    return;
  }

  try {
    activeTransition?.skipTransition?.();
    cleanup();

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

    timer = window.setTimeout(update, 420);
  } catch {
    cleanup();
    update();
  }
}
