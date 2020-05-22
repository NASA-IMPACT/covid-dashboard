import { css } from 'styled-components';
import { themeVal } from '../utils/general';
import { antialiased } from '../helpers';
import { glsp } from '../utils/theme-values';

export default () => css`
  /* Overrides for react-tooltip styles. */

  .__react_component_tooltip {
    ${antialiased()}
    border-radius: ${themeVal('shape.rounded')};
    font-size: 0.875rem;
    line-height: 1.25rem;
    max-width: 16rem;
    padding: ${glsp(0.5, 1)};

    &.type-primary {
      background: ${themeVal('color.base')};
      color: #fff;
      ${['top', 'bottom', 'left', 'right'].map(dir => css`
        &.place-${dir}::after {
          border-${dir}-color: ${themeVal('color.base')};
        }
        &.place-${dir}::before {
          border-${dir}: 0.5rem solid ${themeVal('color.base')};
        }
      `)}
    }
  }
`;
