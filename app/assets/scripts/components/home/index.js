import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { themeVal } from '../../styles/utils/general';
import collecticon from '../../styles/collecticons';
import { visuallyHidden } from '../../styles/helpers';

import App from '../common/app';
import Button from '../../styles/button/button';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import InpageHGroup from '../../styles/inpage-hgroup';
import Prose from '../../styles/type/prose';
import { headingAlt } from '../../styles/type/heading';

import { filterComponentProps } from '../../utils/utils';
import { glsp } from '../../styles/utils/theme-values';
import media from '../../styles/utils/media-queries';

const Intro = styled.section`
  position: relative;
  height: 100%;
  background: ${themeVal('color.baseAlphaA')};
`;

const IntroCopy = styled.div`
  position: absolute;
  top: ${glsp()};
  left: ${glsp()};
  z-index: 10;
  background: ${themeVal('color.surface')};
  padding: ${glsp()};
  border-radius: ${themeVal('shape.rounded')};
  max-height: calc(100% - ${glsp(2)});
  width: 100%;
  max-width: 16rem;
  overflow-y: auto;
  display: grid;
  grid-gap: ${glsp()} 0;

  ${media.smallUp`
    max-width: 24rem;
  `}

  ${media.mediumUp`
    top: ${glsp(2)};
    left: ${glsp(2)};
    padding: ${glsp(2)};
    max-height: calc(100% - ${glsp(4)});
    max-width: 28rem;
  `}

  ${media.largeUp`
    max-height: calc(100% - ${glsp(6)});
    max-width: 44rem;
  `}
`;

const IntroTitle = styled.h1`
  margin: 0;

  small {
    ${headingAlt()}
    display: block;

    ${media.mediumUp`
      font-size: 1rem;
      line-height: 1;
    `}
  }

  strong {
    display: block;
    font-size: 2rem;
    line-height: 2.5rem;
    letter-spacing: -0.016em;
  }
`;

const IntroProse = styled(Prose)`
  background: transparent;
`;

const IntroActions = styled.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    margin: ${glsp(0.5, 1, 0.5, 0)};
    min-width: 12rem;
  }

  /* stylelint-disable-next-line */
  ${InpageHGroup} {
    grid-row: 1;
    grid-column: content-start / content-7;
  }
`;

const IntroMedia = styled.figure`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    ${visuallyHidden()}
  }

  &::before {
    ${collecticon('map')}
    opacity: 0.08;
    font-size: 48rem;
  }
`;

const propsToFilter = ['size', 'useIcon', 'variation'];
const CleanNavLink = filterComponentProps(NavLink, propsToFilter);

export default class Home extends React.Component {
  render () {
    return (
      <App pageTitle='Home' hideFooter>
        <Inpage isMapCentric>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Welcome</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <Intro>
              <IntroCopy>
                <IntroTitle>
                  <small>Welcome to the</small>
                  <strong>COVID-19 Data Dashboard</strong>
                </IntroTitle>
                <IntroProse>
                  <p>
                    As communities around the world have changed their behavior
                    in response to the spread of COVID-19, NASA satellites have
                    observed associated changes in the environment.
                  </p>
                  <p>
                    The NASA COVID-19 data dashboard can be used to explore
                    these changes on a global scale. Powered by publicly
                    available NASA Earth observing data, the dashboard
                    highlights 10 key indicators – 4 environmental and 6
                    economic – that show how the planet is responding to our
                    changing behavior in response to COVID-19.
                  </p>
                  <p>
                    Use the dashboard to interact with real NASA data and
                    investigate how social distancing measures and regional
                    shelter-in-place guidelines have affected Earth’s air, land,
                    and water. Explore individual &apos;Spotlight Areas&apos; to
                    see how the indicators in each specific location have
                    changed through time.
                  </p>
                </IntroProse>
                <IntroActions>
                  <Button
                    as={CleanNavLink}
                    size='large'
                    title='View the global map'
                    to='/getstarted'
                    variation='primary-raised-dark'
                  >
                    Getting Started
                  </Button>
                  <Button
                    as={CleanNavLink}
                    size='large'
                    title='View the Indicators'
                    to='/indicators'
                    variation='primary-raised-dark'
                  >
                    Indicators
                  </Button>
                  <Button
                    as={CleanNavLink}
                    size='large'
                    title='View the Spotlight locations'
                    to='/spotlight'
                    variation='primary-raised-dark'
                  >
                    Spotlight locations
                  </Button>
                </IntroActions>
              </IntroCopy>

              <IntroMedia>
                <p>A map will appear here.</p>
              </IntroMedia>
            </Intro>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
