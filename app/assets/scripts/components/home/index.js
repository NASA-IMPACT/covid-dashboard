import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
import {
  PageConstrainer
} from '../../styles/hub-pages';
import Prose from '../../styles/type/prose';

import { filterComponentProps } from '../../utils/utils';
import { glsp } from '../../styles/utils/theme-values';

const IntroActions = styled.div`
  display: grid;
  grid-gap: ${glsp()};
  grid-template-columns: repeat(12, 1fr);
  padding: ${glsp(1, 0)};

  > * {
    grid-column: auto / span 3;
  }

  /* stylelint-disable-next-line */
  ${InpageHGroup} {
    grid-row: 1;
    grid-column: content-start / content-7;
  }
`;

const propsToFilter = ['size', 'useIcon', 'variation'];
const CleanNavLink = filterComponentProps(NavLink, propsToFilter);

export default class Home extends React.Component {
  render () {
    return (
      <App pageTitle='Home'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Welcome to the COVID-19 Data&nbsp;Dashboard</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <p>
                  As communities around the world have changed their behavior in response
                  to the spread of COVID-19, NASA satellites have observed associated
                  changes in the environment.
                </p>
                <p>
                  The NASA COVID-19 data dashboard can be used to explore these changes
                  on a global scale. Powered by publicly available NASA Earth observing
                  data, the dashboard highlights 10 key indicators – 4 environmental and
                  6 economic – that show how the planet is responding to our changing
                  behavior in response to COVID-19.
                </p>
                <p>
                  Use the dashboard to interact with real NASA data and investigate how
                  social distancing measures and regional shelter-in-place guidelines have
                  affected Earth’s air, land, and water. Explore individual &apos;Spotlight Areas&apos;
                  to see how the indicators in each specific location have changed through
                  time.
                </p>
              </Prose>
              <InpageHGroup
                title='Explore the site'
              />
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
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
