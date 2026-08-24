/**
 * Personality Assessor - Route Transition Choreography Map
 * Public Experience Namespace
 *
 * Defines semantic actors and transition mechanisms between canonical public routes.
 */

export const ROUTE_TRANSITION_MAP = {
  // Home to Career: Shared Workworld media plane carry
  '/_to_/career-intelligence': {
    outgoingActor: 'home-workworld-active-plane',
    incomingActor: 'career-spatial-canvas',
    mechanism: 'shared-media-carry',
    duration: 760,
    ease: 'power2.inOut',
  },

  // Career to Home
  '/career-intelligence_to_/': {
    outgoingActor: 'career-spatial-canvas',
    incomingActor: 'home-workworld-active-plane',
    mechanism: 'shared-media-carry',
    duration: 720,
    ease: 'power2.inOut',
  },

  // Home to How It Works: Source prompt typography carry
  '/_to_/how-it-works': {
    outgoingActor: 'home-prompt-phrase',
    incomingActor: 'how-source-origin',
    mechanism: 'typography-carry',
    duration: 680,
    ease: 'power2.inOut',
  },

  '/how-it-works_to_/': {
    outgoingActor: 'how-source-origin',
    incomingActor: 'home-prompt-phrase',
    mechanism: 'typography-carry',
    duration: 650,
    ease: 'power2.inOut',
  },

  // Home to Progress: Temporal double exposure crop carry
  '/_to_/progress': {
    outgoingActor: 'home-temporal-layers',
    incomingActor: 'progress-temporal-stage',
    mechanism: 'temporal-crop-carry',
    duration: 700,
    ease: 'power2.inOut',
  },

  // Home to Trust: Inspection aperture mask expansion
  '/_to_/trust': {
    outgoingActor: 'home-provenance-reveal',
    incomingActor: 'trust-inspection-stage',
    mechanism: 'aperture-mask-reveal',
    duration: 720,
    ease: 'power2.inOut',
  },

  // Login <-> Signup: Shared form coordinate frame + environmental ground cross-fade
  '/login_to_/signup': {
    outgoingActor: 'auth-form-card',
    incomingActor: 'auth-form-card',
    mechanism: 'form-position-media-replacement',
    duration: 580,
    ease: 'power2.out',
  },

  '/signup_to_/login': {
    outgoingActor: 'auth-form-card',
    incomingActor: 'auth-form-card',
    mechanism: 'form-position-media-replacement',
    duration: 580,
    ease: 'power2.out',
  },

  // Methodology <-> Privacy: Clean typographic fade & scroll reset
  '/methodology_to_/privacy': {
    outgoingActor: 'methodology-editorial',
    incomingActor: 'privacy-editorial',
    mechanism: 'quiet-editorial-wipe',
    duration: 550,
    ease: 'power1.inOut',
  },

  '/privacy_to_/methodology': {
    outgoingActor: 'privacy-editorial',
    incomingActor: 'methodology-editorial',
    mechanism: 'quiet-editorial-wipe',
    duration: 550,
    ease: 'power1.inOut',
  },

  // Default fallback transition across any other public route pair
  default: {
    outgoingActor: 'public-view',
    incomingActor: 'public-view',
    mechanism: 'cinematic-neutral-transition',
    duration: 600,
    ease: 'power2.inOut',
  },
};

export function getRouteTransition(fromPath, toPath) {
  const key = `${fromPath}_to_${toPath}`;
  return ROUTE_TRANSITION_MAP[key] || ROUTE_TRANSITION_MAP.default;
}

export default ROUTE_TRANSITION_MAP;
