import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WorldEntry } from './components/public-experience/home/WorldEntry';
import { MEDIA_MANIFEST_PX } from './content/public-experience/mediaManifest';

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn(), getVelocity: vi.fn(() => 0), progress: 0 }),
    refresh: vi.fn(),
    update: vi.fn(),
  },
}));

describe('Under Different Conditions — World Entry Contracts', () => {
  it('renders home world entry scene with single H1', () => {
    render(
      <BrowserRouter>
        <WorldEntry />
      </BrowserRouter>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('UNDER DIFFERENT CONDITIONS');
  });

  it('provides truthful responsive image attributes for homeWorldEntry', () => {
    const asset = MEDIA_MANIFEST_PX.homeWorldEntry;
    expect(asset.avifSrcSet).toContain('.avif');
    expect(asset.webpSrcSet).toContain('.webp');
  });
});
