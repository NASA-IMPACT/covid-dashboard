import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { visuallyHidden } from './helpers';
import { themeVal, stylizeFunction } from './utils/general';

import { glsp } from './utils/theme-values';

import Constrainer from './constrainer';

const _rgba = stylizeFunction(rgba);

export const Inpage = styled.article`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;

  /**
   * Make Inpage map-centric
   *
   * Vizually hides inpageHeader and sets the grid layout to a single row.
   * The latter is needed so that inpageBody can be displayed in full height.
   */

  ${({ isMapCentric }) => isMapCentric &&
   css`
      grid-template-rows: 1fr;
      ${InpageHeader} {
        ${visuallyHidden()}
      }
    `}
`;

export const InpageHeader = styled.header`
  background: ${themeVal('color.primary')};
  color: ${themeVal('color.baseLight')};
  box-shadow: inset 0 1px 0 0 ${_rgba('#FFFFFF', 0.12)};

  /* Visually hidden */
  ${({ isHidden }) =>
    isHidden &&
    css`
      ${visuallyHidden()}
    `}
`;

export const InpageHeaderInner = styled(Constrainer)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: ${glsp(4)} ${glsp(2)};
  padding-top: ${glsp(4)};
  padding-bottom: ${glsp(4)};
`;

export const InpageHeadline = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 0;
  grid-row: 1;
  grid-column: span 8;

  > *:last-child {
    margin-bottom: 0;
  }
`;

export const InpageToolbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  grid-row: 1;
  grid-column: 9 / span 4;
`;

export const InpageTitle = styled.h1`
  font-size: 3rem;
  line-height: 3.5rem;
  font-weight: ${themeVal('type.base.light')};
  letter-spacing: -0.025em;
  margin: 0 0 0 -0.125rem;
`;

export const InpageSubtitle = styled.p`
  font-size: 1rem;
  font-weight: ${themeVal('type.base.extrabold')};
  line-height: 1;
  text-transform: uppercase;
  order: -1;
`;

export const InpageBody = styled.div`
  background: transparent;
`;

export const InpageBodyInner = styled.div`
  padding: 0 ${glsp(4)} ${glsp(4)} ${glsp(4)} ${glsp(4)};
  max-width: ${themeVal('layout.max')};
`;
