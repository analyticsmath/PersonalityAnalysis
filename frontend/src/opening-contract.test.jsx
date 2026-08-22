import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeWorldEntryScene from './components/personality-v7/home/HomeWorldEntryScene';
import EvidenceStrip from './components/personality-v7/living-record/EvidenceStrip';
import { MEDIA_ASSETS_V7 } from './content/personality-v7/mediaManifest';

describe('The Living Record — World Entry & Protagonist Contracts', () => {
  it('renders home world entry scene with single H1 and primary media', () => {
    render(
      <BrowserRouter>
        <HomeWorldEntryScene />
      </BrowserRouter>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Keep the source attached.');
    expect(screen.getByAltText(MEDIA_ASSETS_V7.homeContext.alt)).toBeInTheDocument();
  });

  it('renders EvidenceStrip with quotes, eyebrow, and source retention label', () => {
    render(
      <EvidenceStrip
        quote="“I clarify responsibilities before committing work.”"
        eyebrow="ILLUSTRATIVE RESPONSE"
        sourceLabel="SOURCE RETAINED"
        theme="mineral"
        variant="source"
      />
    );

    expect(screen.getByText('“I clarify responsibilities before committing work.”')).toBeInTheDocument();
    expect(screen.getByText('ILLUSTRATIVE RESPONSE')).toBeInTheDocument();
    expect(screen.getByText('SOURCE RETAINED')).toBeInTheDocument();
  });

  it('provides truthful responsive image attributes for homeContext', () => {
    const asset = MEDIA_ASSETS_V7.homeContext;
    expect(asset.intrinsicDimensions.width).toBe(1074);
    expect(asset.intrinsicDimensions.height).toBe(806);
    expect(asset.avifSrcSet).toContain('.avif');
    expect(asset.webpSrcSet).toContain('.webp');
  });
});
