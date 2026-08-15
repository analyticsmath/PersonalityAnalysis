// frontend/src/components/public/imprint/imprintData.js
// Clean marketing demo content and qualitative evidence mappings for Personality Assessor

export const illustrativeDisclaimer = 'Illustrative example';

export const demoInstruments = {
  bigFive: [
    { trait: 'Openness', score: 76, description: 'High curiosity and tolerance for ambiguity in project structure' },
    { trait: 'Conscientiousness', score: 68, description: 'Deliberate planning with flexible execution boundaries' },
    { trait: 'Extraversion', score: 54, description: 'Balanced collaborative and independent focus' },
    { trait: 'Agreeableness', score: 63, description: 'Constructive inquiry with focus on shared outcomes' },
    { trait: 'Emotional steadiness', score: 71, description: 'Stable execution under shifting constraints' },
  ],
  riasec: [
    { code: 'I', name: 'Investigative', score: 78, description: 'Inquiry, analytical exploration, problem discovery' },
    { code: 'A', name: 'Artistic', score: 70, description: 'Creative problem framing, intuitive synthesis' },
    { code: 'C', name: 'Conventional', score: 62, description: 'Systematic execution, structured information design' },
    { code: 'E', name: 'Enterprising', score: 57, description: 'Strategic alignment, communicating value' },
    { code: 'R', name: 'Realistic', score: 56, description: 'Concrete tools, direct craftsmanship' },
    { code: 'S', name: 'Social', score: 51, description: 'Mentoring, collaborative consensus' },
  ],
  workValues: [
    { name: 'Autonomy', rank: 1, score: 82, description: 'Freedom to determine methods and sequence' },
    { name: 'Mastery', rank: 2, score: 76, description: 'Deepening expertise and craft precision' },
    { name: 'Purpose', rank: 3, score: 68, description: 'Meaningful connection between effort and outcome' },
    { name: 'Collaboration', rank: 4, score: 59, description: 'Working closely with multidisciplinary peers' },
    { name: 'Impact', rank: 5, score: 58, description: 'Visible contribution to end-user results' },
    { name: 'Stability', rank: 6, score: 52, description: 'Predictable operating environment' },
    { name: 'Variety', rank: 7, score: 50, description: 'Diverse challenges and problem domains' },
    { name: 'Recognition', rank: 8, score: 46, description: 'Clear feedback and acknowledgment' },
  ],
  signals: [
    {
      name: 'Learning Orientation',
      score: 81,
      strength: 'High',
      source: 'Extracted from technical documentation reviews and self-directed migration leadership',
    },
    {
      name: 'Problem Solving',
      score: 79,
      strength: 'High',
      source: 'Extracted from complex multi-system constraint handling responses',
    },
    {
      name: 'Technical Depth',
      score: 74,
      strength: 'Moderate-High',
      source: 'Demonstrated command of core architectural trade-offs',
    },
    {
      name: 'Leadership',
      score: 52,
      strength: 'Situational',
      source: 'Peer alignment under shared delivery pressure',
    },
  ],
};

export const demoCareers = [
  {
    id: 'systems-architect',
    title: 'Systems Architect',
    environment: '/media/personality-imprint/worlds/world-build-960.webp',
    aligned: 'Systematic decomposition, high autonomy, structured constraint navigation',
    stretch: 'Cross-functional consensus building under ambiguous requirements',
    growth: 'Formalize multi-team architectural RFC review practices',
  },
  {
    id: 'research-scientist',
    title: 'Research Scientist',
    environment: '/media/personality-imprint/worlds/world-investigate-960.webp',
    aligned: 'Deep analytical inquiry, empirical hypothesis testing, tolerance for uncertainty',
    stretch: 'Translating open-ended findings into commercial delivery timelines',
    growth: 'Deepen quantitative modeling artifacts and peer-reviewed documentation',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    environment: '/media/personality-imprint/worlds/world-shape-960.webp',
    aligned: 'Form synthesis, noticing subtle user interaction friction, iterative refinement',
    stretch: 'Engineering feasibility trade-offs during early sprint planning',
    growth: 'Create cross-disciplinary design tokens and interactive prototypes',
  },
  {
    id: 'engineering-lead',
    title: 'Engineering Lead',
    environment: '/media/personality-imprint/worlds/world-collaborate-960.webp',
    aligned: 'Technical clarity, team alignment under delivery pressure, quality standards',
    stretch: 'Balancing hands-on implementation with strategic resource planning',
    growth: 'Establish structured mentorship and incident post-mortem practices',
  },
];

export const demoDevelopmentStages = [
  {
    id: 'gap',
    name: 'Gap',
    desc: 'An inspectable stretch area is identified in the current profile.',
  },
  {
    id: 'work',
    name: 'Work',
    desc: 'You undertake real projects, system migrations, or new craft challenges.',
  },
  {
    id: 'artifact',
    name: 'Artifact',
    desc: 'Your work generates verifiable documentation, schematics, and project commits.',
  },
  {
    id: 'evidence',
    name: 'Evidence',
    desc: 'The system locates and extracts authentic behavioral signals from the new work.',
  },
  {
    id: 'return',
    name: 'Return',
    desc: 'The profile readings and career relationships update to reflect the verified progress.',
  },
];

export const demoEvidenceQuestion = {
  sourceText: 'Led a multi-region service migration under strict availability constraints while coordinating cross-functional architecture reviews.',
  highlightText: 'under strict availability constraints while coordinating cross-functional architecture reviews',
  prompt: 'When delivery pressure rises, what do you protect first?',
  options: [
    {
      id: 'opt-availability',
      text: 'Protect core availability and defer non-critical scope.',
      signal: 'Reliability first under delivery pressure',
    },
    {
      id: 'opt-speed',
      text: 'Maintain delivery speed with reversible rollout safeguards.',
      signal: 'Velocity with controlled rollback boundaries',
    },
    {
      id: 'opt-integrity',
      text: 'Reduce scope until system integrity is protected.',
      signal: 'Scope reduction to preserve architectural integrity',
    },
  ],
};
