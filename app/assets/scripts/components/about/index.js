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

import {
  Fold,
  FoldTitle
} from '../../styles/fold';

import Constrainer from '../../styles/constrainer';

import Prose from '../../styles/type/prose';

const AboutProse = styled(Prose)`
  grid-row: 1;
  grid-column: span 8;
`;

export default class About extends React.Component {
  render () {
    return (
      <App pageTitle='About'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>About</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <Fold>
              <Constrainer>
                <AboutProse>
                  <FoldTitle>The tool</FoldTitle>
                  <p>
                    The COVID EO dashbord provides streaming data about the
                    pandemic to inform decisionmakers in government, community
                    leaders, health responders, and the business community.
                  </p>
                </AboutProse>
              </Constrainer>
            </Fold>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
