/**
 * Personality Assessor - Public Experience Content Repository
 * Authoritative content for Under Different Conditions master creative correction.
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
          name: 'O*NET Work Values',
          summary: 'Working conditions, independence, and achievement priority',
          detail: 'Signals high motivation in autonomous environments with clear quality standards.',
          axis: 'Autonomy & Structure',
        },
        {
          id: 'signals',
          name: 'Behavioral Signals',
          summary: 'Iterative execution and defensive risk management',
          detail: 'Captures observable preference for small reversible experiments over large commitments.',
          axis: 'Experimental Velocity',
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
      stabilityFinding: 'Some patterns remain stable over time.',
      adaptationFinding: 'Others shift as responsibilities change.',
      disclaimer: 'Illustrative example',
    },
    trace: {
      headline: 'SHOW ME WHERE THAT CAME FROM.',
      support: 'Distinguish what you supplied, what the system calculated, where comparison happens, and what remains under your direct control.',
      inspectPrompt: 'Hover, drag, or press Enter on the inspection aperture to view source layers.',
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
        name: 'Source capture',
        title: 'Source response is preserved verbatim',
        description: 'Raw input enters with its situational context intact rather than immediately reduced to a number.',
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
        title: 'Proportional mathematical calculation',
        description: 'Scoring formulas apply fixed proportional weights without black box adjustments.',
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
        title: 'Trait vectors & dimensions',
        description: 'Continuous Big Five and RIASEC scores calculated through standardized item response theory.',
        details: 'Conscientiousness: 78 | Emotional Stability: 64 | Investigative: 72 | Conventional: 68',
      },
      {
        id: 'calculated',
        name: 'Calculated',
        title: 'Deterministic career calibration',
        description: 'Multi-factor alignment scored using explicit 25/25/20/15/10/5 mathematical weights.',
        details: 'RIASEC (25%) + Skills (25%) + Values (20%) + Traits (15%) + Education (10%) + Goals (5%)',
      },
      {
        id: 'compared',
        name: 'Compared',
        title: 'Occupational benchmarks',
        description: 'Contextual comparison against 17 engineering, design, and analytical profiles.',
        details: 'Top alignment: Systems Architect (91%), Staff Software Engineer (88%), Research Analyst (85%)',
      },
      {
        id: 'controlled',
        name: 'Controlled',
        title: 'Direct user ownership',
        description: 'Immediate account actions to export raw data, disable AI synthesis, or delete all records.',
        details: 'Sovereign rights: JSON Export, Narrative Control Toggle, Permanent Database Deletion',
      },
    ],
    rightsActions: [
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
        title: 'O*NET Work Values',
        role: 'Workplace Reward Priority',
        description: 'Quantifies organizational conditions that sustain motivation: Achievement, Independence, Working Conditions, Recognition, Relationships, and Support.',
        priorities: ['Achievement', 'Independence', 'Working Conditions', 'Recognition', 'Relationships', 'Support'],
      },
      behavioralSignals: {
        title: 'Behavioral Signals',
        role: 'Situational Action Patterns',
        description: 'Identifies contextual action tendencies: iterative scoping, stakeholder alignment, risk containment, and diagnostic inquiry.',
        patterns: ['Iterative scoping', 'Stakeholder alignment', 'Risk containment', 'Diagnostic inquiry'],
      },
      careerWeights: {
        title: 'Proportional Career Alignment',
        role: 'Deterministic Calibration Engine',
        description: 'Fixed mathematical weights ensure career alignment scores are transparent, repeatable, and completely unboxed.',
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
        content: 'You maintain permanent sovereignty over your record. You can export your full data in JSON format, toggle narrative AI generation, or permanently delete your account at any time.',
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
