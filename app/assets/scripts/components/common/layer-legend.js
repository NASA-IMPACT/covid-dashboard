import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import { themeVal } from '../../styles/utils/general';
import { visuallyHidden, truncated } from '../../styles/helpers';
import { glsp } from '../../styles/utils/theme-values';
import { headingAlt } from '../../styles/type/heading';
import { formatThousands } from '../../utils/format';

import GradientChart from './gradient-legend-chart/chart';

const makeGradient = (stops) => {
  const d = 100 / stops.length - 1;
  const steps = stops.map((s, i) => `${s} ${i * d}%`);
  return `linear-gradient(to right, ${steps.join(', ')})`;
};

const printLegendVal = (val) =>
  typeof val === 'number' ? formatThousands(val, { shorten: true }) : val;

const LayerLegendSelf = styled.div`
  grid-row: 2;
  grid-column: 1 / span 2;
`;

const LegendList = styled.dl`
  display: grid;
  grid-gap: 0 ${glsp(1 / 8)};
  grid-auto-columns: minmax(1rem, 1fr);
  grid-auto-flow: column;

  dt {
    grid-row: 1;
  }

  dd {
    ${headingAlt()}
    font-size: 0.75rem;
    line-height: 1rem;
    grid-row: 2;
    display: flex;

    /* stylelint-disable-next-line no-descending-specificity */
    > * {
      width: 8rem;

      /* stylelint-disable-next-line no-descending-specificity */
      > * {
        ${truncated()}
        display: block;
      }

      &:last-child:not(:first-child) {
        text-align: right;
      }
    }

    &:last-of-type:not(:first-of-type) {
      justify-content: flex-end;
      text-align: right;
    }

    &:not(:first-of-type):not(:last-of-type) {
      ${visuallyHidden()}
    }

    i {
      margin: 0 auto;
      opacity: 0;
    }
  }
`;

const LegendSwatch = styled.span`
  display: block;
  font-size: 0;
  height: 0.5rem;
  border-radius: ${themeVal('shape.rounded')};
  background: ${({ stops }) =>
    typeof stops === 'string' ? stops : makeGradient(stops)};
  margin: 0 0 ${glsp(1 / 8)} 0;
  box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaB')};
  cursor: ${(props) => (props['data-tip'] ? 'help' : 'auto')};
`;

const LayerLegendTitle = styled.h2`
  ${visuallyHidden()}
`;

function LayerLegend (props) {
  const { dataOrder, legend, knobPos, onLegendKnobChange, id } = props;

  if (!legend) return null;

  // The categorical legend uses stops differently than the others.
  if (legend.type === 'categorical') {
    return (
      <LayerLegendSelf>
        <LayerLegendTitle>Legend</LayerLegendTitle>
        <LegendList>
          {legend.stops.map((stop) => (
            <React.Fragment key={stop.color}>
              <dt>
                <LegendSwatch stops={stop.color} data-tip={stop.label}>
                  {stop.color}
                </LegendSwatch>
              </dt>
              <dd>
                {/*
                    The 2 spans are needed so that the text can be correctly
                    truncated. The dd element is part of a grid and has an
                    implicit width. The first span overflows the dd, setting
                    the final width and the second span truncates the text.
                  */}
                <span>
                  <span>{stop.label}</span>
                </span>
              </dd>
            </React.Fragment>
          ))}
        </LegendList>
      </LayerLegendSelf>
    );
  }

  let defaultStops;
  // Two default styles:
  // - highlight-high - where a high value needs to be highlighted (high % of 65+)
  // - highlight-low - where low values are highlighted (m2 living area per person)
  switch (dataOrder) {
    case 'highlight-low':
      defaultStops = [
        'hsla(105, 91%, 67%, 0.69)',
        'hsla(173, 75%, 66%, 0.69)',
        'hsla(180, 92%, 56%, 0.68)',
        'hsla(188, 28%, 52%, 0.69)',
        'hsla(212, 54%, 42%, 0.63)'
      ];
      break;
    default:
      defaultStops = [
        'hsla(212, 54%, 42%, 0.63)',
        'hsla(188, 28%, 52%, 0.69)',
        'hsla(180, 92%, 56%, 0.68)',
        'hsla(173, 75%, 66%, 0.69)',
        'hsla(105, 91%, 67%, 0.69)'
      ];
  }

  const stops =
    legend.stops && legend.stops !== 'default' ? legend.stops : defaultStops;

  if (legend.type === 'gradient-adjustable') {
    return (
      <LayerLegendSelf>
        <LayerLegendTitle>Legend</LayerLegendTitle>
        <LegendList>
          <dt>
            <GradientChart
              onAction={(a, p) => {
                onLegendKnobChange(p);
              }}
              stops={stops}
              knobPos={knobPos !== undefined ? knobPos : 50}
              id={id}
            />
          </dt>
          <dd>
            <span>{printLegendVal(legend.min)}</span>
            <i> – </i>
            <span>{printLegendVal(legend.max)}</span>
          </dd>
        </LegendList>
      </LayerLegendSelf>
    );
  }

  return (
    <LayerLegendSelf>
      <LayerLegendTitle>Legend</LayerLegendTitle>
      <LegendList>
        <dt>
          <LegendSwatch stops={stops}>
            {stops[0]} to {stops[stops.length - 1]}
          </LegendSwatch>
        </dt>
        <dd>
          <span>{printLegendVal(legend.min)}</span>
          <i> – </i>
          <span>{printLegendVal(legend.max)}</span>
        </dd>
      </LegendList>
    </LayerLegendSelf>
  );
}

LayerLegend.propTypes = {
  id: T.string,
  type: T.string,
  dataOrder: T.string,
  legend: T.shape({
    min: T.oneOfType([T.number, T.string]),
    max: T.oneOfType([T.number, T.string]),
    type: T.string,
    stops: T.array
  }),
  onLegendKnobChange: T.func,
  knobPos: T.number
};

export default LayerLegend;
