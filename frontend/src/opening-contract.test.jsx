import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeOpeningChapter from './components/personality-v7/home/HomeOpeningChapter';
import HomeDecisionChapter from './components/personality-v7/home/HomeDecisionChapter';
import { MEDIA_ASSETS_V7 } from './content/personality-v7/mediaManifest';

describe('Evidence in Context Opening & Decision Contract', () => {
  it('renders home context media on initial render with single H1', () => {
    render(
      <BrowserRouter>
        <HomeOpeningChapter />
      </BrowserRouter>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Keep the context behind every answer.');
    expect(screen.getByAltText(MEDIA_ASSETS_V7.homeContext.alt)).toBeInTheDocument();
  });

  it('uses one fieldset with four initially unselected radios', () => {
    render(
      <BrowserRouter>
        <HomeDecisionChapter selectedChoice={null} onSelectChoice={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getAllByRole('group')).toHaveLength(1);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(4);
    radios.forEach((radio) => expect(radio).not.toBeChecked());
  });

  it('provides truthful responsive image attributes for homeContext', () => {
    const asset = MEDIA_ASSETS_V7.homeContext;
    expect(asset.intrinsicDimensions.width).toBe(1074);
    expect(asset.intrinsicDimensions.height).toBe(806);
    expect(asset.avifSrcSet).toContain('.avif');
    expect(asset.webpSrcSet).toContain('.webp');
  });
});
