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

function waitForDestination(family, preferredKey, request) {
  const started = performance.now();

  return new Promise((resolve) => {
    const inspect = () => {
      if (request !== epoch || performance.now() - started >= 1600) {
        resolve(family === TRANSITION_FAMILIES.QUIET
          ? null
          : findSemanticActor(document, family, preferredKey));
        return;
      }

      const heading = document.querySelector('#cinema-main h1');
      const actor = family === TRANSITION_FAMILIES.QUIET
        ? null
        : findSemanticActor(document, family, preferredKey);

      if (heading) {
        resolve(actor);
        return;
      }

      window.requestAnimationFrame(inspect);
    };

    inspect();
  });
}

/**
 * Keep the old view in place until the lazy destination has mounted, then
 * let the browser capture the complete page for its view transition.
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

  const cleanup = () => {
    clearTransitionName(source);
    clearTransitionName(destination);
    resetTransitionDocumentState();
  };

  const update = async () => {
    if (applied || request !== epoch) return;
    applied = true;
    flushSync(() => navigate(path));
    window.scrollTo({ top: 0, behavior: 'auto' });

    destination = await waitForDestination(family, preferredKey, request);
    if (request !== epoch) return;
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
  } catch {
    cleanup();
    update();
  }
}
