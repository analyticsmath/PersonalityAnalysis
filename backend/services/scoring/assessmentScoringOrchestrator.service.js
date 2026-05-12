const { SCORING_VERSION } = require('./scoringTypes');
const TH = require('./scoringThresholds');
const { buildEvidenceFromAnswers } = require('./evidenceBuilder.service');
const { scoreBigFive } = require('./bigFiveScoring.service');
const { scoreRiasec } = require('./riasecScoring.service');
const { scoreWorkValues } = require('./workValuesScoring.service');
const { scoreCareerSignals } = require('./careerSignalsScoring.service');
const { buildGlobalConfidence } = require('./confidenceScoring.service');

const uniq = (arr) => [...new Set(arr)];

const countScorableAnswers = (answers = []) =>
  (Array.isArray(answers) ? answers : []).filter((a) =>
    ['likert', 'scale', 'mcq', 'text', 'scenario'].includes(String(a.type || '').toLowerCase())
  ).length;

const runAssessmentScoring = ({
  session: _session = {},
  unifiedAnswers = [],
  questionPlan = [],
  oceanTraitScores = {},
  aiProfile = {},
  traitBehaviorVector = {},
  cognitiveVector = {},
} = {}) => {
  const warnings = [];

  const { evidence } = buildEvidenceFromAnswers({ unifiedAnswers, questionPlan });
  const scorable = countScorableAnswers(unifiedAnswers);

  if (scorable < TH.MIN_SCORABLE_ANSWERS) {
    warnings.push('Fewer than minimum scorable answers for high-confidence scoring.');
  }

  const bigFiveRaw = scoreBigFive({ oceanScores: oceanTraitScores, evidence });
  const bigFive = { ...bigFiveRaw };
  delete bigFive._legacyOcean;

  const riasec = scoreRiasec({ evidence });
  const workValues = scoreWorkValues({ evidence });
  const careerSignals = scoreCareerSignals({
    evidence,
    aiProfile,
    behaviorVector: traitBehaviorVector,
    cognitiveVector,
  });

  const traitsWithEvidence = ['openness', 'conscientiousness', 'extraversion', 'agreeableness'].filter(
    (k) => bigFive[k]?.evidenceCount > 0
  ).length;
  const esEvidence = bigFive.emotionalStability?.evidenceCount > 0;
  const bigFiveTraitEvidenceCount = traitsWithEvidence + (esEvidence ? 1 : 0);

  const bigFiveEvidenceItems = evidence.filter((e) => e.dimension === 'bigFive').length;

  const bigFiveValid =
    bigFiveTraitEvidenceCount >= TH.BIG_FIVE_MIN_TRAITS_WITH_EVIDENCE &&
    bigFiveEvidenceItems >= TH.BIG_FIVE_MIN_TOTAL_EVIDENCE_ITEMS;

  const riasecPartial = riasec.scoredDimensions >= TH.RIASEC_MIN_DIMENSIONS_SCORED;
  const workPartial = workValues.valuesWithEvidence >= TH.WORK_VALUES_MIN_VALUES_WITH_EVIDENCE;
  const careerPartial =
    Object.values(careerSignals.careerSignals || {}).filter((s) => (s.evidenceCount || 0) > 0).length >=
    TH.CAREER_SIGNALS_MIN_WITH_SOURCES;

  const careerLayerOk = riasecPartial || workPartial || careerPartial;

  let scoreValidity = 'valid';
  if (scorable < TH.MIN_SCORABLE_ANSWERS || !bigFiveValid) {
    scoreValidity = 'insufficient_data';
  } else if (!careerLayerOk) {
    scoreValidity = 'partial';
  }

  if (bigFiveTraitEvidenceCount < 5 && scoreValidity === 'valid') {
    scoreValidity = 'partial';
  }

  const globalConf = buildGlobalConfidence({
    bigFive,
    riasec,
    workValues,
    careerSignals,
    evidenceLength: evidence.length,
  });

  const missingDimensions = [];
  ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalStability'].forEach((k) => {
    if ((bigFive[k]?.validity || '') === 'insufficient_data') missingDimensions.push(`bigFive.${k}`);
  });
  if (!riasecPartial) missingDimensions.push('riasec.partial_coverage');
  if (!workPartial) missingDimensions.push('workValues.partial_coverage');

  const missingEvidence = [];
  if (bigFiveEvidenceItems < TH.BIG_FIVE_MIN_TOTAL_EVIDENCE_ITEMS) {
    missingEvidence.push('Additional questionnaire coverage for trait facets');
  }
  if (!careerLayerOk) {
    missingEvidence.push('More domain-specific prompts for interests/values');
  }

  const isFinal =
    scoreValidity === 'valid' &&
    globalConf.confidence >= TH.GLOBAL_VALID_MIN_CONFIDENCE &&
    scorable >= TH.MIN_SCORABLE_ANSWERS;

  const evidenceSources = uniq(evidence.map((e) => e.source));

  const scoreMeta = {
    scoreSource: 'deterministic',
    scoreValidity,
    confidence: globalConf.confidence,
    evidenceCount: evidence.length,
    evidenceSources,
    missingEvidence,
    missingDimensions,
    contradictions: uniq(
      Object.values(bigFive)
        .filter((v) => v && typeof v === 'object')
        .flatMap((v) => v.contradictions || [])
    ).slice(0, 6),
    isFinal,
    scoringVersion: SCORING_VERSION,
    generatedAt: new Date().toISOString(),
    layerConfidences: globalConf.layerConfidences,
  };

  if (globalConf.confidence < TH.GLOBAL_VALID_MIN_CONFIDENCE) {
    warnings.push('Overall confidence is limited; treat rankings as directional, not definitive.');
  }

  return {
    scores: {
      bigFive,
      riasec: {
        dimensions: riasec.dimensions,
        hollandCode: riasec.hollandCode,
        hollandCodePreliminary: riasec.hollandCodePreliminary,
        meanConfidence: riasec.meanConfidence,
      },
      workValues: workValues.values,
      careerSignals: careerSignals.careerSignals,
    },
    scoreMeta,
    evidence,
    warnings,
  };
};

module.exports = {
  runAssessmentScoring,
};
