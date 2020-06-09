import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import App from '../../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../../styles/inpage';
import Prose from '../../../styles/type/prose';
import Heading from '../../../styles/type/heading';
import {
  PageConstrainer
} from '../../../styles/hub-pages';

class GetStartedHub extends React.Component {
  render () {
    return (
      <App pageTitle='Indicators'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Getting Started</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <Heading as='h2' size='large'>
               How to Use the Site
                </Heading>

                <p>
                  The NASA COVID-19 data dashboard is intended to help novice users better understand and interact with real NASA data related to the effects of the COVID-19 shutdown on our home planet.
                </p>
                <p>
                  Use the global map view to toggle “on” and “off” the various environmental and economic indicator layers and explore the local, regional, and global variations in nitrogen dioxide (NO2), carbon dioxide (CO2), water quality, agriculture, and economic activity.
                </p>
                <p>
                  Use the selection tool to define and draw a specific area of interest (AOI) on the map to explore the indicators for a particular region.
                </p>
                <p>
                  Use the timeline at the bottom of the map to see how different indicator levels vary over time.
                </p>

              </Prose>
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

GetStartedHub.propTypes = {
};

function mapStateToProps (state, props) {
  return {
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedHub);
