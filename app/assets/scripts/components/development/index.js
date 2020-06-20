import React from 'react';
import styled from 'styled-components';

import App from '../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import Constrainer from '../../styles/constrainer';
import Prose from '../../styles/type/prose';

import { glsp } from '../../styles/utils/theme-values';

const PageConstrainer = styled(Constrainer)`
  ${Prose} {
    max-width: 50rem;
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;

export default class Development extends React.Component {
  render () {
    return (
      <App pageTitle='Development & contributing'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Development & contributing</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <p>
                  NASA started the development of the Dashboard in May 2020. This experimental site reflects a rapid response to COVID-19 currently underway and will continue to evolve as more data become available.
                </p>
                <p>
                  We welcome your feedback to help improve the Dashboard.
                </p>
                <p>
                  Link to Github.
                </p>
              </Prose>
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
