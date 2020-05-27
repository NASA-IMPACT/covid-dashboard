import * as d3 from 'd3';
import { css } from 'styled-components';

import { utcDate } from '../../../utils/utils';
import { themeVal } from '../../../styles/utils/general';
import { bisectorPoints } from './utils';

const styles = props => css`
  /* Data specific styles */
  .data-baseline {
    .baseline {
      stroke: ${themeVal('color.secondary')};

      &.base {
        stroke-width: 2px;
        stroke-opacity: 0.48;
      }

      &.min, &.max {
        stroke-width: 1px;
        stroke-opacity: 0.16;
      }
    }

    .range {
      fill-opacity: 0.08;
      fill: ${themeVal('color.secondary')};
    }

    .bisector-point {
      stroke: ${themeVal('color.secondary')};
      stroke-width: 2px;
      fill: none;
    }
  }
`;

export default {
  styles,
  init: ctx => {
    ctx.dataCanvas
      .append('g').attr('class', 'data-baseline');
  },

  update: ctx => {
    const { dataCanvas, props, xScale, yScale } = ctx;
    if (props.noBaseline) return;
    // Limit data to existing date domain.
    const data = props.data;

    const dataSeries = dataCanvas.select('.data-baseline');

    if (!props.noBaselineConfidence) {
      const area = d3.area()
        .x(d => xScale(utcDate(d.date)))
        .y0(d => yScale(d.baselineMax))
        .y1(d => yScale(d.baselineMin));

      const baselineRange = dataSeries.selectAll('.range').data([data]);

      // Remove old.
      baselineRange.exit().remove();
      // Handle new.
      baselineRange
        .enter()
        .append('path')
        .attr('class', 'range')
        .merge(baselineRange)
        // Update current.
        .attr('d', area);
    }

    // Create data array for all the lines: min, max, and base.
    // This allows us to reuse the line function and code.
    const mapData = prop => data.map(d => ({
      date: d.date,
      value: d[prop]
    }));
    let linesData = [
      {
        id: 'base',
        data: mapData('baseline')
      }
    ];

    if (!props.noBaselineConfidence) {
      linesData = [
        {
          id: 'max',
          data: mapData('baselineMax')
        },
        ...linesData,
        {
          id: 'min',
          data: mapData('baselineMin')
        }
      ];
    }

    const lines = dataSeries.selectAll('.baseline').data(linesData);

    // Remove old.
    lines.exit().remove();
    // Handle new.
    lines
      .enter()
      .append('path')
      .attr('class', d => `baseline ${d.id}`)
      .attr('fill', 'none')
      .merge(lines)
      // Update current.
      .attr('d', d => ctx.line(d.data));

    // Show the bisector point if needed.
    const bisectorPointData = ctx.state.bisecting ? [ctx.state.doc] : [];
    dataSeries.call(
      bisectorPoints(bisectorPointData)
        .x(xScale)
        .y(yScale)
        .yProp('baseline')
    );
  }
};
