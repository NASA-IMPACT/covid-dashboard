import React from 'react';
import styled from 'styled-components';
import T from 'prop-types';
import * as d3 from 'd3';

import Heading from '../../styles/type/heading';
import SimpleLineChart from '../common/simple-line-chart/chart';
import Panel, {
  PanelHeadline,
  PanelTitle
} from '../common/panel';
import ShadowScrollbar from '../common/shadow-scrollbar';

import { glsp } from '../../styles/utils/theme-values';
import { utcDate } from '../../utils/utils';

const BodyScroll = styled(ShadowScrollbar)`
  flex: 1;
  z-index: 1;
`;

const InsightsBlock = styled.div`
  padding: ${glsp()};
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`;

class ExpMapSecPanel extends React.Component {
  renderContent () {
    const { cogTimeData, aoiFeature, layers } = this.props;

    if (!aoiFeature) {
      return <p>There is no area of interest defined.</p>;
    }

    if (!layers.length) {
      return <p>There are no layers with time data enabled.</p>;
    }

    // TODO: Do not use hardcoded values.
    const no2cogTimeData = cogTimeData.no2;

    if (!no2cogTimeData || !no2cogTimeData.isReady()) {
      return null;
    }

    const data = no2cogTimeData.getData();
    const xDomain = [
      utcDate(data[0].date),
      utcDate(data[data.length - 1].date)
    ];
    const yDomain = d3.extent(data, d => d.value);

    return (
      <div>
        <Heading as='h2'>NO<sub>2</sub> Concentration</Heading>
        <small>molecules/cm<sup>2</sup></small>
        <SimpleLineChart
          xDomain={xDomain}
          yDomain={yDomain}
          data={data}
        />
      </div>
    );
  }

  render () {
    return (
      <Panel
        collapsible
        direction='right'
        onPanelChange={this.props.onPanelChange}
        headerContent={
          <PanelHeadline>
            <PanelTitle>Insights</PanelTitle>
          </PanelHeadline>
        }
        bodyContent={
          <BodyScroll>
            <InsightsBlock>
              {this.renderContent()}
            </InsightsBlock>
          </BodyScroll>
        }
      />
    );
  }
}

ExpMapSecPanel.propTypes = {
  onPanelChange: T.func,
  layers: T.array,
  aoiFeature: T.object,
  cogTimeData: T.object
};

export default ExpMapSecPanel;
