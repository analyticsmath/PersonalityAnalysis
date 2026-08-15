// Design token registry — Phase 4 Production System
// Neutral Gallery + Media Color token system

const tokens = {
  // ── Core Semantic Palette (Phase 4 Contract Section 8) ──────────────────────
  palette: {
    bg: '#FFFFFF',
    bgSoft: '#F4F5F6',
    surface: '#ECEFF1',
    ink: '#0B0B0B',
    ink2: '#171717',
    text: '#4F5358',
    muted: '#767B81',
    rule: '#D9DDE1',

    dark: '#0B0B0B',
    darkText: '#F7F7F5',
    darkMuted: '#B7BBC0',

    info: '#2F5D91',
    success: '#15704E',
    warning: '#94610C',
    error: '#A33A45',
    focus: '#245BD6',

    // Backward compatibility aliases
    canvas: '#FFFFFF',
    paper: '#FFFFFF',
    inkDense: '#171717',
    secondary: '#4F5358',
    mist: '#D9DDE1',
    softField: '#F4F5F6',
    darkScene: '#0B0B0B',
    darkSceneFg: '#F7F7F5',
    darkSceneMuted: '#B7BBC0',
  },

  accent: {
    primary: '#0B0B0B',
    blue: '#2F5D91',
    blueGlow: '#2F5D91',
    cyan: '#2F5D91',
    teal: '#15704E',
    purple: '#2F5D91',
    orange: '#94610C',
    amber: '#94610C',
    emerald: '#15704E',
    rose: '#A33A45',
  },

  // ── Surfaces ─────────────────────────────────────────────────────────────
  background: {
    base: '#FFFFFF',
    secondary: '#F4F5F6',
    surface: '#ECEFF1',
    elevated: '#FFFFFF',
    darkScene: '#0B0B0B',
    glass: 'rgba(255, 255, 255, 0.98)',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F4F5F6',
    tertiary: '#ECEFF1',
    elevated: '#FFFFFF',
    sidebar: '#0B0B0B',
    header: '#FFFFFF',
    input: '#FFFFFF',
    hover: '#F4F5F6',
    selected: '#ECEFF1',
    disabled: '#D9DDE1',
  },

  // ── Borders ───────────────────────────────────────────────────────────────
  border: {
    subtle: '#ECEFF1',
    default: '#D9DDE1',
    strong: '#4F5358',
    divider: '#D9DDE1',
    focus: '#245BD6',
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  text: {
    primary: '#0B0B0B',
    secondary: '#4F5358',
    muted: '#767B81',
    disabled: '#B7BBC0',
    inverse: '#F7F7F5',
    link: '#0B0B0B',
    accent: '#2F5D91',
  },

  // ── Action / Interface ────────────────────────────────────────────────────
  action: {
    primaryBg: '#0B0B0B',
    primaryText: '#FFFFFF',
    primaryHover: '#171717',
    secondaryBg: '#FFFFFF',
    secondaryText: '#0B0B0B',
    secondaryBorder: '#D9DDE1',
    secondaryHover: '#F4F5F6',
    ghostHover: '#F4F5F6',
  },

  // ── Status ────────────────────────────────────────────────────────────────
  state: {
    success: '#15704E',
    successBg: '#E8F5EE',
    successText: '#15704E',
    successBorder: '#B1DFC9',
    warning: '#94610C',
    warningBg: '#FEF8EA',
    warningText: '#7B4F07',
    warningBorder: '#E6D3A0',
    error: '#A33A45',
    errorBg: '#FDF0F1',
    errorText: '#862B34',
    errorBorder: '#F2B8BD',
    info: '#2F5D91',
    infoBg: '#EDF3FA',
    infoText: '#2F5D91',
    infoBorder: '#BDD2EA',
  },

  // ── Shadows (Restrained spatial elevation) ─────────────────────────────────
  shadow: {
    card: '0 2px 10px rgba(11, 11, 11, 0.04)',
    soft: '0 1px 3px rgba(11, 11, 11, 0.03)',
    focus: '0 0 0 2px #245BD6',
    sm: '0 1px 3px rgba(11, 11, 11, 0.03)',
    md: '0 4px 16px rgba(11, 11, 11, 0.04)',
    lg: '0 12px 32px rgba(11, 11, 11, 0.06)',
  },

  // ── Radius (Phase 4 Contract Section 9) ────────────────────────────────────
  radius: {
    none: '0px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '14px',
    '2xl': '18px',
    full: '9999px',
  },

  // ── Typography (Phase 4: Source Sans 3 Variable + Source Serif 4 Variable) ──
  font: {
    base: '"Source Sans 3 Variable", "Source Sans 3", system-ui, -apple-system, sans-serif',
    display: '"Source Sans 3 Variable", "Source Sans 3", system-ui, -apple-system, sans-serif',
    serif: '"Source Serif 4 Variable", "Source Serif 4", Georgia, serif',
  },

  // Chart shorthand — canonical chart tokens
  chart: {
    primary: '#0B0B0B',
    secondary: '#4F5358',
    info: '#2F5D91',
    positive: '#15704E',
    warning: '#94610C',
    risk: '#A33A45',
    grid: '#D9DDE1',
    track: '#F4F5F6',
    trait1: '#0B0B0B',
    trait2: '#4F5358',
    trait3: '#2F5D91',
    trait4: '#15704E',
    trait5: '#94610C',
  },
};

// ── Big Five / Neutral dimensional colors ────────────────────────────────────
export const traitColors = {
  O: '#0B0B0B',
  C: '#0B0B0B',
  E: '#0B0B0B',
  A: '#0B0B0B',
  N: '#0B0B0B',
};

// ── Semantic chart color tokens ──────────────────────────────────────────────
export const chartTokens = {
  axis: tokens.text.secondary,
  mutedAxis: tokens.text.muted,
  grid: '#D9DDE1',
  axisLine: '#D9DDE1',
  track: '#F4F5F6',
  primary: '#0B0B0B',
  secondary: '#4F5358',
  info: '#2F5D91',
  positive: '#15704E',
  warning: '#94610C',
  risk: '#A33A45',
  tooltip: {
    background: '#FFFFFF',
    border: '1px solid #D9DDE1',
    text: '#0B0B0B',
    shadow: '0 4px 16px rgba(11, 11, 11, 0.08)',
  },

  ocean: {
    fill: 'rgba(11, 11, 11, 0.05)',
    stroke: '#0B0B0B',
    grid: '#D9DDE1',
    label: '#0B0B0B',
  },

  riasec: {
    Realistic: '#0B0B0B',
    Investigative: '#0B0B0B',
    Artistic: '#0B0B0B',
    Social: '#0B0B0B',
    Enterprising: '#0B0B0B',
    Conventional: '#0B0B0B',
  },

  cognitive: {
    Analytical: '#0B0B0B',
    Creative: '#0B0B0B',
    Strategic: '#0B0B0B',
    Systematic: '#0B0B0B',
    Practical: '#0B0B0B',
    Abstract: '#0B0B0B',
  },

  behavior: {
    Leadership: '#0B0B0B',
    RiskTolerance: '#0B0B0B',
    DecisionSpeed: '#0B0B0B',
    StressTolerance: '#0B0B0B',
    TeamPreference: '#0B0B0B',
  },

  career: {
    OverallFit: '#0B0B0B',
    PersonalityFit: '#2F5D91',
    SkillFit: '#15704E',
    GrowthPotential: '#94610C',
    GapRisk: '#A33A45',
  },

  heatmap: {
    low: '#FFFFFF',
    mid: '#B7BBC0',
    high: '#0B0B0B',
    text: '#0B0B0B',
    border: '#D9DDE1',
  },

  trend: {
    primary: '#0B0B0B',
    secondary: '#4F5358',
    focus: '#2F5D91',
    success: '#15704E',
    warning: '#94610C',
    danger: '#A33A45',
    muted: '#D9DDE1',
  },

  palette: ['#0B0B0B', '#4F5358', '#2F5D91', '#15704E', '#94610C', '#A33A45'],
};

export default tokens;
