// Design token registry — Phase 3C Production System
// Mineral / Chromaless Editorial token system

const tokens = {
  // ── Core Semantic Palette ───────────────────────────────────────────────────
  palette: {
    canvas: '#F6F8F7',
    paper: '#FFFFFF',
    ink: '#101313',
    inkDense: '#2B3230',
    secondary: '#596360',
    mist: '#DDE3E1',
    softField: '#EEF2F0',

    darkScene: '#101615',
    darkSceneFg: '#F6F8F7',
    darkSceneMuted: '#BBC4C1',

    info: '#315E8A',
    success: '#1E6B50',
    warning: '#9A630F',
    error: '#A33A45',
    focus: '#285FD0',
  },

  accent: {
    primary: '#101313',
    blue: '#315E8A',
    blueGlow: '#315E8A',
    cyan: '#315E8A',
    teal: '#1E6B50',
    purple: '#315E8A',
    orange: '#9A630F',
    amber: '#9A630F',
    emerald: '#1E6B50',
    rose: '#A33A45',
  },

  // ── Surfaces ─────────────────────────────────────────────────────────────
  background: {
    base: '#F6F8F7',
    secondary: '#EEF2F0',
    surface: '#FFFFFF',
    elevated: '#FFFFFF',
    darkScene: '#101615',
    glass: 'rgba(255, 255, 255, 0.98)',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F6F8F7',
    tertiary: '#EEF2F0',
    elevated: '#FFFFFF',
    sidebar: '#F6F8F7',
    header: '#F6F8F7',
    input: '#FFFFFF',
    hover: '#EEF2F0',
    selected: '#E4ECE9',
    disabled: '#DDE3E1',
  },

  // ── Borders ───────────────────────────────────────────────────────────────
  border: {
    subtle: '#E6EBE9',
    default: '#DDE3E1',
    strong: '#596360',
    divider: '#DDE3E1',
    focus: '#285FD0',
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  text: {
    primary: '#101313',
    secondary: '#596360',
    muted: '#596360',
    disabled: '#8C9792',
    inverse: '#F6F8F7',
    link: '#101313',
    accent: '#315E8A',
  },

  // ── Action / Interface ────────────────────────────────────────────────────
  action: {
    primaryBg: '#101313',
    primaryText: '#FFFFFF',
    primaryHover: '#2B3230',
    secondaryBg: '#FFFFFF',
    secondaryText: '#101313',
    secondaryBorder: '#DDE3E1',
    secondaryHover: '#EEF2F0',
    ghostHover: '#EEF2F0',
  },

  // ── Status ────────────────────────────────────────────────────────────────
  state: {
    success: '#1E6B50',
    successBg: '#DEEFEA',
    successText: '#1E6B50',
    successBorder: '#A9D9C9',
    warning: '#9A630F',
    warningBg: '#F7EECD',
    warningText: '#784400',
    warningBorder: '#E2CF88',
    error: '#A33A45',
    errorBg: '#FCE2E5',
    errorText: '#8C2534',
    errorBorder: '#EFA6AF',
    info: '#315E8A',
    infoBg: '#E3EDFD',
    infoText: '#315E8A',
    infoBorder: '#B5CEFC',
  },

  // ── Shadows (Restrained elevation) ──────────────────────────────────────
  shadow: {
    card: '0 4px 16px rgba(16, 19, 19, 0.04)',
    soft: '0 1px 3px rgba(16, 19, 19, 0.04)',
    focus: '0 0 0 2px #285FD0',
    sm: '0 1px 3px rgba(16, 19, 19, 0.04)',
    md: '0 4px 16px rgba(16, 19, 19, 0.04)',
    lg: '0 12px 32px rgba(16, 19, 19, 0.06)',
  },

  // ── Radius (Restrained consistent radii) ─────────────────────────────────
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

  // Chart shorthand — canonical chart tokens
  chart: {
    primary: '#101313',
    secondary: '#596360',
    info: '#315E8A',
    positive: '#1E6B50',
    warning: '#9A630F',
    risk: '#A33A45',
    grid: '#DDE3E1',
    track: '#EEF2F0',
    trait1: '#101313',
    trait2: '#596360',
    trait3: '#315E8A',
    trait4: '#1E6B50',
    trait5: '#9A630F',
  },
};

// ── Big Five / Neutral dimensional colors ────────────────────────────────────
export const traitColors = {
  O: '#101313',
  C: '#101313',
  E: '#101313',
  A: '#101313',
  N: '#101313',
};

// ── Semantic chart color tokens ──────────────────────────────────────────────
export const chartTokens = {
  axis: tokens.text.secondary,
  mutedAxis: tokens.text.muted,
  grid: '#DDE3E1',
  axisLine: '#DDE3E1',
  track: '#EEF2F0',
  primary: '#101313',
  secondary: '#596360',
  info: '#315E8A',
  positive: '#1E6B50',
  warning: '#9A630F',
  risk: '#A33A45',
  tooltip: {
    background: '#FFFFFF',
    border: '1px solid #DDE3E1',
    text: '#101313',
    shadow: '0 4px 16px rgba(16, 19, 19, 0.08)',
  },

  ocean: {
    fill: 'rgba(16, 19, 19, 0.06)',
    stroke: '#101313',
    grid: '#DDE3E1',
    label: '#101313',
  },

  riasec: {
    Realistic: '#101313',
    Investigative: '#101313',
    Artistic: '#101313',
    Social: '#101313',
    Enterprising: '#101313',
    Conventional: '#101313',
  },

  cognitive: {
    Analytical: '#101313',
    Creative: '#101313',
    Strategic: '#101313',
    Systematic: '#101313',
    Practical: '#101313',
    Abstract: '#101313',
  },

  behavior: {
    Leadership: '#101313',
    RiskTolerance: '#101313',
    DecisionSpeed: '#101313',
    StressTolerance: '#101313',
    TeamPreference: '#101313',
  },

  career: {
    OverallFit: '#101313',
    PersonalityFit: '#315E8A',
    SkillFit: '#1E6B50',
    GrowthPotential: '#9A630F',
    GapRisk: '#A33A45',
  },

  heatmap: {
    low: '#F6F8F7',
    mid: '#BBC4C1',
    high: '#101313',
    text: '#101313',
    border: '#DDE3E1',
  },

  trend: {
    primary: '#101313',
    secondary: '#596360',
    focus: '#315E8A',
    success: '#1E6B50',
    warning: '#9A630F',
    danger: '#A33A45',
    muted: '#DDE3E1',
  },

  palette: ['#101313', '#596360', '#315E8A', '#1E6B50', '#9A630F', '#A33A45'],
};

export default tokens;
