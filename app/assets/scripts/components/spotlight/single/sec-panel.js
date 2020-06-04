import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import LineChart from '../../common/line-chart/chart';
import Panel, { PanelHeadline, PanelTitle } from '../../common/panel';
import ShadowScrollbar from '../../common/shadow-scrollbar';
import {
  PanelBlock,
  PanelBlockHeader,
  PanelBlockTitle
} from '../../common/panel-block';
import { Accordion, AccordionFold } from '../../common/accordion';
import Heading from '../../../styles/type/heading';

import { glsp } from '../../../styles/utils/theme-values';
import { utcDate } from '../../../utils/utils';
import collecticon from '../../../styles/collecticons';
import Prose from '../../../styles/type/prose';

const PanelSelf = styled(Panel)`
  width: 24rem;
`;

const BodyScroll = styled(ShadowScrollbar)`
  flex: 1;
  z-index: 1;
`;

export const AccordionFoldTrigger = styled.a`
  display: flex;
  align-items: center;
  margin: -${glsp(0.5)} -${glsp()};
  padding: ${glsp(0.5)} ${glsp()};

  &,
  &:visited {
    color: inherit;
  }

  &:after {
    ${collecticon('chevron-down--small')}
    margin-left: auto;
    transition: transform 240ms ease-in-out;
    transform: ${({ isExpanded }) =>
      isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const PanelBodyInner = styled.div`
  padding: ${glsp()};

  > *:not(:last-child) {
    margin-bottom: ${glsp(1.5)};
  }

  figure {
    margin-top: -1rem;
  }
`;

const Attribution = styled.p`
  font-size: 0.874rem;
  text-align: right;
  font-style: italic;
  padding-right: ${glsp(2)};
  margin-bottom: ${glsp()};
`;

export default function SecPanel (props) {
  const { onPanelChange, indicators, indicatorGroups, selectedDate } = props;

  // Ensure that we only deal with groups that have data.
  const groups = (indicatorGroups || []).filter(g => (
    g.indicators.some(indId => indicators.find(ind => ind.id === indId))
  ));

  return (
    <PanelSelf
      collapsible
      direction='right'
      onPanelChange={onPanelChange}
      headerContent={
        <PanelHeadline>
          <PanelTitle>Insights</PanelTitle>
        </PanelHeadline>
      }
      bodyContent={
        <BodyScroll>
          <Accordion allowMultiple initialState={[true]}>
            {({ checkExpanded, setExpanded }) => (
              !!groups.length && groups.map((group, idx) => (
                <AccordionFold
                  forwardedAs={PanelBlock}
                  key={group.id}
                  isFoldExpanded={checkExpanded(idx)}
                  setFoldExpanded={(v) => setExpanded(idx, v)}
                  renderHeader={({ isFoldExpanded, setFoldExpanded }) => (
                    <PanelBlockHeader>
                      <AccordionFoldTrigger
                        isExpanded={isFoldExpanded}
                        onClick={() => setFoldExpanded(!isFoldExpanded)}
                      >
                        <PanelBlockTitle>{group.label}</PanelBlockTitle>
                      </AccordionFoldTrigger>
                    </PanelBlockHeader>
                  )}
                  renderBody={() => (
                    <PanelBodyInner>
                      {group.prose && (
                        <Prose size='small'>
                          <p>{group.prose}</p>
                        </Prose>
                      )}
                      {group.indicators.map((indId) => {
                        const ind = indicators.find((o) => o.id === indId);
                        if (!ind) return null;

                        const xDomain = ind.domain.date.map(utcDate);
                        const yDomain = ind.domain.indicator;

                        return (
                          <section key={ind.id}>
                            <Prose size='small'>
                              <Heading as='h2' size='medium'>{ind.name}</Heading>
                              {ind.description && <p>{ind.description}</p>}
                              <figure>
                                <LineChart
                                  xDomain={xDomain}
                                  yDomain={yDomain}
                                  data={ind.data}
                                  yUnit={ind.units}
                                  selectedDate={selectedDate}
                                  highlightBands={
                                    ind.highlightBands &&
                                    ind.highlightBands.length
                                      ? ind.highlightBands
                                      : null
                                  }
                                  noBaseline={
                                    ind.data[0].baseline === undefined
                                  }
                                  noBaselineConfidence
                                  noIndicatorConfidence
                                />
                                {ind.attribution && (
                                  <figcaption>
                                    <Attribution>
                                      By: {ind.attribution}
                                    </Attribution>
                                  </figcaption>
                                )}
                              </figure>
                              {ind.prose && <p>{ind.prose}</p>}
                            </Prose>
                          </section>
                        );
                      })}
                    </PanelBodyInner>
                  )}
                />
              ))
            )}
          </Accordion>
        </BodyScroll>
      }
    />
  );
}

SecPanel.propTypes = {
  onPanelChange: T.func,
  indicators: T.array,
  indicatorGroups: T.array,
  selectedDate: T.object
};
