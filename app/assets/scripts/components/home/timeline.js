import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import { add, sub, isEqual } from 'date-fns';

import Button from '../../styles/button/button';
import ButtonGroup from '../../styles/button/group';
import DatePicker from './date-picker';
import DataBrowserChart from './data-browser/chart';
import ShadowScrollbar from '../common/shadow-scrollbar';
import { Accordion, AccordionFold } from '../common/accordion';

import { panelSkin } from '../../styles/skins';
import { glsp } from '../../styles/utils/theme-values';
import collecticon from '../../styles/collecticons';
import { themeVal } from '../../styles/utils/general';
import { unionOverviewDateDomain } from './';

const ExploreDataBrowser = styled.section`
  ${panelSkin()}
  position: relative;
  display: flex;
  flex-flow: column;
`;

const ExploreDataBrowserHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  padding: ${glsp(0.5)} ${glsp()};
`;

const ExploreDataBrowserHeadline = styled.div`
  margin-right: ${glsp()};
`;

const ExploreDataBrowserTitle = styled.h1`
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0;

  > * {
    margin-left: -0.5rem;
  }
`;

const TimelineExpanderButton = styled(Button)`
  font-size: inherit;
  line-height: inherit;
`;

const ExploreDataBrowserBody = styled.div`
  height: auto;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.16s ease 0s, padding 0.16s ease 0s, opacity 0.16s ease 0s;

  ${(props) =>
    props.isExpanded &&
    css`
      max-height: 100vh;
      opacity: 1;
      padding: 0 0 ${glsp(0.5)} 0;
    `}
`;

const ExploreDataBrowserActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  > *:not(:last-child) {
    margin-right: ${glsp(1 / 2)};
  }

  > *:last-child {
    margin-right: -0.5rem;
  }
`;

const ChartScrollArea = styled(ShadowScrollbar)`
  height: 10rem;
`;

const DataChartFoldHeader = styled.header`
  padding: ${glsp(0.5)} 0.75rem;
  box-shadow: 0 1px 0 0 ${themeVal('color.spark')};
`;

const DataChartFoldTitle = styled.a`
  display: flex;
  align-items: center;

  &, &:visited {
    color: #FFF;
  }

  ::before {
    content: '';
    display: block;
    width: 0.25rem;
    height: 1rem;
    margin-right: ${glsp(0.25)};
    border-radius: ${themeVal('shape.ellipsoid')};
    background: ${({ swatch }) => swatch};
  }

  ::after {
    ${collecticon('chevron-down--small')};
    margin-left: auto;
    transition: transform 320ms ease-in-out 0s;

    ${({ isExpanded }) => isExpanded && 'transform: rotate(180deg);'}
  }

  h2 {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

class Timeline extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isExpanded: true
    };
  }

  renderDataBrowserChart (dateDomain) {
    const { date, onAction, overview, layers } = this.props;

    return (
      <ChartScrollArea
        topShadowVariation='dark'
        bottomShadowVariation='dark'
      >
        <Accordion allowMultiple initialState={[true]}>
          {({ checkExpanded, setExpanded, canContract }) => (
            overview.map((o, idx) => {
              const overviewData = o.getData();
              const yDomain = overviewData.domain;
              const timelineData = overviewData.aggregate;

              const layerData = layers.find(l => l.id === overviewData.id);

              return (
                <AccordionFold
                  key={overviewData.id}
                  isFoldExpanded={checkExpanded(idx)}
                  setFoldExpanded={v => setExpanded(idx, v)}
                  renderHeader={({ isFoldExpanded, setFoldExpanded }) => (
                    <DataChartFoldHeader>
                      <DataChartFoldTitle
                        href='#'
                        swatch={layerData.swatch.color}
                        title='Open/Close timeseries chart'
                        isExpanded={isFoldExpanded}
                        canContract={canContract(idx)}
                        onClick={(e) => { e.preventDefault(); setFoldExpanded(!isFoldExpanded); }}
                      >
                        <h2>{layerData.label}</h2>
                      </DataChartFoldTitle>
                    </DataChartFoldHeader>
                  )}
                  renderBody={() => (
                    <DataBrowserChart
                      selectedDate={date}
                      onAction={onAction}
                      xDomain={dateDomain}
                      yDomain={yDomain}
                      data={timelineData}
                      swatch={layerData.swatch.color}
                    />
                  )}
                />
              );
            })
          )}
        </Accordion>
      </ChartScrollArea>
    );
  }

  render () {
    const { date, onAction, isActive, layers, overview } = this.props;

    if (!isActive || !overview.length) return null;

    // Wait until all the overviews are ready.
    if (overview.some((o) => !o.isReady())) return null;

    // Compute date intersection between all the overviews.
    const dateDomain = unionOverviewDateDomain(overview);

    return (
      <ExploreDataBrowser>
        <ExploreDataBrowserHeader>
          <ExploreDataBrowserHeadline>
            <ExploreDataBrowserTitle>
              <TimelineExpanderButton
                as='a'
                title='Expand/collapse timeline panel'
                to='#explore-data-browser-body'
                variation='base-plain'
                size='small'
                useIcon={['expand-collapse', 'after']}
                onClick={() =>
                  this.setState(({ isExpanded }) => ({
                    isExpanded: !isExpanded
                  }))}
              >
                {layers.length > 1 ? 'Timelines' : 'Timeline'}
              </TimelineExpanderButton>
            </ExploreDataBrowserTitle>
          </ExploreDataBrowserHeadline>
          <ExploreDataBrowserActions>
            <DatePicker
              dateState={date}
              dateDomain={dateDomain}
              onChange={(selectedDate) =>
                onAction('date.set', { date: selectedDate })}
            />
            <ButtonGroup orientation='horizontal'>
              <Button
                disabled={!date || isEqual(date, dateDomain[0])}
                variation='base-plain'
                size='small'
                useIcon='chevron-left--small'
                title='Previous day'
                hideText
                onClick={() =>
                  onAction('date.set', { date: sub(date, { days: 1 }) })}
              >
                Previous day
              </Button>
              <Button
                disabled={!date || isEqual(date, dateDomain[1])}
                variation='base-plain'
                size='small'
                useIcon='chevron-right--small'
                title='Next day'
                hideText
                onClick={() =>
                  onAction('date.set', { date: add(date, { days: 1 }) })}
              >
                Next day
              </Button>
            </ButtonGroup>
          </ExploreDataBrowserActions>
        </ExploreDataBrowserHeader>
        <ExploreDataBrowserBody isExpanded={this.state.isExpanded}>
          {this.renderDataBrowserChart(dateDomain)}
        </ExploreDataBrowserBody>
      </ExploreDataBrowser>
    );
  }
}

Timeline.propTypes = {
  onAction: T.func,
  date: T.object,
  layers: T.array,
  isActive: T.bool,
  overview: T.array
};

export default Timeline;
