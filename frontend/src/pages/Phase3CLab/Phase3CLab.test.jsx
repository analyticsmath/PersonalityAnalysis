import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { ContextScene, MobileFixtures } from './Phase3CStaticFixtures';
import { getWorkWorldControlTarget } from './Phase3CMotionLab';
import { isPhase3CLabEnabled } from './labRoute';
import { PaletteResearchControls, PHASE3C_STATIC_LAYOUT_IDENTITY } from './PaletteResearchControls';

vi.mock('./Phase3CMotionLab', async () => {
  const actual = await vi.importActual('./Phase3CMotionLab');
  return { ...actual, default: () => <div data-testid="motion-lab-stub" /> };
});

describe('Phase 3C Visual + Motion Lab contract', () => {
  it('keeps the lab route gated behind the explicit true flag', () => {
    expect(isPhase3CLabEnabled('true')).toBe(true);
    expect(isPhase3CLabEnabled('TRUE')).toBe(false);
    expect(isPhase3CLabEnabled('false')).toBe(false);
    expect(isPhase3CLabEnabled(undefined)).toBe(false);
  });

  it('does not add the lab to production navigation, footer, or sitemap', () => {
    const publicChrome = readFileSync(resolve(process.cwd(), 'src/components/public/PublicChrome.jsx'), 'utf8');
    const sitemap = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8');
    expect(publicChrome).not.toContain('__phase3c-lab');
    expect(sitemap).not.toContain('__phase3c-lab');
  });

  it('keeps layout identity stable across the palette experiment', () => {
    function PaletteHarness() {
      const [palette, setPalette] = useState('mineral');
      return <div data-testid="palette-harness" data-palette={palette} data-layout-identity={PHASE3C_STATIC_LAYOUT_IDENTITY}><PaletteResearchControls palette={palette} onPaletteChange={setPalette} /></div>;
    }
    render(<PaletteHarness />);
    const root = screen.getByTestId('palette-harness');
    const layoutIdentity = root.dataset.layoutIdentity;
    fireEvent.click(screen.getByRole('button', { name: 'Evidence marker experiment' }));
    expect(root.dataset.palette).toBe('marker');
    expect(root.dataset.layoutIdentity).toBe(layoutIdentity);
  });

  it('does not auto-select a Context Theatre answer', () => {
    const onStateChange = vi.fn();
    const onSelectResponse = vi.fn();
    render(
      <ContextScene
        state="C4"
        onStateChange={onStateChange}
        selectedResponse=""
        onSelectResponse={onSelectResponse}
      />
    );
    expect(screen.getByText('No response selected.')).toBeInTheDocument();
    expect(screen.queryAllByRole('button', { pressed: true })).toHaveLength(0);
  });

  it('maps direct Work Worlds controls to the timeline stable labels', () => {
    expect(getWorkWorldControlTarget(0)).toBe('W0-build');
    expect(getWorkWorldControlTarget(1)).toBe('W2-investigate');
    expect(getWorkWorldControlTarget(5)).toBe('W10-collaborate');
  });

  it('uses normal document-flow motion fixtures when reduced motion is requested', async () => {
    const actual = await vi.importActual('./Phase3CMotionLab');
    const MotionLab = actual.default;
    render(<MemoryRouter><MotionLab reducedMotionOverride /></MemoryRouter>);
    expect(document.querySelectorAll('[data-motion-mode="direct"]')).toHaveLength(2);
    expect(screen.getAllByText(/no pinned whitespace/i)).not.toHaveLength(0);
  });

  it('keeps the dedicated 390 fixture within its responsive frame definition', () => {
    render(<MobileFixtures />);
    const css = readFileSync(resolve(process.cwd(), 'src/pages/Phase3CLab/Phase3CLab.css'), 'utf8');
    expect(screen.getByTestId('phase3c-mobile-fixtures')).toBeInTheDocument();
    expect(css).toContain('width: min(390px, calc(100vw - 40px))');
    expect(css).not.toContain('.phase3c-lab { overflow-x');
  });

  it('labels illustrative profile data in the lab', async () => {
    const { LivingProfileLab } = await import('./Phase3CChartsLab');
    render(<LivingProfileLab />);
    expect(screen.getByText('Illustrative design-lab data — not a user result')).toBeInTheDocument();
  });
});
