import styled from 'styled-components';
import { rgba } from 'polished';

import { headingAlt } from '../type/heading';
import { themeVal, stylizeFunction } from '../utils/general';
import { divide } from '../utils/math';

const _rgba = stylizeFunction(rgba);

export const Figure = styled.figure`
  padding: 0;
  margin: 0;
  display: grid;
  grid-gap: ${themeVal('layout.space')};

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  figcaption {
    ${headingAlt}
    color: ${_rgba(themeVal('color.base'), 0.64)};
    font-size: 0.75rem;
    line-height: 1.25rem;
    text-align: center;
    margin-top: -${divide(themeVal('layout.space'), 2)};
  }
`;
