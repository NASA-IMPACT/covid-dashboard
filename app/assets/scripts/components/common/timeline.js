import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import { add, sub, format, isSameMonth, isSameDay } from 'date-fns';

import Button from '../../styles/button/button';
import ButtonGroup from '../../styles/button/group';
import DataBrowserChart from './data-browser/chart';
import ShadowScrollbar from './shadow-scrollbar';

import { panelSkin } from '../../styles/skins';
import { glsp } from '../../styles/utils/theme-values';
import { themeVal } from '../../styles/utils/general';
import { utcDate } from '../../utils/utils';

const checkSameDate = (date, compareDate, interval) => {
  if (interval === 'day') {
    return isSameDay(date, compareDate);
  } else {
    return isSameMonth(date, compareDate);
  }
};

const getNextDate = (domain, date, timeUnit) => {
  // If we're working with a discrete domain, get the closest value.
  if (domain.length > 2) {
    const currIdx = domain.findIndex(d => isSameDay(d, date));
    if (currIdx < 0 || currIdx >= domain.length - 1) return null;
    return domain[currIdx + 1];
  } else {
    // If we only have start and end, round based on time unit.
    return add(date, getOperationParam(timeUnit));
  }
};

const getPrevDate = (domain, date, timeUnit) => {
  // If we're working with a discrete domain, get the closest value.
  if (domain.length > 2) {
    const currIdx = domain.findIndex(d => isSameDay(d, date));
    if (currIdx <= 0) return null;
    return domain[currIdx - 1];
  } else {
    // If we only have start and end, round based on time unit.
    return sub(date, getOperationParam(timeUnit));
  }
};

const getOperationParam = (interval) => {
  if (interval === 'day') {
    return { days: 1 };
  } else {
    return { months: 1 };
  }
};

const formatDate = (date, interval) => {
  if (interval === 'day') {
    return format(date, "dd MMM ''yy");
  } else {
    return format(date, "MMM ''yy");
  }
};

const ExploreDataBrowser = styled.section`
  ${panelSkin()}
  position: relative;
  display: flex;
  flex-flow: column;
  min-width: 0;
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
  display: flex;
  height: 6rem;
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

const CurrentDate = styled.p`
  font-weight: ${themeVal('type.base.bold')};
`;

export const DataBrowserBodyScroll = styled(ShadowScrollbar)`
  flex: 1;
  z-index: 1;
`;

class Timeline extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isExpanded: true
    };
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.isActive !== this.props.isActive ||
      prevState.isExpanded !== this.state.isExpanded
    ) {
      this.props.onSizeChange && this.props.onSizeChange();
    }
  }

  render () {
    const { date, onAction, isActive, layers } = this.props;

    if (!isActive) return null;

    const dateDomain = layers[0].domain.map(utcDate);
    const swatch = layers[0].swatch.color;

    const timeUnit = layers[0].timeUnit || 'month';

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
                Timeline
              </TimelineExpanderButton>
            </ExploreDataBrowserTitle>
          </ExploreDataBrowserHeadline>
          <ExploreDataBrowserActions>
            <CurrentDate>
              {date ? formatDate(date, timeUnit) : 'Select date'}
            </CurrentDate>
            <ButtonGroup orientation='horizontal'>
              <Button
                disabled={!date || checkSameDate(date, dateDomain[0], timeUnit)}
                variation='base-plain'
                size='small'
                useIcon='chevron-left--small'
                title='Previous entry'
                hideText
                onClick={() =>
                  onAction('date.set', { date: getPrevDate(dateDomain, date, timeUnit) })}
              >
                Previous entry
              </Button>
              <Button
                disabled={!date || checkSameDate(date, dateDomain[dateDomain.length - 1], timeUnit)}
                variation='base-plain'
                size='small'
                useIcon='chevron-right--small'
                title='Next entry'
                hideText
                onClick={() =>
                  onAction('date.set', { date: getNextDate(dateDomain, date, timeUnit) })}
              >
                Next entry
              </Button>
            </ButtonGroup>
          </ExploreDataBrowserActions>
        </ExploreDataBrowserHeader>
        <ExploreDataBrowserBody isExpanded={this.state.isExpanded}>
          <DataBrowserBodyScroll>
            <DataBrowserChart
              selectedDate={date}
              timeUnit={timeUnit}
              onAction={onAction}
              xDomain={dateDomain}
              swatch={swatch}
            />
          </DataBrowserBodyScroll>
        </ExploreDataBrowserBody>
      </ExploreDataBrowser>
    );
  }
}

Timeline.propTypes = {
  onAction: T.func,
  onSizeChange: T.func,
  date: T.object,
  layers: T.array,
  isActive: T.bool
};

export default Timeline;
