const test = require('node:test');
const assert = require('node:assert/strict');

const { runAssessmentScoring } = require('../services/scoring/assessmentScoringOrchestrator.service');
const { runCareerRecommendationOrchestrator } = require('../services/career/careerRecommendationOrchestrator.service');

const buildProfileFixture = ({ name, ocean, prompts }) => {
  const questionPlan = prompts.map((p, i) => ({
    questionId: `${name}-q${i + 1}`,
    text: p,
    type: 'text',
    traitFocus: ['O', 'C', 'E', 'A', 'N'][i % 5],
    reasoningWeight: 1.1,
  }));

  const unifiedAnswers = prompts.map((p, i) => ({
    questionId: `${name}-q${i + 1}`,
    type: 'text',
    value: { text: p, normalizedScore: 5 },
    metadata: { trait: ['O', 'C', 'E', 'A', 'N'][i % 5], normalizedScore: 5 },
  }));

  return runAssessmentScoring({
    session: {},
    unifiedAnswers,
    questionPlan,
    oceanTraitScores: ocean,
    aiProfile: {},
    traitBehaviorVector: { leadership: 60, collaboration: 60, analysis: 60, risk: 50, creativity: 60, execution: 60 },
    cognitiveVector: { analytical: 60 },
  });
};

const topWorkValues = (values = {}) => Object.entries(values).sort((a, b) => b[1].score - a[1].score).slice(0, 3).map(([k]) => k);

const bigFiveVector = (out) => [
  out.scores.bigFive.openness.score,
  out.scores.bigFive.conscientiousness.score,
  out.scores.bigFive.extraversion.score,
  out.scores.bigFive.agreeableness.score,
  out.scores.bigFive.emotionalStability.score,
];

const traitDiffCount = (a, b, threshold = 8) => a.filter((v, i) => Math.abs(v - b[i]) >= threshold).length;

test('Phase 9: multi-profile deterministic scoring variance and career divergence', () => {
  const technical = buildProfileFixture({
    name: 'technical',
    ocean: { O: 74, C: 82, E: 46, A: 52, N: 36 },
    prompts: [
      'I debug API architecture and analyze database performance with metrics and root cause methods.',
      'I organize roadmap milestones and prioritize structured processes for predictable delivery.',
      'I enjoy independent learning with code experiments and deep technical domain expertise.',
      'I research hypotheses with data structures, diagnostics, and analytical tradeoff documentation.',
      'I build full-stack dashboards with planning, execution, and measurable outcomes.',
    ],
  });

  const social = buildProfileFixture({
    name: 'social',
    ocean: { O: 58, C: 62, E: 78, A: 84, N: 42 },
    prompts: [
      'I mentor peers, teach workshops, and help teams communicate clearly with empathy and trust.',
      'I lead collaboration sessions and present ideas to stakeholders with coaching and support.',
      'I enjoy community impact, team bonding, and relationship-first conflict resolution.',
      'I write learning guides and explain complex topics in simple language for students.',
      'I coordinate group projects with listening, feedback loops, and shared accountability.',
    ],
  });

  const creative = buildProfileFixture({
    name: 'creative',
    ocean: { O: 86, C: 54, E: 61, A: 64, N: 44 },
    prompts: [
      'I design UX concepts, brand storytelling, and aesthetic prototypes through experimentation.',
      'I explore ambiguity, brainstorm original ideas, and iterate creative campaign narratives.',
      'I enjoy artistic innovation, visual content strategy, and novel audience experiences.',
      'I build portfolio pieces by mixing research insights with design intuition and originality.',
      'I prefer exploratory work that balances autonomy, learning, and meaningful impact.',
    ],
  });

  const techVec = bigFiveVector(technical);
  const socialVec = bigFiveVector(social);
  const creativeVec = bigFiveVector(creative);

  assert.notDeepEqual(techVec, socialVec);
  assert.notDeepEqual(techVec, creativeVec);
  assert.notDeepEqual(socialVec, creativeVec);

  assert.ok(traitDiffCount(techVec, socialVec) >= 3);
  assert.ok(traitDiffCount(techVec, creativeVec) >= 3);

  const riasecCodes = [technical, social, creative].map((o) => o.scores.riasec.hollandCode);
  assert.ok(new Set(riasecCodes).size >= 2);

  const workValueKeys = [technical, social, creative].map((o) => topWorkValues(o.scores.workValues).join('|'));
  assert.ok(new Set(workValueKeys).size >= 2);

  const techCareer = runCareerRecommendationOrchestrator({ scoringOutput: technical, cvData: { skills: ['JavaScript', 'Python', 'SQL'] } });
  const socialCareer = runCareerRecommendationOrchestrator({ scoringOutput: social, cvData: { skills: ['Mentoring', 'Teaching', 'Communication'] } });
  const creativeCareer = runCareerRecommendationOrchestrator({ scoringOutput: creative, cvData: { skills: ['UX Design', 'Branding', 'Storytelling'] } });

  const topCareers = [techCareer, socialCareer, creativeCareer].map((r) => r.topRecommendations[0]?.careerId).filter(Boolean);
  assert.ok(new Set(topCareers).size >= 2);

  assert.ok(technical.scoreMeta.evidenceCount > 0);
  assert.ok(social.scoreMeta.evidenceCount > 0);
  assert.ok(creative.scoreMeta.evidenceCount > 0);

  const thin = runAssessmentScoring({
    session: {},
    unifiedAnswers: [{ questionId: 'thin1', type: 'likert', value: 3, metadata: { trait: 'O', normalizedScore: 3 } }],
    questionPlan: [{ questionId: 'thin1', text: 'baseline', type: 'likert', traitFocus: 'O' }],
    oceanTraitScores: { O: 51, C: 51, E: 51, A: 51, N: 49 },
  });

  assert.equal(thin.scoreMeta.scoreValidity, 'insufficient_data');
  assert.deepEqual(bigFiveVector(thin), [51, 51, 51, 51, 51]);
});
