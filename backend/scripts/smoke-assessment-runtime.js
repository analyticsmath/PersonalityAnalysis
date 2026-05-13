#!/usr/bin/env node
const { runAssessmentScoring } = require('../services/scoring/assessmentScoringOrchestrator.service');
const { recommendCareers } = require('../services/assessment/career-recommendation.service');
const { generateResultNarrative } = require('../services/ai-result-narrative.service');

(async () => {
  const unifiedAnswers = [
    { questionId: 'q1', type: 'likert', value: 5 },
    { questionId: 'q2', type: 'likert', value: 4 },
    { questionId: 'q3', type: 'mcq', value: 'A' },
    { questionId: 'q4', type: 'scenario', value: 'I prototype quickly and iterate.' },
  ];
  const questionPlan = [
    { id: 'q1', dimension: 'bigFive', target: 'openness' },
    { id: 'q2', dimension: 'bigFive', target: 'conscientiousness' },
    { id: 'q3', dimension: 'riasec', target: 'investigative' },
    { id: 'q4', dimension: 'workValues', target: 'autonomy' },
  ];

  const scored = runAssessmentScoring({ unifiedAnswers, questionPlan, oceanTraitScores: { O: 72, C: 68, E: 42, A: 55, N: 35 } });
  const recs = await recommendCareers({ scores: scored.scores, scoreMeta: scored.scoreMeta });
  const report = await generateResultNarrative({ phase3Scores: scored.scores, phase3ScoreMeta: scored.scoreMeta, careers: recs.recommendations || [] });

  if (!scored.scoreMeta || !scored.scores?.bigFive) throw new Error('missing score payload');
  if (!Array.isArray(scored.evidence)) throw new Error('missing evidence array');
  if (!report.aiStatus) throw new Error('missing aiStatus');
  console.log('[PASS] runtime scoring/report smoke ok');
  console.log(JSON.stringify({ scoreValidity: scored.scoreMeta.scoreValidity, evidenceCount: scored.scoreMeta.evidenceCount, fallbackUsed: report.aiStatus.fallbackUsed }, null, 2));
})();
