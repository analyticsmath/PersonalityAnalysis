const { mergeCareerRecommendations, buildCareerContext } = require('../careerEngine');
const { generateInsightSnapshot, normalizeTraits } = require('../insightService');
const { SCHEMA_IDS } = require('./aiSchemas');
const { buildDefaultAiStatus } = require('./aiTypes');
const { AI_PROVIDER, AI_STATUS } = require('./aiTypes');

const toList = (arr, n = 6) =>
  (Array.isArray(arr) ? arr : [])
    .map((x) => String(x || '').trim())
    .filter(Boolean)
    .slice(0, n);

const normalizeInsightsForFallback = (raw) => {
  if (Array.isArray(raw)) {
    return raw;
  }
  if (!raw || typeof raw !== 'object') {
    return [];
  }
  return [
    raw.dominantTraitExplanation,
    ...(Array.isArray(raw.riskSignals) ? raw.riskSignals : []),
    ...(Array.isArray(raw.behavioralPatterns) ? raw.behavioralPatterns : []),
  ].filter(Boolean);
};

const buildDeterministicPersonalityReportFallback = ({
  traits = {},
  facetScores: _facetScores = {},
  deterministicInsights = [],
  staticCareerMatches = [],
  promptVersion = 'report-fallback-v1',
}) => {
  const normalizedTraits = normalizeTraits(traits);
  const insights = deterministicInsights.length
    ? deterministicInsights
    : normalizeInsightsForFallback(generateInsightSnapshot(normalizedTraits));
  const staticMatches =
    staticCareerMatches.length > 0 ? staticCareerMatches : buildCareerContext(normalizedTraits, 5);

  const top = Object.entries(normalizedTraits).sort((a, b) => b[1] - a[1])[0];
  const bottom = Object.entries(normalizedTraits).sort((a, b) => a[1] - b[1])[0];

  const summary = `This summary was compiled from your assessment trait profile because the AI writer was unavailable or returned invalid output. It is developmental guidance only—not diagnosis or hiring authority.`;

  const strengths = toList(
    insights.map((i) => (typeof i === 'string' ? i : i?.summary || i?.title || '')).filter(Boolean),
    6
  );
  if (strengths.length < 2) {
    strengths.push(
      top ? `Relative momentum on ${top[0]} (${Math.round(top[1])}) versus other traits.` : 'Balanced trait pattern with room to specialize.'
    );
  }

  const weaknesses = [
    bottom
      ? `Watch for over-rotation away from ${bottom[0]} (${Math.round(bottom[1])}) under stress.`
      : 'Trait balance may hide extremes—stress-test decisions with feedback.',
    'Prefer small experiments over sweeping self-labels.',
  ];

  const mergedCareer = mergeCareerRecommendations({
    aiRecommendations: [],
    staticRecommendations: staticMatches,
    limit: 5,
  });

  const narrativeExtended = {
    summary,
    strengths,
    growthAreas: weaknesses,
    communicationStyle: 'Direct, evidence-seeking, and paced to reduce ambiguity.',
    leadershipStyle: 'Situational: emphasize clarity and psychological safety in team settings.',
    workStyle: 'Structured iteration with explicit review checkpoints.',
    careerGuidance: [
      'Use your assessment scores as a starting point; explore roles iteratively with mentors and real work samples.',
    ],
    learningRecommendations: [
      'Pick one measurable skill from your top gap list and practice it weekly.',
      'Journal one decision weekly with rationale and outcome to build metacognitive habits.',
    ],
    confidenceNotes: 'Fallback mode: confidence should be read from score metadata, not this narrative.',
    disclaimers: [
      'Guidance only — not a medical, psychological, or hiring decision.',
      'Scores reflect your assessment responses and are preserved across all views.',
    ],
    safetyFlags: [],
    version: SCHEMA_IDS.REPORT_NARRATIVE_V1,
  };

  return {
    summary: narrativeExtended.summary,
    strengths: narrativeExtended.strengths,
    weaknesses: narrativeExtended.growthAreas,
    communicationStyle: narrativeExtended.communicationStyle,
    workStyle: narrativeExtended.workStyle,
    growthSuggestions: narrativeExtended.learningRecommendations,
    careerRecommendations: mergedCareer,
    narrativeExtended,
    metadata: {
      model: 'deterministic-fallback',
      promptVersion,
      usage: null,
      generatedAt: new Date().toISOString(),
    },
    deterministicInsights: insights,
    staticCareerMatches: staticMatches,
    aiStatus: buildDefaultAiStatus({
      status: AI_STATUS.FALLBACK,
      provider: AI_PROVIDER.LOCAL_FALLBACK,
      promptVersion,
      schemaValidated: true,
      safetyChecked: true,
      fallbackUsed: true,
      errorCode: 'AI_FALLBACK_TEMPLATE',
      latencyMs: 0,
      model: 'deterministic-fallback',
    }),
  };
};

const buildStructuredCoachFallback = ({ message = '', contextHints = [] }) => ({
  answer: [
    'Here is a safe, profile-grounded response while the AI writer is unavailable.',
    ...contextHints.map((h) => `- ${h}`),
    message ? `You asked: "${message.slice(0, 200)}${message.length > 200 ? '…' : ''}"` : '',
    'Next: pick one ranked career from your top recommendations and ask for a skill-gap plan.',
  ]
    .filter(Boolean)
    .join('\n'),
  referencedScores: [],
  referencedCareers: [],
  suggestedNextSteps: ['Review your top career recommendations', 'Open Career Explorer for structured gaps'],
  uncertaintyNotes: 'Fallback response; live model unavailable or output failed validation.',
  safetyFlags: [],
  shouldEscalateToHuman: false,
  version: SCHEMA_IDS.CAREER_COACH_V1,
});

module.exports = {
  buildDeterministicPersonalityReportFallback,
  buildStructuredCoachFallback,
};
