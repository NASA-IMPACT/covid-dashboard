import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import {
  PanelBlock,
  PanelBlockHeader,
  PanelBlockTitle,
  PanelBlockBody,
  PanelBlockScroll
} from './panel-block';
import { NavLink } from 'react-router-dom';

import { glsp, _rgba } from '../../styles/utils/theme-values';
import { themeVal } from '../../styles/utils/general';

const PanelBlockNav = styled(PanelBlock)`
  box-shadow: 0 1px 0 0 ${themeVal('color.baseAlphaB')};
`;

const PanelNavLink = styled(NavLink)`
  position: relative;
  display: block;
  padding: ${glsp(1 / 2, 1)};
  font-size: 1rem;
  line-height: 1.25rem;
  transition: all 0.16s ease 0s;

  &,
  &:visited {
    color: inherit;
  }

  &:hover {
    background: ${_rgba(themeVal('color.primary'), 0.04)};
    opacity: 1;
  }

  &:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${glsp(0.25)};
    content: '';
    opacity: 0;
    transition: all 0.16s ease 0s;
    background: ${themeVal('color.primary')};
  }

  &.active {
    background: ${_rgba(themeVal('color.primary'), 0.08)};
    color: ${themeVal('color.primary')};
    font-weight: bold;

    &:after {
      opacity: 1;
    }
  }

  &.active:hover {
    background: ${_rgba(themeVal('color.primary'), 0.16)};
  }
`;

class ExploreNavigation extends React.Component {
  componentDidMount () {
    if (this.props.spotlights.length) {
      this.positionSelected();
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.spotlights.length !== this.props.spotlights.length) {
      this.positionSelected();
    }
  }

  positionSelected () {
    // The scroll has to be controlled using dom functions.
    // Get scroll area position.
    const { top: areaFromDocTop } = document
      .querySelector('#explore-nav .scroll-area')
      .getBoundingClientRect();

    // Get active element position.
    const { top: elFromDocTop } = document
      .querySelector('#explore-nav .active')
      .getBoundingClientRect();

    const scrollOffset = elFromDocTop - areaFromDocTop;

    document
      // The scrollable div is the direct children of scroll area.
      .querySelector('#explore-nav .scroll-area > div')
      // -32 to avoid glueing it to the top.
      .scrollTop = scrollOffset - 32;
  }

  render () {
    const { spotlights } = this.props;

    return (
      <PanelBlockNav>
        <PanelBlockHeader>
          <PanelBlockTitle>Areas</PanelBlockTitle>
        </PanelBlockHeader>
        <PanelBlockBody>
          <PanelBlockScroll id='explore-nav'>
            <ul>
              <li>
                <PanelNavLink to='/explore/global' exact title='Explore global map'>
                  Global
                </PanelNavLink>
              </li>
              {spotlights.map((ss) => (
                <li key={ss.id}>
                  <PanelNavLink
                    exact
                    to={`/explore/${ss.id}`}
                    title={`Explore ${ss.label}`}
                  >
                    {ss.label}
                  </PanelNavLink>
                </li>
              ))}
            </ul>
          </PanelBlockScroll>
        </PanelBlockBody>
      </PanelBlockNav>
    );
  }
}

ExploreNavigation.propTypes = {
  spotlights: T.array
};

export default ExploreNavigation;
