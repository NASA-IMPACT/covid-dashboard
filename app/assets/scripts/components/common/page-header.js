import React from 'react';
import T from 'prop-types';
import styled, { css, createGlobalStyle } from 'styled-components';
import { rgba } from 'polished';
import { connect } from 'react-redux';

import config from '../../config';

import { Link, NavLink } from 'react-router-dom';
import { visuallyHidden, unscrollableY } from '../../styles/helpers';
import { themeVal, stylizeFunction } from '../../styles/utils/general';
import { reveal } from '../../styles/animation';
import { filterComponentProps } from '../../utils/utils';
import { glsp } from '../../styles/utils/theme-values';
import media from '../../styles/utils/media-queries';
import { wrapApiResult } from '../../redux/reduxeed';
import { headingAlt } from '../../styles/type/heading';

import Button from '../../styles/button/button';
import Dropdown, { DropTitle, DropMenu, DropMenuItem } from './dropdown';
import Share from './share';
import indicatorsList from '../indicators';

const { appTitle, appVersion, baseUrl } = config;

const _rgba = stylizeFunction(rgba);

const PageHead = styled.header`
  position: relative;
  z-index: 20;
  background: ${themeVal('color.link')};
  color: ${themeVal('color.baseLight')};
  overflow: hidden;

  /* Animation */
  animation: ${reveal} 0.32s ease 0s 1;
`;

const PageHeadInner = styled.div`
  display: flex;
  padding: ${glsp(0.5, 0.5, 0.5, 1)};
  align-items: center;
  margin: 0 auto;
  height: 100%;

  ${media.mediumUp`
    padding: ${glsp(0.75)};
  `}
`;

const PageHeadline = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  padding-right: ${glsp()};
  margin-right: auto;
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
      background: url(${`${baseUrl}/assets/graphics/layout/app-logo-sprites.png`});
      background-size: auto 100%;
      background-repeat: none;
      background-position: top right;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.16;
      transform: scale(2) translate(-0.5rem, -25%);
      transform-origin: top left;

      ${media.mediumUp`
        position: static;
        transform: none;
        opacity: 1;
      `}
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
    font-size: 0.5rem;
    line-height: 1;
    font-weight: ${themeVal('type.base.extrabold')};
    text-transform: uppercase;
    align-self: end;
    top: inherit;
    vertical-align: inherit;
    transform: translate(0, -0.125rem);

    ${media.mediumUp`
      font-size: 0.875rem;
      line-height: 1rem;
      transform: none;
    `}

    span {
      ${visuallyHidden()};
    }
  }

  strong {
    grid-row: 2;
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: ${themeVal('type.base.regular')};
    align-self: center;
    letter-spacing: -0.025em;
    transform: translate(0, 0.125rem);

    ${media.mediumUp`
      font-size: 1.25rem;
      line-height: 1.5rem;
      font-weight: ${themeVal('type.base.light')};
      transform: none;
    `}
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
    display: none;

    ${media.mediumUp`
      display: flex;
    `}
  }
`;

const PageNavLarge = styled.nav`
  display: none;
  margin: 0;
  padding: 0;
  order: 2;

  ${media.mediumUp`
    display: flex;
    flex-flow: row nowrap;
  `}
`;

const GlobalMenu = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0;
  list-style: none;

  ${media.mediumUp`
    display: flex;
    flex-flow: row nowrap;
  `}

  > * {
    margin: 0 0 ${glsp(0.25)} 0;

    ${media.mediumUp`
      margin: 0 ${glsp(0.5)} 0 0;
    `}
  }

  > *:last-child {
    margin: 0;
  }

  ${Button} {
    width: 100%;
    text-align: left;

    ${media.mediumUp`
      width: auto;
      text-align: center;
    `}
  }
`;

const PageNavSmall = styled.nav`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  background: ${themeVal('color.silk')};
  transition: all 0.16s ease 0s;
  opacity: 0;
  visibility: hidden;

  ${({ revealed }) => revealed &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const PageNavSmallGlobalStyle = createGlobalStyle`
  body {
    ${unscrollableY()}
  }
`;

const PageNavSmallInner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 18rem;
  height: 100%;
  background: ${themeVal('color.primary')};
  color: ${themeVal('color.baseLight')};
  transition: all 0.32s ease 0s;
  transform: translate(100%, 0);

  ${({ revealed }) =>
    revealed &&
    css`
      transform: translate(0, 0);
    `};
`;

const PageNavSmallHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  padding: ${glsp(0.5, 0.5, 0.5, 1)};
  align-items: center;
`;

const PageNavSmallTitle = styled.h2`
  font-size: 1rem;
  line-height: 2rem;
  margin: 0 auto 0 0;
`;

const PageNavSmallInnerTitle = styled.h3`
  ${headingAlt}
`;

const PageNavSmallBody = styled.div`
  display: grid;
  grid-gap: ${glsp(1)};
  padding: ${glsp()};
  box-shadow: inset 0 1px 0 0 ${_rgba('#FFFFFF', 0.12)};
  overflow: auto;
`;

// See documentation of filterComponentProp as to why this is
const propsToFilter = ['variation', 'size', 'hideText', 'useIcon', 'active'];
const NavLinkFilter = filterComponentProps(NavLink, propsToFilter);

class PageHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      panelOpen: false
    };
  }

  render () {
    const { spotlightList, useSmallPanel } = this.props;

    const spotlightAreas = spotlightList.isReady() && spotlightList.getData();

    return (
      <PageHead role='banner'>
        <PageHeadInner>
          <PageHeadline>
            <PageTitle>
              <Link to='/' title='Go to welcome page'>
                <sup>
                  <span>NASA - </span>Earthdata
                </sup>
                <strong>{appTitle}</strong>
                <sub title={appVersion}>beta</sub>
              </Link>
            </PageTitle>
          </PageHeadline>

          {useSmallPanel ? (
            <>
              <Share />
              <Button
                hideText
                useIcon='hamburger-menu'
                variation='achromic-plain'
                title='Show menu'
                onClick={() => this.setState({ panelOpen: true })}
              >
                Show menu
              </Button>
              {this.state.panelOpen && <PageNavSmallGlobalStyle />}
              <PageNavSmall role='navigation' revealed={this.state.panelOpen}>
                <PageNavSmallInner revealed={this.state.panelOpen}>
                  <PageNavSmallHeader>
                    <PageNavSmallTitle>Menu</PageNavSmallTitle>
                    <Button
                      hideText
                      useIcon='xmark'
                      variation='achromic-plain'
                      title='Hide menu'
                      onClick={() => this.setState({ panelOpen: false })}
                    >
                      Hide menu
                    </Button>
                  </PageNavSmallHeader>
                  <PageNavSmallBody>
                    <GlobalMenu>
                      <li>
                        <Button
                          element={NavLinkFilter}
                          to='/'
                          exact
                          variation='achromic-plain'
                          title='View the welcome page'
                        >
                          Welcome
                        </Button>
                      </li>
                      <li>
                        <Button
                          element={NavLinkFilter}
                          to='/about'
                          variation='achromic-plain'
                          title='View the about page'
                        >
                          About
                        </Button>
                      </li>
                    </GlobalMenu>
                    <PageNavSmallInnerTitle>
                    Explore
                    </PageNavSmallInnerTitle>
                    <GlobalMenu>
                      <li>
                        <Button
                          element={NavLinkFilter}
                          to='/explore'
                          exact
                          variation='achromic-plain'
                          title='Explore the Data'
                        >
                        About
                        </Button>
                      </li>
                      <li>
                        <Button
                          element={NavLinkFilter}
                          to='/explore/global'
                          exact
                          variation='achromic-plain'
                          title='Explore the global map'
                        >
                        Global
                        </Button>
                      </li>
                      {spotlightAreas &&
                      spotlightAreas.map((ss) => (
                        <li key={ss.id}>
                          <Button
                            element={NavLinkFilter}
                            to={`/explore/${ss.id}`}
                            variation='achromic-plain'
                            title={`Explore ${ss.label}`}
                          >
                            {ss.label}
                          </Button>
                        </li>
                      ))}
                    </GlobalMenu>

                    <PageNavSmallInnerTitle>Indicators</PageNavSmallInnerTitle>
                    <GlobalMenu>
                      <li>
                        <Button
                          element={NavLinkFilter}
                          to='/indicators'
                          exact
                          variation='achromic-plain'
                          title='Learn about the indicators'
                        >
                        About
                        </Button>
                      </li>
                      {indicatorsList
                        .filter((d) => !!d.LongForm)
                        .map((d) => (
                          <li key={d.id}>
                            <Button
                              element={NavLinkFilter}
                              to={`/indicators/${d.id}`}
                              variation='achromic-plain'
                              title='Learn about the indicator'
                            >
                              {d.name}
                            </Button>
                          </li>
                        ))}
                    </GlobalMenu>
                  </PageNavSmallBody>
                </PageNavSmallInner>
              </PageNavSmall>
            </>
          ) : (
            <PageNavLarge role='navigation'>
              <GlobalMenu>
                <li>
                  <Button
                    element={NavLinkFilter}
                    to='/'
                    exact
                    hideText
                    useIcon='house'
                    variation='achromic-plain'
                    title='View the welcome page'
                  >
                    Welcome
                  </Button>
                </li>
                <li>
                  <Dropdown
                    alignment='right'
                    direction='down'
                    disabled={!spotlightAreas}
                    triggerElement={
                      <Button
                        variation='achromic-plain'
                        title='Explore the data'
                        useIcon={['chevron-down--small', 'after']}
                      >
                        Explore
                      </Button>
                    }
                  >
                    <DropMenu role='menu' selectable>
                      <li>
                        <DropMenuItem
                          as={NavLink}
                          exact
                          to='/explore'
                          title='Explore the data'
                          data-dropdown='click.close'
                        >
                          About
                        </DropMenuItem>
                      </li>
                    </DropMenu>
                    <DropMenu role='menu' selectable>
                      <li>
                        <DropMenuItem
                          as={NavLink}
                          exact
                          to='/explore/global'
                          title='Explore the global map'
                          data-dropdown='click.close'
                        >
                          Global
                        </DropMenuItem>
                      </li>
                      {spotlightAreas &&
                        spotlightAreas.map((ss) => (
                          <li key={ss.id}>
                            <DropMenuItem
                              as={NavLink}
                              to={`/explore/${ss.id}`}
                              title={`Explore ${ss.label}`}
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
                  <Dropdown
                    alignment='right'
                    direction='down'
                    triggerElement={
                      <Button
                        variation='achromic-plain'
                        title='Explore the indicators'
                        useIcon={['chevron-down--small', 'after']}
                      >
                        Indicators
                      </Button>
                    }
                  >
                    <DropMenu role='menu' selectable>
                      <li>
                        <DropMenuItem
                          as={NavLink}
                          exact
                          to='/indicators'
                          data-dropdown='click.close'
                        >
                          About
                        </DropMenuItem>
                      </li>
                    </DropMenu>
                    <DropTitle>Indicators</DropTitle>
                    <DropMenu role='menu' selectable>
                      {indicatorsList
                        .filter((d) => !!d.LongForm)
                        .map((d) => (
                          <li key={d.id}>
                            <DropMenuItem
                              as={NavLink}
                              to={`/indicators/${d.id}`}
                              data-dropdown='click.close'
                            >
                              {d.name}
                            </DropMenuItem>
                          </li>
                        ))}
                    </DropMenu>
                  </Dropdown>
                </li>
                <li>
                  <Button
                    element={NavLinkFilter}
                    to='/about'
                    variation='achromic-plain'
                    title='View the about page'
                  >
                    About
                  </Button>
                </li>
                <li>
                  <Share />
                </li>
              </GlobalMenu>
            </PageNavLarge>
          )}
        </PageHeadInner>
      </PageHead>
    );
  }
}

PageHeader.propTypes = {
  spotlightList: T.object,
  useSmallPanel: T.bool
};

function mapStateToProps (state, props) {
  return {
    spotlightList: wrapApiResult(state.spotlight.list)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
