/**
 * Personality Assessor - Route Preload Registry
 * Preloads lazy route modules, critical media manifest assets, and slot metadata
 * on pointerenter, focus, and touchstart.
 */

import { TextureRegistry } from '../canvas/TextureRegistry';

// Lazy route chunk loaders
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

// Critical media keys for each destination route
const ROUTE_CRITICAL_MEDIA = {
  '/': ['homeWorldEntry', 'homeSituationDetail'],
  '/how-it-works': ['howTransformation'],
  '/career-intelligence': ['workworldPrecision', 'careerDeepInquiry'],
  '/progress': ['homeWorldEntry', 'careerSynthesis'],
  '/trust': ['trustDiagnostic'],
  '/login': ['authLogin'],
  '/signup': ['authSignup'],
};

const preloadedRoutes = new Set();

export const preloadRoute = (pathname) => {
  if (!pathname || preloadedRoutes.has(pathname)) return;
  preloadedRoutes.add(pathname);

  // 1. Preload JS bundle chunk
  const loader = ROUTE_LOADERS[pathname];
  if (typeof loader === 'function') {
    loader().catch(() => {});
  }

  // 2. Preload critical WebGL textures
  const mediaKeys = ROUTE_CRITICAL_MEDIA[pathname] || [];
  mediaKeys.forEach((key) => {
    TextureRegistry.loadTexture(key).catch(() => {});
  });
};

export const attachPreloadListeners = (element, targetPath) => {
  if (!element || !targetPath) return () => {};

  const handleIntent = () => {
    preloadRoute(targetPath);
  };

  element.addEventListener('pointerenter', handleIntent, { passive: true });
  element.addEventListener('focus', handleIntent, { passive: true });
  element.addEventListener('touchstart', handleIntent, { passive: true });

  return () => {
    element.removeEventListener('pointerenter', handleIntent);
    element.removeEventListener('focus', handleIntent);
    element.removeEventListener('touchstart', handleIntent);
  };
};

export default { preloadRoute, attachPreloadListeners };
