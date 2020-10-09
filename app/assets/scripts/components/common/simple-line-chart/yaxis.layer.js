import * as d3fc from '@d3fc/d3fc-axis';
import { css } from 'styled-components';

import { themeVal } from '../../../styles/utils/general';

const styles = props => css`
  /* YAxis specific styles */
  .y.axis .axis-lines .line {
    stroke: ${themeVal('color.baseAlphaB')};
  }
`;

export default {
  styles,
  init: ctx => {
    ctx.svg
      .append('g').attr('class', 'y axis')
      .append('g').attr('class', 'axis-lines');
  },

  update: ctx => {
    const { svg, yScale } = ctx;
    const { left, top } = ctx.margin;
    const { width } = ctx.getSize();

    const yAxis = d3fc.axisLeft(yScale).ticks(5, '.3~g');

    svg.select('.y.axis')
      .attr('transform', `translate(${left - 8},${top})`)
      .call(yAxis);

    const ticks = yScale.ticks(5);

    const axisLines = svg.select('.y.axis .axis-lines').selectAll('.line')
      .data(ticks);

    // Remove old.
    axisLines.exit().remove();
    // Handle new.
    axisLines
      .enter()
      .append('line')
      .merge(axisLines)
      // Update current.
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))
      .attr('x1', 0)
      .attr('x2', width + 16)
      .attr('class', 'line');
  }
};
