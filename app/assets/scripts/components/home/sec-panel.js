import React from 'react';
import styled from 'styled-components';
import T from 'prop-types';
import * as d3 from 'd3';

import { glsp } from '../../styles/utils/theme-values';
import { themeVal } from '../../styles/utils/general';
import Prose from '../../styles/type/prose';
import Heading, { headingAlt, Subheading } from '../../styles/type/heading';
import SimpleLineChart from '../common/simple-line-chart/chart';

import { formatThousands } from '../../utils/format';

import Panel, {
  PanelHeadline,
  PanelTitle
} from '../common/panel';

import ShadowScrollbar from '../common/shadow-scrollbar';
import FilterAoi from './filter-aoi';
import { format } from 'date-fns';
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

const InsightsDetails = styled.dl`
  dt {
    ${headingAlt}
    margin: 0 0 ${glsp(1 / 4)} 0;
    font-size: 0.75rem;
    line-height: 1rem;
  }

  dd {
    font-size: 1.25rem;
    font-weight: ${themeVal('type.base.bold')};
    line-height: 1;
    margin: 0 0 ${glsp()} 0;
  }
`;

class ExpMapSecPanel extends React.Component {
  renderContent () {
    const { tempNo2Data } = this.props;
    // const { adminArea, indicatorsConfig } = this.props;

    // if (!indicatorsConfig) {
    //   return null;
    // }

    if (!tempNo2Data || !tempNo2Data.isReady()) {
      return <p>There is no area of interest defined.</p>;
    }

    // const adminAreaData = adminArea.getData();
    // const { tsData } = adminAreaData;
    // const mobilityData = tsData[0];

    const data = tempNo2Data.getData();
    const xDomain = [
      utcDate(data[0].date),
      utcDate(data[data.length - 1].date)
    ];
    const yDomain = d3.extent(data, d => d.value);

    return (
      <div>
        {/* {adminAreaData.staticData
          ? (
            <InsightsDetails>
              {indicatorsConfig.map((ind) => (
                <React.Fragment key={ind.attribute}>
                  <dt>{ind.description}</dt>
                  <dd>{formatThousands(adminAreaData.staticData[ind.attribute], { decimals: 1 }) || 'n/a'}</dd>
                </React.Fragment>
              ))}
            </InsightsDetails>
          )
          : <p>No indicators available.</p>} */}
        <Heading as='h2'>NO2 Concentration</Heading>
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
          <BodyScroll
            topShadowVariation='dark'
            bottomShadowVariation='dark'
          >
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
  selectedAdminArea: T.string,
  indicatorsConfig: T.array,
  adminArea: T.object
};

export default ExpMapSecPanel;
