import styled, { css } from 'styled-components';
import { rgba, tint } from 'polished';

import { themeVal, stylizeFunction } from './utils/general';
import { divide, multiply } from './utils/math';
import { headingAlt } from './type/heading';

const _rgba = stylizeFunction(rgba);
const _tint = stylizeFunction(tint);

export const Fold = styled.section`
  padding: 0 ${multiply(themeVal('layout.space'), 4)};
  background: ${_tint(0.96, themeVal('color.primary'))};
`;

export const FoldHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  padding: ${multiply(themeVal('layout.space'), 2)} 0;
  z-index: 10;
  transition: padding-top 0.24s ease-in-out 0s, padding-bottom 0.24s ease-in-out 0s;

  /* isSticky */
  ${({ isSticky }) => isSticky &&
    css`
      padding: ${themeVal('layout.space')} ${multiply(themeVal('layout.space'), 4)};
      margin-left: -4rem;
      width: calc(100% - 4rem) !important;
      ${() => CSS.supports('backdrop-filter', 'blur(0.5rem)')
        ? css`
          background: ${_rgba(_tint(0.96, themeVal('color.primary')), 0.48)};
          backdrop-filter: blur(0.5rem);
        ` : css`
          background: ${_rgba(_tint(0.96, themeVal('color.primary')), 0.80)};
        `
      }
    `}
`;

export const FoldHeadline = styled.div`
  > *:last-child {
    margin-bottom: 0;
  }
`;

export const FoldBody = styled.div`
  padding: 0 0 ${multiply(themeVal('layout.space'), 4)} 0;
`;

export const FoldToolbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-left: ${multiply(themeVal('layout.space'), 2)};
  margin-left: auto;
`;

export const FoldToolbarLabel = styled.h3`
  ${headingAlt}
  color: ${_rgba(themeVal('color.base'), 0.64)};
  font-size: 1rem;
  line-height: 2rem;
  margin-right: ${divide(themeVal('layout.space'), 2)};
`;
