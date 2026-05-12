import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LoadingState from './LoadingState';

vi.mock('./Loader', () => ({
  default: ({ label }) => (
    <div data-testid="loader-mock" role="status" aria-live="polite" aria-busy="true">
      {label}
    </div>
  ),
}));

describe('LoadingState', () => {
  it('exposes busy polite status', () => {
    render(<LoadingState message="Loading scores…" />);
    const region = screen.getByRole('status');
    expect(region).toHaveAttribute('aria-busy', 'true');
    expect(region).toHaveTextContent(/loading scores/i);
  });
});
