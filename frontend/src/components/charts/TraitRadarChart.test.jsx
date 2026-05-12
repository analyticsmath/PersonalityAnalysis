import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import TraitRadarChart from './TraitRadarChart';

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('TraitRadarChart gating', () => {
  it('hides chart for mock source', () => {
    render(<TraitRadarChart traits={{ O: 70, C: 70, E: 70, A: 70, N: 70 }} scoreMeta={{ scoreSource: 'mock', scoreValidity: 'invalid' }} />);
    expect(screen.getByText(/reliable personality graph/i)).toBeInTheDocument();
  });

  it('renders chart for valid scores', () => {
    render(<TraitRadarChart traits={{ O: 70, C: 70, E: 70, A: 70, N: 70 }} scoreMeta={{ scoreSource: 'deterministic', scoreValidity: 'valid' }} />);
    expect(screen.queryByText(/reliable personality graph/i)).toBeNull();
  });

  it('shows confidence badge when provided', () => {
    render(
      <TraitRadarChart
        traits={{ O: 70, C: 70, E: 70, A: 70, N: 70 }}
        scoreMeta={{ scoreSource: 'deterministic', scoreValidity: 'valid', confidence: 0.55 }}
      />
    );
    expect(screen.getByTestId('trait-radar-confidence')).toHaveTextContent('Confidence 55%');
  });

  it('shows legacy unverified badge without hiding valid chart', () => {
    render(
      <TraitRadarChart
        traits={{ O: 70, C: 70, E: 70, A: 70, N: 70 }}
        scoreMeta={{ scoreSource: 'legacy_unverified', scoreValidity: 'valid' }}
      />
    );
    expect(screen.getByTestId('trait-radar-legacy')).toBeTruthy();
  });
});
