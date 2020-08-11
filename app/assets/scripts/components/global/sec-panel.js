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
import media, { isLargeViewport } from '../../styles/utils/media-queries';
import DatePicker from '../common/date-picker';
import { differenceInMonths, differenceInDays } from 'date-fns';

import SummaryExpandable from '../common/summary-expandable';

const PanelSelf = styled(Panel)`
  ${media.largeUp`
    width: 30rem;
  `}
`;

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

const InsightHeadline = styled.div`
  display: flex;

  > *:last-child {
    margin-left: auto;
  }
`;

class ExpMapSecPanel extends React.Component {
  renderContent () {
    const {
      cogTimeData,
      aoiFeature,
      layers,
      cogLayersSettings,
      cogDateRanges,
      onAction
    } = this.props;

    if (!aoiFeature) {
      return <p>There is no area of interest defined.</p>;
    }

    if (!layers.length) {
      return <p>There are no layers with time data enabled.</p>;
    }

    return layers.map(l => {
      const cogData = cogTimeData[l.id];
      const cogLayerDef = cogLayersSettings[l.id];

      if (!cogData || !cogData.isReady()) {
        return null;
      }

      const data = cogData.getData();
      const xDomain = [
        utcDate(data[0].date),
        utcDate(data[data.length - 1].date)
      ];
      const pickerDateDomain = [
        utcDate(l.domain[0]),
        utcDate(l.domain[l.domain.length - 1])
      ];
      const yDomain = d3.extent(data, d => d.value);

      const dateRange = cogDateRanges[l.id] || {
        start: null,
        end: null
      };

      const timeUnit = l.timeUnit || 'month';

      const validateDateRange = ({ start, end }) => {
        if (timeUnit === 'month') {
          const diff = differenceInMonths(end, start);
          if (isNaN(diff) || diff < 3) {
            return <>A date range for <em>{l.name}</em> must have 3 or more months</>;
          }
        } else {
          const diff = differenceInDays(end, start);
          if (isNaN(diff) || diff < 7) {
            return <>A date range for <em>{l.name}</em> must have 7 or more days</>;
          }
        }
      };

      return (
        <div key={l.id}>
          <header>
            <InsightHeadline>
              <Heading as='h2'>{cogLayerDef.title}</Heading>
              <DatePicker
                dateState={dateRange}
                dateDomain={pickerDateDomain}
                validate={validateDateRange}
                onChange={(selectedDate) =>
                  onAction('cog.date-range', { id: l.id, date: selectedDate })}
              />
            </InsightHeadline>
            <small>{cogLayerDef.unit}</small>
          </header>
          <SimpleLineChart
            xDomain={xDomain}
            yDomain={yDomain}
            data={data}
          />
        </div>
      );
    });
  }

  render () {
    return (
      <PanelSelf
        collapsible
        direction='right'
        onPanelChange={this.props.onPanelChange}
        initialState={isLargeViewport()}
        headerContent={
          <PanelHeadline>
            <PanelTitle>Insights</PanelTitle>
          </PanelHeadline>
        }
        bodyContent={
          <BodyScroll>
            <SummaryExpandable>
              <p>As communities around the world have changed their behavior in response to the spread of novel coronavirus, NASA satellites have observed associated changes in the environment.</p>
              <p>Use the dashboard to interact with real NASA data and investigate how social distancing measures and regional shelter-in-place guidelines have affected Earth’s air, land, and water.</p>
              <p>Explore global changes in nitrogen dioxide (NO<sub>2</sub>), a common air pollutant, and carbon dioxide (CO<sub>2</sub>), a potent greenhouse gas, on the worldwide map, or see how localized changes in water quality, nightlights, and other economic indicators for specific spotlight areas may have been influenced by changes in our behavior due to COVID-19.</p>
              <p>This experimental dashboard will continue to evolve as more data become available.</p>
            </SummaryExpandable>
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
  onAction: T.func,
  onPanelChange: T.func,
  layers: T.array,
  aoiFeature: T.object,
  cogTimeData: T.object,
  cogDateRanges: T.object,
  cogLayersSettings: T.object
};

export default ExpMapSecPanel;
