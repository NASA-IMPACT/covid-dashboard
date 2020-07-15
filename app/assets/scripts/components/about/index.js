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
            <PageConstrainer>
              <Prose>
                <p>
                  As the world moved indoors to shelter from the global pandemic sparked by the novel coronavirus, we
                  could perceive changes on our planet. The sky seemed a little bluer, the air a little fresher, the animals in
                  our yards more abundant.
                </p>
                <p>
                  The National Aeronautics and Space Administration&apos;s (NASA) continuous and sometimes near-real-time measurements of Earth allow for understanding both the systems
                  changes themselves and the potential impact on economies and society during the pandemic – and as the world
                  slowly returns to operations.
                </p>
                <p>
                  This dashboard features data collected and analyzed by NASA.
                  Information about Earth systems is gathered by a fleet of powerful global Earth-observing satellites, instruments
                  aboard the International Space Station, from airborne science campaigns, and via ground observations. With this
                  data we have been able to monitor some of those changes, and this is allowing us to track and compare these
                  changes over time.
                </p>
                <p>
                  NASA will further expand the analysis of the data sets presented here in collaboration with the
                  European Space Agency (ESA) and the Japan Aerospace Exploration Agency (JAXA). ESA and JAXA have created their own
                  online data portals to provide an even richer picture of what is happening on our home planet during this time of
                  crisis. A fourth, tri-agency dashboard will combine the unique data of each agency for more comparisons
                  and deeper understandings now and over time.
                </p>
                <p>
                  To learn more about NASA Earth Science, go to <a href='https://nasa.gov/earth'>nasa.gov/earth</a>.
                </p>
              </Prose>
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
