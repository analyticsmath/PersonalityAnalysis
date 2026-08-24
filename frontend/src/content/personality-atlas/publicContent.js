/**
 * Personality Assessor - Context Atlas Public Content
 * Authoritative content based strictly on real psychometric models,
 * canonical 17-role repository data, and explicit editorial workworlds.
 * NOTE: Strict compliance: Zero em dashes in website copy.
 */

import careersData from '../careers.json';

export const PUBLIC_CONTENT = {
  brand: {
    name: 'Personality Assessor',
    tagline: 'Adaptive personality and career intelligence',
    mission: 'Professional evidence becomes an inspectable, multidimensional profile without reducing a person to one label.',
    ctaPrimary: 'Build my profile',
    ctaSecondary: 'How it works',
    signIn: 'Sign in',
  },

  home: {
    chapter1: {
      headline: 'Your work leaves a trail of context.',
      lead: 'Personality Assessor keeps the source attached, then shows how the same evidence reads across personality, interests, work values, career conditions, and time.',
      ctaPrimary: 'Build my profile',
      ctaSecondary: 'See how it works',
      sampleResponse: '“I clarify responsibilities before committing work.”',
      sourceToken: 'SOURCE RECORD REF: 0x8F4A',
    },

    chapter2: {
      headline: 'One answer can contribute to more than one reading.',
      lead: 'A single human response provides distinct dimensional signals rather than resolving to one rigid category.',
      sourceClause: 'I clarify responsibilities before committing work.',
      models: [
        {
          id: 'big-five',
          name: 'Big Five Dimensions',
          reading: 'High Conscientiousness + System Boundary Focus',
          description: 'Reflects systematic planning and disciplined interface clarification before execution begins.',
        },
        {
          id: 'riasec',
          name: 'RIASEC Interest Map',
          reading: 'Investigative & Conventional Alignment',
          description: 'Points toward structured technical inquiry, formal requirements, and empirical verification.',
        },
        {
          id: 'work-values',
          name: 'O*NET Work Values',
          reading: 'Independence & Working Conditions Priority',
          description: 'Places high value on clear structural constraints, autonomy in method, and predictable expectations.',
        },
        {
          id: 'career-signals',
          name: 'Career Signal Calibration',
          reading: 'Architecture & System Ownership Fit',
          description: 'Strong alignment with roles requiring explicit boundaries, fault isolation, and coordinated delivery.',
        },
      ],
    },

    chapter3: {
      title: 'Workworld Drift',
      subtitle: 'The same evidence can mean something different in a different context.',
      environments: [
        {
          id: 'structured',
          name: 'Structured precision',
          statement: 'Clear ownership. Explicit constraints. Direct control.',
          reading: 'In a structured setting, clarifying boundaries is the core operational virtue.',
          mediaKey: 'careerComplexMachine',
        },
        {
          id: 'autonomous',
          name: 'Autonomous inquiry',
          statement: 'Long focus. Open questions. Self-directed methods.',
          reading: 'In an exploratory research setting, boundary clarification protects deep analytical focus.',
          mediaKey: 'career3dPrinting',
        },
        {
          id: 'collaborative',
          name: 'Collaborative delivery',
          statement: 'Shared artifacts. Negotiated decisions. Frequent coordination.',
          reading: 'In a cross-functional group, explicit responsibility reduces coordination drag across teams.',
          mediaKey: 'homeSharedContext',
        },
      ],
    },

    chapter4: {
      headline: 'Some patterns stayed. Some changed with the work.',
      lead: 'Revisit your profile as your responsibilities evolve. Earlier baseline evidence remains visible alongside later context.',
      baselineToken: 'BASELINE: INITIAL PROFILE',
      laterToken: 'LONGITUDINAL REVIEW: +18 MONTHS',
      comparisonNote: 'Trait stability: High Conscientiousness preserved across environments. Shift observed: Increased collaborative coordination weight in senior leadership context.',
    },

    chapter5: {
      headline: 'Keep the source. Question the reading. Revisit the record.',
      lead: 'Build a profile that can change as your evidence and career context change.',
      ctaPrimary: 'Build my profile',
      ctaSecondary: 'Read the methodology',
      resolutionStates: [
        { id: 'supplied', label: 'Supplied', desc: 'Direct human response recorded in verifiable form.' },
        { id: 'inferred', label: 'Inferred', desc: 'Syntactic and semantic clause extraction.' },
        { id: 'calculated', label: 'Calculated', desc: 'Deterministic dimensional score compilation.' },
        { id: 'compared', label: 'Compared', desc: 'Evaluated against verified career requirement baselines.' },
        { id: 'assisted', label: 'AI-assisted', desc: 'Narrative synthesis separated from mathematical scoring.' },
        { id: 'controlled', label: 'Controlled', desc: 'Full user export, review, and selective deletion rights.' },
      ],
    },
  },

  career: {
    hero: {
      headline: 'Explore the conditions where your patterns can work.',
      lead: 'Career fit is a relationship between your current evidence and the conditions a role asks for.',
    },
    // Editorial groupings of canonical roles for the Context Atlas public experience
    workworlds: [
      {
        id: 'structured-systems',
        name: 'Structured technical systems',
        condition: 'High precision, formalized architecture, explicit boundaries.',
        alignment: 'Deterministic problem solving, failure mode analysis, architectural verification.',
        tension: 'May feel constrained in ambiguous or rapidly pivoting environments.',
        develop: 'Expand cross-disciplinary translation skills and rapid exploratory prototyping.',
        mediaKey: 'careerComplexMachine',
      },
      {
        id: 'deep-inquiry',
        name: 'Deep inquiry',
        condition: 'Long focus, empirical research, complex mathematical or technical modeling.',
        alignment: 'Rigorous hypothesis testing, data interpretation, methodical root-cause discovery.',
        tension: 'May experience friction under aggressive short-cycle delivery demands.',
        develop: 'Build interim milestone communication and iterative stakeholder demonstration.',
        mediaKey: 'careerDeepInquiry',
      },
      {
        id: 'collaborative-delivery',
        name: 'Collaborative delivery',
        condition: 'Cross-functional teams, frequent alignment, negotiated technical tradeoffs.',
        alignment: 'Shared artifact creation, active coordination, team velocity facilitation.',
        tension: 'Requires continuous social context switching and distributed consensus building.',
        develop: 'Preserve dedicated asynchronous focus blocks for deep individual analysis.',
        mediaKey: 'careerCoordination',
      },
      {
        id: 'creative-synthesis',
        name: 'Creative synthesis',
        condition: 'Novel problem domains, rapid prototyping, conceptual integration.',
        alignment: 'Connecting disparate technical ideas, user experience innovation, agile iteration.',
        tension: 'Can lose momentum in rigid legacy maintenance or bureaucratic workflows.',
        develop: 'Strengthen formal documentation habits and systematic verification frameworks.',
        mediaKey: 'career3dPrinting',
      },
      {
        id: 'operational-leadership',
        name: 'Directional and operational leadership',
        condition: 'Strategic resource allocation, organizational orchestration, high accountability.',
        alignment: 'Decisive problem prioritization, team capability scaling, structural governance.',
        tension: 'Demands continuous balancing of technical debt against market delivery pressure.',
        develop: 'Deepen psychological safety practices and active listening in technical reviews.',
        mediaKey: 'careerControl',
      },
    ],
    // Canonical 17 roles read directly from careers.json
    roles: Object.entries(careersData).map(([key, data]) => ({
      key,
      title: data.title,
      personality: data.personality,
      skills: data.skills,
      subjects: data.subjects,
      aptitude: data.aptitude,
      interests: data.interests,
      growthPotential: data.growthPotential,
    })),
  },

  howItWorks: {
    hero: {
      headline: 'See how one response becomes several readings.',
      lead: 'The source stays attached while the system extracts signals, scores separate dimensions, compares conditions, and stores the result for later review.',
    },
    illustrativeResponse: '“I clarify responsibilities before committing work.”',
    illustrativeNotice: 'Illustrative response',
    movements: [
      {
        id: 'source',
        name: 'Source',
        title: 'Human response recorded',
        body: 'A response enters the system tied to its original situational context. It is preserved as verifiable ground truth rather than flattened into a single rating.',
      },
      {
        id: 'extract',
        name: 'Extract',
        title: 'Clauses and signals separate',
        body: 'The system isolates actionable behavioral phrases, semantic nuances, and trade-off choices within the response.',
      },
      {
        id: 'branch',
        name: 'Branch',
        title: 'Multiple dimensions receive contributions',
        body: 'The extracted evidence is routed simultaneously to distinct psychometric frameworks including Big Five traits, RIASEC interest vectors, and O*NET work values.',
      },
      {
        id: 'weight',
        name: 'Weight',
        title: 'Contributions gain relative influence',
        body: 'Deterministic mathematical weights are applied according to established psychometric baselines, ensuring predictable and transparent aggregation.',
      },
      {
        id: 'store',
        name: 'Store',
        title: 'Provenance retained for review',
        body: 'The derived readings and their source tokens recombine into an immutable, inspectable record ready for longitudinal comparison over time.',
      },
    ],
  },

  progress: {
    hero: {
      headline: 'A later record should not erase the first.',
      lead: 'Revisit your profile as your work changes and inspect what stayed stable, what moved, and what context changed around it.',
    },
    temporalIllustration: {
      badge: 'ILLUSTRATIVE EXAMPLE: COMPARATIVE RECORD',
      baselineDate: 'Initial assessment: Baseline context',
      laterDate: 'Follow-up assessment: Senior technical coordination role',
      stabilityFinding: 'Core Conscientiousness and Analytical traits remained stable across observations.',
      adaptationFinding: 'Collaborative delivery and strategic coordination signals increased significantly in response to new leadership responsibilities.',
    },
    emptyState: {
      headline: 'Change becomes visible after another record exists.',
      lead: 'Start with one assessment. Return after a meaningful change in role, responsibilities, or work context.',
      cta: 'Start an assessment',
      responseFragment: '“I establish clear interface contracts before execution.”',
    },
  },

  trust: {
    hero: {
      headline: 'Follow a reading back to its source.',
      lead: 'See what you supplied, what the system calculated, where comparison happens, where AI may assist, and what remains under your control.',
    },
    chainStates: [
      {
        id: 'supplied',
        title: 'Supplied',
        subtitle: 'Direct user responses',
        description: 'Exact text, option selections, and behavioral responses captured during your assessment sessions. Preserved in primary database storage under your account.',
      },
      {
        id: 'inferred',
        title: 'Inferred',
        subtitle: 'Syntactic signal extraction',
        description: 'Specific behavioral clauses and choice patterns identified from your responses, maintaining direct links to the raw text.',
      },
      {
        id: 'calculated',
        title: 'Calculated',
        subtitle: 'Deterministic scoring formulas',
        description: 'Mathematical computation of Big Five dimensional percentiles and RIASEC interest vectors using published psychometric formulas.',
      },
      {
        id: 'compared',
        title: 'Compared',
        subtitle: 'Career profile matching',
        description: 'Multi-factor alignment scoring across 17 benchmarked engineering, design, and analytical disciplines using fixed weight distributions.',
      },
      {
        id: 'assisted',
        title: 'AI-assisted',
        subtitle: 'Contextual narrative synthesis',
        description: 'Large language model summaries generated strictly as interpretive commentary. AI narrative generation is explicitly decoupled from numerical scoring.',
      },
      {
        id: 'controlled',
        title: 'Controlled',
        subtitle: 'Individual ownership and export',
        description: 'You retain the right to inspect your full scoring chain, export complete records, or delete all stored data from our systems at any time.',
      },
    ],
    humanControl: {
      title: 'Your data rights and direct controls',
      lead: 'Three explicit actions available in your account settings with immediate execution.',
      actions: [
        {
          id: 'export',
          label: 'Export full record',
          description: 'Download your complete raw responses, calculated trait scores, career alignment vectors, and historical benchmarks in JSON format.',
        },
        {
          id: 'ai-toggle',
          label: 'AI narrative control',
          description: 'Choose whether AI commentary is enabled or restricted to deterministic score reports only.',
        },
        {
          id: 'delete',
          label: 'Complete record purge',
          description: 'Permanently remove your account, assessment sessions, trait vectors, and associated telemetry from our active databases.',
        },
      ],
    },
  },

  methodology: {
    hero: {
      headline: 'Separate models. Clear boundaries.',
      lead: 'Personality, vocational interests, work values, career signals, career comparison, and optional AI narrative serve different roles in the system.',
    },
    frameworks: [
      {
        id: 'big-five',
        name: 'Big Five Dimensions',
        role: 'Trait Spectrum Measurement',
        description: 'Evaluates Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous spectrums rather than binary personality types.',
      },
      {
        id: 'riasec',
        name: 'RIASEC Vocational Interests',
        role: 'Occupational Environment Mapping',
        description: 'Maps attraction to Realistic, Investigative, Artistic, Social, Enterprising, and Conventional problem types based on Holland occupational theory.',
      },
      {
        id: 'work-values',
        name: 'O*NET Work Values',
        role: 'Workplace Reward Priority',
        description: 'Quantifies the organizational conditions that sustain motivation: Achievement, Independence, Working Conditions, Recognition, Relationships, and Support.',
      },
      {
        id: 'career-signals',
        name: 'Behavioral Signals',
        role: 'Situational Decision Trade-offs',
        description: 'Captures observed decision patterns in complex team and system engineering scenarios to calibrate real-world performance context.',
      },
      {
        id: 'career-fit',
        name: 'Multi-Factor Career Comparison',
        role: 'Deterministic Fit Indexing',
        description: 'Calculates career alignment against 17 verified engineering, design, and analytical profiles using fixed mathematical weights.',
      },
      {
        id: 'ai-role',
        name: 'AI Narrative Decoupling',
        role: 'Contextual Synthesis Only',
        description: 'Language models generate qualitative explanations and synthesis but have zero authority over trait scores or career ranking calculations.',
      },
      {
        id: 'limits',
        name: 'Boundaries and Non-Clinical Scope',
        role: 'Professional Self-Discovery',
        description: 'Designed exclusively for professional self-reflection and career planning. Not intended for clinical psychological diagnosis or automated hiring verdicts.',
      },
    ],
    weights: [
      { id: 'riasec', label: 'RIASEC Interests', percentage: 25, role: 'Occupational domain alignment' },
      { id: 'skills', label: 'Technical & Professional Skills', percentage: 25, role: 'Concrete capability match' },
      { id: 'values', label: 'Work Values', percentage: 20, role: 'Organizational condition satisfaction' },
      { id: 'personality', label: 'Personality Traits', percentage: 15, role: 'Working style and dimensional fit' },
      { id: 'education', label: 'Educational Background', percentage: 10, role: 'Foundational domain preparation' },
      { id: 'goals', label: 'Career Goals', percentage: 5, role: 'Individual trajectory alignment' },
    ],
  },

  privacy: {
    hero: {
      headline: 'Clear terms for your personal record.',
      lead: 'How Personality Assessor collects, computes, stores, and protects your professional evidence.',
    },
    sections: [
      {
        id: 'collection',
        title: 'Information we collect',
        content: 'When you take an assessment, we record your response text, chosen options, and completion timestamps. When creating an account, we store your name and verified email address.',
      },
      {
        id: 'processing',
        title: 'How your data is processed',
        content: 'Responses are analyzed through deterministic psychometric algorithms to calculate Big Five dimensions, RIASEC profiles, and work value rankings. Numerical calculations run entirely in secure backend environments.',
      },
      {
        id: 'ai-usage',
        title: 'Artificial intelligence and narrative generation',
        content: 'If enabled, qualitative narrative summaries are generated using secure AI endpoints. Your raw assessment responses are processed with strict zero-retention policies and are never used to train third-party machine learning models.',
      },
      {
        id: 'storage',
        title: 'Storage and security',
        content: 'Your records are stored in authenticated relational database systems with role-based access control, encrypted network transport, and continuous monitoring.',
      },
      {
        id: 'rights',
        title: 'Your ownership and export rights',
        content: 'You own your record. You can download your complete historical assessment data at any time in machine-readable JSON format, or request full account and data deletion from your profile settings.',
      },
      {
        id: 'contact',
        title: 'Contact and privacy inquiries',
        content: 'For privacy inquiries, data requests, or governance questions, contact privacy@valtumpersonality.com.',
      },
    ],
  },

  auth: {
    login: {
      headline: 'Return to your record.',
      support: 'Sign in to continue an assessment, review results, or revisit your career context.',
      emailLabel: 'Email address',
      passwordLabel: 'Password',
      submitBtn: 'Sign in',
      googleBtn: 'Sign in with Google',
      signupPrompt: 'Need an account?',
      signupLinkText: 'Start your record',
    },
    signup: {
      headline: 'Start with one honest record.',
      lead: 'Create an account to keep assessments, compare later changes, and control the data attached to your profile.',
      nameLabel: 'Full name',
      emailLabel: 'Email address',
      passwordLabel: 'Password (min 8 characters)',
      termsAgreement: 'I agree to the Terms of Service and Privacy Policy.',
      submitBtn: 'Create account',
      googleBtn: 'Sign up with Google',
      loginPrompt: 'Already have an account?',
      loginLinkText: 'Sign in',
    },
  },
};
