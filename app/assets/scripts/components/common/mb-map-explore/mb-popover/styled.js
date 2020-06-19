import styled, { css } from 'styled-components';

import { themeVal } from '../../../../styles/utils/general';
import { glsp } from '../../../../styles/utils/theme-values';
import { headingAlt } from '../../../../styles/type/heading';

export const POPOVER_SHOW_HIDE_ANIM_TIME = 240;

const applyBorderStyles = () => ({ anchor }) => {
  return {
    'top-left': css`
      border-top-left-radius: 0;
    `,
    'top-right': css`
      border-top-right-radius: 0;
    `,
    'bottom-left': css`
      border-bottom-left-radius: 0;
    `,
    'bottom-right': css`
      border-bottom-right-radius: 0;
    `
  }[anchor];
};

const applyAnchorStyles = () => ({ anchor }) => {
  const centerClip = 'clip-path: polygon(50% 0, 0% 100%, 100% 100%);';
  const cornerClip = 'clip-path: polygon(0 0, 0% 100%, 100% 100%);';

  if (anchor === 'top' || anchor === 'bottom') {
    const common = css`
      ${centerClip}
      left: 50%;
      width: 1.5rem;
      height: 0.75rem;
    `;
    if (anchor === 'top') {
      return css`
        ${common}
        top: -0.75rem;
        transform: translate(-50%, 0);
      `;
    }
    if (anchor === 'bottom') {
      return css`
        ${common}
        bottom: -0.75rem;
        transform: scaleY(-1) translate(-50%, 0);
      `;
    }
  } else {
    const common = css`
      ${cornerClip}
      width: 0.75rem;
      height: 0.75rem;
    `;

    if (anchor === 'top-left') {
      return css`
        ${common}
        top: -0.75rem;
        left: 0;
      `;
    }
    if (anchor === 'top-right') {
      return css`
        ${common}
        top: -0.75rem;
        right: 0;
        transform: scaleX(-1);
      `;
    }
    if (anchor === 'bottom-left') {
      return css`
        ${common}
        bottom: -0.75rem;
        left: 0;
        transform: scaleY(-1);
      `;
    }
    if (anchor === 'bottom-right') {
      return css`
        ${common}
        bottom: -0.75rem;
        right: 0;
        transform: scaleX(-1) scaleY(-1);
      `;
    }
  }
};

export const getAnchorTranslate = pos =>
  ({
    center: 'translate(-50%,-50%)',
    top: 'translate(-50%,0)',
    'top-left': 'translate(0,0)',
    'top-right': 'translate(-100%,0)',
    bottom: 'translate(-50%,-100%)',
    'bottom-left': 'translate(0,-100%)',
    'bottom-right': 'translate(-100%,-100%)',
    left: 'translate(0,-50%)',
    right: 'translate(-100%,-50%)'
  }[pos]);

const getTransition = (isShowing) => {
  const easing = isShowing
    ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' // easeOutBack
    : 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'; // easeInBack
  return css`
    transition: transform ${POPOVER_SHOW_HIDE_ANIM_TIME}ms ${easing}, opacity ${POPOVER_SHOW_HIDE_ANIM_TIME}ms ease-in-out;
  `;
};

export const Popover = styled.article`
  width: 16rem;
  padding: 0.75rem 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
`;

export const PopoverContents = styled.div`
  border-radius: ${themeVal('shape.rounded')};
  background: ${themeVal('color.surface')};
  box-shadow: 0 0 32px 2px ${themeVal('color.baseAlphaA')}, 0 16px 48px -16px ${themeVal('color.baseAlphaB')};
  padding: ${glsp()};
  transform: scale(1);
  transform-origin: center ${({ verticalAttachment: va }) => va === 'top' ? 'top' : 'bottom'};

  ${applyBorderStyles()}

  &::before {
    content: '';
    position: absolute;
    background: #fff;

    ${applyAnchorStyles()}
  }

  > *:last-child {
    margin-bottom: 0;
  }

  .popover-gl-enter & {
    ${getTransition(true)}
    transform: scale(0);
    opacity: 0;
  }

  .popover-gl-enter-active & {
    transform: scale(1);
    opacity: 1;
  }

  .popover-gl-exit & {
    ${getTransition(false)}
    transform: scale(1);
    opacity: 1;
  }

  .popover-gl-exit-active & {
    transform: scale(0);
    opacity: 0;
  }
`;

export const PopoverHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  margin-bottom: ${glsp()};
`;

export const PopoverHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;

  h1 {
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin: 0;
  }
`;

export const PopoverSubtitle = styled.p`
  order: ${({ isSup }) => isSup ? -1 : 1};
  ${headingAlt()}
`;

export const PopoverToolbar = styled.div`
  margin-left: auto;
  display: flex;
  align-items: flex-start;
  padding: ${glsp(1 / 8)} 0 ${glsp(1 / 8)} ${glsp()};
`;

export const PopoverBody = styled.div`
  margin-bottom: ${glsp()};

  > *:not(:last-child) {
    margin-bottom: ${glsp()};
  }
`;

export const PopoverFooter = styled.footer`
  > *:not(:last-child) {
    margin-bottom: ${glsp()};
  }
`;
