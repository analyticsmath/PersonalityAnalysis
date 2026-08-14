// Design token registry — single source of truth for all semantic colors,
// typography, spacing, shadow, and chart palettes.
// Phase 3B Visual Acceptance system.

const tokens = {
  // ── Core Semantic Palette ───────────────────────────────────────────────────
  palette: {
    canvas: '#F7F9F8',
    paper: '#FFFFFF',
    ink: '#101414',
    secondary: '#566362',
    mist: '#DCE4E2',
    softField: '#EEF2F1',

    darkScene: '#0E1717',
    darkSceneFg: '#F7FAF9',
    darkSceneMuted: '#B9C4C1',

    signal: '#DDF45A',
    signalStrong: '#607900',

    info: '#2F6FED',
    success: '#18785B',
    warning: '#A45A00',
    error: '#B43A4A',
    focus: '#2F6FED',
  },

  // ── Surfaces ─────────────────────────────────────────────────────────────
  background: {
    base: '#F7F9F8',
    secondary: '#EEF2F1',
    surface: '#FFFFFF',
    elevated: '#FFFFFF',
    darkScene: '#0E1717',
    glass: 'rgba(255, 255, 255, 0.96)',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F7F9F8',
    tertiary: '#EEF2F1',
    elevated: '#FFFFFF',
    sidebar: '#F7F9F8',
    header: '#F7F9F8',
    input: '#FFFFFF',
    hover: '#EEF2F1',
    selected: '#E4ECE9',
    disabled: '#DCE4E2',
  },

  // ── Borders ───────────────────────────────────────────────────────────────
  border: {
    subtle: '#E6EBE9',
    default: '#DCE4E2',
    strong: '#566362',
    divider: '#DCE4E2',
    focus: '#2F6FED',
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  text: {
    primary: '#101414',
    secondary: '#566362',
    muted: '#566362',
    disabled: '#8C9792',
    inverse: '#F7FAF9',
    link: '#101414',
    accent: '#2F6FED',
  },

  // ── Action / Interface ────────────────────────────────────────────────────
  action: {
    primaryBg: '#101414',
    primaryText: '#FFFFFF',
    primaryHover: '#252D2D',
    signalBg: '#DDF45A',
    signalText: '#101414',
    signalHover: '#D3EA48',
    secondaryBg: '#FFFFFF',
    secondaryText: '#101414',
    secondaryBorder: '#DCE4E2',
    secondaryHover: '#EEF2F1',
    ghostHover: '#EEF2F1',
  },

  // Legacy mappings for backward compatibility
  primary: {
    50: '#F7F9F8',
    100: '#EEF2F1',
    500: '#101414',
    600: '#101414',
    700: '#101414',
  },
  secondary: {
    50: '#F7F9F8',
    500: '#566362',
    600: '#2F6FED',
  },

  // ── Accent (Restrained semantic only) ───────────────────────────────────────
  accent: {
    blue: '#2F6FED',
    blueHover: '#1B56C7',
    blueGlow: 'none',
    cyan: '#2F6FED',
    purple: '#566362',
    amber: '#A45A00',
    emerald: '#18785B',
    emeraldDark: '#18785B',
    orange: '#A45A00',
  },

  // ── Status ────────────────────────────────────────────────────────────────
  state: {
    success: '#18785B',
    successBg: '#DEEFEA',
    successText: '#18785B',
    successBorder: '#A9D9C9',
    warning: '#A45A00',
    warningBg: '#F7EECD',
    warningText: '#784400',
    warningBorder: '#E2CF88',
    error: '#B43A4A',
    errorBg: '#FCE2E5',
    errorText: '#8C2534',
    errorBorder: '#EFA6AF',
    info: '#2F6FED',
    infoBg: '#E3EDFD',
    infoText: '#2F6FED',
    infoBorder: '#B5CEFC',
  },

  // ── Danger shorthand ─────────────────────────────────────────────────────
  danger: {
    50: '#FCE2E5',
    500: '#B43A4A',
    600: '#982A39',
  },

  // ── Shadows (Restrained subtle elevation only) ──────────────────────────────
  shadow: {
    card: '0 4px 16px rgba(16, 20, 20, 0.06)',
    soft: '0 2px 8px rgba(16, 20, 20, 0.04)',
    focus: '0 0 0 2px #2F6FED',
    sm: '0 1px 3px rgba(16, 20, 20, 0.04)',
    md: '0 4px 16px rgba(16, 20, 20, 0.06)',
    lg: '0 12px 32px rgba(16, 20, 20, 0.08)',
  },

  // ── Radius (Scene-specific radii) ──────────────────────────────────────────
  radius: {
    none: '0px',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px',
    '2xl': '24px',
    full: '9999px',
  },

  // ── Typography ───────────────────────────────────────────────────────────
  font: {
    base: '"Mona Sans", system-ui, -apple-system, sans-serif',
    display: '"Mona Sans", system-ui, -apple-system, sans-serif',
  },

  // Retired gradients & glows mapped to neutral flat tokens
  gradients: {
    background: '#F7F9F8',
    primaryButton: '#101414',
    primaryButtonHover: '#252D2D',
    progress: '#101414',
    cognitiveBars: '#2F6FED',
    behaviorBars: '#566362',
    page: '#F7F9F8',
  },

  glass: {
    background: '#FFFFFF',
    border: '#DCE4E2',
    backdropBlur: '0px',
  },

  glow: {
    primary: 'none',
    cyan: 'none',
    purple: 'none',
  },

  motion: {
    hoverLift: 'none',
    transition: '0.18s ease-out',
  },

  // Chart shorthand — canonical chart tokens
  chart: {
    primary: '#101414',
    secondary: '#7E8B88',
    signal: '#607900',
    info: '#2F6FED',
    positive: '#18785B',
    warning: '#A45A00',
    risk: '#B43A4A',
    grid: '#E6EBE9',
    track: '#EEF2F1',
    trait1: '#101414',
    trait2: '#566362',
    trait3: '#2F6FED',
    trait4: '#18785B',
    trait5: '#A45A00',
  },
};

// ── Big Five / Neutral dimensional colors ────────────────────────────────────
// Direct continuous measurement without permanent decorative colors
export const traitColors = {
  O: '#101414',
  C: '#101414',
  E: '#101414',
  A: '#101414',
  N: '#101414',
};

// ── Semantic chart color tokens ──────────────────────────────────────────────
export const chartTokens = {
  axis: tokens.text.secondary,
  mutedAxis: tokens.text.muted,
  grid: '#E6EBE9',
  axisLine: '#DCE4E2',
  track: '#EEF2F1',
  primary: '#101414',
  secondary: '#7E8B88',
  signal: '#607900',
  info: '#2F6FED',
  positive: '#18785B',
  warning: '#A45A00',
  risk: '#B43A4A',
  tooltip: {
    background: '#FFFFFF',
    border: '1px solid #DCE4E2',
    text: '#101414',
    shadow: '0 4px 16px rgba(16, 20, 20, 0.08)',
  },

  // OCEAN radar
  ocean: {
    fill: 'rgba(16, 20, 20, 0.06)',
    stroke: '#101414',
    grid: '#DCE4E2',
    label: '#101414',
  },

  // RIASEC neutral relational palette
  riasec: {
    Realistic: '#101414',
    Investigative: '#101414',
    Artistic: '#101414',
    Social: '#101414',
    Enterprising: '#101414',
    Conventional: '#101414',
  },

  // Cognitive
  cognitive: {
    Analytical: '#101414',
    Creative: '#101414',
    Strategic: '#101414',
    Systematic: '#101414',
    Practical: '#101414',
    Abstract: '#101414',
  },

  // Behavior
  behavior: {
    Leadership: '#101414',
    RiskTolerance: '#101414',
    DecisionSpeed: '#101414',
    StressTolerance: '#101414',
    TeamPreference: '#101414',
  },

  // Career match
  career: {
    OverallFit: '#101414',
    PersonalityFit: '#2F6FED',
    SkillFit: '#18785B',
    GrowthPotential: '#A45A00',
    GapRisk: '#B43A4A',
  },

  // Heatmap
  heatmap: {
    low: '#F7F9F8',
    mid: '#B5C4BE',
    high: '#101414',
    text: '#101414',
    border: '#DCE4E2',
  },

  // Analytics trend
  trend: {
    primary: '#101414',
    secondary: '#566362',
    focus: '#2F6FED',
    success: '#18785B',
    warning: '#A45A00',
    danger: '#B43A4A',
    muted: '#DCE4E2',
  },

  // Generic chart palette
  palette: ['#101414', '#566362', '#2F6FED', '#18785B', '#A45A00', '#B43A4A'],
};

export default tokens;
