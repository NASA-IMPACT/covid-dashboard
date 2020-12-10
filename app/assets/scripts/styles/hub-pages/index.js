import styled from 'styled-components';

import { rgba, darken } from 'polished';

import { NavLink } from 'react-router-dom';
import Constrainer from '../constrainer';
import Prose from '../type/prose';

import { glsp } from '../utils/theme-values';
import { themeVal, stylizeFunction } from '../utils/general';
import media from '../utils/media-queries';
import { Fold } from '../fold';

const _rgba = stylizeFunction(rgba);
const _darken = stylizeFunction(darken);

export const PageConstrainer = styled(Constrainer)`
  ${Prose} {
    max-width: 50rem;
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;

export const HubFold = styled(Fold)`
  display: grid;
  grid-gap: ${glsp()};
  padding: 0;

  ${media.mediumUp`
    grid-gap: ${glsp(2)};
    padding: ${glsp(0, 0, 1, 0)};
  `}
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

export const EntryNavLinkMedia = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  margin: 0;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    content: '';
    background: ${_darken(0.24, _rgba(themeVal('color.link'), 0.64))};
    pointer-events: none;
  }

  img {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const EntryNavLink = styled(NavLink)`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  position: relative;
  padding: ${glsp()};
  border-radius: ${themeVal('shape.rounded')};
  overflow: hidden;
  font-size: 1rem;
  line-height: 1.5rem;
  transition: all 0.16s ease 0s;
  min-height: 8rem;
  background: ${themeVal('color.link')};

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

export const EntryNavLinkInfo = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  font-size: 0.875rem;

  > *:not(:last-child) {
    margin-right: ${glsp()};    
  }
`;
