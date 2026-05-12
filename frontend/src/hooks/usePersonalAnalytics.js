import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPersonalAnalyticsOverview,
  getPersonalAnalyticsHistory,
  getPersonalTraitTrends,
  getPersonalCareerReadiness,
  getPersonalSkillProgress,
  getPersonalInsightTimeline,
  getPersonalReportHistory,
  getRoadmapProgress,
  updateRoadmapProgress,
} from '../api/analyticsApi';

export const personalAnalyticsKeys = {
  all: ['personal-analytics'],
  overview: () => [...personalAnalyticsKeys.all, 'overview'],
  history: () => [...personalAnalyticsKeys.all, 'history'],
  trends: () => [...personalAnalyticsKeys.all, 'trends'],
  careerReadiness: () => [...personalAnalyticsKeys.all, 'career-readiness'],
  skillProgress: () => [...personalAnalyticsKeys.all, 'skill-progress'],
  timeline: () => [...personalAnalyticsKeys.all, 'timeline'],
  reportHistory: () => [...personalAnalyticsKeys.all, 'report-history'],
  roadmap: (resultId, careerId) => [...personalAnalyticsKeys.all, 'roadmap', resultId, careerId],
};

export const usePersonalAnalyticsOverviewQuery = (enabled = true) =>
  useQuery({
    queryKey: personalAnalyticsKeys.overview(),
    queryFn: getPersonalAnalyticsOverview,
    enabled,
    staleTime: 60 * 1000,
  });

export const usePersonalAnalyticsHistoryQuery = (enabled = true) =>
  useQuery({
    queryKey: personalAnalyticsKeys.history(),
    queryFn: getPersonalAnalyticsHistory,
    enabled,
    staleTime: 60 * 1000,
  });

export const usePersonalTraitTrendsQuery = (enabled = true) =>
  useQuery({
    queryKey: personalAnalyticsKeys.trends(),
    queryFn: getPersonalTraitTrends,
    enabled,
    staleTime: 60 * 1000,
  });

export const usePersonalCareerReadinessQuery = (enabled = true) =>
  useQuery({
    queryKey: personalAnalyticsKeys.careerReadiness(),
    queryFn: getPersonalCareerReadiness,
    enabled,
    staleTime: 60 * 1000,
  });

export const usePersonalSkillProgressQuery = (enabled = true) =>
  useQuery({
    queryKey: personalAnalyticsKeys.skillProgress(),
    queryFn: getPersonalSkillProgress,
    enabled,
    staleTime: 60 * 1000,
  });

export const usePersonalInsightTimelineQuery = (enabled = true) =>
  useQuery({
    queryKey: personalAnalyticsKeys.timeline(),
    queryFn: getPersonalInsightTimeline,
    enabled,
    staleTime: 60 * 1000,
  });

export const usePersonalReportHistoryQuery = (enabled = true) =>
  useQuery({
    queryKey: personalAnalyticsKeys.reportHistory(),
    queryFn: getPersonalReportHistory,
    enabled,
    staleTime: 60 * 1000,
  });

export const useRoadmapProgressQuery = (resultId, careerId, enabled = true) =>
  useQuery({
    queryKey: personalAnalyticsKeys.roadmap(resultId, careerId),
    queryFn: () => getRoadmapProgress(resultId, careerId),
    enabled: Boolean(resultId && careerId) && enabled,
    staleTime: 30 * 1000,
  });

export const useRoadmapProgressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ resultId, careerId, completedActionKeys }) =>
      updateRoadmapProgress(resultId, careerId, completedActionKeys),
    onSuccess: (_data, variables) => {
      if (variables?.resultId && variables?.careerId) {
        queryClient.invalidateQueries({
          queryKey: personalAnalyticsKeys.roadmap(variables.resultId, variables.careerId),
        });
      }
      queryClient.invalidateQueries({ queryKey: personalAnalyticsKeys.all });
    },
  });
};
