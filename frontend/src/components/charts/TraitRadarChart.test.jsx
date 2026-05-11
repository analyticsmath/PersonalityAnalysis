import { render, screen } from '@testing-library/react';
import TraitRadarChart from './TraitRadarChart';

beforeAll(() => {
  global.ResizeObserver = class {
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
});
