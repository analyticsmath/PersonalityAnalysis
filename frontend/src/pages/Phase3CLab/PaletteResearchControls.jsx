export const PHASE3C_STATIC_LAYOUT_IDENTITY = 'phase3c-static-geometry-v1';

export function PaletteResearchControls({ palette, onPaletteChange }) {
  return (
    <div role="group" aria-label="Palette experiment">
      <button type="button" aria-pressed={palette === 'mineral'} onClick={() => onPaletteChange('mineral')}>Chromaless Mineral</button>
      <button type="button" aria-pressed={palette === 'marker'} onClick={() => onPaletteChange('marker')}>Evidence marker experiment</button>
    </div>
  );
}

