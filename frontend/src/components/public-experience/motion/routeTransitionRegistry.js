/**
 * Personality Assessor - Route Transition Registry
 * Defines actor mapping and transition families across canonical public routes.
 */

export const ROUTE_TRANSITION_FAMILIES = {
  // Family A: Shared Media Carry (Home -> Career)
  HOME_TO_CAREER: {
    sourceRoute: '/',
    destRoute: '/career-intelligence',
    family: 'MEDIA_CARRY',
    actorId: 'home-observation-primary',
    duration: 800,
  },
  // Family B: Shared Phrase & Media (Home -> How It Works)
  HOME_TO_HOW: {
    sourceRoute: '/',
    destRoute: '/how-it-works',
    family: 'PHRASE_CARRY',
    phraseActorId: 'source-phrase',
    mediaActorId: 'home-observation-primary',
    duration: 700,
  },
  // Family C: Temporal Crop Carry (Home -> Progress)
  HOME_TO_PROGRESS: {
    sourceRoute: '/',
    destRoute: '/progress',
    family: 'TEMPORAL_CARRY',
    actorId: 'home-temporal-baseline',
    duration: 650,
  },
  // Family D: Pixel Reconstruction (Home -> Trust)
  HOME_TO_TRUST: {
    sourceRoute: '/',
    destRoute: '/trust',
    family: 'PIXEL_RECONSTRUCTION',
    actorId: 'home-provenance-source',
    duration: 600,
  },
  // Family E: Quiet Type Transition (Methodology <-> Privacy)
  QUIET_EDITORIAL: {
    family: 'QUIET',
    duration: 400,
  },
  // Family F: Auth Stable Coordinate Frame (Login <-> Signup)
  AUTH_STABLE: {
    family: 'AUTH_FRAME',
    duration: 350,
  },
};

export const getTransitionFamily = (fromPath, toPath) => {
  if (fromPath === '/' && toPath === '/career-intelligence') {
    return ROUTE_TRANSITION_FAMILIES.HOME_TO_CAREER;
  }
  if (fromPath === '/' && toPath === '/how-it-works') {
    return ROUTE_TRANSITION_FAMILIES.HOME_TO_HOW;
  }
  if (fromPath === '/' && toPath === '/progress') {
    return ROUTE_TRANSITION_FAMILIES.HOME_TO_PROGRESS;
  }
  if (fromPath === '/' && toPath === '/trust') {
    return ROUTE_TRANSITION_FAMILIES.HOME_TO_TRUST;
  }
  if ((fromPath === '/login' && toPath === '/signup') || (fromPath === '/signup' && toPath === '/login')) {
    return ROUTE_TRANSITION_FAMILIES.AUTH_STABLE;
  }
  if (
    (fromPath === '/methodology' && toPath === '/privacy') ||
    (fromPath === '/privacy' && toPath === '/methodology')
  ) {
    return ROUTE_TRANSITION_FAMILIES.QUIET_EDITORIAL;
  }

  return { family: 'STANDARD', duration: 450 };
};

export default ROUTE_TRANSITION_FAMILIES;
