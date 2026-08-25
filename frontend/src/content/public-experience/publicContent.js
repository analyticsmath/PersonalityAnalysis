/**
 * Personality Assessor - Public Experience Content Repository
 * Editorial Evidence Atlas authoritative content.
 * Strict compliance: Zero em dashes in website copy.
 */

export const PUBLIC_CONTENT = {
  home: {
    worldEntry: {
      headline: 'ONE ANSWER IS NOT ONE RESULT.',
      support: 'Personality Assessor turns your responses, background and career signals into a traceable professional record, then shows how that evidence reads across personality, interests, values and work conditions.',
      ctaPrimary: 'Build my profile',
      ctaSecondary: 'Follow one answer',
      prompt: 'How do you make progress when the goal is clear but the implementation is not?',
      response: 'I clarify the constraints first, then choose the smallest reversible step.',
    },
    situation: {
      prompt: 'How do you make progress when the goal is clear but the implementation is not?',
      response: 'I clarify the constraints first, then choose the smallest reversible step.',
      clauses: [
        { id: 'c1', text: 'I clarify the constraints first' },
        { id: 'c2', text: 'then choose the smallest' },
        { id: 'c3', text: 'reversible step.' },
      ],
    },
    readings: {
      headline: 'ONE RESPONSE. MORE THAN ONE READING.',
      destinations: [
        {
          id: 'big-five',
          name: 'Big Five Dimensions',
          summary: 'Conscientiousness and emotional stability under ambiguity',
          detail: 'Measures deliberate pacing, systematic risk containment, and steady execution.',
          axis: 'Methodological Pacing',
        },
        {
          id: 'riasec',
          name: 'RIASEC Interests',
          summary: 'Investigative and conventional problem navigation',
          detail: 'Reflects preference for structured inquiry over open-ended speculation.',
          axis: 'Inquiry Focus',
        },
        {
          id: 'work-values',
          name: 'Work Values',
          summary: 'Working conditions, independence, and achievement priority',
          detail: 'Signals high motivation in autonomous environments with clear quality standards.',
          axis: 'Autonomy and Structure',
        },
        {
          id: 'signals',
          name: 'Career Signals',
          summary: 'Iterative execution and defensive risk management',
          detail: 'Captures observable preference for small reversible experiments over large commitments.',
          axis: 'Experimental Velocity',
        },
      ],
    },
    workworlds: {
      headline: 'THE SAME PATTERN READS DIFFERENTLY AT WORK.',
      conditions: [
        {
          id: 'precision',
          name: 'Precision',
          mediaKey: 'workworldPrecision',
          interpretation: 'Clear constraints make this pattern decisive.',
          detail: 'In structured technical contexts, establishing boundaries first leads to high accuracy execution.',
        },
        {
          id: 'autonomy',
          name: 'Autonomy',
          mediaKey: 'workworldAutonomy',
          interpretation: 'Open methods make the same pattern protective.',
          detail: 'When self-directed, the instinct to isolate small steps protects focus and prevents over-commitment.',
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
          interpretation: 'Under operational pressure, the same instinct requires adaptation.',
          detail: 'When rapid pivots are required, over-indexing on constraint verification must be balanced against decision speed.',
        },
      ],
    },
    models: {
      headline: 'MULTI-MODEL PSYCHOMETRIC ATLAS',
      list: [
        {
          id: 'big-five',
          name: 'Big Five',
          role: 'Dimensional Spectrum',
          description: 'Evaluates Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous dimensions rather than binary types.',
        },
        {
          id: 'riasec',
          name: 'RIASEC',
          role: 'Vocational Interests',
          description: 'Maps attraction to Realistic, Investigative, Artistic, Social, Enterprising, and Conventional problem domains.',
        },
        {
          id: 'work-values',
          name: 'Work Values',
          role: 'Environmental Motivation',
          description: 'Quantifies organizational conditions that sustain motivation: Achievement, Independence, Working Conditions, Recognition, Relationships, and Support.',
        },
        {
          id: 'career-signals',
          name: 'Career Signals',
          role: 'Situational Action Tendencies',
          description: 'Identifies concrete action habits: iterative scoping, stakeholder alignment, risk containment, and diagnostic inquiry.',
        },
        {
          id: 'background',
          name: 'Background',
          role: 'Domain Context',
          description: 'Integrates educational foundation and technical disciplines to ground analytical interpretations.',
        },
        {
          id: 'goals',
          name: 'Goals',
          role: 'Trajectory Alignment',
          description: 'Weights individual aspirations and target responsibilities in career alignment calculations.',
        },
      ],
    },
    calibration: {
      headline: 'NOT EVERY SIGNAL COUNTS THE SAME.',
      lead: 'Career-fit weights assemble six deterministic factors without black box adjustments.',
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
      headline: 'WHAT CHANGED. WHAT HELD.',
      support: 'Revisit your profile as your responsibilities shift to inspect what stayed stable, what moved, and what context changed around it.',
      baselineLabel: 'BASELINE RECORD',
      laterLabel: 'LATER WORK CONTEXT',
      stabilityFinding: 'Some patterns remain stable over time.',
      adaptationFinding: 'Others shift as responsibilities change.',
      disclaimer: 'Illustrative example',
    },
    trace: {
      headline: 'SHOW ME WHERE THAT CAME FROM.',
      support: 'Distinguish what you supplied, what the system calculated, where comparison happens, and what remains under your direct control.',
      inspectPrompt: 'Inspect the evidence chain connecting your original response to multi-dimensional career alignment.',
    },
    finale: {
      headline: 'BUILD A PROFILE THAT KEEPS ITS EVIDENCE.',
      support: 'Build a profile you can inspect, compare and revisit as your work changes.',
      ctaPrimary: 'Build my profile',
      ctaSecondary: 'Follow one answer',
    },
  },

  career: {
    hero: {
      headline: 'CAREER FIT IS A FIELD, NOT A RANKING.',
      support: 'Career fit changes when the conditions change. Explore 17 occupational profiles grounded in deterministic evidence.',
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
        name: 'Source capture',
        title: 'Source response is preserved verbatim',
        description: 'Raw input enters with its situational context intact rather than immediately reduced to an opaque number.',
      },
      {
        id: 'isolate',
        name: 'Clause separation',
        title: 'Syntactic and semantic clause separation',
        description: 'Key phrases separate into distinct behavioral markers representing cognitive and action strategies.',
      },
      {
        id: 'branch',
        name: 'Multi-model calibration',
        title: 'Multi-model psychometric calibration',
        description: 'Traits, vocational interests, and work values calibrate across independent psychometric models.',
      },
      {
        id: 'weight',
        name: 'Deterministic calculation',
        title: 'Proportional career-fit weighting',
        description: 'Scoring formulas apply fixed career-fit weights (RIASEC 25%, Skills 25%, Values 20%, Personality 15%, Education 10%, Goals 5%) without black box adjustments.',
      },
      {
        id: 'recompose',
        name: 'Inspectable record',
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
    stabilityFinding: 'Some patterns remain stable over time.',
    adaptationFinding: 'Others shift as responsibilities change.',
    disclaimer: 'Illustrative example',
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
    recordStateSteps: [
      {
        id: 'supplied',
        name: 'Supplied',
        title: 'Raw participant input',
        description: 'The original contextual response you entered during assessment inquiry.',
        details: 'Source Prompt: "How do you make progress under ambiguity?" | Response: "I clarify constraints first, then choose the smallest reversible step."',
      },
      {
        id: 'inferred',
        name: 'Inferred',
        title: 'Trait vectors and dimensions',
        description: 'Continuous Big Five and RIASEC scores calculated through psychometric models with explicit validity checks.',
        details: 'Validity state: valid (full confidence) | Conscientiousness: 78 | Emotional Stability: 64 | Investigative: 72 | Conventional: 68',
      },
      {
        id: 'calculated',
        name: 'Calculated',
        title: 'Deterministic career calibration',
        description: 'Multi-factor alignment scored using explicit 25/25/20/15/10/5 mathematical career-fit weights.',
        details: 'RIASEC (25%) + Skills (25%) + Values (20%) + Traits (15%) + Education (10%) + Goals (5%)',
      },
      {
        id: 'compared',
        name: 'Compared',
        title: 'Occupational benchmarks',
        description: 'Contextual comparison against 17 canonical engineering, design, and analytical profiles.',
        details: 'Top alignment: Systems Architect (91%), Staff Software Engineer (88%), Research Analyst (85%)',
      },
      {
        id: 'controlled',
        name: 'Controlled',
        title: 'Direct user sovereignty and privacy rights',
        description: 'Authenticated account controls to export raw data, inspect AI transparency, or perform hard deletion of stored records.',
        details: 'Sovereign rights: Full JSON Data Export, AI Transparency Notice, Hard Deletion of Account & Records',
      },
    ],
    rightsActions: [
      {
        id: 'export',
        label: 'Export full record',
        description: 'Download complete responses, trait vectors, and historical comparisons in JSON format from your account.',
        link: '/account/privacy',
      },
      {
        id: 'ai-transparency',
        label: 'AI processing transparency',
        description: 'AI is utilized solely for narrative summarization while scoring calculations remain 100% deterministic code.',
        link: '/methodology',
      },
      {
        id: 'delete',
        label: 'Hard deletion of stored records',
        description: 'Hard deletion of your account and related stored records with immediate removal of all assessment history.',
        link: '/account/privacy',
      },
    ],
  },

  methodology: {
    hero: {
      headline: 'WHAT THE SYSTEM USES. WHAT IT DOES NOT.',
      support: 'Independent psychometric models maintain clear boundaries so no single convenience score obscures your real working patterns.',
    },
    sections: {
      bigFive: {
        title: 'Big Five Dimensions',
        role: 'Trait Spectrum Measurement',
        description: 'Evaluates Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous spectrums rather than binary personality types.',
        dimensions: ['Openness to Experience', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Stability'],
      },
      riasec: {
        title: 'RIASEC Vocational Interests',
        role: 'Occupational Domain Mapping',
        description: 'Maps attraction to Realistic, Investigative, Artistic, Social, Enterprising, and Conventional problem spaces based on Holland occupational theory.',
        orbit: ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'],
      },
      workValues: {
        title: 'Work Values',
        role: 'Workplace Reward Priority',
        description: 'Quantifies organizational conditions that sustain motivation: Achievement, Independence, Working Conditions, Recognition, Relationships, and Support.',
        priorities: ['Achievement', 'Independence', 'Working Conditions', 'Recognition', 'Relationships', 'Support'],
      },
      behavioralSignals: {
        title: 'Career Signals',
        role: 'Situational Action Patterns',
        description: 'Identifies contextual action tendencies: iterative scoping, stakeholder alignment, risk containment, and diagnostic inquiry.',
        patterns: ['Iterative scoping', 'Stakeholder alignment', 'Risk containment', 'Diagnostic inquiry'],
      },
      careerWeights: {
        title: 'Proportional Career Alignment',
        role: 'Deterministic Calibration Engine',
        description: 'Fixed mathematical career-fit weights ensure alignment scores are transparent, repeatable, and completely unboxed.',
      },
      validityStates: {
        title: 'Scoring Validity and Confidence States',
        role: 'Truthful Diagnostics',
        description: 'The scoring system reports real validity states (valid, partial, and insufficient_data) rather than fabricating false confidence values.',
      },
      aiNarrative: {
        title: 'Role of AI Commentary',
        role: 'Explanatory Synthesis Only',
        description: 'AI is strictly utilized for contextual narrative summarization. Psychometric scoring, trait calculations, and career fit algorithms are 100% deterministic code.',
      },
      limits: {
        title: 'Scientific Boundaries & Non-Clinical Scope',
        role: 'Clear Operational Limits',
        description: 'Personality Assessor is an analytical instrument for professional self-reflection and career planning. It does not provide clinical psychological diagnoses, medical evaluations, or psychiatric assessments.',
      },
    },
  },

  privacy: {
    hero: {
      headline: 'PLAIN-LANGUAGE GOVERNANCE & SOVEREIGN DATA RIGHTS',
      support: 'Your assessment data belongs to you. We do not sell your personal evidence or train third-party foundation models on your responses.',
    },
    sections: [
      {
        id: 'data-collection',
        title: '1. What We Collect',
        content: 'We collect your email address, account credentials, and responses provided during assessment inquiries. Technical telemetry is limited to essential operational diagnostics.',
      },
      {
        id: 'data-usage',
        title: '2. How Data Is Used',
        content: 'Your responses are processed solely to compute your psychometric profile, generate career comparisons, and render your longitudinal progress record.',
      },
      {
        id: 'ai-governance',
        title: '3. AI Models & Data Sharing',
        content: 'We do not sell personal data to brokers or advertisers. Assessment responses are never used to train generalized third-party machine learning models.',
      },
      {
        id: 'user-rights',
        title: '4. Sovereign Data Controls',
        content: 'You maintain permanent sovereignty over your record. You can export your full data in JSON format or perform hard deletion of your account and related stored records at any time from your account settings.',
      },
      {
        id: 'security',
        title: '5. Storage & Cryptographic Protection',
        content: 'All data is encrypted in transit via TLS 1.3 and at rest using industry-standard AES-256 encryption. Authentication utilizes secure salted hashing and tokenized sessions.',
      },
      {
        id: 'contact',
        title: '6. Privacy Inquiries',
        content: 'For questions regarding your data rights or to submit an explicit verification request, contact our privacy governance team directly through your account dashboard.',
      },
    ],
  },

  auth: {
    login: {
      headline: 'RETURN TO YOUR RECORD',
      support: 'Sign in to access your assessment history, review calibration, and track your career trajectory.',
    },
    signup: {
      headline: 'START WITH ONE RECORD',
      support: 'Create an account to preserve your initial baseline, inspect your traits, and revisit your progress over time.',
    },
  },

  notFound: {
    title: 'Page Not Found',
    message: 'The requested route does not exist in the current assessment context.',
    returnHome: 'Return to Home',
    buildProfile: 'Start an assessment',
  },
};

export default PUBLIC_CONTENT;
