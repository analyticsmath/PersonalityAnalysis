import client from './client';

const unwrap = (response) => response?.data?.data || {};

export const getTraitTrends = async (userId) => {
  const response = await client.get(`/assessment/analytics/trends/${userId}`);
  return unwrap(response).trends || [];
};

export const compareAssessments = async ({ assessmentAId, assessmentBId }) => {
  const response = await client.get('/assessment/analytics/compare', {
    params: {
      a: assessmentAId,
      b: assessmentBId,
    },
  });

  return unwrap(response);
};

/** Phase 7 — canonical `/api/assessment/analytics/*` (Bearer auth; current user only). */
export const getPersonalAnalyticsOverview = async () => {
  const response = await client.get('/assessment/analytics/overview');
  return unwrap(response) || {};
};

export const getPersonalAnalyticsHistory = async () => {
  const response = await client.get('/assessment/analytics/history');
  return unwrap(response).items || [];
};

export const getPersonalTraitTrends = async () => {
  const response = await client.get('/assessment/analytics/trends');
  return unwrap(response) || {};
};

export const getPersonalCareerReadiness = async () => {
  const response = await client.get('/assessment/analytics/career-readiness');
  return unwrap(response) || {};
};

export const getPersonalSkillProgress = async () => {
  const response = await client.get('/assessment/analytics/skill-progress');
  return unwrap(response) || {};
};

export const getPersonalInsightTimeline = async () => {
  const response = await client.get('/assessment/analytics/timeline');
  return unwrap(response) || {};
};

export const getPersonalReportHistory = async () => {
  const response = await client.get('/assessment/analytics/report-history');
  return unwrap(response) || {};
};

export const getRoadmapProgress = async (resultId, careerId) => {
  const enc = encodeURIComponent(String(careerId));
  const response = await client.get(`/assessment/analytics/roadmap-progress/${resultId}/${enc}`);
  return unwrap(response) || {};
};

export const updateRoadmapProgress = async (resultId, careerId, completedActionKeys) => {
  const enc = encodeURIComponent(String(careerId));
  const response = await client.post(`/assessment/analytics/roadmap-progress/${resultId}/${enc}`, {
    completedActionKeys,
  });
  return unwrap(response) || {};
};
