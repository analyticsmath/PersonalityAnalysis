import React from 'react';
import { beforeAll, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkValuesProfileCard from './WorkValuesProfileCard';

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('WorkValuesProfileCard', () => {
  it('renders when values have evidence', () => {
    const workValues = {
      learning: { score: 72, evidenceCount: 2, confidence: 0.4 },
      impact: { score: 68, evidenceCount: 1, confidence: 0.3 },
    };
    render(<WorkValuesProfileCard workValues={workValues} scoreMeta={{ scoreSource: 'deterministic', scoreValidity: 'partial' }} />);
    expect(screen.getByLabelText(/Work values chart/)).toBeTruthy();
  });
});
