/**
 * Personality Assessor - Route Preload Registry
 * Preloads route modules on pointer, keyboard, and touch intent.
 */

const ROUTE_LOADERS = {
  '/': () => import('../../../pages/editorial/EditorialHomePage'),
  '/how-it-works': () => import('../../../pages/editorial/EditorialHowItWorksPage'),
  '/career-intelligence': () => import('../../../pages/editorial/EditorialCareerIntelligencePage'),
  '/progress': () => import('../../../pages/editorial/EditorialProgressPage'),
  '/methodology': () => import('../../../pages/editorial/EditorialMethodologyPage'),
  '/trust': () => import('../../../pages/editorial/EditorialTrustPage'),
  '/privacy': () => import('../../../pages/editorial/EditorialPrivacyPage'),
  '/login': () => import('../../../pages/Auth/LoginPage'),
  '/signup': () => import('../../../pages/Auth/SignupPage'),
};

const ROUTE_MEDIA = {
  '/': ['homeWorldEntry', 'homeSituationDetail'],
  '/how-it-works': ['howTransformation'],
  '/career-intelligence': ['workworldPrecision', 'careerDeepInquiry'],
  '/progress': ['homeWorldEntry', 'careerSynthesis'],
  '/trust': ['trustDiagnostic'],
  '/login': ['authLogin'],
  '/signup': ['authSignup'],
};

const preloadPromises = new Map();

function resolvePath(path) {
  try {
    return new URL(path, window.location.origin).pathname;
  } catch {
    return path.split('?')[0];
  }
}

export function preloadRoute(path) {
  if (!path) return Promise.resolve();
  const pathname = resolvePath(path);
  if (preloadPromises.has(pathname)) return preloadPromises.get(pathname);

  const tasks = [];
  const loader = ROUTE_LOADERS[pathname];
  if (loader) tasks.push(loader());

  if (['/', '/how-it-works', '/career-intelligence', '/progress', '/trust', '/methodology', '/privacy'].includes(pathname)) {
    tasks.push(import('../human-trace/CinematicRoutes'));
  }

  const promise = Promise.allSettled(tasks).then(() => undefined);
  preloadPromises.set(pathname, promise);

  const mediaKeys = ROUTE_MEDIA[pathname] || [];
  if (mediaKeys.length) {
    import('../canvas/TextureRegistry')
      .then(({ TextureRegistry }) => Promise.allSettled(mediaKeys.map((key) => TextureRegistry.loadTexture(key))))
      .catch(() => {});
  }

  return promise;
}

export function attachPreloadListeners(element, targetPath) {
  if (!element || !targetPath) return () => {};

  const handleIntent = () => { void preloadRoute(targetPath); };

  element.addEventListener('pointerenter', handleIntent, { passive: true });
  element.addEventListener('focus', handleIntent, { passive: true });
  element.addEventListener('touchstart', handleIntent, { passive: true });

  return () => {
    element.removeEventListener('pointerenter', handleIntent);
    element.removeEventListener('focus', handleIntent);
    element.removeEventListener('touchstart', handleIntent);
  };
}

export default { preloadRoute, attachPreloadListeners };
