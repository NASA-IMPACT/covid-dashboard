import React from 'react';
import styled, { css } from 'styled-components';
import { PropTypes as T } from 'prop-types';

import { themeVal } from '../../../styles/utils/general';
import { glsp } from '../../../styles/utils/theme-values';

const POPOVER_SHOW_HIDE_ANIM_TIME = 240;

const easeOutBack = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
const easeInBack = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

const popoverAnim = css`
  &.pop-chart-appear,
  &.pop-chart-enter {
    transition: transform ${POPOVER_SHOW_HIDE_ANIM_TIME}ms ${easeOutBack}, opacity ${POPOVER_SHOW_HIDE_ANIM_TIME}ms ease-in-out;
    transform: scale(0);
    opacity: 0;
  }

  &.pop-chart-appear-active,
  &.pop-chart-enter-active {
    transform: scale(1);
    opacity: 1;
  }

  &.pop-chart-exit {
    transition: transform ${POPOVER_SHOW_HIDE_ANIM_TIME}ms ${easeInBack}, opacity ${POPOVER_SHOW_HIDE_ANIM_TIME}ms ease-in-out;
    transform: scale(1);
    opacity: 1;
  }

  &.pop-chart-exit-active {
    transform: scale(0);
    opacity: 0;
  }
`;

const PopoverPositioner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
  transform-origin: 0;

  ${popoverAnim}
`;

const PopoverSelf = styled.article`
  border-radius: ${themeVal('shape.rounded')};
  background-color: ${themeVal('color.surface')};
  box-shadow: 0 0 8px 0 ${themeVal('color.baseAlphaC')};
  padding: ${glsp(0.25, 0.5)};
  transform: translate(-50%, -100%);
  margin-top: -0.5rem;
  white-space: nowrap;

  ${({ direction }) => direction === 'left' && css`
    transform: translate(-100%, -100%);
  `}
  ${({ direction }) => direction === 'right' && css`
    transform: translate(0, -100%);
  `}
`;

export default function Popover ({
  children,
  style,
  ...rest
}) {
  return (
    <PopoverPositioner style={style}>
      <PopoverSelf {...rest}>
        {children}
      </PopoverSelf>
    </PopoverPositioner>
  );
}

Popover.propTypes = {
  children: T.node,
  style: T.object
};
