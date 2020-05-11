import styled from 'styled-components';

import { themeVal } from '../utils/general';
import { multiply } from '../utils/math';

export const CardList = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-auto-rows: auto;
  grid-gap: ${multiply(themeVal('layout.space'), 2)};
`;
