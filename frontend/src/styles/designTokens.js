/**
 * Central design tokens for JS consumers (charts, inline styles).
 * Aligned with Phase 3B Visual Acceptance token contract.
 */
import tokens, { traitColors, chartTokens } from '../theme/tokens';

export const designTokens = {
  ...tokens,
  traitColors,
  chartTokens,
  radius: {
    none: 0,
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    '2xl': 24,
    pill: 999,
  },
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
  },
};

export default designTokens;
