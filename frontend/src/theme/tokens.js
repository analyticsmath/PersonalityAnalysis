const tokens = {
  background: {
    base: '#F8FAFC',
    secondary: '#F1F5F9',
    surface: '#FFFFFF',
    elevated: '#FFFFFF',
    glass: 'rgba(255, 255, 255, 0.80)',
  },
  text: {
    primary: '#0F172A',
    secondary: '#334155',
    muted: '#64748B',
    disabled: '#94A3B8',
  },
  accent: {
    blue: '#4F46E5',
    blueHover: '#3730A3',
    blueGlow: '#818CF8',
    cyan: '#0EA5E9',
    purple: '#7C3AED',
    amber: '#D97706',
  },
  state: {
    success: '#059669',
    error: '#DC2626',
  },
  chart: {
    trait1: '#0EA5E9',
    trait2: '#4F46E5',
    trait3: '#7C3AED',
    trait4: '#059669',
    trait5: '#D97706',
  },
  gradients: {
    background:
      'radial-gradient(circle at 10% 20%, rgba(79,70,229,0.07), transparent 45%),radial-gradient(circle at 85% 10%, rgba(124,58,237,0.06), transparent 45%),radial-gradient(circle at 50% 90%, rgba(14,165,233,0.05), transparent 45%),#F8FAFC',
    primaryButton: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
    primaryButtonHover: 'linear-gradient(135deg,#3730A3,#6D28D9)',
    progress: 'linear-gradient(90deg, #0EA5E9 0%, #4F46E5 50%, #7C3AED 100%)',
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
};

export const traitColors = {
  O: tokens.accent.purple,
  C: tokens.accent.blue,
  E: tokens.accent.amber,
  A: tokens.state.success,
  N: tokens.state.error,
};

export const chartTokens = {
  axis: tokens.text.secondary,
  mutedAxis: tokens.text.muted,
  grid: 'rgba(15, 23, 42, 0.08)',
  axisLine: 'rgba(15, 23, 42, 0.12)',
  tooltip: {
    background: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(79, 70, 229, 0.25)',
    text: '#F8FAFC',
  },
};

export default tokens;
