import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FieldEntryChapter from './components/personality-atlas/home/FieldEntryChapter';
import ResponseFragment from './components/personality-atlas/fragments/ResponseFragment';
import { MEDIA_ASSETS_ATLAS } from './content/personality-atlas/mediaManifest';

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn(), getVelocity: vi.fn(() => 0), progress: 0 }),
    refresh: vi.fn(),
    update: vi.fn(),
  },
}));

describe('Context Atlas — Field Entry & Protagonist Contracts', () => {
  it('renders home field entry chapter with single H1 and primary media', () => {
    render(
      <BrowserRouter>
        <FieldEntryChapter />
      </BrowserRouter>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Your work leaves a trail of context.');
    expect(screen.getByAltText(MEDIA_ASSETS_ATLAS.homeContext.alt)).toBeInTheDocument();
  });

  it('renders ResponseFragment with quote and source retention metadata', () => {
    render(
      <ResponseFragment
        text="“I clarify responsibilities before committing work.”"
        sourceId="0x8F4A"
        date="2026-08"
        variant="response"
      />
    );

    expect(screen.getByText('“I clarify responsibilities before committing work.”')).toBeInTheDocument();
    expect(screen.getByText('REF: 0x8F4A')).toBeInTheDocument();
    expect(screen.getByText('RECORDED: 2026-08')).toBeInTheDocument();
  });

  it('provides truthful responsive image attributes for homeContext', () => {
    const asset = MEDIA_ASSETS_ATLAS.homeContext;
    expect(asset.widths).toContain(720);
    expect(asset.avifSrcSet).toContain('.avif');
    expect(asset.webpSrcSet).toContain('.webp');
  });
});
