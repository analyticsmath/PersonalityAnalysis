import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InsightHeatmapChart from './InsightHeatmapChart';

describe('InsightHeatmapChart — Repair Phase 1', () => {
  it('shows explanatory message when no facet data', () => {
    render(<InsightHeatmapChart facetScores={{}} />);
    expect(screen.getByRole('status')).toBeTruthy();
    expect(screen.getByRole('status').textContent).toMatch(/not available/i);
  });

  it('renders heatmap cells when facet data exists', () => {
    const facets = {
      O1: 72, O2: 65, O3: 48, O4: 81, O5: 59, O6: 70,
      C1: 55, C2: 60,
    };
    render(<InsightHeatmapChart facetScores={facets} />);
    expect(screen.getByRole('list')).toBeTruthy();
  });

  it('renders low/high scale legend when data exists', () => {
    const facets = { O1: 72, O2: 65 };
    render(<InsightHeatmapChart facetScores={facets} />);
    expect(screen.getByText(/low intensity/i)).toBeTruthy();
    expect(screen.getByText(/high intensity/i)).toBeTruthy();
  });

  it('renders help text explanation when data exists', () => {
    const facets = { O1: 72, O2: 65 };
    render(<InsightHeatmapChart facetScores={facets} />);
    expect(screen.getByRole('note').textContent).toMatch(/personality facet/i);
  });
});
