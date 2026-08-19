import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import OrientationChapter from './components/personality-v7/home/OrientationChapter';
import MediaPlane from './components/personality-v7/motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from './content/personality-v7/mediaManifest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

vi.mock('./components/personality-v7/motion/useCinematicScene', () => ({
  default: () => React.createRef(),
}));

describe('Hero + Evidence opening contract', () => {
  it('renders A01 and A02 together on the initial render', () => {
    render(<BrowserRouter><OrientationChapter /></BrowserRouter>);

    expect(screen.getByAltText('A blurred profile seen through textured glass.')).toBeInTheDocument();
    expect(screen.getByAltText('A figure pressing both hands against textured glass.')).toBeInTheDocument();
  });

  it('uses one fieldset with three initially unselected radios', () => {
    render(<BrowserRouter><OrientationChapter /></BrowserRouter>);

    expect(screen.getAllByRole('group')).toHaveLength(1);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    radios.forEach((radio) => expect(radio).not.toBeChecked());
  });

  it('emits truthful responsive-image dimensions and priority attributes', () => {
    const { container } = render(
      <MediaPlane
        asset={MEDIA_ASSETS_V7.a01}
        sizes="(min-width: 901px) 78vw, 100vw"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    );
    const image = container.querySelector('img');

    expect(image).toHaveAttribute('sizes', '(min-width: 901px) 78vw, 100vw');
    expect(image).toHaveAttribute('width', '5464');
    expect(image).toHaveAttribute('height', '8192');
    expect(image).toHaveAttribute('fetchpriority', 'high');
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('disables the public mobile atlas dock on the homepage', () => {
    const home = readFileSync(resolve(process.cwd(), 'src/pages/editorial/EditorialHomePage.jsx'), 'utf8');
    expect(home).toContain('withMobileAtlasDock={false}');
  });

  it('does not initialise the scroll scene in reduced-motion styles', () => {
    const hook = readFileSync(resolve(process.cwd(), 'src/components/personality-v7/motion/useCinematicScene.js'), 'utf8');
    expect(hook).toContain('(prefers-reduced-motion: no-preference)');
  });
});
