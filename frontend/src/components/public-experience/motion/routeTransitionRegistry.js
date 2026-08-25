/**
 * Personality Assessor - Route Transition Registry
 * Strict contract of the 5 concrete transition families with verified implementations.
 * No generic placeholder family names.
 */

export const TRANSITION_FAMILIES = {
  SHARED_MEDIA: 'SHARED_MEDIA',
  SHARED_PHRASE: 'SHARED_PHRASE',
  PIXEL_RECONSTRUCTION: 'PIXEL_RECONSTRUCTION',
  AUTH_LAYOUT: 'AUTH_LAYOUT',
  QUIET_EDITORIAL: 'QUIET_EDITORIAL',
};

const ROUTE_TRANSITION_MAP = [
  // A. SHARED_MEDIA
  {
    from: '/',
    to: '/career-intelligence',
    family: TRANSITION_FAMILIES.SHARED_MEDIA,
    sourceActorId: 'home-observation-primary',
    destSlotId: 'career-entry-world',
    duration: 0.75,
  },
  {
    from: '/',
    to: '/progress',
    family: TRANSITION_FAMILIES.SHARED_MEDIA,
    sourceActorId: 'home-observation-primary',
    destSlotId: 'progress-baseline-slot',
    duration: 0.7,
  },

  // B. SHARED_PHRASE
  {
    from: '/',
    to: '/how-it-works',
    family: TRANSITION_FAMILIES.SHARED_PHRASE,
    sharedLayoutId: 'pa-px-shared-source-phrase',
    duration: 0.65,
  },

  // C. PIXEL_RECONSTRUCTION
  {
    from: '/',
    to: '/trust',
    family: TRANSITION_FAMILIES.PIXEL_RECONSTRUCTION,
    sourceAssetKey: 'homeSituationDetail',
    destAssetKey: 'trustDiagnostic',
    duration: 0.7,
  },

  // D. AUTH_LAYOUT
  {
    from: '/login',
    to: '/signup',
    family: TRANSITION_FAMILIES.AUTH_LAYOUT,
    duration: 0.45,
  },
  {
    from: '/signup',
    to: '/login',
    family: TRANSITION_FAMILIES.AUTH_LAYOUT,
    duration: 0.45,
  },

  // E. QUIET_EDITORIAL (Methodology, Privacy, etc.)
  {
    from: '/methodology',
    to: '/privacy',
    family: TRANSITION_FAMILIES.QUIET_EDITORIAL,
    duration: 0.45,
  },
  {
    from: '/privacy',
    to: '/methodology',
    family: TRANSITION_FAMILIES.QUIET_EDITORIAL,
    duration: 0.45,
  },
];

export const getTransitionFamily = (fromPath, toPath) => {
  if (!fromPath || !toPath || fromPath === toPath) {
    return { family: TRANSITION_FAMILIES.QUIET_EDITORIAL, duration: 0.35 };
  }

  const match = ROUTE_TRANSITION_MAP.find((entry) => entry.from === fromPath && entry.to === toPath);
  if (match) return match;

  // Reverse match for shared media / phrase if returning to Home
  if (toPath === '/' && (fromPath === '/career-intelligence' || fromPath === '/progress')) {
    return {
      family: TRANSITION_FAMILIES.SHARED_MEDIA,
      sourceActorId: 'career-entry-world',
      destSlotId: 'home-observation-primary',
      duration: 0.7,
    };
  }

  // Auth routes fallback
  if ((fromPath === '/login' || fromPath === '/signup') && (toPath === '/login' || toPath === '/signup')) {
    return { family: TRANSITION_FAMILIES.AUTH_LAYOUT, duration: 0.45 };
  }

  return { family: TRANSITION_FAMILIES.QUIET_EDITORIAL, duration: 0.45 };
};

export default { TRANSITION_FAMILIES, getTransitionFamily };
