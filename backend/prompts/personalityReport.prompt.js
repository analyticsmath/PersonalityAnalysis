const PROMPT_VERSION = '2.0.0-phase5';

const BIG_FIVE_GUIDE = {
  O: 'Openness: curiosity, imagination, tolerance for novelty, and preference for abstract thinking.',
  C: 'Conscientiousness: planning, reliability, follow-through, impulse control, and quality orientation.',
  E: 'Extraversion: social energy, assertiveness, expressiveness, and stimulation-seeking.',
  A: 'Agreeableness: empathy, cooperation, trust, and conflict style.',
  N: 'Neuroticism: emotional reactivity, stress sensitivity, and vulnerability to negative affect.',
};

const OUTPUT_SCHEMA = {
  summary: 'string',
  strengths: ['string'],
  weaknesses: ['string (developmental growth areas — not clinical labels)'],
  growthAreas: ['string (optional mirror of weaknesses)'],
  communicationStyle: 'string',
  leadershipStyle: 'string',
  workStyle: 'string',
  growthSuggestions: ['string'],
  learningRecommendations: ['string (optional mirror of growthSuggestions)'],
  careerGuidance: ['string'],
  confidenceNotes: 'string',
  disclaimers: ['string'],
  safetyFlags: ['string'],
  version: 'report-narrative-v1',
  careerRecommendations: [
    {
      career: 'string',
      reason: 'string',
      skillsNeeded: ['string'],
    },
  ],
};

const stringifyJson = (value) => JSON.stringify(value, null, 2);

const buildPersonalityReportPrompt = ({
  traits,
  facetScores,
  deterministicInsights,
  staticCareerMatches,
}) => {
  const systemPrompt = [
    'You are a career-development coach and personality interpreter.',
    'Given Big Five (OCEAN) scores, produce practical, non-clinical narrative guidance.',
    'The writing must be specific, human-sounding, and evidence-based from the provided scores.',
    'Never change, restate, or invent numeric scores; treat all numbers as read-only context.',
    'Avoid generic advice and avoid repeating obvious labels.',
    'Return ONLY valid JSON that matches the required schema.',
  ].join(' ');

  const userPrompt = [
    'Interpretation guide for Big Five traits:',
    stringifyJson(BIG_FIVE_GUIDE),
    '',
    'Trait scores (0-100):',
    stringifyJson(traits),
    '',
    'Facet scores (0-100):',
    stringifyJson(facetScores || {}),
    '',
    'Deterministic insights from rule engine (use as context, do not copy verbatim):',
    stringifyJson(deterministicInsights),
    '',
    'Static career matches from mapping engine (use as context, then refine with reasoning):',
    stringifyJson(staticCareerMatches),
    '',
    'Output schema:',
    stringifyJson(OUTPUT_SCHEMA),
    '',
    'Constraints:',
    '- All list items must be concrete and actionable.',
    '- Summary should be 5-7 sentences and reference score interplay.',
    '- Include 4-6 strengths and 3-5 weaknesses (developmental framing, not diagnosis).',
    '- Include leadershipStyle and careerGuidance as a short list of strings grounded in the deterministic context.',
    '- Include confidenceNotes that reflect evidence limits honestly.',
    '- Include 1-3 disclaimers including that this is guidance, not diagnosis or hiring authority.',
    '- Include 4-6 growthSuggestions focused on behaviors and habits.',
    '- Include 3-5 careerRecommendations with career, reason, and skillsNeeded (narrative only; numeric fit comes from the engine elsewhere).',
    '- Do not use markdown, code fences, or any text outside JSON.',
  ].join('\n');

  return {
    promptVersion: PROMPT_VERSION,
    systemPrompt,
    userPrompt,
  };
};

module.exports = {
  PROMPT_VERSION,
  buildPersonalityReportPrompt,
};
