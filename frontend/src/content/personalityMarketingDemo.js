// Marketing illustrative demo data & media registry
// Phase 3A Evidence Field system.
// NOTE: All marketing numbers are explicitly illustrative examples, not real customer evidence or benchmark populations.

export const marketingDemo = {
  isIllustrativeExample: true,
  disclaimer: 'Illustrative example demonstrating profile dimension structure. Not population statistics or personal diagnosis.',
  profile: {
    bigFive: [
      ['Openness', 76, 'High curiosity and tolerance for ambiguity in project structure'],
      ['Conscientiousness', 68, 'Deliberate planning with flexible execution boundaries'],
      ['Extraversion', 54, 'Balanced collaborative and independent focus'],
      ['Agreeableness', 63, 'Constructive inquiry with focus on shared outcomes'],
      ['Emotional steadiness', 71, 'Stable execution under shifting constraints'],
    ],
    riasec: [
      ['Investigative', 78, 'Inquiry, analytical exploration, problem discovery'],
      ['Artistic', 70, 'Creative problem framing, intuitive synthesis'],
      ['Conventional', 62, 'Systematic execution, structured information design'],
      ['Enterprising', 57, 'Strategic alignment, communicating value'],
      ['Realistic', 56, 'Concrete tools, direct craftsmanship'],
      ['Social', 51, 'Mentoring, collaborative consensus'],
    ],
    values: [
      ['Autonomy', 82, 'Freedom to determine methods and sequence'],
      ['Mastery', 76, 'Deepening expertise and craft precision'],
      ['Purpose', 68, 'Meaningful connection between effort and outcome'],
      ['Collaboration', 59, 'Working closely with multidisciplinary peers'],
      ['Impact', 58, 'Visible contribution to end-user results'],
      ['Stability', 52, 'Predictable operating environment'],
      ['Variety', 50, 'Diverse challenges and problem domains'],
      ['Recognition', 46, 'Clear feedback and acknowledgment'],
      ['Growth', 45, 'Continuous advancement pathways'],
      ['Balance', 42, 'Sustainable work rhythms'],
      ['Structure', 40, 'Defined operational protocols'],
      ['Compensation', 38, 'Equitable reward alignment'],
    ],
    signals: [
      ['Learning Orientation', 81, 'High proactive exploration when faced with unfamiliar domains'],
      ['Problem Solving', 79, 'Systematic decomposition of complex requirements'],
      ['Technical Depth', 74, 'Structured command of primary tools and methodologies'],
      ['Leadership', 52, 'Situational coordination without requiring formal authority'],
    ],
  },
};

const media = (file, folder, alt, position = '50% 50%', sourceId = '') => ({
  file,
  folder,
  alt,
  position,
  sourceId,
});

export const publicMedia = {
  hero: {
    // Primary dominant work surface
    dominant: media('hero-h2', 'hero', "Designer's desk with architectural tools, notebook, and active planning artifacts", '50% 50%', 'GkpMxwQ_ZeA'),
    // Supporting evidence arrangement actor
    supporting: media('hero-h3', 'hero', 'Hands arranging evidence swatches and conceptual notes on a work table', '50% 50%', 'FobgCXKoJKU'),
    // Process detail artifact
    process: media('hero-h4', 'hero', 'Architectural modeling and physical prototyping in progress', '50% 50%', 'WUY0W2RSiBw'),
  },

  // Exactly 6 Work Worlds
  worlds: [
    {
      id: 'build',
      name: 'Build',
      copy: 'Systems expose how you work with constraints.',
      media: media('world-w2', 'worlds', 'Developer analyzing system architecture and code workflows', '50% 50%', 'QUtrcUo5-GI'),
    },
    {
      id: 'investigate',
      name: 'Investigate',
      copy: 'Research exposes how you work with uncertainty.',
      media: media('world-w8', 'worlds', 'Active laboratory and empirical investigation environment', '50% 50%', 'jxgeHcAACUI'),
    },
    {
      id: 'make',
      name: 'Make',
      copy: 'Making exposes how you refine.',
      media: media('world-w4', 'worlds', 'Hands refining physical model details with precision tools', '50% 50%', 'Qt2AkCIW8d4'),
    },
    {
      id: 'shape',
      name: 'Shape',
      copy: 'Design exposes what you notice before something feels resolved.',
      media: media('world-w3', 'worlds', 'Sketch and evidence wall during concept synthesis', '50% 50%', 'DSNWYdcL-h0'),
    },
    {
      id: 'structure',
      name: 'Structure',
      copy: 'Structure exposes how you organize complexity.',
      media: media('world-w5', 'worlds', 'Flowchart and organizational diagram on a whiteboard', '50% 50%', 'LRCMQDWQcn8'),
    },
    {
      id: 'collaborate',
      name: 'Collaborate',
      copy: 'Collaboration exposes how your decisions change around other people.',
      media: media('world-w1', 'worlds', 'Multidisciplinary planning and evidence review table', '50% 50%', 'uePZyB90-Fs'),
    },
  ],

  // Career environments (no rejected factory asset c5)
  careers: [
    { id: 'software', title: 'Systems Architect', match: 88, media: media('career-c1', 'careers', 'Software professional analyzing system constraints'), why: 'Systems thinking, inquiry and deliberate problem solving align with complex engineering environments.', stretch: 'Requires balancing deep independent technical execution with cross-functional alignment.', strengthen: 'Demonstrate architectural decision records and modular system designs.' },
    { id: 'ux', title: 'Product & UX Designer', match: 84, media: media('career-c2', 'careers', 'Designer evaluating wireframes and user journeys'), why: 'High openness and artistic vocational interest support continuous problem re-framing.', stretch: 'Needs rapid prototyping under tight ambiguity and iterative user validation.', strengthen: 'Produce case studies showing evidence-driven design trade-offs.' },
    { id: 'data', title: 'Data & Evidence Analyst', match: 81, media: media('career-c3', 'careers', 'Professional reviewing structured data reports'), why: 'Methodical inquiry and investigative orientation make complex datasets legible.', stretch: 'Requires translating statistical variance into actionable strategic decisions.', strengthen: 'Publish structured reproducible analytics workflows.' },
    { id: 'product', title: 'Product Strategy Lead', match: 78, media: media('career-c4', 'careers', 'Product leader organizing roadmaps on whiteboard'), why: 'Strong synthesis of constraints, roadmap prioritization, and user evidence.', stretch: 'Higher demand on assertive stakeholder consensus and rapid trade-off defense.', strengthen: 'Document end-to-end outcome-driven product roadmaps.' },
    { id: 'research', title: 'Research Scientist', match: 75, media: media('career-c6', 'careers', 'Research team examining experimental findings'), why: 'Deep investigative drive and methodical tolerance for long experiment cycles.', stretch: 'Requires extensive peer defense and formal academic publication protocols.', strengthen: 'Contribute to open research or reproducible technical whitepapers.' },
    { id: 'operations', title: 'Technical Operations Director', match: 71, media: media('career-c7', 'careers', 'Operations center with system metrics'), why: 'High conscientiousness and structured signals align with continuous reliability.', stretch: 'Requires immediate incident triage under real-time operational stress.', strengthen: 'Build incident playbooks and operational observability pipelines.' },
    { id: 'studio', title: 'Creative Studio Director', match: 68, media: media('career-c8', 'careers', 'Creative director reviewing studio proofs'), why: 'Aesthetic sensitivity and synthesis of diverse creative perspectives.', stretch: 'Demands commercial pitching and continuous portfolio reinvention.', strengthen: 'Curate a multidisciplinary evidence portfolio of shipped work.' },
  ],

  progress: [
    media('progress-p1', 'progress', 'Quiet focused workspace beside a window'),
    media('progress-p2', 'progress', 'Iterative prototype being evaluated on workbench'),
    media('progress-p3', 'progress', 'Refining craft precision in a workshop'),
    media('progress-p4', 'progress', 'Team evaluating project evidence on review desk'),
    media('progress-p5', 'progress', 'Collaborative refinement around a strategy board'),
    media('progress-p6', 'progress', 'New evidence brought back to the active workstation'),
  ],

  howItWorks: [
    media('hiw-1', 'how-it-works', 'Professional workspace where initial context is gathered'),
    media('hiw-2', 'how-it-works', 'Adaptive question calibration based on work context'),
    media('hiw-3', 'how-it-works', 'Multidimensional profile readings across four lenses'),
    media('hiw-4', 'how-it-works', 'Actionable career alignment and development roadmap'),
  ],

  auth: {
    login: media('auth-login', 'auth', 'Person reviewing professional records quietly at a desk'),
    signup: media('auth-signup', 'auth', 'Colleagues organizing workspace artifacts at a table'),
  },
};
