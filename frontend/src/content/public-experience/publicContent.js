/**
 * Personality Assessor - Public Experience Content Repository
 * Authoritative content for Under Different Conditions master creative specification.
 * Strict compliance: Zero em dashes in website copy.
 */

export const PUBLIC_CONTENT = {
  home: {
    worldEntry: {
      headline: 'UNDER DIFFERENT CONDITIONS',
      support: 'Personality Assessor reads professional patterns with the work attached.',
      ctaPrimary: 'Build my profile',
      ctaSecondary: 'See how it works',
    },
    situation: {
      prompt: 'How do you make progress when the goal is clear but the implementation is not?',
      response: 'I clarify the constraints first, then choose the smallest reversible step.',
    },
    readings: {
      headline: 'ONE RESPONSE. MORE THAN ONE READING.',
      destinations: [
        {
          id: 'big-five',
          name: 'Big Five Dimensions',
          summary: 'Conscientiousness and emotional stability under ambiguity',
          detail: 'Measures deliberate pacing, systematic risk containment, and steady execution.',
        },
        {
          id: 'riasec',
          name: 'RIASEC Interests',
          summary: 'Investigative and conventional problem navigation',
          detail: 'Reflects preference for structured inquiry over open-ended speculation.',
        },
        {
          id: 'work-values',
          name: 'O*NET Work Values',
          summary: 'Working conditions, independence, and achievement priority',
          detail: 'Signals high motivation in autonomous environments with clear quality standards.',
        },
        {
          id: 'signals',
          name: 'Behavioral Signals',
          summary: 'Iterative execution and defensive risk management',
          detail: 'Captures observable preference for small reversible experiments over large commitments.',
        },
      ],
    },
    workworlds: {
      headline: 'THE SAME PATTERN ACROSS FOUR CONDITIONS',
      conditions: [
        {
          id: 'precision',
          name: 'Precision',
          mediaKey: 'workworldPrecision',
          interpretation: 'Clear constraints make this pattern decisive.',
          detail: 'In structured engineering contexts, establishing boundaries first leads to high-accuracy execution.',
        },
        {
          id: 'autonomy',
          name: 'Autonomy',
          mediaKey: 'workworldAutonomy',
          interpretation: 'Open methods make the same pattern protective.',
          detail: 'When left self-directed, the instinct to isolate small steps protects focus and prevents over-commitment.',
        },
        {
          id: 'collaboration',
          name: 'Collaboration',
          mediaKey: 'workworldCollaboration',
          interpretation: 'Shared ownership turns clarity into coordination.',
          detail: 'In cross-functional teams, clarifying constraints aligns stakeholders and unblocks dependent teammates.',
        },
        {
          id: 'pressure',
          name: 'Operational Pressure',
          mediaKey: 'workworldPressure',
          interpretation: 'Under time pressure, the same instinct can become rigidity.',
          detail: 'When rapid pivots are required, over-indexing on constraint verification can slow decision velocity.',
        },
      ],
    },
    calibration: {
      headline: 'DETERMINISTIC CAREER CALIBRATION',
      lead: 'Career alignment calculations assemble six deterministic constraints without black box adjustments.',
      weights: [
        { id: 'riasec', label: 'RIASEC Interests', percentage: 25, role: 'Occupational domain alignment' },
        { id: 'skills', label: 'Technical & Professional Skills', percentage: 25, role: 'Concrete capability match' },
        { id: 'values', label: 'Work Values', percentage: 20, role: 'Organizational condition satisfaction' },
        { id: 'personality', label: 'Personality Traits', percentage: 15, role: 'Working style and dimensional fit' },
        { id: 'education', label: 'Educational Background', percentage: 10, role: 'Foundational domain preparation' },
        { id: 'goals', label: 'Career Goals', percentage: 5, role: 'Individual trajectory alignment' },
      ],
    },
    timeExposure: {
      headline: 'WHAT HOLDS WHEN THE WORK CHANGES?',
      support: 'Revisit your profile as your responsibilities shift to inspect what stayed stable, what moved, and what context changed around it.',
      baselineLabel: 'BASELINE RECORD',
      laterLabel: 'LATER WORK CONTEXT',
      stabilityFinding: 'Trait stability: 89% consistency in core conscientious problem formulation.',
      adaptationFinding: 'Context adaptation: 34% increase in collaborative delegation under team scale.',
    },
    trace: {
      headline: 'SHOW ME WHERE THAT CAME FROM.',
      support: 'Distinguish what you supplied, what the system calculated, where comparison happens, and what remains under your direct control.',
      inspectPrompt: 'Hover or drag inspection aperture to view the underlying evidence layer.',
    },
    finale: {
      headline: 'SEE WHAT HOLDS UNDER DIFFERENT CONDITIONS.',
      support: 'Build a profile you can inspect, compare and revisit as your work changes.',
      ctaPrimary: 'Build my profile',
      ctaSecondary: 'Explore how it works',
    },
  },

  career: {
    hero: {
      headline: 'WHERE DOES THIS PATTERN WORK?',
      support: 'Career fit changes when the conditions change.',
    },
    workworlds: [
      {
        id: 'structured-systems',
        name: 'Structured Systems',
        condition: 'High technical definition and rigorous architectural boundaries.',
        alignment: 'Predictable interfaces, high accountability, deterministic verification.',
        tension: 'Ambiguous authority, shifting scope, uncalibrated dependencies.',
        develop: 'Expand rapid prototyping and exploratory experimentation.',
        mediaKey: 'workworldPrecision',
      },
      {
        id: 'deep-inquiry',
        name: 'Deep Inquiry',
        condition: 'Open exploratory investigation of complex phenomena.',
        alignment: 'Methodological rigor, continuous data observation, root-cause depth.',
        tension: 'Superficial delivery pressure, unverified assumptions.',
        develop: 'Translate technical findings into executive summaries.',
        mediaKey: 'careerDeepInquiry',
      },
      {
        id: 'collaborative-delivery',
        name: 'Collaborative Delivery',
        condition: 'Cross-functional team coordination and shared ownership.',
        alignment: 'Clear stakeholder consensus, empathetic communication, shared milestones.',
        tension: 'Isolated silos, uncommunicated priority shifts.',
        develop: 'Strengthen direct technical ownership and independent execution.',
        mediaKey: 'careerCoordination',
      },
      {
        id: 'technical-control',
        name: 'Technical Control',
        condition: 'Direct operational oversight of active machines and processes.',
        alignment: 'Real-time telemetry, clear incident protocols, immediate intervention.',
        tension: 'Delayed feedback loops, unmonitored system changes.',
        develop: 'Design resilient automated failover mechanisms.',
        mediaKey: 'workworldPressure',
      },
      {
        id: 'creative-synthesis',
        name: 'Creative Synthesis',
        condition: 'Rapid iterative prototyping and generative experimentation.',
        alignment: 'Fluid concept exploration, visual storytelling, quick feedback cycles.',
        tension: 'Premature optimization, rigid bureaucratic approvals.',
        develop: 'Codify design decisions into repeatable system architectures.',
        mediaKey: 'careerSynthesis',
      },
    ],
  },

  how: {
    hero: {
      headline: 'FOLLOW ONE ANSWER',
      support: 'From source to score, without losing where it came from.',
    },
    sampleResponse: 'I clarify the constraints first, then choose the smallest reversible step.',
    movements: [
      {
        id: 'capture',
        name: 'Capture',
        title: 'Source response is preserved verbatim',
        description: 'Raw input enters with its situational context intact rather than immediately reduced to a number.',
      },
      {
        id: 'isolate',
        name: 'Isolate',
        title: 'Syntactic and semantic clause separation',
        description: 'Key phrases separate into distinct behavioral markers representing cognitive and action strategies.',
      },
      {
        id: 'branch',
        name: 'Branch',
        title: 'Multi-model psychometric calibration',
        description: 'Traits, vocational interests, and work values calibrate across independent psychometric models.',
      },
      {
        id: 'weight',
        name: 'Weight',
        title: 'Proportional mathematical calculation',
        description: 'Verified scoring formulas apply fixed proportional weights without black-box adjustments.',
      },
      {
        id: 'recompose',
        name: 'Recompose',
        title: 'Unified inspectable professional record',
        description: 'The complete profile emerges as an inspectable record with continuous provenance back to the source.',
      },
    ],
  },

  progress: {
    hero: {
      headline: 'WHAT CHANGED, AND WHAT DID NOT?',
      support: 'Later assessments add evidence. They do not erase the earlier record.',
    },
    emptyState: {
      headline: 'Change becomes visible after another record exists.',
      support: 'Complete an initial assessment now, then return after a meaningful shift in your work responsibilities.',
      cta: 'Start an assessment',
    },
  },

  trust: {
    hero: {
      headline: 'SHOW ME WHERE THAT CAME FROM.',
      support: 'Follow every reading back to the exact evidence that produced it.',
    },
    layers: [
      {
        id: 'supplied',
        title: 'Supplied',
        subtitle: 'Raw participant input',
        description: 'The original contextual response you entered during assessment inquiry.',
      },
      {
        id: 'inferred',
        title: 'Inferred',
        subtitle: 'Trait vectors & dimensions',
        description: 'Continuous Big Five and RIASEC scores calculated through standardized item response theory.',
      },
      {
        id: 'calculated',
        title: 'Calculated',
        subtitle: 'Deterministic career calibration',
        description: 'Multi-factor alignment scored using explicit 25/25/20/15/10/5 mathematical weights.',
      },
      {
        id: 'compared',
        title: 'Compared',
        subtitle: 'Verified occupational benchmarks',
        description: 'Contextual comparison against 17 verified engineering, design, and analytical profiles.',
      },
      {
        id: 'controlled',
        title: 'Controlled',
        subtitle: 'Direct user ownership',
        description: 'Immediate account actions to export raw data, disable AI synthesis, or delete all records.',
      },
    ],
    rights: [
      {
        id: 'export',
        label: 'Export full record',
        description: 'Download complete responses, trait vectors, and historical comparisons in JSON format.',
      },
      {
        id: 'ai-toggle',
        label: 'AI narrative control',
        description: 'Enable or disable AI commentary while keeping deterministic scoring reports active.',
      },
      {
        id: 'delete',
        label: 'Complete record purge',
        description: 'Permanently remove your account, session logs, and psychometric data from our database.',
      },
    ],
  },

  methodology: {
    hero: {
      headline: 'WHAT THE SYSTEM USES. WHAT IT DOES NOT.',
      support: 'Independent psychometric models maintain clear boundaries so no single convenience score obscures your real working patterns.',
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
        role: 'Occupational Domain Mapping',
        description: 'Maps attraction to Realistic, Investigative, Artistic, Social, Enterprising, and Conventional problem spaces based on Holland occupational theory.',
      },
      {
        id: 'work-values',
        name: 'O*NET Work Values',
        role: 'Workplace Reward Priority',
        description: 'Quantifies organizational conditions that sustain motivation: Achievement, Independence, Working Conditions, Recognition, Relationships, and Support.',
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
  },

  privacy: {
    hero: {
      headline: 'YOUR DATA, IN PLAIN LANGUAGE.',
      support: 'How Personality Assessor collects, computes, stores, and protects your professional evidence.',
    },
    sections: [
      {
        id: 'collection',
        title: 'Information we collect',
        content: 'When you take an assessment, we record your response text, selected options, and completion timestamps. When creating an account, we store your name and verified email address.',
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
      headline: 'Continue where you left off.',
      support: 'Sign in to continue an assessment or revisit your results.',
      emailLabel: 'Email address',
      passwordLabel: 'Password',
      submitBtn: 'Sign in',
      googleBtn: 'Sign in with Google',
      signupPrompt: 'Need an account?',
      signupLinkText: 'Start with one assessment',
    },
    signup: {
      headline: 'Start with one assessment.',
      support: 'Create an account to keep your results, compare later changes and control your data.',
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

  notFound: {
    title: 'Page not found in this world',
    message: 'The requested route does not exist in this public environment.',
    returnHome: 'Return home',
    buildProfile: 'Build my profile',
  },
};

export default PUBLIC_CONTENT;
