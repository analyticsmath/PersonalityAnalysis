import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HeroThesisPoster } from './components/public-experience/home/HeroThesisPoster';
import { MEDIA_MANIFEST_PX } from './content/public-experience/mediaManifest';

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn(), getVelocity: vi.fn(() => 0), progress: 0 }),
    refresh: vi.fn(),
    update: vi.fn(),
  },
}));

describe('Editorial Evidence Atlas — Thesis Poster Contracts', () => {
  it('renders home thesis poster scene with single H1', () => {
    render(
      <BrowserRouter>
        <HeroThesisPoster />
      </BrowserRouter>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('ONE ANSWER IS NOT ONE RESULT.');
  });

  it('provides truthful responsive image attributes for homeHeroContext', () => {
    const asset = MEDIA_MANIFEST_PX.homeHeroContext;
    expect(asset.avifSrcSet).toContain('.avif');
    expect(asset.webpSrcSet).toContain('.webp');
  });
});
