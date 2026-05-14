// Design token registry — single source of truth for all semantic colors,
// typography, spacing, shadow, and chart palettes.

const tokens = {
  // ── Surfaces ─────────────────────────────────────────────────────────────
  background: {
    base: '#F8FAFC',
    secondary: '#F1F5F9',
    surface: '#FFFFFF',
    elevated: '#FFFFFF',
    glass: 'rgba(255, 255, 255, 0.80)',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F1F5F9',
    tertiary: '#E0F2FE',
    elevated: '#FFFFFF',
    sidebar: '#F8FAFC',
    header: '#FFFFFF',
    input: '#FFFFFF',
    hover: '#EEF2FF',
    selected: '#E0E7FF',
    disabled: '#E2E8F0',
  },

  // ── Borders ───────────────────────────────────────────────────────────────
  border: {
    subtle: '#E2E8F0',
    default: '#CBD5E1',
    strong: '#94A3B8',
    divider: '#E2E8F0',
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  text: {
    primary: '#0F172A',
    secondary: '#334155',
    muted: '#64748B',
    disabled: '#94A3B8',
    inverse: '#FFFFFF',
    link: '#4F46E5',
  },

  // ── Brand / Action ────────────────────────────────────────────────────────
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
  },
  secondary: {
    50: '#E0F2FE',
    500: '#0EA5E9',
    600: '#0284C7',
  },

  // ── Accent ────────────────────────────────────────────────────────────────
  accent: {
    blue: '#4F46E5',
    blueHover: '#4338CA',
    blueGlow: '#818CF8',
    cyan: '#0EA5E9',
    purple: '#7C3AED',
    amber: '#F59E0B',
    emerald: '#10B981',
    emeraldDark: '#059669',
    orange: '#F97316',
  },

  // ── Status ────────────────────────────────────────────────────────────────
  state: {
    success: '#059669',
    successBg: '#ECFDF5',
    successText: '#047857',
    successBorder: '#A7F3D0',
    warning: '#F59E0B',
    warningBg: '#FFFBEB',
    warningText: '#B45309',
    warningBorder: '#FDE68A',
    error: '#F43F5E',
    errorBg: '#FFF1F2',
    errorText: '#BE123C',
    errorBorder: '#FDA4AF',
    info: '#0EA5E9',
    infoBg: '#E0F2FE',
    infoText: '#0369A1',
    infoBorder: '#BAE6FD',
  },

  // ── Danger shorthand ─────────────────────────────────────────────────────
  danger: {
    50: '#FFF1F2',
    500: '#F43F5E',
    600: '#E11D48',
  },

  // ── Shadows ──────────────────────────────────────────────────────────────
  shadow: {
    card: '0 10px 30px rgba(15, 23, 42, 0.08)',
    soft: '0 4px 14px rgba(15, 23, 42, 0.06)',
    focus: '0 0 0 3px rgba(79, 70, 229, 0.22)',
    sm: '0 1px 4px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.04)',
    md: '0 4px 16px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.05)',
    lg: '0 10px 32px rgba(15, 23, 42, 0.10), 0 4px 12px rgba(15, 23, 42, 0.06)',
  },

  // ── Radius ───────────────────────────────────────────────────────────────
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
  },

  // ── Typography ───────────────────────────────────────────────────────────
  font: {
    base: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
  },

  // ── Gradients ────────────────────────────────────────────────────────────
  gradients: {
    background:
      'radial-gradient(circle at 10% 20%, rgba(79,70,229,0.07), transparent 45%),radial-gradient(circle at 85% 10%, rgba(124,58,237,0.06), transparent 45%),radial-gradient(circle at 50% 90%, rgba(14,165,233,0.05), transparent 45%),#F8FAFC',
    primaryButton: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
    primaryButtonHover: 'linear-gradient(135deg,#4338CA,#6D28D9)',
    progress: 'linear-gradient(90deg, #0EA5E9 0%, #4F46E5 50%, #7C3AED 100%)',
    cognitiveBars: 'linear-gradient(90deg, #4F46E5 0%, #0EA5E9 100%)',
    behaviorBars: 'linear-gradient(90deg, #F59E0B 0%, #10B981 100%)',
    page: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)',
  },

  glass: {
    background: 'rgba(255, 255, 255, 0.80)',
    border: 'rgba(79, 70, 229, 0.10)',
    backdropBlur: '16px',
  },

  glow: {
    primary: '0 0 24px rgba(79,70,229,0.18)',
    cyan: '0 0 24px rgba(14,165,233,0.18)',
    purple: '0 0 24px rgba(124,58,237,0.18)',
  },

  motion: {
    hoverLift: 'translateY(-3px)',
    transition: '0.28s cubic-bezier(.4,0,.2,1)',
  },

  // Legacy chart shorthand — kept for backward-compat with existing chart components
  chart: {
    trait1: '#0EA5E9',
    trait2: '#4F46E5',
    trait3: '#7C3AED',
    trait4: '#059669',
    trait5: '#F59E0B',
  },
};

// ── Big Five / OCEAN per-trait colors ────────────────────────────────────────
export const traitColors = {
  O: '#7C3AED',
  C: '#2563EB',
  E: '#F97316',
  A: '#10B981',
  N: '#0EA5E9',
};

// ── Semantic chart color tokens ──────────────────────────────────────────────
export const chartTokens = {
  axis: tokens.text.secondary,
  mutedAxis: tokens.text.muted,
  grid: '#E2E8F0',
  axisLine: '#CBD5E1',
  tooltip: {
    background: '#FFFFFF',
    border: '1px solid #CBD5E1',
    text: '#0F172A',
    shadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
  },

  // OCEAN radar
  ocean: {
    fill: 'rgba(99, 102, 241, 0.18)',
    stroke: '#4F46E5',
    grid: '#CBD5E1',
    label: '#334155',
  },

  // RIASEC
  riasec: {
    Realistic: '#64748B',
    Investigative: '#2563EB',
    Artistic: '#A855F7',
    Social: '#10B981',
    Enterprising: '#F59E0B',
    Conventional: '#0EA5E9',
  },

  // Cognitive
  cognitive: {
    Analytical: '#2563EB',
    Creative: '#A855F7',
    Strategic: '#4F46E5',
    Systematic: '#0EA5E9',
    Practical: '#10B981',
    Abstract: '#F59E0B',
  },

  // Behavior
  behavior: {
    Leadership: '#F59E0B',
    RiskTolerance: '#F97316',
    DecisionSpeed: '#A855F7',
    StressTolerance: '#0EA5E9',
    TeamPreference: '#10B981',
  },

  // Career match
  career: {
    OverallFit: '#4F46E5',
    PersonalityFit: '#0EA5E9',
    SkillFit: '#10B981',
    GrowthPotential: '#F59E0B',
    GapRisk: '#F43F5E',
  },

  // Heatmap
  heatmap: {
    low: '#E0F2FE',
    mid: '#60A5FA',
    high: '#4F46E5',
    text: '#0F172A',
    border: '#BFDBFE',
  },

  // Analytics trend
  trend: {
    primary: '#4F46E5',
    secondary: '#0EA5E9',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#F43F5E',
    muted: '#94A3B8',
  },

  // Generic chart palette (fallback order)
  palette: ['#4F46E5', '#0EA5E9', '#10B981', '#F59E0B', '#A855F7', '#F97316', '#F43F5E', '#64748B'],
};

export default tokens;
