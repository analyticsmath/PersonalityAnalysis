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
      prompt: 'Your profile brings together evidence across personality, interests, work values and career conditions.',
      response: 'Each response stays connected to its question and context.'
    },
    situation: {
      prompt: 'A response is interpreted alongside its question and context.',
      response: 'Each response stays connected to its question and context.',
      clauses: [
        { id: 'c1', text: 'Response' },
        { id: 'c2', text: 'Question and context' },
        { id: 'c3', text: 'Supporting evidence' },
      ],
    },
    readings: {
      headline: 'ONE RESPONSE. MORE THAN ONE READING.',
      destinations: [
        { id: 'big-five', name: 'Big Five Dimensions', summary: 'Five continuous personality dimensions', detail: 'Describes tendencies across Openness, Conscientiousness, Extraversion, Agreeableness and Emotional Stability, not fixed types or diagnoses.', axis: 'Personality dimensions' },
        { id: 'riasec', name: 'RIASEC Interests', summary: 'Six areas of occupational interest', detail: 'Maps relative interest across Realistic, Investigative, Artistic, Social, Enterprising and Conventional work.', axis: 'Interest profile' },
        { id: 'work-values', name: 'Work Values', summary: 'Conditions that matter in a work environment', detail: 'Records relative priorities across Achievement, Independence, Working Conditions, Recognition, Relationships and Support.', axis: 'Work values' },
        { id: 'career-signals', name: 'Career Signals', summary: 'Professional behavior in context', detail: 'Career comparisons also consider skills, education, goals and background alongside assessment results.', axis: 'Career context' },
      ],
    },
    models: {
      headline: 'Separate models answer separate questions.',
      list: [
        {
          id: 'big-five',
          name: 'Big Five',
          role: 'Dimensional Spectrum',
          description: 'Evaluates Openness, Conscientiousness, Extraversion, Agreeableness and Emotional Stability as continuous dimensions rather than fixed types.',
          shortDescription: 'Measures five personality dimensions.',
        },
        {
          id: 'riasec',
          name: 'RIASEC',
          role: 'Vocational Interests',
          description: 'Maps attraction to Realistic, Investigative, Artistic, Social, Enterprising and Conventional work.',
          shortDescription: 'Maps six areas of occupational interest.',
        },
        {
          id: 'work-values',
          name: 'Work Values',
          role: 'Environmental Motivation',
          description: 'Records the relative importance of Achievement, Independence, Working Conditions, Recognition, Relationships and Support.',
          shortDescription: 'Records priorities across workplace conditions.',
        },
        {
          id: 'career-signals',
          name: 'Career Signals',
          role: 'Situational Action Tendencies',
          description: 'Considers professional actions such as iterative scoping, stakeholder alignment, risk containment and diagnostic inquiry.',
          shortDescription: 'Connects professional behavior to career context.',
        },
        {
          id: 'background',
          name: 'Background',
          role: 'Domain Context',
          description: 'Uses education and technical disciplines as part of career context.',
          shortDescription: 'Adds education and technical context.',
        },
        {
          id: 'goals',
          name: 'Goals',
          role: 'Trajectory Alignment',
          description: 'Includes stated aspirations and target responsibilities in career alignment calculations.',
          shortDescription: 'Includes your stated career goals.',
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
      disclaimer: 'Personal comparisons require two complete assessment records.',
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
    sampleResponse: 'Each response stays connected to its question and context.',
    movements: [
      {
        id: 'capture',
        name: 'Source and context',
        title: 'Keep each response with its context',
        description: 'A response stays connected to the question and situation it came from, so the evidence behind an interpretation can be inspected.',
          shortDescription: 'Connects professional behavior to career context.',
                    shortDescription: 'Records priorities across workplace conditions.',
                    shortDescription: 'Maps six areas of occupational interest.',
                    shortDescription: 'Measures five continuous personality dimensions.',
                },
      {
        id: 'isolate',
        name: 'Evidence review',
        title: 'Read signals in context',
        description: 'A response can inform different dimensions, but one phrase does not stand in for a complete profile or conclusion.',
      },
      {
        id: 'branch',
        name: 'Separate models',
        title: 'Use each model for its own question',
        description: 'Big Five dimensions, RIASEC interests and work values describe different parts of a profile. Each score needs sufficient evidence.',
      },
      {
        id: 'weight',
        name: 'Career comparison',
        title: 'Make career comparisons inspectable',
        description: 'The same fixed weights combine interests, skills, work values, traits, education and goals in each career comparison.',
      },
      {
        id: 'recompose',
        name: 'Evidence record',
        title: 'Keep the interpretation with its source',
        description: 'The profile connects the result to its evidence, calculation and limits.',
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
    disclaimer: 'Personal comparisons require two complete assessment records.',
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
        title: 'Response in context',
        description: 'The original response remains connected to the question and situation it describes.',
        details: 'A response is one part of the evidence record, not a complete scored profile.',
      },
      {
        id: 'inferred',
        name: 'Inferred',
        title: 'Personality and interest dimensions',
        description: 'Big Five and RIASEC results describe patterns across assessment responses, with evidence adequacy reported.',
        details: 'A score is shown only when there is sufficient evidence for that dimension.',
      },
      {
        id: 'calculated',
        name: 'Calculated',
        title: 'Career comparison',
        description: 'A fixed weighted calculation compares interests, skills, values, traits, education and goals.',
        details: 'RIASEC interests (25%), skills (25%), work values (20%), traits (15%), education (10%) and goals (5%).',
      },
      {
        id: 'compared',
        name: 'Compared',
        title: 'Career requirements',
        description: 'Career profiles describe the conditions, skills and requirements associated with each role.',
        details: 'Recommendations consider the full assessment record alongside education, skills, goals and background.',
      },
      {
        id: 'controlled',
        name: 'Controlled',
        title: 'Account controls',
        description: 'Authenticated account controls support data export, AI transparency and record deletion.',
        details: 'Review available account controls in the authenticated product.',
      },
    ],
    rightsActions: [
      {
        id: 'export',
        label: 'Export full record',
        description: 'Download a JSON snapshot of account details, assessment sessions, results, and roadmap progress. Password hashes and in-process AI audit events are excluded.',
        link: '/account/privacy',
      },
      {
        id: 'ai-transparency',
        label: 'AI processing transparency',
        description: 'CV or manually entered profile data may provide structured inputs, and AI may support narrative interpretation. Career scoring uses the published deterministic formula.',
        link: '/methodology',
      },
      {
        id: 'delete',
        label: 'Delete account and related records',
        description: 'The account control deletes the account, assessment sessions, results, and roadmap progress from this deployment. It requires confirmation and signs you out.',
        link: '/account/privacy',
      },
    ],
  },

  methodology: {
    hero: {
      headline: 'WHAT THE SYSTEM USES. WHAT IT DOES NOT.',
      support: 'Each model answers a different question. Career comparisons use fixed weights and a deterministic formula. AI may prepare structured inputs or support narrative interpretation; it does not replace the scoring formula.',
    },
    sections: {
      bigFive: {
        title: 'Big Five dimensions',
        role: 'Trait Spectrum Measurement',
        description: 'Measures Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous dimensions rather than fixed personality types.',
        dimensions: ['Openness to Experience', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Stability'],
      },
      riasec: {
        title: 'RIASEC interests',
        role: 'Occupational Domain Mapping',
        description: 'Maps attraction to Realistic, Investigative, Artistic, Social, Enterprising, and Conventional problem spaces based on Holland occupational theory.',
        orbit: ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'],
      },
      workValues: {
        title: 'Work values',
        role: 'Workplace Reward Priority',
        description: 'Records which workplace conditions matter to you: Achievement, Independence, Working Conditions, Recognition, Relationships, and Support.',
        priorities: ['Achievement', 'Independence', 'Working Conditions', 'Recognition', 'Relationships', 'Support'],
      },
      behavioralSignals: {
        title: 'Career signals from behavior',
        role: 'Situational Action Patterns',
        description: 'Looks at patterns such as iterative scoping, stakeholder alignment, risk containment, and diagnostic inquiry in context.',
        patterns: ['Iterative scoping', 'Stakeholder alignment', 'Risk containment', 'Diagnostic inquiry'],
      },
      careerWeights: {
        title: 'How career comparisons are weighted',
        role: 'Deterministic Calibration Engine',
        description: 'Each comparison uses the same fixed weights, so the calculation is transparent and repeatable.',
      },
      validityStates: {
        title: 'When there is enough evidence',
        role: 'Truthful Diagnostics',
        description: 'The system reports whether there is enough evidence to score, whether the record is partial, or whether more responses are needed. It does not invent a confidence value.',
      },
      aiNarrative: {
        title: 'Where AI fits',
        role: 'Structured Inputs and Synthesis',
        description: 'AI-assisted profile and CV processing may provide structured inputs for the deterministic scoring formula. Generative AI may also support narrative interpretation. AI does not replace the scoring formula.',
      },
      limits: {
        title: 'What this assessment can tell you',
        role: 'Clear Operational Limits',
        description: 'This assessment supports professional self-reflection and career planning. It does not diagnose mental-health conditions or provide medical or psychiatric evaluations.',
      },
    },
  },

  privacy: {
    hero: {
      headline: 'PLAIN-LANGUAGE GOVERNANCE & SOVEREIGN DATA RIGHTS',
      support: 'See what assessment data this deployment stores, how the product uses it, and which controls are available in your account.',
    },
    sections: [
      {
        id: 'data-collection',
        title: '1. What We Collect',
        content: 'Accounts store identity and authentication data. Assessment sessions and results may include responses, CV-derived or manually entered profile details, scoring evidence, career recommendations, chat history, and roadmap progress.',
      },
      {
        id: 'data-usage',
        title: '2. How Data Is Used',
        content: 'These records support assessment sessions, personality and interest scoring, career comparisons, result history, reporting, and roadmap progress. Career comparisons use the fixed deterministic weights described in Methodology.',
      },
      {
        id: 'ai-governance',
        title: '3. AI-Assisted Processing',
        content: 'AI-assisted CV or profile processing may provide structured inputs. Generative AI may also support narrative interpretation. Career scores use the published deterministic formula; AI does not replace that calculation.',
      },
      {
        id: 'user-rights',
        title: '4. Retention & Account Controls',
        content: 'Assessment and profile data remain in this deployment until you delete them through account controls or delete your account; no automatic inactivity purge is configured. Account controls can export a JSON snapshot, clear profile/CV fields, delete one assessment by result ID, or delete the account.',
      },
      {
        id: 'security',
        title: '5. Sensitive Information',
        content: 'Avoid uploading unredacted personal identifiers or confidential trade secrets. This product page does not specify at-rest encryption, backup retention, or model-provider retention details.',
      },
      {
        id: 'contact',
        title: '6. About This Summary',
        content: 'This page summarizes product behavior and controls in this deployment. It is not a security certification or a full account of external processing and backups.',
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
