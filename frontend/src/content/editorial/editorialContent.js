// frontend/src/content/editorial/editorialContent.js
// Personality Assessor — Reference-Locked Editorial Copy & Truthful Content

export const EDITORIAL_CONTENT = {
  header: {
    brand: 'Personality Assessor',
    navLinks: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Career intelligence', href: '/career-intelligence' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Trust', href: '/trust' },
    ],
    signIn: { label: 'Sign in', href: '/login' },
    cta: { label: 'Build my profile', href: '/assessment/start' },
  },
  hero: {
    headline: 'See the professional patterns behind your decisions.',
    lead: 'Adaptive questions turn real professional context into a profile and career direction you can inspect.',
    microControl: 'SEE HOW IT ADAPTS',
    communityLabel: 'Built for students, graduates and professionals',
    ctaPrimary: 'Build my profile →',
    secondaryLink: 'Explore methodology',
  },
  adaptive: {
    chapterTag: 'ADAPTIVE ASSESSMENT',
    headline: 'Questions change when the evidence changes.',
    lead: 'Instead of repetitive questionnaires, scenarios branch based on the technical and collaborative context you share.',
    sampleQuestion: {
      domain: 'System Architecture & Trade-offs',
      context: 'You discover a core dependency has a 12% memory degradation under peak traffic, two days before scheduled launch.',
      prompt: 'How do you coordinate your investigation and communication?',
      options: [
        {
          id: 'opt-a',
          label: 'Isolate root cause in staging under synthetic load before raising risk flags.',
          signal: 'Systematic analysis & empirical verification',
        },
        {
          id: 'opt-b',
          label: 'Publish preliminary metrics immediately and recommend a phased release.',
          signal: 'Transparent alignment & proactive risk governance',
        },
        {
          id: 'opt-c',
          label: 'Deploy fallback cache layer to safeguard latency while patching the core.',
          signal: 'Pragmatic mitigation & system resilience',
        },
      ],
    },
    features: [
      {
        title: 'Contextual intake',
        desc: 'Upload CV or select focus areas to anchor questions in your actual domain.',
      },
      {
        title: 'Adaptive branching',
        desc: 'Questions shift depth and dimension based on your previous decisions.',
      },
      {
        title: 'Zero pre-selected bias',
        desc: 'Every scenario begins neutral with inspectable decision weights.',
      },
    ],
  },
  readings: {
    chapterTag: 'FOUR READINGS',
    headline: 'One profile. Four ways of reading the work behind it.',
    lead: 'We keep four distinct psychometric frameworks separated so you can inspect behavioral tendencies, vocational interests, work values, and career signals independently.',
    items: [
      {
        id: 'personality',
        title: 'Personality Dimensions',
        tag: 'Big Five Framework',
        summary: 'Inspect how you navigate cognitive complexity, team friction, stress, and autonomous execution.',
        dimensions: [
          { name: 'Openness', desc: 'Exploration of novel patterns, paradigms, and abstract systems' },
          { name: 'Conscientiousness', desc: 'Execution rigor, milestone discipline, and craftsmanship' },
          { name: 'Extraversion', desc: 'Energy distribution across collaborative alignment vs deep solitary focus' },
          { name: 'Agreeableness', desc: 'Empathy in team negotiations, conflict mediation, and consensus' },
          { name: 'Emotional Stability', desc: 'Resilience under ambiguous constraints and rapid shifts' },
        ],
      },
      {
        id: 'interests',
        title: 'Vocational Interests',
        tag: 'Holland RIASEC',
        summary: 'Explore your alignment across realistic, investigative, artistic, social, enterprising, and conventional work domains.',
        dimensions: [
          { name: 'Investigative', desc: 'Deep analytical inquiry, empirical diagnosis, and research' },
          { name: 'Realistic', desc: 'Hands-on technical implementation, tooling, and concrete systems' },
          { name: 'Enterprising', desc: 'Strategic advocacy, stakeholder leadership, and momentum' },
          { name: 'Artistic', desc: 'Design innovation, interface synthesis, and conceptual craft' },
        ],
      },
      {
        id: 'values',
        title: 'Work Values',
        tag: 'O*NET Work Values',
        summary: 'Identify the structural conditions you need to thrive—autonomy, achievement, working conditions, and support.',
        dimensions: [
          { name: 'Autonomy', desc: 'Freedom to define implementation paths and solve problems independently' },
          { name: 'Achievement', desc: 'Opportunities to solve demanding challenges and see concrete impact' },
          { name: 'Working Conditions', desc: 'Predictable pacing, sustainable workload, and clear engineering standards' },
        ],
      },
      {
        id: 'signals',
        title: 'Career Signals',
        tag: 'Behavioral Telemetry',
        summary: 'Emergent indicators gathered from scenario trade-offs, decision cadence, and cognitive choices.',
        dimensions: [
          { name: 'Cognitive Pacing', desc: 'Deliberate empirical reflection vs rapid iterative action' },
          { name: 'Decision Autonomy', desc: 'Comfort taking ownership under ambiguous constraints' },
          { name: 'Collaboration Load', desc: 'Optimal balance of solitary craft vs cross-team coordination' },
        ],
      },
    ],
  },
  careers: {
    chapterTag: 'CAREER WORLDS',
    headline: 'See where your patterns fit — and where they could grow.',
    lead: 'Hover over a role to inspect its core profile demand, dimensional alignment, and growth stretch.',
  },
  progress: {
    chapterTag: 'LONGITUDINAL PROGRESS',
    headline: 'Your profile should move when your work does.',
    lead: 'Personality and professional strengths are not static labels. As your projects, responsibilities, and skills evolve, your profile reflects that growth.',
    bullets: [
      'Retain baseline snapshots to inspect shifts across career milestones.',
      'Submit updated work context to trigger calibrated re-evaluations.',
      'Explore stretch capability targets without invalidating previous achievements.',
    ],
    ctaText: 'Explore progress tracking →',
  },
  story: {
    chapterTag: 'ILLUSTRATIVE SCENARIO',
    headline: 'Multi-dimensional signals in practice.',
    context: 'When transitioning into systems architecture, standard personality quizzes often classify practitioners as either purely technical or purely managerial.',
    insight: 'By separating Big Five, RIASEC interests, and Work Values, the assessment captures high autonomy and structural reasoning without flattening strategic communication signals.',
    badge: 'Illustrative Scenario: Systems & Architecture Track',
    disclaimer: 'Illustrative product scenario demonstrating dimensional trait separation.',
  },
  trust: {
    chapterTag: 'TRUST & INSPECTABILITY',
    headline: 'Psychometrics built on inspectable evidence.',
    items: [
      {
        title: 'Structured scoring',
        desc: 'Deterministic psychometric algorithms with no black-box generative score mutations.',
      },
      {
        title: 'Inspectable results',
        desc: 'Every recommendation traces back to specific responses and validated framework metrics.',
      },
      {
        title: 'Profile export',
        desc: 'Download your profile and assessment responses as JSON from your account.',
      },
      {
        title: 'Account deletion',
        desc: 'Delete your profile data or entire account from your account settings at any time.',
      },
    ],
  },
  closingCta: {
    headline: 'Ready to build a profile around real work?',
    lead: 'Start the adaptive assessment or upload context to inspect your multidimensional profile.',
    buttonText: 'Build my profile →',
    secondaryText: 'Sign in to existing profile',
  },
  footer: {
    wordmarkPrimary: 'PERSONALITY',
    wordmarkSecondary: 'ASSESSOR',
    copyright: '© 2026 Personality Assessor. All rights reserved.',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Career intelligence', href: '/career-intelligence' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Trust', href: '/trust' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
};
