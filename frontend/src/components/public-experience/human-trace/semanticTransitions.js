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

export function findSemanticActor(root, family, preferredKey) {
  if (!root?.querySelector || family === TRANSITION_FAMILIES.QUIET) return null;

  if (preferredKey) {
    const exact = root.querySelector(
      `${transitionActorSelector(family)}[data-transition-key="${preferredKey}"]`
    );
    if (exact) return exact;
  }

  return root.querySelector(transitionActorSelector(family));
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
