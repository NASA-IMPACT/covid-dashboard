import { rgba } from 'polished';

let color = {
  baseLight: '#FFFFFF',
  baseDark: '#1F1F1F',
  primary: '#6271A4',
  secondary: '#5991A6',
  tertiary: '#CF64CC'
};

color = {
  ...color,
  base: color.baseDark,
  background: color.baseLight,
  surface: color.baseLight,
  mist: rgba(color.baseDark, 0.04),
  shadow: rgba(color.baseDark, 0.08),
  smoke: rgba(color.baseDark, 0.16),
  glimmer: rgba(color.baseLight, 0.04),
  spark: rgba(color.baseLight, 0.08),
  glow: rgba(color.baseLight, 0.16),
  link: color.primary,
  danger: '#C0392B',
  success: '#4CB5AE',
  warning: '#F39C12',
  info: '#2980B9'
};

color = {
  ...color,
  baseAlphaA: rgba(color.base, 0.04),
  baseAlphaB: rgba(color.base, 0.08),
  baseAlphaC: rgba(color.base, 0.16),
  baseAlphaD: rgba(color.base, 0.32),
  silk: `radial-gradient(farthest-side, ${color.surface}, ${rgba(
    color.surface,
    0.64
  )})`
};

const type = {
  base: {
    root: '16px',
    size: '1rem',
    line: '1.5',
    color: color.base,
    family: '"Barlow", sans-serif',
    style: 'normal',
    weight: 300,
    light: 300,
    regular: 400,
    medium: 400,
    semibold: 600,
    bold: 700,
    antialiasing: true
  },
  heading: {
    family: '"Barlow", sans-serif',
    style: 'normal',
    weight: 600,
    light: 300,
    regular: 400,
    medium: 400,
    semibold: 600,
    bold: 700
  }
};

const shape = {
  rounded: '0.25rem',
  ellipsoid: '320rem'
};

const layout = {
  space: '1rem',
  border: '1px',
  min: '320px',
  max: '1280px'
};

export default {
  main: {
    layout,
    color,
    type,
    shape
  }
};

/**
 * Media query ranges used by the media utility.
 * They're not exported with the main theme because the utility does not
 * build the media functions in runtime, needing the values beforehand.
 */
export const mediaRanges = {
  xsmall: [null, 543],
  small: [544, 767],
  medium: [768, 1023],
  large: [1024, 1399],
  xlarge: [1400, null]
};
