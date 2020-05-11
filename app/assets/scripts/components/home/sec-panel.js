import React from 'react';
import styled from 'styled-components';
import T from 'prop-types';

import { glsp } from '../../styles/utils/theme-values';
import { themeVal } from '../../styles/utils/general';
import Prose from '../../styles/type/prose';
import Heading, { headingAlt, Subheading } from '../../styles/type/heading';
import { LineChart } from '../common/line-chart';

import { formatThousands } from '../../utils/format';

import Panel, {
  PanelHeadline,
  PanelTitle
} from '../common/panel';

import ShadowScrollbar from '../common/shadow-scrollbar';

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
    const { adminArea, indicatorsConfig } = this.props;

    if (!indicatorsConfig) {
      return null;
    }

    if (!adminArea || !adminArea.isReady()) {
      return <p>Select an area to get started.</p>;
    }

    const adminAreaData = adminArea.getData();
    const { tsData } = adminAreaData;
    const mobilityData = tsData[0];

    return (
      <Prose>
        <div>
          <Heading size='large' as='h2'>{adminAreaData.name}</Heading>
          <Subheading as='h3'>{adminAreaData.parent.name || '-'}</Subheading>
        </div>
        {adminAreaData.staticData
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
          : <p>No indicators available.</p>}
        <LineChart data={mobilityData} title='Mobility Data' />
      </Prose>
    );
  }

  render () {
    const { selectedAdminArea } = this.props;

    return (
      <Panel
        key={selectedAdminArea}
        collapsible
        initialState={!!selectedAdminArea}
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
