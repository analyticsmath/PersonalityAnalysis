import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoringEvidenceCard from '../results/ScoringEvidenceCard';

describe('ScoringEvidenceCard', () => {
  it('renders evidence count and disclaimer', () => {
    render(
      <ScoringEvidenceCard
        scoreMeta={{ confidence: 0.42, evidenceCount: 11 }}
        evidence={[{ signal: 'Planning language detected' }]}
        warnings={['Low coverage']}
      />
    );
    expect(screen.getByTestId('scoring-evidence-card')).toBeTruthy();
    expect(screen.getByText(/Evidence items:/)).toBeTruthy();
    expect(screen.getByText(/deterministic scoring layer/)).toBeTruthy();
  });
});
