import React from 'react';
import { beforeAll, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RiasecRadarChart from './RiasecRadarChart';

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('RiasecRadarChart', () => {
  it('renders Holland code when enough evidence', () => {
    const riasec = {
      hollandCode: 'IAS',
      hollandCodePreliminary: false,
      dimensions: {
        realistic: { score: 50, evidenceCount: 2, confidence: 0.5 },
        investigative: { score: 60, evidenceCount: 2, confidence: 0.5 },
        artistic: { score: 55, evidenceCount: 2, confidence: 0.5 },
        social: { score: 52, evidenceCount: 2, confidence: 0.5 },
        enterprising: { score: 51, evidenceCount: 2, confidence: 0.5 },
        conventional: { score: 49, evidenceCount: 2, confidence: 0.5 },
      },
    };
    render(<RiasecRadarChart riasec={riasec} scoreMeta={{ scoreSource: 'deterministic', scoreValidity: 'valid' }} />);
    expect(screen.getByText(/Holland code:/)).toBeTruthy();
  });

  it('hides when insufficient meta', () => {
    const riasec = {
      hollandCode: 'RIASEC',
      dimensions: {
        realistic: { score: 50, evidenceCount: 0, confidence: 0 },
        investigative: { score: 50, evidenceCount: 0, confidence: 0 },
        artistic: { score: 50, evidenceCount: 0, confidence: 0 },
        social: { score: 50, evidenceCount: 0, confidence: 0 },
        enterprising: { score: 50, evidenceCount: 0, confidence: 0 },
        conventional: { score: 50, evidenceCount: 0, confidence: 0 },
      },
    };
    render(<RiasecRadarChart riasec={riasec} scoreMeta={{ scoreSource: 'deterministic', scoreValidity: 'insufficient_data' }} />);
    expect(screen.getByLabelText(/RIASEC chart unavailable/)).toBeTruthy();
  });
});
