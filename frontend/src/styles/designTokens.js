/**
 * Central design tokens for JS consumers (charts, inline styles).
 * CSS variables live in styles/theme.css — keep numeric hex/rgba here aligned with :root.
 */
import tokens from '../theme/tokens';

export const designTokens = {
  ...tokens,
  radius: {
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
    pill: 999,
  },
  space: {
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
  },
};

export default designTokens;
