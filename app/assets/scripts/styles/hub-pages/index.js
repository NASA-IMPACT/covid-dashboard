import styled from 'styled-components';

import { rgba } from 'polished';

import { NavLink } from 'react-router-dom';
import Constrainer from '../constrainer';
import Prose from '../type/prose';

import { glsp } from '../utils/theme-values';
import { themeVal, stylizeFunction } from '../utils/general';
import media from '../utils/media-queries';

const _rgba = stylizeFunction(rgba);

export const PageConstrainer = styled(Constrainer)`
  ${Prose} {
    max-width: 50rem;
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;

export const EntriesList = styled.ul`
  display: grid;
  grid-gap: ${glsp()};
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-auto-rows: auto;

  ${media.mediumUp`
    grid-gap: ${glsp(2)};
  `}
`;

export const EntryNavLink = styled(NavLink)`
  display: flex;
  position: relative;
  padding: ${glsp()};
  border-radius: ${themeVal('shape.rounded')};
  overflow: hidden;
  font-size: 1rem;
  line-height: 1.5rem;
  transition: all 0.16s ease 0s;
  min-height: 8rem;
  align-items: flex-end;
  background: ${themeVal('color.baseAlphaD')};

  ${media.mediumUp`
    min-height: 10rem;
  `}

  ${media.largeUp`
    font-size: 1.25rem;
    line-height: 1.75rem;
  `}

  &,
  &:visited {
    color: ${themeVal('color.surface')};
  }

  &:hover {
    opacity: 1;
  }

  img {
    transition: all 0.32s ease 0s;

    &:hover {
      transform: scale(1.125);
    }
  }
`;

export const EntryNavLinkTitle = styled.strong`
  position: relative;
  z-index: 2;
`;

export const EntryNavLinkMedia = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  margin: 0;

  img {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    content: '';
    background: ${_rgba(themeVal('color.base'), 0.64)};
    pointer-events: none;
  }
`;
