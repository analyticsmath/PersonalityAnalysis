/**
 * Personality Assessor — Context Atlas Route Transition Map
 * Maps source/destination route pairs to motion choreography families
 */

export const ROUTE_TRANSITION_MAP = {
  // Flagship narrative carries
  'home->career': {
    family: 'media-carry',
    duration: 850,
    carryElement: 'workworld-media',
  },
  'home->how': {
    family: 'fragment-carry',
    duration: 750,
    carryElement: 'response-fragment',
  },
  'home->progress': {
    family: 'temporal-echo',
    duration: 800,
    carryElement: 'temporal-layer',
  },
  'career->home': {
    family: 'media-carry',
    duration: 750,
    carryElement: 'workworld-media',
  },
  'how->home': {
    family: 'fragment-carry',
    duration: 750,
    carryElement: 'response-fragment',
  },

  // Trust and governance shifts
  'trust->privacy': {
    family: 'provenance-collapse',
    duration: 650,
  },
  'methodology->privacy': {
    family: 'quiet-field-shift',
    duration: 600,
  },
  'privacy->methodology': {
    family: 'quiet-field-shift',
    duration: 600,
  },

  // Auth transitions
  'login->signup': {
    family: 'auth-field-shift',
    duration: 520,
  },
  'signup->login': {
    family: 'auth-field-shift',
    duration: 520,
  },

  // Default fallback
  default: {
    family: 'solid-field-replacement',
    duration: 700,
  },
};

export function getRouteTransition(fromPath = '', toPath = '') {
  const normalize = (p) => {
    const clean = p.split('?')[0].split('#')[0].replace(/^\//, '');
    if (!clean) return 'home';
    if (clean === 'career-intelligence') return 'career';
    if (clean === 'how-it-works') return 'how';
    return clean;
  };

  const key = `${normalize(fromPath)}->${normalize(toPath)}`;
  return ROUTE_TRANSITION_MAP[key] || ROUTE_TRANSITION_MAP.default;
}
