// Marketing illustrative demo data & media registry
// Phase 3B Visual Acceptance — Pexels Local Media Library (personality-v3).
// NOTE: All marketing values are explicitly illustrative examples, not real customer evidence or benchmark populations.

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

const v3Media = (file, folder, alt, position = '50% 50%', sourceId = '', pageUrl = '') => ({
  file,
  folder,
  alt,
  position,
  sourceId,
  sourcePlatform: 'Pexels',
  status: 'ready',
  pageUrl,
  v3: true,
});

export const publicMedia = {
  hero: {
    // HERO-A: Top view of an architect sitting at a desk creating a project (Pexels 9618456)
    dominant: v3Media(
      'hero-a',
      'hero',
      'Architectural workspace top view with project blueprints, drafting tools, and active design documents',
      '50% 50%',
      '9618456',
      'https://www.pexels.com/photo/top-view-of-an-architect-sitting-at-a-desk-and-creating-a-project-9618456/'
    ),
    // HERO-B: Evidence Wall (Pexels 9617376)
    evidenceWall: v3Media(
      'hero-b',
      'hero',
      'Architectural plans, sketches, and design schematics pinned to an evidence wall',
      '50% 50%',
      '9617376',
      'https://www.pexels.com/photo/drawings-and-plans-glued-on-wall-9617376/'
    ),
    // DEVELOPER: Shared Actor carried to Work Worlds (Pexels 7988086)
    developer: v3Media(
      'developer',
      'actors',
      'Software developer analyzing system code and architecture on screens',
      '50% 50%',
      '7988086',
      'https://www.pexels.com/photo/a-person-doing-computer-programming-7988086/'
    ),
    // SCIENTIST: Research fragment (Pexels 9259943)
    scientist: v3Media(
      'scientist',
      'actors',
      'Scientist using precision laboratory equipment in research environment',
      '50% 50%',
      '9259943',
      'https://www.pexels.com/photo/close-up-of-a-person-using-lab-equipment-9259943/'
    ),
    // STUDENT: Graduate / Context fragment (Pexels 5940721)
    student: v3Media(
      'student',
      'actors',
      'Professional working on laptop with documentation and background records',
      '50% 50%',
      '5940721',
      'https://www.pexels.com/photo/woman-working-on-laptop-with-documents-5940721/'
    ),
    // Supporting direction alias for backwards compatibility
    supporting: v3Media(
      'developer',
      'actors',
      'Software developer analyzing system code and architecture',
      '50% 50%',
      '7988086'
    ),
    process: v3Media(
      'process',
      'editorial',
      'Creative brainstorming and visual thinking sticky note session',
      '50% 50%',
      '29521529'
    ),
  },

  // Exactly 6 Work Worlds mapped to final downloaded photography
  worlds: [
    {
      id: 'build',
      name: 'Build',
      copy: 'Systems expose how you work with constraints.',
      media: v3Media(
        'developer',
        'actors',
        'Developer engineering software systems and code architecture',
        '50% 50%',
        '7988086',
        'https://www.pexels.com/photo/a-person-doing-computer-programming-7988086/'
      ),
    },
    {
      id: 'investigate',
      name: 'Investigate',
      copy: 'Research exposes how you work with uncertainty.',
      media: v3Media(
        'scientist',
        'actors',
        'Scientist conducting empirical laboratory research and testing hypotheses',
        '50% 50%',
        '9259943',
        'https://www.pexels.com/photo/close-up-of-a-person-using-lab-equipment-9259943/'
      ),
    },
    {
      id: 'make',
      name: 'Make',
      copy: 'Making exposes how you refine.',
      media: v3Media(
        'make',
        'worlds',
        "Hands working on drawing accessories and precision physical craft",
        '50% 50%',
        '9617889',
        'https://www.pexels.com/photo/mans-hands-on-drawing-accessories-9617889/'
      ),
    },
    {
      id: 'shape',
      name: 'Shape',
      copy: 'Design exposes what you notice before something feels resolved.',
      media: v3Media(
        'shape',
        'worlds',
        'Designers synthesizing user experience on sticky notes and glass boards',
        '50% 50%',
        '9301825',
        'https://www.pexels.com/photo/employees-looking-at-the-sticky-notes-posted-on-a-glass-board-9301825/'
      ),
    },
    {
      id: 'structure',
      name: 'Structure',
      copy: 'Structure exposes how you organize complexity.',
      media: v3Media(
        'structure',
        'worlds',
        'Blueprints, structural diagrams, and laptop displaying specifications',
        '50% 50%',
        '8470810',
        'https://www.pexels.com/photo/blueprints-and-a-laptop-8470810/'
      ),
    },
    {
      id: 'collaborate',
      name: 'Collaborate',
      copy: 'Collaboration exposes how your decisions change around other people.',
      media: v3Media(
        'collaborate',
        'worlds',
        'Business professionals examining schemes, papers, and strategic models together',
        '50% 50%',
        '5324974',
        'https://www.pexels.com/photo/businesspeople-with-pens-in-hands-examining-schemes-on-papers-5324974/'
      ),
    },
  ],

  // Career environments with master-detail reasons
  careers: [
    {
      id: 'software',
      title: 'Systems Architect',
      match: 88,
      media: v3Media('developer', 'actors', 'Software architect reviewing technical constraints and distributed systems'),
      why: 'Systems thinking, inquiry and deliberate problem solving align with complex engineering environments.',
      stretch: 'Requires balancing deep independent technical execution with cross-functional alignment.',
      strengthen: 'Demonstrate architectural decision records and modular system designs.',
    },
    {
      id: 'ux',
      title: 'Product & UX Designer',
      match: 84,
      media: v3Media('shape', 'worlds', 'Product designer synthesizing interaction patterns on a glass board'),
      why: 'High openness and artistic vocational interest support continuous problem re-framing.',
      stretch: 'Needs rapid prototyping under tight ambiguity and iterative user validation.',
      strengthen: 'Produce case studies showing evidence-driven design trade-offs.',
    },
    {
      id: 'data',
      title: 'Data & Evidence Analyst',
      match: 81,
      media: v3Media('process', 'editorial', 'Analyst structuring evidence and data flows on note boards'),
      why: 'Methodical inquiry and investigative orientation make complex datasets legible.',
      stretch: 'Requires translating statistical variance into actionable strategic decisions.',
      strengthen: 'Publish structured reproducible analytics workflows.',
    },
    {
      id: 'product',
      title: 'Product Strategy Lead',
      match: 78,
      media: v3Media('collaborate', 'worlds', 'Product strategist aligning multidisciplinary schemes'),
      why: 'Strong synthesis of constraints, roadmap prioritization, and user evidence.',
      stretch: 'Higher demand on assertive stakeholder consensus and rapid trade-off defense.',
      strengthen: 'Document end-to-end outcome-driven product roadmaps.',
    },
    {
      id: 'research',
      title: 'Research Scientist',
      match: 75,
      media: v3Media('scientist', 'actors', 'Scientist testing empirical hypotheses in lab environment'),
      why: 'Deep investigative drive and methodical tolerance for long experiment cycles.',
      stretch: 'Requires extensive peer defense and formal academic publication protocols.',
      strengthen: 'Contribute to open research or reproducible technical whitepapers.',
    },
    {
      id: 'operations',
      title: 'Technical Operations Director',
      match: 71,
      media: v3Media('structure', 'worlds', 'Operations engineer reviewing architectural blueprints and reliability schemas'),
      why: 'High conscientiousness and structured signals align with continuous reliability.',
      stretch: 'Requires immediate incident triage under real-time operational stress.',
      strengthen: 'Build incident playbooks and operational observability pipelines.',
    },
    {
      id: 'studio',
      title: 'Creative Studio Director',
      match: 68,
      media: v3Media('make', 'worlds', 'Creative director evaluating craftsmanship and drafting tools'),
      why: 'Aesthetic sensitivity and synthesis of diverse creative perspectives.',
      stretch: 'Demands commercial pitching and continuous portfolio reinvention.',
      strengthen: 'Curate a multidisciplinary evidence portfolio of shipped work.',
    },
  ],

  progress: [
    v3Media('process', 'editorial', 'Gap discovery and visual thinking notes'),
    v3Media('make', 'worlds', 'Deliberate action with precision craft and tools'),
    v3Media('developer', 'actors', 'Visible work produced in software engineering'),
    v3Media('structure', 'worlds', 'Artifact creation through specifications and blueprints'),
    v3Media('scientist', 'actors', 'New empirical evidence synthesized'),
    v3Media('hero-a', 'hero', 'Updated profile return with comprehensive evidence context'),
  ],

  howItWorks: [
    v3Media('student', 'actors', 'Professional background and context intake'),
    v3Media('process', 'editorial', 'Adaptive questioning calibrated from context'),
    v3Media('hero-b', 'hero', 'Multidimensional profile readings across independent lenses'),
    v3Media('collaborate', 'worlds', 'Actionable career direction and developmental roadmap'),
  ],

  // Backward compatibility alias definitions for test suites
  legacyAliases: {
    hero: 'hero-h2',
    world: 'world-w8',
    career: 'career-c8',
    progress: 'progress-p6',
    auth: 'auth-signup',
  },
};

export default publicMedia;

