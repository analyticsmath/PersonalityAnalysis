import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PersonalIntelligenceOverview from './PersonalIntelligenceOverview';
import AssessmentHistoryList from './AssessmentHistoryList';
import TraitTrendChart from './TraitTrendChart';
import CareerReadinessCard from './CareerReadinessCard';
import SkillProgressPanel from './SkillProgressPanel';
import InsightTimeline from './InsightTimeline';
import ReportHistoryPanel from './ReportHistoryPanel';

describe('Phase 7 analytics components', () => {
  it('PersonalIntelligenceOverview shows metrics when data present', () => {
    const query = {
      isPending: false,
      isError: false,
      data: {
        assessmentCount: 2,
        latestConfidence: 0.72,
        topTrait: 'Analytical',
        topCareerFit: 'Software Engineer',
        careerReadiness: { careerReadinessScore: 70, status: 'stable' },
        latestReportStatus: 'ready',
        nextRecommendedAction: 'Review timeline.',
      },
    };
    render(
      <MemoryRouter>
        <PersonalIntelligenceOverview query={query} />
      </MemoryRouter>
    );
    expect(screen.getByRole('article', { name: /Assessments: 2/i })).toBeInTheDocument();
    expect(screen.getByText(/Personal intelligence/i)).toBeInTheDocument();
  });

  it('PersonalIntelligenceOverview empty state without assessments', () => {
    const query = { isPending: false, isError: false, data: { assessmentCount: 0 } };
    render(
      <MemoryRouter>
        <PersonalIntelligenceOverview query={query} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No assessments yet/i)).toBeInTheDocument();
  });

  it('AssessmentHistoryList renders links to result page', () => {
    const query = {
      isPending: false,
      isError: false,
      data: [
        {
          assessmentId: 'rid1',
          resultId: 'rid1',
          createdAt: new Date().toISOString(),
          scoreValidity: 'valid',
          status: 'completed',
          primaryArchetype: 'A',
          topCareer: 'Engineer',
          confidence: 0.5,
          hasAiReport: true,
          hasCareerRecommendations: true,
        },
      ],
    };
    render(
      <MemoryRouter>
        <AssessmentHistoryList query={query} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /view result/i })).toHaveAttribute('href', '/result/rid1');
  });

  it('TraitTrendChart insufficient-history state', () => {
    const query = {
      isPending: false,
      isError: false,
      data: { status: 'insufficient_history', message: 'Need two runs.' },
    };
    render(<TraitTrendChart query={query} />);
    expect(screen.getByText(/Not enough history yet/i)).toBeInTheDocument();
  });

  it('TraitTrendChart renders table when ok', () => {
    const query = {
      isPending: false,
      isError: false,
      data: {
        status: 'ok',
        trendPoints: [
          { date: '2026-05-01', resultId: 'a', dimension: 'openness', score: 60, confidence: 0.7, validity: 'valid' },
          { date: '2026-05-02', resultId: 'b', dimension: 'openness', score: 62, confidence: 0.71, validity: 'valid' },
        ],
      },
    };
    render(<TraitTrendChart query={query} />);
    expect(screen.getByRole('columnheader', { name: 'Date' })).toBeInTheDocument();
  });

  it('CareerReadinessCard avoids hireability wording', () => {
    const query = {
      isPending: false,
      isError: false,
      data: {
        careerReadinessScore: 66,
        skillReadiness: 60,
        roadmapProgress: 10,
        evidenceCompleteness: 50,
        confidence: 0.6,
        topCareer: 'SE',
        status: 'stable',
        warnings: [],
      },
    };
    render(<CareerReadinessCard query={query} />);
    expect(screen.getByText(/Career readiness indicator/i)).toBeInTheDocument();
    expect(screen.getByText(/not hireability/i)).toBeInTheDocument();
  });

  it('SkillProgressPanel baseline', () => {
    const query = {
      isPending: false,
      isError: false,
      data: {
        targetCareer: 'SE',
        matchedSkills: ['Git'],
        missingSkills: ['Distributed systems'],
        recommendedSkills: ['Testing'],
        progressItems: [],
        status: 'baseline',
        warnings: [],
      },
    };
    render(<SkillProgressPanel query={query} />);
    expect(screen.getByText(/Target role:/i).textContent).toMatch(/SE/);
  });

  it('InsightTimeline empty', () => {
    const query = { isPending: false, isError: false, data: { events: [] } };
    render(<InsightTimeline query={query} />);
    expect(screen.getByText(/No timeline events yet/i)).toBeInTheDocument();
  });

  it('ReportHistoryPanel renders rows', () => {
    const query = {
      isPending: false,
      isError: false,
      data: {
        items: [
          {
            resultId: 'r1',
            assessmentDate: new Date().toISOString(),
            hasReport: true,
            scoreValidity: 'valid',
            scoreSource: 'deterministic',
            fallbackUsed: false,
          },
        ],
      },
    };
    render(
      <MemoryRouter>
        <ReportHistoryPanel query={query} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /open result/i })).toHaveAttribute('href', '/result/r1');
  });
});
