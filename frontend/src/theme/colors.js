import tokens, { traitColors, chartTokens } from './tokens';

const colors = {
  canvas: tokens.palette.canvas,
  paper: tokens.palette.paper,
  ink: tokens.palette.ink,
  secondary: tokens.palette.secondary,
  mist: tokens.palette.mist,
  softField: tokens.palette.softField,
  darkScene: tokens.palette.darkScene,
  darkSceneFg: tokens.palette.darkSceneFg,
  darkSceneMuted: tokens.palette.darkSceneMuted,
  signal: tokens.palette.signal,
  signalStrong: tokens.palette.signalStrong,
  success: tokens.palette.success,
  warning: tokens.palette.warning,
  error: tokens.palette.error,
  info: tokens.palette.info,
  focus: tokens.palette.focus,
  background: tokens.background,
  text: tokens.text,
  border: tokens.border,
  primary: tokens.palette.ink,
  primaryStrong: tokens.palette.ink,
  accent: tokens.palette.signal,
  chart: chartTokens,
};

export { traitColors, chartTokens };
export default colors;
