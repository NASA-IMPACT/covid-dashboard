import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import config from '../../config';

import { Link, NavLink } from 'react-router-dom';
import { visuallyHidden } from '../../styles/helpers';
import { themeVal } from '../../styles/utils/general';
import { reveal } from '../../styles/animation';
import { filterComponentProps } from '../../utils/utils';
import { glsp } from '../../styles/utils/theme-values';

import Button from '../../styles/button/button';
import Dropdown, { DropTitle, DropMenu, DropMenuItem } from './dropdown';
import superSitesList from '../super-sites';

const { appTitle, appShortTitle, appVersion } = config;

const PageHead = styled.header`
  position: relative;
  z-index: 20;
  background: ${themeVal('color.link')};
  color: ${themeVal('color.baseLight')};

  /* Animation */
  animation: ${reveal} 0.32s ease 0s 1;
`;

const PageHeadInner = styled.div`
  display: flex;
  padding: ${glsp(0.75)};
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
  margin: 0;
  line-height: 1;

  a {
    display: grid;
    grid-gap: 0 ${glsp(0.5)};
    grid-template-columns: min-content 1fr min-content;

    &,
    &:visited {
      color: inherit;
    }

    &::before {
      grid-row: 1 / span 2;
      content: '';
      height: 48px;
      width: 56px;
      background: url('/assets/graphics/layout/app-logo-sprites.png');
      background-size: auto 100%;
      background-repeat: none;
      background-position: top right;
    }

    &:hover {
      opacity: 1;

      &::before {
        background-position: top left;
      }
    }
  }

  sup {
    grid-row: 1;
    font-size: 0.875rem;
    font-weight: ${themeVal('type.base.extrabold')};
    line-height: 1rem;
    text-transform: uppercase;
    align-self: end;
    top: inherit;
    vertical-align: inherit;

    span {
      ${visuallyHidden()};
    }
  }

  strong {
    grid-row: 2;
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-weight: ${themeVal('type.base.light')};
    align-self: center;
    letter-spacing: -0.025em;
  }

  sub {
    grid-row: 2;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-transform: uppercase;
    color: ${themeVal('color.link')};
    background: ${themeVal('color.surface')};
    padding: 0 ${glsp(0.5)};
    border-radius: ${themeVal('shape.rounded')};
    bottom: inherit;
    vertical-align: inherit;
    align-self: center;
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
                <sup><span>NASA - </span>Earthdata</sup>
                <strong>{useShortTitle ? appShortTitle || 'COVID-19' : appTitle}</strong>
                <sub>{appVersion}</sub>
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
                  variation='achromic-plain'
                  title='Explore the map'
                >
                  <span>Map</span>
                </Button>
              </li>
              <li>
                <Dropdown
                  alignment='right'
                  direction='down'
                  triggerElement={
                    <Button
                      variation='achromic-plain'
                      title='Explore the Super sites'
                      useIcon={['chevron-down--small', 'after']}
                    >
                      <span>Super sites</span>
                    </Button>
                  }
                >
                  <DropTitle>Super sites</DropTitle>
                  <DropMenu role='menu' selectable>
                    {superSitesList.map(ss => (
                      <li key={ss.id}>
                        <DropMenuItem
                          as={NavLink}
                          to={`/super-sites/${ss.id}`}
                          data-dropdown='click.close'
                        >
                          {ss.label}
                        </DropMenuItem>
                      </li>
                    ))}
                  </DropMenu>
                </Dropdown>
              </li>
              <li>
                <Button
                  as={NavLinkFilter}
                  to='/about'
                  variation='achromic-plain'
                  title='View the about page'
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
