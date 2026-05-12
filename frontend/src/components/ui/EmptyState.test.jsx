import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      <EmptyState title="No data" description="Try again later." />
    );
    expect(screen.getByRole('heading', { name: /no data/i })).toBeInTheDocument();
    expect(screen.getByText(/try again later/i)).toBeInTheDocument();
  });
});
