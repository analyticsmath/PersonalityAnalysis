// Marketing illustrative demo data & media registry
// Phase 3C Production System — Pexels Local Media Library (personality-v3).
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

const v3Media = (
  file,
  folder,
  alt,
  position = '50% 50%',
  sourceId = '',
  pageUrl = '',
  cropNotes = { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
  maxDimensions = { desktopWidth: '58vw', desktopHeight: '58svh' }
) => ({
  file,
  folder,
  alt,
  position,
  sourceId,
  sourcePlatform: 'Pexels',
  status: 'ready',
  pageUrl,
  cropNotes,
  maxDimensions,
  v3: true,
});

export const publicMedia = {
  hero: {
    // HERO-A: Top view of an architect sitting at a desk creating a project (Pexels 9618456) — Dominant Protagonist
    dominant: v3Media(
      'hero-a',
      'hero',
      'Architectural workspace top view with project blueprints, drafting tools, and active design documents',
      '50% 50%',
      '9618456',
      'https://www.pexels.com/photo/top-view-of-an-architect-sitting-at-a-desk-and-creating-a-project-9618456/',
      { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 45%' },
      { desktopWidth: '56vw', desktopHeight: '56svh' }
    ),
    // HERO-SUPPORTING: Professional working on laptop with documents (Pexels 5940721) — Subordinate Human Context (~15-18% mass)
    supporting: v3Media(
      'student',
      'actors',
      'Professional working on laptop with documentation and background records',
      '50% 50%',
      '5940721',
      'https://www.pexels.com/photo/woman-working-on-laptop-with-documents-5940721/',
      { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
      { desktopWidth: '18vw', desktopHeight: '32svh' }
    ),
    // Evidence Wall supporting fragment (Pexels 9617376)
    evidenceWall: v3Media(
      'hero-b',
      'hero',
      'Architectural plans, sketches, and design schematics pinned to an evidence wall',
      '50% 50%',
      '9617376',
      'https://www.pexels.com/photo/drawings-and-plans-glued-on-wall-9617376/'
    ),
    // Student alias
    student: v3Media(
      'student',
      'actors',
      'Professional working on laptop with documentation and background records',
      '50% 50%',
      '5940721',
      'https://www.pexels.com/photo/woman-working-on-laptop-with-documents-5940721/'
    ),
    // Developer / Build actor (Approved Pexels 34804003)
    developer: v3Media(
      'build',
      'worlds',
      'Software developer analyzing system code and architecture on screens',
      '50% 50%',
      '34804003',
      'https://www.pexels.com/photo/a-laptop-and-a-notebook-on-a-table-34804003/'
    ),
    // Scientist fragment
    scientist: v3Media(
      'scientist',
      'actors',
      'Scientist using precision laboratory equipment in research environment',
      '50% 50%',
      '9259943',
      'https://www.pexels.com/photo/close-up-of-a-person-using-lab-equipment-9259943/'
    ),
    // Process visual thinking
    process: v3Media(
      'process',
      'editorial',
      'Creative brainstorming and visual thinking sticky note session',
      '50% 50%',
      '29521529'
    ),
  },

  // Auth Media Entries — Explicitly defined to prevent runtime blanking
  auth: {
    login: v3Media(
      'student',
      'actors',
      'Professional reviewing records quietly on a laptop at a workspace',
      '50% 50%',
      '5940721',
      'https://www.pexels.com/photo/woman-working-on-laptop-with-documents-5940721/'
    ),
    signup: v3Media(
      'process',
      'editorial',
      'Visual planning board with structured project notes and sticky notes',
      '50% 50%',
      '29521529',
      'https://www.pexels.com/photo/creative-brainstorming-session-with-sticky-notes-29521529/'
    ),
  },

  // Exactly 6 Work Worlds mapped to final downloaded photography
  worlds: [
    {
      id: 'build',
      name: 'Build',
      copy: 'Systems expose how you work with constraints.',
      media: v3Media(
        'build',
        'worlds',
        'Modern workspace with laptop code display, analog notebook, and structured engineering context',
        '50% 50%',
        '34804003',
        'https://www.pexels.com/photo/34804003/',
        { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
        { desktopWidth: '56vw', desktopHeight: '56svh' }
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
        'https://www.pexels.com/photo/close-up-of-a-person-using-lab-equipment-9259943/',
        { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
        { desktopWidth: '56vw', desktopHeight: '56svh' }
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
        'https://www.pexels.com/photo/mans-hands-on-drawing-accessories-9617889/',
        { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
        { desktopWidth: '56vw', desktopHeight: '56svh' }
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
        'https://www.pexels.com/photo/employees-looking-at-the-sticky-notes-posted-on-a-glass-board-9301825/',
        { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
        { desktopWidth: '56vw', desktopHeight: '56svh' }
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
        'https://www.pexels.com/photo/blueprints-and-a-laptop-8470810/',
        { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
        { desktopWidth: '56vw', desktopHeight: '56svh' }
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
        'https://www.pexels.com/photo/businesspeople-with-pens-in-hands-examining-schemes-on-papers-5324974/',
        { desktop: '50% 50%', tablet: '50% 50%', mobile: '50% 50%' },
        { desktopWidth: '56vw', desktopHeight: '56svh' }
      ),
    },
  ],

  // Career environments with master-detail reasons
  careers: [
    {
      id: 'software',
      title: 'Systems Architect',
      match: 88,
      media: v3Media(
        'build',
        'worlds',
        'Modern engineering workspace with systems code and notebook architecture context',
        '50% 50%',
        '34804003'
      ),
      why: 'Systems thinking, inquiry and deliberate problem solving align with complex engineering environments.',
      stretch: 'Requires balancing deep independent technical execution with cross-functional alignment.',
      strengthen: 'Demonstrate architectural decision records and modular system designs.',
    },
    {
      id: 'ux',
      title: 'Product & UX Designer',
      match: 84,
      media: v3Media('shape', 'worlds', 'Product designer synthesizing interaction patterns on a glass board', '50% 50%', '9301825'),
      why: 'High openness and artistic vocational interest support continuous problem re-framing.',
      stretch: 'Needs rapid prototyping under tight ambiguity and iterative user validation.',
      strengthen: 'Produce case studies showing evidence-driven design trade-offs.',
    },
    {
      id: 'data',
      title: 'Data & Evidence Analyst',
      match: 81,
      media: v3Media('process', 'editorial', 'Analyst structuring evidence and data flows on note boards', '50% 50%', '29521529'),
      why: 'Methodical inquiry and investigative orientation make complex datasets legible.',
      stretch: 'Requires translating statistical variance into actionable strategic decisions.',
      strengthen: 'Publish structured reproducible analytics workflows.',
    },
    {
      id: 'product',
      title: 'Product Strategy Lead',
      match: 78,
      media: v3Media('collaborate', 'worlds', 'Product strategist aligning multidisciplinary schemes', '50% 50%', '5324974'),
      why: 'Strong synthesis of constraints, roadmap prioritization, and user evidence.',
      stretch: 'Higher demand on assertive stakeholder consensus and rapid trade-off defense.',
      strengthen: 'Document end-to-end outcome-driven product roadmaps.',
    },
    {
      id: 'research',
      title: 'Research Scientist',
      match: 75,
      media: v3Media('scientist', 'actors', 'Scientist testing empirical hypotheses in lab environment', '50% 50%', '9259943'),
      why: 'Deep investigative drive and methodical tolerance for long experiment cycles.',
      stretch: 'Requires extensive peer defense and formal academic publication protocols.',
      strengthen: 'Contribute to open research or reproducible technical whitepapers.',
    },
    {
      id: 'operations',
      title: 'Technical Operations Director',
      match: 71,
      media: v3Media('structure', 'worlds', 'Operations engineer reviewing architectural blueprints and reliability schemas', '50% 50%', '8470810'),
      why: 'High conscientiousness and structured signals align with continuous reliability.',
      stretch: 'Requires immediate incident triage under real-time operational stress.',
      strengthen: 'Build incident playbooks and operational observability pipelines.',
    },
    {
      id: 'studio',
      title: 'Creative Studio Director',
      match: 68,
      media: v3Media('make', 'worlds', 'Creative director evaluating craftsmanship and drafting tools', '50% 50%', '9617889'),
      why: 'Aesthetic sensitivity and synthesis of diverse creative perspectives.',
      stretch: 'Demands commercial pitching and continuous portfolio reinvention.',
      strengthen: 'Curate a multidisciplinary evidence portfolio of shipped work.',
    },
  ],

  progress: [
    v3Media('process', 'editorial', 'Gap discovery and visual thinking notes', '50% 50%', '29521529'),
    v3Media('make', 'worlds', 'Deliberate action with precision craft and tools', '50% 50%', '9617889'),
    v3Media('build', 'worlds', 'Visible work produced in software engineering', '50% 50%', '34804003'),
    v3Media('structure', 'worlds', 'Artifact creation through specifications and blueprints', '50% 50%', '8470810'),
    v3Media('scientist', 'actors', 'New empirical evidence synthesized', '50% 50%', '9259943'),
    v3Media('hero-a', 'hero', 'Updated profile return with comprehensive evidence context', '50% 50%', '9618456'),
  ],

  howItWorks: [
    v3Media('student', 'actors', 'Professional background and context intake', '50% 50%', '5940721'),
    v3Media('process', 'editorial', 'Adaptive questioning calibrated from context', '50% 50%', '29521529'),
    v3Media('hero-b', 'hero', 'Multidimensional profile readings across independent lenses', '50% 50%', '9617376'),
    v3Media('collaborate', 'worlds', 'Actionable career direction and developmental roadmap', '50% 50%', '5324974'),
  ],

  // Backward compatibility alias definitions for test suites
  legacyAliases: {
    hero: 'hero-a',
    world: 'build',
    career: 'software',
    progress: 'process',
    auth: 'login',
  },
};

export default publicMedia;
