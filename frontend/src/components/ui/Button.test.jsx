import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('shows loading label and disables when loading', () => {
    render(
      <Button loading loadingLabel="Working…">
        Save
      </Button>
    );
    expect(screen.getByRole('button', { name: /working/i })).toBeDisabled();
    expect(screen.getByText('Working…')).toBeInTheDocument();
  });

  it('respects disabled without loading', () => {
    render(<Button disabled>Go</Button>);
    expect(screen.getByRole('button', { name: /go/i })).toBeDisabled();
  });

  it('calls onClick when enabled', () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>Tap</Button>);
    fireEvent.click(screen.getByRole('button', { name: /tap/i }));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
