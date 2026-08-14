import tokens, { traitColors } from './tokens';

// Gradients are retired in Phase 3A; flat semantic styles are exported for backward compatibility.
const gradients = {
  primary: tokens.palette.carbon,
  secondary: tokens.palette.ink,
  background: tokens.palette.canvas,
  card: tokens.palette.paper,
  progress: tokens.palette.carbon,
};

export const traitGradients = {
  O: traitColors.O,
  C: traitColors.C,
  E: traitColors.E,
  A: traitColors.A,
  N: traitColors.N,
};

export default gradients;
