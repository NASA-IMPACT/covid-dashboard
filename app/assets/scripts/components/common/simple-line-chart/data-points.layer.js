import * as d3 from 'd3';
import { css } from 'styled-components';
import { isBefore, isAfter } from 'date-fns';

import { utcDate } from '../../../utils/utils';
import { themeVal } from '../../../styles/utils/general';

const styles = props => css`
  /* Data specific styles */
  .data-series {
    .line {
      stroke-width: 1px;
      stroke: ${themeVal('color.base')};
    }
    .point {
      fill: ${themeVal('color.base')};
    }
  }
`;

export default {
  styles,
  init: ctx => {
    ctx.dataCanvas
      .append('g').attr('class', 'data-series');
  },

  update: ctx => {
    const { dataCanvas, props, xScale, yScale } = ctx;
    // Limit data to existing date domain.
    const dateDomain = xScale.domain();
    const data = props.data.filter(d => {
      const date = utcDate(d.date);
      return !isBefore(date, dateDomain[0]) && !isAfter(date, dateDomain[1]);
    })
      .filter(d => d.value);

    const dataSeries = dataCanvas.select('.data-series');

    const line = d3.line()
      .defined(d => d.value !== null)
      .x(d => xScale(utcDate(d.date)))
      .y(d => yScale(d.value));

    const lines = dataSeries.selectAll('.line').data([data]);

    // Remove old.
    lines.exit().remove();
    // Handle new.
    lines
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .merge(lines)
      // Update current.
      .attr('d', line);

    const points = dataSeries
      .selectAll('.point')
      .data(data);

    // Remove old.
    points.exit().remove();
    // Handle new.
    points
      .enter()
      .append('circle')
      .attr('r', 2)
      .attr('class', 'point')
      .merge(points)
      // Update current.
      .attr('cx', d => xScale(utcDate(d.date)))
      .attr('cy', d => yScale(d.value));
  }
};
