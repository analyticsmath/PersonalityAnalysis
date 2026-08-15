export const PHASE3C_LAB_DISCLAIMER = 'Illustrative design-lab data — not a user result';

export const LAB_MEDIA_ROOT = '/media/personality-v3';

export const heroMedia = {
  architecture: `${LAB_MEDIA_ROOT}/hero/hero-a-1440.jpg`,
  professional: `${LAB_MEDIA_ROOT}/actors/student-1440.jpg`,
};

export const workWorlds = [
  {
    id: 'build',
    name: 'Build',
    copy: 'Systems expose how you work with constraints.',
    pending: true,
    rejectedMedia: `${LAB_MEDIA_ROOT}/actors/developer-960.jpg`,
  },
  {
    id: 'investigate',
    name: 'Investigate',
    copy: 'Research exposes how you work with uncertainty.',
    media: `${LAB_MEDIA_ROOT}/actors/scientist-1440.jpg`,
  },
  {
    id: 'make',
    name: 'Make',
    copy: 'Making exposes how you refine.',
    media: `${LAB_MEDIA_ROOT}/worlds/make-1440.jpg`,
  },
  {
    id: 'shape',
    name: 'Shape',
    copy: 'Design exposes what you notice before something feels resolved.',
    media: `${LAB_MEDIA_ROOT}/worlds/shape-1440.jpg`,
  },
  {
    id: 'structure',
    name: 'Structure',
    copy: 'Structure exposes how you organize complexity.',
    media: `${LAB_MEDIA_ROOT}/worlds/structure-1440.jpg`,
  },
  {
    id: 'collaborate',
    name: 'Collaborate',
    copy: 'Collaboration exposes how your decisions change around other people.',
    media: `${LAB_MEDIA_ROOT}/worlds/collaborate-1440.jpg`,
  },
];

export const WORK_WORLD_TIMELINE_LABELS = [
  'W0-build',
  'W1-build-to-investigate',
  'W2-investigate',
  'W3-investigate-to-make',
  'W4-make',
  'W5-make-to-shape',
  'W6-shape',
  'W7-shape-to-structure',
  'W8-structure',
  'W9-structure-to-collaborate',
  'W10-collaborate',
  'W11-release',
];

export const WORK_WORLD_STABLE_LABELS = [
  'W0-build',
  'W2-investigate',
  'W4-make',
  'W6-shape',
  'W8-structure',
  'W10-collaborate',
];

export const contextLabels = ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'];

export const heroTypeTreatments = [
  { id: 'compact', label: 'Compact / 500 / 104%', weight: 500, stretch: '104%' },
  { id: 'balanced', label: 'Balanced / 520 / 108%', weight: 520, stretch: '108%' },
  { id: 'wide', label: 'Wide / 540 / 112%', weight: 540, stretch: '112%' },
];

export const profileData = {
  personality: [
    ['Openness', 76],
    ['Conscientiousness', 68],
    ['Extraversion', 54],
    ['Agreeableness', 63],
    ['Emotional steadiness', 71],
  ],
  riasec: [
    ['Investigative', 78],
    ['Artistic', 70],
    ['Conventional', 62],
    ['Enterprising', 57],
    ['Realistic', 56],
    ['Social', 51],
  ],
  values: [
    ['Autonomy', 82],
    ['Mastery', 76],
    ['Purpose', 68],
    ['Collaboration', 59],
    ['Impact', 58],
  ],
  signals: [
    ['Learning orientation', 81, 'questions opened'],
    ['Problem solving', 79, 'constraint response'],
    ['Technical depth', 74, 'context artifact'],
    ['Leadership', 52, 'collaboration evidence'],
  ],
};

export const careerRows = [
  ['Systems Architect', 88, `${LAB_MEDIA_ROOT}/actors/developer-960.jpg`],
  ['Product & UX Designer', 84, `${LAB_MEDIA_ROOT}/worlds/shape-960.jpg`],
  ['Data & Evidence Analyst', 81, `${LAB_MEDIA_ROOT}/editorial/process-960.jpg`],
];

export const nextWorldIndex = (index, direction) =>
  (index + direction + workWorlds.length) % workWorlds.length;

export const stableWorldLabelFor = (index) => WORK_WORLD_STABLE_LABELS[index] || WORK_WORLD_STABLE_LABELS[0];

