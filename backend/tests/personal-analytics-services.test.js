const test = require('node:test');
const assert = require('node:assert/strict');

const modelPath = require.resolve('../models/AssessmentResult');
const progressPath = require.resolve('../models/CareerRoadmapProgress');

const requester = { id: '507f1f77bcf86cd799439012', role: 'user' };
const userId = requester.id;

test('assessment history: empty returns empty list', async () => {
  const histPath = require.resolve('../services/analytics/assessmentHistory.service');
  delete require.cache[histPath];
  delete require.cache[modelPath];
  require.cache[modelPath] = {
    exports: {
      find: () => ({
        sort: () => ({
          select: () => ({
            lean: async () => [],
          }),
        }),
      }),
    },
  };
  const { listAssessmentHistoryForUser } = require(histPath);
  const items = await listAssessmentHistoryForUser({ requester, userId });
  assert.equal(items.length, 0);
});

test('trait trends: insufficient history with one eligible result', async () => {
  const trendsPath = require.resolve('../services/analytics/traitTrends.service');
  delete require.cache[trendsPath];
  delete require.cache[modelPath];
  const oneDoc = {
    _id: '507f1f77bcf86cd799439099',
    scores: {
      bigFive: {
        openness: { score: 60 },
        conscientiousness: { score: 60 },
        extraversion: { score: 60 },
        agreeableness: { score: 60 },
        emotionalStability: { score: 60 },
      },
    },
    scoreMeta: { scoreValidity: 'valid', scoreSource: 'deterministic', confidence: 0.7, isFinal: true },
    analytics: {},
    completedAt: new Date(),
    createdAt: new Date(),
    personality: {},
    legacyAssessmentId: null,
    careerRecommendations: {},
  };
  require.cache[modelPath] = {
    exports: {
      find: () => ({
        sort: () => ({
          select: () => ({
            lean: async () => [oneDoc],
          }),
        }),
      }),
    },
  };
  const { getTraitTrendPayload } = require(trendsPath);
  const out = await getTraitTrendPayload({ requester, userId });
  assert.equal(out.status, 'insufficient_history');
  assert.ok(out.message.includes('two'));
});

test('trait trends: two eligible results returns trend points', async () => {
  const trendsPath = require.resolve('../services/analytics/traitTrends.service');
  delete require.cache[trendsPath];
  delete require.cache[modelPath];
  const mk = (id, day) => ({
    _id: id,
    scores: {
      bigFive: {
        openness: { score: 50 + day },
        conscientiousness: { score: 50 },
        extraversion: { score: 50 },
        agreeableness: { score: 50 },
        emotionalStability: { score: 50 },
      },
    },
    scoreMeta: { scoreValidity: 'valid', scoreSource: 'deterministic', confidence: 0.72, isFinal: true },
    analytics: {},
    completedAt: new Date(`2026-05-0${day}T12:00:00Z`),
    createdAt: new Date(`2026-05-0${day}T12:00:00Z`),
    personality: {},
    legacyAssessmentId: null,
    careerRecommendations: {},
  });
  require.cache[modelPath] = {
    exports: {
      find: () => ({
        sort: () => ({
          select: () => ({
            lean: async () => [mk('507f1f77bcf86cd7994390a1', 1), mk('507f1f77bcf86cd7994390a2', 2)],
          }),
        }),
      }),
    },
  };
  const { getTraitTrendPayload } = require(trendsPath);
  const out = await getTraitTrendPayload({ requester, userId });
  assert.equal(out.status, 'ok');
  assert.ok(out.trendPoints.length > 0);
});

test('career readiness: no results yields insufficient_history', async () => {
  const crPath = require.resolve('../services/analytics/careerReadiness.service');
  const rpPath = require.resolve('../services/analytics/roadmapProgress.service');
  delete require.cache[crPath];
  delete require.cache[rpPath];
  delete require.cache[modelPath];
  delete require.cache[progressPath];
  require.cache[modelPath] = {
    exports: {
      findOne: () => ({
        sort: () => ({
          select: () => ({
            lean: async () => null,
          }),
        }),
      }),
    },
  };
  require.cache[progressPath] = { exports: { findOne: async () => null } };
  const { getCareerReadinessForUser } = require(crPath);
  const out = await getCareerReadinessForUser({ requester, userId });
  assert.equal(out.status, 'insufficient_history');
  assert.equal(out.careerReadinessScore, null);
});

test('skill progress: baseline with one result', async () => {
  const skPath = require.resolve('../services/analytics/skillProgress.service');
  delete require.cache[skPath];
  delete require.cache[modelPath];
  require.cache[modelPath] = {
    exports: {
      find: () => ({
        sort: () => ({
          limit: () => ({
            select: () => ({
              lean: async () => [
                {
                  _id: '507f1f77bcf86cd7994390b1',
                  careerRecommendations: {
                    topRecommendations: [
                      {
                        title: 'Software Engineer',
                        careerId: 'software_engineer',
                        skillGaps: {
                          matchedSkills: ['Git'],
                          missingCriticalSkills: ['Distributed systems'],
                          recommendedSkills: ['Testing'],
                          skillReadinessScore: 62,
                        },
                      },
                    ],
                  },
                  completedAt: new Date(),
                  createdAt: new Date(),
                  scoreMeta: { scoreValidity: 'valid', scoreSource: 'deterministic', isFinal: true },
                },
              ],
            }),
          }),
        }),
      }),
    },
  };
  const { getSkillProgressForUser } = require(skPath);
  const out = await getSkillProgressForUser({ requester, userId });
  assert.equal(out.status, 'baseline');
  assert.equal(out.targetCareer, 'Software Engineer');
  assert.ok(out.missingSkills.length >= 1);
  assert.equal(out.progressItems.length, 0);
});

test('roadmap progress: action keys and percentage', async () => {
  const rpPath = require.resolve('../services/analytics/roadmapProgress.service');
  const { buildActionKeysForCareer } = require(rpPath);
  const keys = buildActionKeysForCareer('software_engineer', [
    { actions: ['a', 'b'] },
    { actions: ['c'] },
  ]);
  assert.equal(keys.length, 3);
});

test('insight timeline: uses stored result fields only', async () => {
  const tlPath = require.resolve('../services/analytics/insightTimeline.service');
  delete require.cache[tlPath];
  delete require.cache[modelPath];
  delete require.cache[progressPath];
  require.cache[modelPath] = {
    exports: {
      find: () => ({
        sort: () => ({
          limit: () => ({
            select: () => ({
              lean: async () => [
                {
                  _id: '507f1f77bcf86cd7994390c1',
                  completedAt: new Date(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  scoreMeta: { scoreValidity: 'valid', scoreSource: 'deterministic', confidence: 0.8, isFinal: true },
                  analytics: {
                    aiReport: { summary: 'x', generatedAt: new Date(), aiStatus: { fallbackUsed: false } },
                  },
                  careerRecommendations: {
                    generatedAt: new Date(),
                    preliminary: false,
                    topRecommendations: [{ careerId: 'x', title: 'Y' }],
                  },
                  legacyAssessmentId: null,
                  cvData: {},
                },
              ],
            }),
          }),
        }),
      }),
    },
  };
  require.cache[progressPath] = {
    exports: {
      find: () => ({
        sort: () => ({
          limit: () => ({
            lean: async () => [],
          }),
        }),
      }),
    },
  };
  const { getInsightTimelineForUser } = require(tlPath);
  const { events } = await getInsightTimelineForUser({ requester, userId });
  assert.ok(events.some((e) => e.type === 'assessment_completed'));
  assert.ok(events.some((e) => e.type === 'report_generated'));
});
