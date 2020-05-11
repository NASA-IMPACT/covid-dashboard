import styled from 'styled-components';
import { themeVal } from './utils/general';
import { multiply } from './utils/math';

const Constrainer = styled.div`
  padding: ${themeVal('layout.space')} ${multiply(themeVal('layout.space'), 2)};
  margin: 0 auto;
  max-width: ${themeVal('layout.max')};
`;

export default Constrainer;
