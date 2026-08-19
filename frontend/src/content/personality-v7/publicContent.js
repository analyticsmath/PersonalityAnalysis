/**
 * Personality Assessor — V7 Signal Atlas Public Content
 * Authoritative, uninflated content based strictly on real psychometric models
 * and actual application capabilities.
 */

export const PUBLIC_CONTENT = {
  brand: {
    name: 'PERSONALITY ASSESSOR',
    tagline: 'Adaptive personality and career intelligence',
    mission: 'Professional evidence becomes an inspectable, multidimensional profile without reducing a person to one label.',
    ctaPrimary: 'Build my profile',
    ctaSecondary: 'How it works',
    signIn: 'Sign in',
  },

  home: {
    hero: {
      category: 'PERSONALITY / CAREER INTELLIGENCE',
      headline: 'See the professional patterns behind your decisions.',
      lead: 'An adaptive assessment that keeps personality, vocational interests and work values separate—then shows how they relate.',
      ctaPrimary: 'Build my profile',
      ctaSecondary: 'How it works',
    },
    evidenceSignal: {
      title: 'Your work leaves evidence.',
      support: 'Context changes the question. The answer becomes one signal—not a verdict.',
      demoEvidence: {
        role: 'Systems Engineer & Technical Lead',
        context: 'Cross-functional architecture review under time constraints',
        observedPattern: 'Prefers formal interface contracts before team implementation starts',
        tradeoff: 'Accepts slower initial consensus for structural clarity later',
      },
      demoQuestion: 'When coordinating complex systems across multiple teams, what constraint do you prioritize first?',
      demoOptions: [
        {
          id: 'opt-a',
          label: 'Verifiable interface boundaries and failure isolation',
          weightSignal: 'High Conscientiousness + Investigative',
          dimension: 'Conscientiousness / System Architecture',
          scorePoint: 86,
        },
        {
          id: 'opt-b',
          label: 'Immediate cross-team consensus and rapid discovery iterations',
          weightSignal: 'High Extraversion + Social',
          dimension: 'Social / Collaborative Alignment',
          scorePoint: 58,
        },
        {
          id: 'opt-c',
          label: 'Novel conceptual pathways and non-standard solutions',
          weightSignal: 'High Openness + Artistic',
          dimension: 'Openness / Conceptual Synthesis',
          scorePoint: 72,
        },
      ],
    },
    independentReadings: {
      title: 'One person. Four independent readings.',
      body: 'Personality, interests, work values and behavioral signals stay inspectable instead of being flattened into one opaque score.',
      models: [
        {
          id: 'big-five',
          name: 'Big Five Dimensions',
          subtitle: 'Dimensional trait spectrums',
          summary: 'Personality traits are continuous dimensions, not binary boxes or typologies.',
          traits: [
            { id: 'openness', name: 'Openness', low: 'Pragmatic & Concrete', high: 'Exploratory & Abstract', sample: 78, color: 'var(--pa-data-openness)' },
            { id: 'conscientiousness', name: 'Conscientiousness', low: 'Flexible & Spontaneous', high: 'Systematic & Thorough', sample: 84, color: 'var(--pa-data-conscientiousness)' },
            { id: 'extraversion', name: 'Extraversion', low: 'Independent & Contemplative', high: 'Expressive & Outward', sample: 52, color: 'var(--pa-data-extraversion)' },
            { id: 'agreeableness', name: 'Agreeableness', low: 'Competitive & Direct', high: 'Cooperative & Empathetic', sample: 68, color: 'var(--pa-data-agreeableness)' },
            { id: 'stability', name: 'Emotional Stability', low: 'Reactive & Sensitive', high: 'Steady & Grounded', sample: 74, color: 'var(--pa-data-stability)' },
          ],
        },
        {
          id: 'riasec',
          name: 'RIASEC Interest Map',
          subtitle: 'Holland occupational themes',
          summary: 'Vocational interests map the environments and problem types that sustain your energy.',
          territories: [
            { id: 'realistic', name: 'Realistic', description: 'Hands-on, tooling, physical & technical systems', intensity: 62 },
            { id: 'investigative', name: 'Investigative', description: 'Empirical research, deep analysis, technical inquiry', intensity: 88 },
            { id: 'artistic', name: 'Artistic', description: 'Unstructured synthesis, design, conceptual originality', intensity: 70 },
            { id: 'social', name: 'Social', description: 'Coaching, mentoring, facilitation, collective development', intensity: 58 },
            { id: 'enterprising', name: 'Enterprising', description: 'Leadership, strategic initiative, resource mobilization', intensity: 66 },
            { id: 'conventional', name: 'Conventional', description: 'Systematic structure, verification, precision workflows', intensity: 80 },
          ],
        },
        {
          id: 'work-values',
          name: 'O*NET Work Values',
          subtitle: 'Occupational value hierarchy',
          summary: 'The core professional conditions that determine whether a role feels rewarding over time.',
          values: [
            { rank: '01', name: 'Achievement', description: 'Seeing tangible results from skill and disciplined effort' },
            { rank: '02', name: 'Independence', description: 'Autonomy to determine methods and manage responsibilities' },
            { rank: '03', name: 'Working Conditions', description: 'Well-structured environment with clear expectations' },
            { rank: '04', name: 'Recognition', description: 'Visible acknowledgment of contributions and expertise' },
            { rank: '05', name: 'Relationships', description: 'Constructive peer connections and shared purpose' },
            { rank: '06', name: 'Support', description: 'Supportive leadership that provides necessary resources' },
          ],
        },
        {
          id: 'behavioral-signals',
          name: 'Behavioral Signals Ledger',
          subtitle: 'Inspectable evidence traces',
          summary: 'Concrete observational patterns gathered during the adaptive response sequence.',
          signals: [
            { source: 'Response Trade-off #03', metric: 'Decision Latency & Review', interpretation: 'Calculated deliberation on structural constraints' },
            { source: 'Scenario Calibration #07', metric: 'Complexity Tolerance', interpretation: 'Consistent preference for multi-variable problem spaces' },
            { source: 'Context Alignment #12', metric: 'Risk Tolerance', interpretation: 'Prefers verified fallback protocols over speculative bets' },
          ],
        },
      ],
    },
    careerWorlds: {
      title: 'Career fit is a relationship, not a verdict.',
      support: 'Inspect the conditions a role asks for, where your current evidence aligns, and what could be strengthened.',
      worlds: [
        {
          index: '01 / 05',
          id: 'systems-investigative',
          name: 'Systems Architecture & Technical Strategy',
          theme: 'Systems (Investigative & Conventional)',
          imageKey: 'a03',
          statement: 'Environments requiring rigorous technical reasoning, deterministic modeling, and structural resilience.',
          requirements: ['Verifiable interface contracts', 'High problem ambiguity tolerance', 'Disciplined trade-off analysis'],
          whyItFits: 'Strong alignment with high investigative curiosity and systematic conscientiousness.',
          whereItStretches: 'Demands negotiating technical compromises across conflicting organizational interests.',
          whatToStrengthen: 'Executive communication of complex architectural risk to non-technical partners.',
        },
        {
          index: '02 / 05',
          id: 'product-expressive',
          name: 'Product Design & Conceptual Synthesis',
          theme: 'Product (Artistic & Investigative)',
          imageKey: 'a04',
          statement: 'Spaces where user evidence, spatial intuition, and systematic design systems converge into clear interfaces.',
          requirements: ['Human-centered qualitative reasoning', 'Iterative prototype evaluation', 'Cross-functional synthesis'],
          whyItFits: 'Balances conceptual exploration with structured execution discipline.',
          whereItStretches: 'Requires accepting rapid visual compromises in fast-paced production cycles.',
          whatToStrengthen: 'Quantitative metric attribution for design and usability decisions.',
        },
        {
          index: '03 / 05',
          id: 'facilitation-relational',
          name: 'Organizational Coaching & Team Alignment',
          theme: 'Coaching (Social & Enterprising)',
          imageKey: 'a05',
          statement: 'Environments focused on collective momentum, conflict resolution, and developing high-trust teams.',
          requirements: ['Active listening under tension', 'Empathetic feedback structures', 'Group consensus building'],
          whyItFits: 'Resonates with relational awareness and constructive dialogue preferences.',
          whereItStretches: 'Can create fatigue when organizational politics continuously override logical agreements.',
          whatToStrengthen: 'Establishing firmer personal boundaries in emotionally demanding stakeholder dynamics.',
        },
        {
          index: '04 / 05',
          id: 'strategic-directional',
          name: 'Executive Direction & Venture Strategy',
          theme: 'Direction (Enterprising & Conventional)',
          imageKey: 'a06',
          statement: 'High-stakes environments where resource allocation, strategic clarity, and decisive execution are required.',
          requirements: ['Decisiveness with incomplete data', 'Resource portfolio allocation', 'High accountability tolerance'],
          whyItFits: 'Matches ambition for directional agency and measurable operational impact.',
          whereItStretches: 'Forces decisions with limited time for comprehensive deep-dive verification.',
          whatToStrengthen: 'Developing rapid heuristic decision frameworks under acute time pressure.',
        },
        {
          index: '05 / 05',
          id: 'operational-precision',
          name: 'Technical Operations & Engineering Governance',
          theme: 'Operations (Conventional & Realistic)',
          imageKey: 'a02',
          statement: 'Mission-critical infrastructure environments demanding zero-downtime discipline and reproducible protocols.',
          requirements: ['Rigorous observability protocols', 'Root-cause analysis discipline', 'Emergency response composure'],
          whyItFits: 'Directly rewards systematic thoroughness and deterministic reliability standards.',
          whereItStretches: 'Can feel constraining when rigid compliance blocks exploratory technical innovation.',
          whatToStrengthen: 'Automating repetitive governance checks to free capacity for proactive optimization.',
        },
      ],
    },
    developmentEcho: {
      title: 'A profile should change when the evidence changes.',
      body: 'Add a new role, project or assessment later. See what shifted, what stayed stable and why.',
      earlierLabel: 'Earlier baseline',
      earlierDate: 'Recorded Oct 2024',
      currentLabel: 'Current state',
      currentDate: 'Updated Aug 2026',
      traitsComparison: [
        { label: 'Investigative Inquiry', earlier: 76, current: 88, status: 'Expanded through R&D lead role' },
        { label: 'Systematic Conscientiousness', earlier: 84, current: 84, status: 'Stable core methodology' },
        { label: 'Strategic Agency', earlier: 54, current: 66, status: 'Developed through cross-team ownership' },
        { label: 'Emotional Steadiness', earlier: 72, current: 74, status: 'Stable baseline under pressure' },
      ],
    },
    trustScene: {
      title: 'Inspect the method, not just the result.',
      stages: [
        {
          id: 'intake',
          num: '01',
          name: 'Intake',
          detail: 'Your stated professional context, project history, and real response choices.',
        },
        {
          id: 'structure',
          num: '02',
          name: 'Structure',
          detail: 'Deterministic scoring mapped to validated Big Five, RIASEC, and O*NET frameworks.',
        },
        {
          id: 'readings',
          num: '03',
          name: 'Separate readings',
          detail: 'Dimensions remain distinct calculations rather than an opaque composite score.',
        },
        {
          id: 'control',
          num: '04',
          name: 'Control',
          detail: 'Export your assessment records or delete your profile data at any time.',
        },
      ],
      links: [
        { label: 'Read the methodology', to: '/methodology' },
        { label: 'Inspect trust & privacy controls', to: '/trust' },
      ],
    },
    finalProfile: {
      title: 'Build a profile you can question.',
      body: 'Start with the work you already know. Add evidence as your career changes.',
      cta: 'Build my profile',
    },
  },

  howItWorks: {
    title: 'From professional context to a profile you can inspect.',
    lead: 'Four continuous stages transform real career experience into a multi-dimensional, transparent assessment.',
    stages: [
      {
        step: '01',
        title: 'Context',
        subtitle: 'Grounding the assessment in your real work',
        body: 'You begin by describing the roles, projects, technical domains, and team environments you have navigated. This establishes the context for all subsequent inquiries.',
        imageKey: 'a02',
      },
      {
        step: '02',
        title: 'Adaptive inquiry',
        subtitle: 'Questions that respond to previous choices',
        body: 'Instead of a static 100-item questionnaire, the engine calibrates each question around the tensions, trade-offs, and decisions relevant to your domain.',
        imageKey: 'a03',
      },
      {
        step: '03',
        title: 'Separate readings',
        subtitle: 'Keeping distinct psychometric dimensions separate',
        body: 'Personality traits (Big Five), vocational interests (RIASEC), and work values (O*NET) are scored via verified deterministic models, never collapsed into one number.',
        imageKey: 'a07',
      },
      {
        step: '04',
        title: 'Interpretation & controls',
        subtitle: 'Explainable career relationships and growth pathways',
        body: 'Your profile is compared against structured work environments to highlight conditions where you thrive, where you stretch, and what skills to build next.',
        imageKey: 'a08',
      },
    ],
    faq: [
      {
        q: 'How long does the assessment take?',
        a: 'Most people complete the adaptive assessment in 12 to 18 minutes. The adaptive engine reaches statistical convergence faster than traditional static questionnaires.',
      },
      {
        q: 'Is this a personality type quiz like MBTI?',
        a: 'No. Personality Assessor uses dimensional psychometrics (Big Five) and established vocational science (Holland RIASEC, O*NET). You receive continuous percentile scores along dimensional spectrums, not a fixed four-letter typology.',
      },
      {
        q: 'Can I update my profile as my role changes?',
        a: 'Yes. Your profile is designed as an evolving record. You can take update calibrations after major career transitions to observe how your professional tendencies evolve.',
      },
      {
        q: 'How is my assessment data stored and protected?',
        a: 'Your responses are stored securely and associated only with your authenticated account. We do not sell your assessment data or train third-party public models on your private profile.',
      },
    ],
  },

  careerIntelligence: {
    title: 'Explore the conditions where your patterns can work.',
    lead: 'Compare your dimensional profile against curated professional environments to understand fit, stretch points, and development priorities.',
  },

  methodology: {
    title: 'Four models. Kept deliberately separate.',
    lead: 'We do not believe a human being can or should be reduced to a single score. Our methodology maintains clear architectural boundaries between validated frameworks.',
    bigFiveIntro: 'The Big Five framework represents five broad, empirical dimensions of human personality. Each dimension is a continuous spectrum, not a binary category.',
    riasecIntro: 'The RIASEC model categorizes vocational interests into six distinct occupational environments, helping map the types of activities and problems that sustain engagement.',
    workValuesIntro: 'Derived from the United States Department of Labor O*NET database, Work Values identify the core extrinsic and intrinsic workplace qualities that foster long-term satisfaction.',
    deterministicIntro: 'All psychometric dimensions are calculated through deterministic scoring formulas. AI assists only in contextual adaptation and narrative synthesis, with explicit separation from mathematical calculations.',
    limitations: [
      {
        heading: 'Not a Clinical Diagnostic Instrument',
        body: 'Personality Assessor is designed exclusively for professional self-reflection, career exploration, and team alignment. It is not a clinical assessment, psychological diagnosis, or substitute for mental health counseling.',
      },
      {
        heading: 'Dimensional, Not Deterministic Destiny',
        body: 'High or low scores on any dimension do not prescribe what you can or cannot achieve. They describe current behavioral preferences and energy costs across different work contexts.',
      },
      {
        heading: 'Contextual Variation',
        body: 'People adapt their behavior depending on team culture, urgency, and personal values. An assessment captures a snapshot of current patterns under reflective conditions.',
      },
    ],
  },

  trust: {
    title: 'Every result should show its work.',
    lead: 'Transparency is our foundational design principle. Here is how your data flows from input to insight, with full auditability and direct control.',
    chain: [
      {
        stage: '01',
        title: 'Evidence Intake',
        description: 'Your self-reported experience, role history, and answers to calibrated scenario trade-offs.',
        type: 'Deterministic User Input',
      },
      {
        stage: '02',
        title: 'Structured Psychometrics',
        description: 'Mathematical scoring algorithms calculate percentiles across Big Five, RIASEC, and O*NET models independently.',
        type: 'Verified Scoring Engine',
      },
      {
        stage: '03',
        title: 'Separated Model Outputs',
        description: 'Scores remain in separate, inspectable tables rather than being aggregated into a single opaque rating.',
        type: 'Transparent Data Records',
      },
      {
        stage: '04',
        title: 'Narrative Synthesis Layer',
        description: 'Language models generate contextual explanations and role comparisons strictly referencing the calculated scores.',
        type: 'Assisted Synthesis',
      },
      {
        stage: '05',
        title: 'User Data Ownership',
        description: 'You maintain full authority to export your complete assessment history or delete your profile permanently.',
        type: 'User Governance',
      },
    ],
    controls: {
      exportTitle: 'Export Assessment History',
      exportDesc: 'Download your raw responses, dimensional scores, and career comparisons as a structured JSON document.',
      deleteTitle: 'Permanently Delete Account & Data',
      deleteDesc: 'Completely remove your user record, assessment sessions, and generated reports from our primary database.',
      privacyLink: '/privacy',
      privacyControlsLink: '/account/privacy',
    },
  },

  progress: {
    title: 'Your profile is a record, not a label.',
    lead: 'Professional growth is non-linear. Track how changes in role, team, and responsibility reshape your working patterns over time.',
    comparisonNotice: 'Illustrative Example — Comparative Record',
  },

  privacy: {
    title: 'Your data remains yours.',
    lead: 'We believe that professional self-knowledge should never come at the cost of personal privacy.',
    lastUpdated: 'August 2026',
    sections: [
      {
        id: 'collection',
        title: '1. Information We Collect',
        content: 'When you create an account, we collect your name and email address. During an assessment, we record your chosen responses to situational questions and any professional context you choose to provide. We also collect basic technical data (such as browser type and session timestamps) necessary to maintain secure service operation.',
      },
      {
        id: 'usage',
        title: '2. How We Use Your Information',
        content: 'We use your information exclusively to generate your personalized personality profile, compute career alignment comparisons, and maintain your historical assessment records. We do not sell your personal data to employers, advertisers, or third-party brokers.',
      },
      {
        id: 'storage',
        title: '3. Data Storage & Security',
        content: 'Your account and assessment data are stored in secured database environments with industry-standard authentication safeguards and access controls. Passwords are cryptographically hashed using salted bcrypt prior to storage.',
      },
      {
        id: 'export-deletion',
        title: '4. Data Export & Deletion Rights',
        content: 'You retain full ownership of your data. You may at any time export your complete profile and historical records from your account settings, or request permanent deletion of your account and all associated assessment data.',
      },
      {
        id: 'third-parties',
        title: '5. Third-Party Service Providers',
        content: 'We utilize trusted infrastructure providers for application hosting, database storage, and secure authentication (such as Google OAuth). These providers are bound by strict confidentiality and data protection agreements.',
      },
      {
        id: 'contact',
        title: '6. Contact & Data Inquiries',
        content: 'If you have questions regarding your data, privacy controls, or wish to exercise your data rights, you can manage your settings directly in your account dashboard or contact privacy@personalityassessor.com.',
      },
    ],
  },

  notFound: {
    title: 'This pattern ends here.',
    message: 'The page you requested does not exist or has been relocated within our architecture.',
    returnHome: 'Return home',
    buildProfile: 'Build my profile',
  },
};
