/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { glsp } from '../../styles/utils/theme-values';

import App from '../common/app';
import UhOh from '../uhoh';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageToolbar,
  InpageBody
} from '../../styles/inpage';
import Constrainer from '../../styles/constrainer';
import Prose from '../../styles/type/prose';
import Button from '../../styles/button/button';
import ButtonGroup from '../../styles/button/group';

import BtnExample from './buttons';
import FormsExample from './forms';
import ColorsExample from './colors';
import LineChartExample from './line-chart';
import BarChartExample from './bar-chart';
import ProseExample from './prose';

import config from '../../config';

const PageConstrainer = styled(Constrainer)`
  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;

const SandboxInpageHeaderInner = styled(InpageHeaderInner)`
  && {
    grid-row-gap: 2rem;
  }
`;

const SandboxInpageToolbar = styled(InpageToolbar)`
  && {
    grid-row: 2;
    grid-column: 1;
  }
`;

// How to add a new sandbox page.
// 1) Create an example component with the code inside the sandbox folder.
// 2) Add an entry to the sandboxPages array, with a name for the tab, a url
// and the component to render.
// 3) Profit!
const sandboxPages = [
  {
    name: 'Buttons',
    url: '/buttons',
    cmp: BtnExample
  },
  {
    name: 'Colors',
    url: '',
    cmp: ColorsExample
  },
  {
    name: 'Forms',
    url: '/forms',
    cmp: FormsExample
  },
  {
    name: 'Line chart',
    url: '/line-chart',
    cmp: LineChartExample
  },
  {
    name: 'Bar chart',
    url: '/bar-chart',
    cmp: BarChartExample
  },
  {
    name: 'Prose',
    url: '/prose',
    cmp: ProseExample
  }
];

export default class Sandbox extends React.Component {
  tabButton (page) {
    return (
      <Button
        key={page.url}
        as={NavLink}
        exact
        variation='base-raised-light'
        to={this.computePath(page)}
      >
        {page.name}
      </Button>
    );
  }

  computePath (p) {
    const { path } = this.props.match;
    return `${path}${p.url.substr(path.endsWith('/') ? 1 : 0)}`;
  }

  render () {
    if (config.environment !== 'development') return <UhOh />;

    return (
      <App pageTitle='Sandbox'>
        <Inpage>
          <InpageHeader>
            <SandboxInpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Sandbox</InpageTitle>
              </InpageHeadline>
              <SandboxInpageToolbar>
                <ButtonGroup orientation='horizontal'>
                  {sandboxPages.map((p) => this.tabButton(p))}
                </ButtonGroup>
              </SandboxInpageToolbar>
            </SandboxInpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <Switch>
                  {sandboxPages.map((p) => (
                    <Route
                      exact
                      key={p.url}
                      path={this.computePath(p)}
                      component={p.cmp}
                    />
                  ))}
                </Switch>
              </Prose>
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
