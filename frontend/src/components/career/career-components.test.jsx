import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CareerRecommendationCard from './CareerRecommendationCard';
import CareerFitBreakdown from './CareerFitBreakdown';
import SkillGapPanel from './SkillGapPanel';
import CareerRoadmapTimeline from './CareerRoadmapTimeline';
import CareerExplorerPanel from './CareerExplorerPanel';

describe('Career UI components', () => {
  it('CareerRecommendationCard renders title, fit, confidence, and why-this-fits', () => {
    render(
      <CareerRecommendationCard
        title="Software Engineer"
        fitScore={82}
        confidence={0.72}
        preliminary={false}
        fitType="bestFit"
        whyThisFits={['Strong investigative alignment.', 'Values overlap.']}
        skillGaps={{ missingCriticalSkills: ['Testing'] }}
      />
    );
    expect(screen.getByText(/Software Engineer/)).toBeTruthy();
    expect(screen.getByText(/82/)).toBeTruthy();
    expect(screen.getByText(/72%/)).toBeTruthy();
    expect(screen.getByText(/Strong investigative alignment/)).toBeTruthy();
  });

  it('CareerFitBreakdown renders component scores', () => {
    render(
      <CareerFitBreakdown
        fitBreakdown={{ riasecFit: 80, skillFit: 70, workValuesFit: 75, personalityFit: 72, educationFit: 60, goalFit: 55 }}
      />
    );
    expect(screen.getByTestId('career-fit-breakdown')).toBeTruthy();
    expect(screen.getByText('80')).toBeTruthy();
  });

  it('SkillGapPanel renders matched and missing skills', () => {
    render(
      <SkillGapPanel
        skillGaps={{
          matchedSkills: ['JavaScript'],
          missingCriticalSkills: ['Databases'],
          recommendedSkills: ['Cloud'],
          skillReadinessScore: 68,
          evidenceSources: ['cv', 'assessment'],
        }}
      />
    );
    expect(screen.getByTestId('skill-gap-panel')).toBeTruthy();
    expect(screen.getByText('JavaScript')).toBeTruthy();
    expect(screen.getByText('Databases')).toBeTruthy();
  });

  it('CareerRoadmapTimeline renders stages', () => {
    render(
      <CareerRoadmapTimeline
        timeline={[
          { stage: '0-30 days', title: 'Foundations', actions: ['Learn X'], skills: ['X'] },
        ]}
      />
    );
    expect(screen.getByTestId('career-roadmap-timeline')).toBeTruthy();
    expect(screen.getByText('0-30 days')).toBeTruthy();
  });

  it('CareerExplorerPanel shows locked state when payload locked', () => {
    render(<CareerExplorerPanel payload={{ locked: true }} />);
    expect(screen.getByText(/unavailable because score validity/i)).toBeTruthy();
  });

  it('CareerExplorerPanel groups recommendations', () => {
    const payload = {
      locked: false,
      preliminary: true,
      recommendations: {
        bestFits: [{ careerId: 'a', title: 'A', fitScore: 90, confidence: 0.8, fitType: 'bestFit' }],
        stretchFits: [],
        exploratoryFits: [],
        lowerFitButPossible: [],
      },
      topRecommendations: [
        {
          careerId: 'a',
          title: 'A',
          fitScore: 90,
          confidence: 0.8,
          fitType: 'bestFit',
          whyThisFits: ['ok'],
          whyThisMayBeChallenging: [],
          fitBreakdown: { riasecFit: 80, skillFit: 70, workValuesFit: 75, personalityFit: 72, educationFit: 60, goalFit: 55 },
          skillGaps: { matchedSkills: [], missingCriticalSkills: [], recommendedSkills: [], skillReadinessScore: 50, evidenceSources: [] },
          roadmap: { timeline: [{ stage: '0-30 days', title: 'T', actions: ['act'], skills: [] }] },
        },
      ],
      roadmaps: [{ careerId: 'a', title: 'A', timeline: [{ stage: '0-30 days', title: 'T', actions: ['act'], skills: [] }] }],
      warnings: ['w'],
    };
    render(<CareerExplorerPanel payload={payload} />);
    expect(screen.getByTestId('career-explorer-panel')).toBeTruthy();
    expect(screen.getByText('bestFits')).toBeTruthy();
  });
});
