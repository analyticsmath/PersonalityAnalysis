// Design token registry — single source of truth for all semantic colors,
// typography, spacing, shadow, and chart palettes.
// Phase 3A Evidence Field system.

const tokens = {
  // ── Core Semantic Palette ───────────────────────────────────────────────────
  palette: {
    canvas: '#F4F6F5',
    paper: '#FFFFFF',
    ink: '#111513',
    secondary: '#56605B',
    mist: '#D9DFDC',
    carbon: '#1C201E',
    success: '#1F6B50',
    caution: '#8E5B12',
    error: '#A33A45',
    focus: '#355C7D',
    info: '#355C7D',
  },

  // ── Surfaces ─────────────────────────────────────────────────────────────
  background: {
    base: '#F4F6F5',
    secondary: '#EBEFED',
    surface: '#FFFFFF',
    elevated: '#FFFFFF',
    carbon: '#1C201E',
    glass: 'rgba(255, 255, 255, 0.96)',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F4F6F5',
    tertiary: '#D9DFDC',
    elevated: '#FFFFFF',
    sidebar: '#F4F6F5',
    header: '#F4F6F5',
    input: '#FFFFFF',
    hover: '#ECEFEF',
    selected: '#E2E7E5',
    disabled: '#D9DFDC',
  },

  // ── Borders ───────────────────────────────────────────────────────────────
  border: {
    subtle: '#E5EAE7',
    default: '#D9DFDC',
    strong: '#56605B',
    divider: '#D9DFDC',
    focus: '#355C7D',
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  text: {
    primary: '#111513',
    secondary: '#56605B',
    muted: '#56605B',
    disabled: '#8C9792',
    inverse: '#FFFFFF',
    link: '#111513',
    accent: '#355C7D',
  },

  // ── Action / Interface ────────────────────────────────────────────────────
  action: {
    primaryBg: '#1C201E',
    primaryText: '#FFFFFF',
    primaryHover: '#111513',
    secondaryBg: '#FFFFFF',
    secondaryText: '#111513',
    secondaryBorder: '#D9DFDC',
    secondaryHover: '#F4F6F5',
    ghostHover: '#EBEFED',
  },

  // Legacy mappings for backward compatibility
  primary: {
    50: '#F4F6F5',
    100: '#EBEFED',
    500: '#1C201E',
    600: '#111513',
    700: '#111513',
  },
  secondary: {
    50: '#F4F6F5',
    500: '#56605B',
    600: '#355C7D',
  },

  // ── Accent (Restrained semantic only) ───────────────────────────────────────
  accent: {
    blue: '#355C7D',
    blueHover: '#2A4963',
    blueGlow: 'none',
    cyan: '#355C7D',
    purple: '#56605B',
    amber: '#8E5B12',
    emerald: '#1F6B50',
    emeraldDark: '#1F6B50',
    orange: '#8E5B12',
  },

  // ── Status ────────────────────────────────────────────────────────────────
  state: {
    success: '#1F6B50',
    successBg: '#EFF7F3',
    successText: '#1F6B50',
    successBorder: '#C1E3D4',
    warning: '#8E5B12',
    warningBg: '#FAF5EE',
    warningText: '#8E5B12',
    warningBorder: '#EED9B8',
    error: '#A33A45',
    errorBg: '#FDF2F3',
    errorText: '#A33A45',
    errorBorder: '#F5C2C7',
    info: '#355C7D',
    infoBg: '#F0F5F9',
    infoText: '#355C7D',
    infoBorder: '#C7D9E8',
  },

  // ── Danger shorthand ─────────────────────────────────────────────────────
  danger: {
    50: '#FDF2F3',
    500: '#A33A45',
    600: '#8A2B35',
  },

  // ── Shadows (Restrained subtle elevation only) ──────────────────────────────
  shadow: {
    card: '0 12px 36px rgba(17, 21, 19, 0.08)',
    soft: '0 4px 14px rgba(17, 21, 19, 0.04)',
    focus: '0 0 0 2px #355C7D',
    sm: '0 1px 3px rgba(17, 21, 19, 0.05)',
    md: '0 4px 16px rgba(17, 21, 19, 0.07)',
    lg: '0 12px 36px rgba(17, 21, 19, 0.10)',
  },

  // ── Radius (Editorial restrained radii: 0 - 18px) ─────────────────────────
  radius: {
    none: '0px',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px',
    '2xl': '18px',
    full: '9999px',
  },

  // ── Typography ───────────────────────────────────────────────────────────
  font: {
    base: '"PP Neue Montreal Text", "Instrument Sans", system-ui, sans-serif',
    display: '"PP Neue Montreal", "Instrument Sans", system-ui, sans-serif',
  },

  // Retired gradients & glows mapped to neutral flat tokens
  gradients: {
    background: '#F4F6F5',
    primaryButton: '#1C201E',
    primaryButtonHover: '#111513',
    progress: '#111513',
    cognitiveBars: '#355C7D',
    behaviorBars: '#56605B',
    page: '#F4F6F5',
  },

  glass: {
    background: '#FFFFFF',
    border: '#D9DFDC',
    backdropBlur: '0px',
  },

  glow: {
    primary: 'none',
    cyan: 'none',
    purple: 'none',
  },

  motion: {
    hoverLift: 'none',
    transition: '0.2s ease-out',
  },

  // Chart shorthand — neutral palette
  chart: {
    trait1: '#111513',
    trait2: '#56605B',
    trait3: '#355C7D',
    trait4: '#1F6B50',
    trait5: '#8E5B12',
  },
};

// ── Big Five / Neutral dimensional colors ────────────────────────────────────
// Direct continuous measurement without permanent decorative colors
export const traitColors = {
  O: '#111513',
  C: '#111513',
  E: '#111513',
  A: '#111513',
  N: '#111513',
};

// ── Semantic chart color tokens ──────────────────────────────────────────────
export const chartTokens = {
  axis: tokens.text.secondary,
  mutedAxis: tokens.text.muted,
  grid: '#E5EAE7',
  axisLine: '#D9DFDC',
  tooltip: {
    background: '#FFFFFF',
    border: '1px solid #D9DFDC',
    text: '#111513',
    shadow: '0 8px 24px rgba(17, 21, 19, 0.08)',
  },

  // OCEAN radar
  ocean: {
    fill: 'rgba(17, 21, 19, 0.08)',
    stroke: '#111513',
    grid: '#D9DFDC',
    label: '#111513',
  },

  // RIASEC neutral relational palette
  riasec: {
    Realistic: '#111513',
    Investigative: '#111513',
    Artistic: '#111513',
    Social: '#111513',
    Enterprising: '#111513',
    Conventional: '#111513',
  },

  // Cognitive
  cognitive: {
    Analytical: '#111513',
    Creative: '#111513',
    Strategic: '#111513',
    Systematic: '#111513',
    Practical: '#111513',
    Abstract: '#111513',
  },

  // Behavior
  behavior: {
    Leadership: '#111513',
    RiskTolerance: '#111513',
    DecisionSpeed: '#111513',
    StressTolerance: '#111513',
    TeamPreference: '#111513',
  },

  // Career match
  career: {
    OverallFit: '#111513',
    PersonalityFit: '#355C7D',
    SkillFit: '#1F6B50',
    GrowthPotential: '#8E5B12',
    GapRisk: '#A33A45',
  },

  // Heatmap
  heatmap: {
    low: '#F4F6F5',
    mid: '#B5C4BE',
    high: '#111513',
    text: '#111513',
    border: '#D9DFDC',
  },

  // Analytics trend
  trend: {
    primary: '#111513',
    secondary: '#56605B',
    focus: '#355C7D',
    success: '#1F6B50',
    warning: '#8E5B12',
    danger: '#A33A45',
    muted: '#D9DFDC',
  },

  // Generic chart palette
  palette: ['#111513', '#56605B', '#355C7D', '#1F6B50', '#8E5B12', '#A33A45'],
};

export default tokens;
