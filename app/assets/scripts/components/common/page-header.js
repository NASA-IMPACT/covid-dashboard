import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import config from '../../config';

import { Link, NavLink } from 'react-router-dom';
import { themeVal } from '../../styles/utils/general';
import { reveal } from '../../styles/animation';
import { panelSkin } from '../../styles/skins';
import { filterComponentProps } from '../../utils/utils';
import { glsp } from '../../styles/utils/theme-values';

import Button from '../../styles/button/button';

const { appTitle, appShortTitle } = config;

const PageHead = styled.header`
  ${panelSkin()}
  position: sticky;
  z-index: 20;
  top: 0;
  left: 0;
  bottom: 0;

  /* Animation */
  animation: ${reveal} 0.32s ease 0s 1;
`;

const PageHeadInner = styled.div`
  display: flex;
  padding: 0 ${glsp(0.5)};
  align-items: center;
  margin: 0 auto;
  height: 100%;
`;

const PageHeadline = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
`;

const PageTitle = styled.h1`
  display: flex;
  text-align: center;
  align-items: center;
  margin: 0;
  font-weight: ${themeVal('type.base.semibold')};
  text-transform: uppercase;

  a {
    display: flex;
    align-items: center;
    transition: all 0.24s ease 0s;

    &,
    &:visited {
      color: inherit;
    }
  }

  span {
    font-size: 1rem;
    line-height: 1;
  }
`;

const PageNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 0 auto;
  padding: 0 0 0 ${glsp(1)};
`;

const GlobalMenu = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  list-style: none;

  > * {
    margin: 0 ${glsp(0.5)} 0 0;
  }

  > *:last-child {
    margin: 0;
  }
`;

// See documentation of filterComponentProp as to why this is
const propsToFilter = ['variation', 'size', 'hideText', 'useIcon', 'active'];
const NavLinkFilter = filterComponentProps(NavLink, propsToFilter);

class PageHeader extends React.Component {
  render () {
    const { useShortTitle } = this.props;

    return (
      <PageHead role='banner'>
        <PageHeadInner>
          <PageHeadline>
            <PageTitle>
              <Link to='/' title='Go to welcome page'>
                <span>
                  {useShortTitle ? appShortTitle || 'COVID-19' : appTitle}
                </span>
              </Link>
            </PageTitle>
          </PageHeadline>
          <PageNav role='navigation'>
            <GlobalMenu>
              <li>
                <Button
                  as={NavLinkFilter}
                  to='/'
                  isActive={(match, location) =>
                    match && location.pathname.match(/^\/(areas\/|$)/)}
                  variation='base-plain'
                  useIcon='map'
                  title='Explore the map'
                  hideText
                >
                  <span>Map</span>
                </Button>
              </li>
              <li>
                <Button
                  as={NavLinkFilter}
                  to='/trends'
                  variation='base-plain'
                  useIcon='chart-bars'
                  title='Explore the trends'
                  hideText
                >
                  <span>Trends</span>
                </Button>
              </li>
              <li>
                <Button
                  as={NavLinkFilter}
                  to='/about'
                  variation='base-plain'
                  useIcon='circle-information'
                  title='View the about page'
                  hideText
                >
                  <span>About</span>
                </Button>
              </li>
            </GlobalMenu>
          </PageNav>
        </PageHeadInner>
      </PageHead>
    );
  }
}

PageHeader.propTypes = {
  useShortTitle: T.bool
};

export default PageHeader;
