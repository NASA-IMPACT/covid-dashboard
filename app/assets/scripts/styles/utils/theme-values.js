import { rgba } from 'polished';

import { multiply } from './math';
import { themeVal, stylizeFunction } from './general';
import { css } from 'styled-components';

/**
 * Returns the layout.space value form the theme multiplied by the
 * given multiplier.
 *
 * @param {number} m multiplier
 */
export const glsp = (...args) => {
  args = args.length ? args : [1];
  const fns = args.map(m => multiply(themeVal('layout.space'), m));
  const spaces = Array(args.length - 1).fill(' ');
  return css(['', ...spaces, ''], ...fns);
};

/**
 * Polished rgba function but stylized.
 */
export const _rgba = stylizeFunction(rgba);
