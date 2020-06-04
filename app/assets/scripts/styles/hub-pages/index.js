import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Constrainer from '../constrainer';
import Prose from '../type/prose';

import { glsp } from '../utils/theme-values';
import { themeVal } from '../utils/general';

export const EntryNavLink = styled(NavLink)`
  position: relative;
  display: block;
  padding: ${glsp()};
  font-size: 1rem;
  line-height: 1.25rem;
  transition: all 0.16s ease 0s;
  box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaB')};
  border-radius: ${themeVal('shape.rounded')};

  &,
  &:visited {
    color: inherit;
  }

  &:hover {
    background: ${themeVal('color.baseAlphaA')};
    box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaC')};
    opacity: 1;
  }

  &:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${glsp(0.125)};
    content: '';
    background: ${themeVal('color.baseLight')};
    opacity: 0;
    transition: all 0.16s ease 0s;
  }

  &.active,
  &.active:hover {
    background: rgba(255, 255, 255, 0.04);
    font-weight: bold;

    &:after {
      opacity: 1;
    }
  }
`;

export const PageConstrainer = styled(Constrainer)`
  padding-top: ${glsp(4)};
  padding-bottom: ${glsp(4)};

  ${Prose} {
    max-width: 50rem;
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;

export const EntriesList = styled.ul`
  display: grid;
  grid-gap: ${glsp(2)};
  grid-template-columns: repeat(12, 1fr);

  li {
    text-align: center;
    grid-column: auto / span 3;
  }
`;
