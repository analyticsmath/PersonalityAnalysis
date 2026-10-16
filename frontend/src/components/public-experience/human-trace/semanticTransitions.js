export const TRANSITION_FAMILIES = {
  HUMAN_TRACE: 'human-trace',
  CONTEXT_MEDIA: 'context-media',
  QUIET: 'quiet-editorial',
};

const HUMAN_TRACE_ROUTES = new Set(['/', '/how-it-works', '/trust']);
const CONTEXT_ROUTES = new Set(['/', '/career-intelligence', '/progress']);

export function routePath(value) {
  if (!value) return '/';
  try {
    return new URL(value, window.location.origin).pathname;
  } catch {
    return String(value).split('?')[0] || '/';
  }
}

export function resolveTransitionFamily(fromPath, toPath, explicitFamily) {
  if (explicitFamily && Object.values(TRANSITION_FAMILIES).includes(explicitFamily)) {
    return explicitFamily;
  }

  const from = routePath(fromPath);
  const to = routePath(toPath);

  if (HUMAN_TRACE_ROUTES.has(from) && HUMAN_TRACE_ROUTES.has(to)) {
    return TRANSITION_FAMILIES.HUMAN_TRACE;
  }

  if (CONTEXT_ROUTES.has(from) && CONTEXT_ROUTES.has(to)) {
    return TRANSITION_FAMILIES.CONTEXT_MEDIA;
  }

  return TRANSITION_FAMILIES.QUIET;
}

export function transitionActorSelector(family) {
  return `[data-transition-family="${family}"]`;
}

function isVisibleTransitionActor(node) {
  if (!node?.getClientRects?.().length) return false;

  const rect = node.getBoundingClientRect();
  const area = rect.width * rect.height;
  if (area <= 0) return false;

  const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
  const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
  if ((visibleWidth * visibleHeight) / area < 0.08) return false;

  let current = node;
  while (current && current.nodeType === 1) {
    const style = window.getComputedStyle(current);
    if (
      style.display === 'none'
      || style.visibility === 'hidden'
      || Number(style.opacity) <= 0.02
      || current.getAttribute('aria-hidden') === 'true'
    ) return false;
    current = current.parentElement;
  }

  return true;
}

export function findSemanticActor(root, family, preferredKey) {
  if (!root?.querySelectorAll || family === TRANSITION_FAMILIES.QUIET) return null;

  const actors = [...root.querySelectorAll(transitionActorSelector(family))];
  if (!actors.length) return null;

  if (preferredKey) {
    const exact = actors.filter((actor) => actor.dataset.transitionKey === preferredKey);
    const visibleExact = exact.find(isVisibleTransitionActor);
    if (visibleExact) return visibleExact;
    if (exact.length) return null;
  }

  return actors.find(isVisibleTransitionActor) || null;
}

export function semanticActorFromOrigin(origin) {
  if (!origin?.closest) return null;
  return origin.closest('[data-transition-family]');
}

export function clearTransitionName(node) {
  if (node?.style) node.style.viewTransitionName = '';
}

export default {
  TRANSITION_FAMILIES,
  resolveTransitionFamily,
  transitionActorSelector,
  findSemanticActor,
  semanticActorFromOrigin,
  clearTransitionName,
};
