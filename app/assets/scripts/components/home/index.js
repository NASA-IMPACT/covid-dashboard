import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { filterComponentProps } from '../../utils/utils';

import { themeVal } from '../../styles/utils/general';
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

import {
  Fold
} from '../../styles/fold';

import Constrainer from '../../styles/constrainer';

import Prose from '../../styles/type/prose';

const IntroProse = styled(Prose)`
  grid-row: 1;
  grid-column: span 8;
`;

const IntroActions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  > * {
    min-width: 11rem;
    margin-right: ${themeVal('layout.space')}
  }
  > *:last-child {
    margin-right: 0;
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
                <InpageTitle>Welcome to the COVID-19 Data Dashboard</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <Fold>
              <Constrainer>
                <IntroProse>
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
                </IntroProse>
                <IntroActions>
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
                    title='View the Spotlight Locations'
                    to='/spotlight'
                    variation='primary-raised-dark'
                  >
                    Spotlight Locations
                  </Button>
                  <Button
                    as={CleanNavLink}
                    size='large'
                    title='View the global map'
                    to='/global'
                    variation='base-raised-light'
                  >
                    Global Map
                  </Button>
                </IntroActions>
              </Constrainer>
            </Fold>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
