import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import App from '../../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../../styles/inpage';

import { glsp } from '../../../styles/utils/theme-values';
import { themeVal } from '../../../styles/utils/general';
import { wrapApiResult } from '../../../redux/reduxeed';

const InpageTrendsBody = styled(InpageBody)`
  position: relative;
  z-index: 9;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;
  padding: ${glsp(1, 3)};
`;

const PanelNavLink = styled(NavLink)`
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

class SpotlightAreasHub extends React.Component {
  render () {
    const { spotlightList } = this.props;

    const spotlightAreas = spotlightList.isReady() && spotlightList.getData();

    return (
      <App pageTitle='Spotlight areas'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Spotlight areas</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageTrendsBody>
            <ul>
              {spotlightAreas && spotlightAreas.map((item) => (
                <li key={item.id}>
                  <PanelNavLink
                    to={`/spotlight/${item.id}`}
                    title={`View spotlight area ${item.label}`}
                  >
                    {item.label}
                  </PanelNavLink>
                </li>
              ))}
            </ul>
          </InpageTrendsBody>
        </Inpage>
      </App>
    );
  }
}

SpotlightAreasHub.propTypes = {
  spotlightList: T.object
};

function mapStateToProps (state, props) {
  return {
    spotlightList: wrapApiResult(state.spotlight.list)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightAreasHub);
