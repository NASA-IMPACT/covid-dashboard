import * as d3fc from '@d3fc/d3fc-axis';
import { css } from 'styled-components';

import { themeVal } from '../../../styles/utils/general';
import { _rgba } from '../../../styles/utils/theme-values';

const styles = props => css`
  /* YAxis specific styles */
  .y.axis .axis-lines .line {
    stroke: ${themeVal('color.baseAlphaB')};
    pointer-events: none;
  }

  .chart-label-y {
    font-size: 0.75rem;
    fill: ${_rgba(themeVal('type.base.color'), 0.88)};
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
    const { svg, yScale, props } = ctx;
    const { left, top } = ctx.margin;
    const { width } = ctx.getSize();

    // const yAxis = d3fc.axisLeft(yScale).ticks(5, '.1e');
    const yAxis = d3fc.axisLeft(yScale).ticks(5);

    svg.select('.y.axis')
      .attr('transform', `translate(${left - 12},${top})`)
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

    if (props.yUnit) {
      // Axis unit
      const axisLabel = svg.selectAll('.chart-label-y').data([props.yUnit]);
      // Remove old.
      axisLabel.exit().remove();
      // Handle new.
      axisLabel
        .enter()
        .append('text')
        .merge(axisLabel)
        // Update current.
        .attr('class', 'chart-label-y')
        .text(d => d)
        .attr('x', -top - yScale(ticks[ticks.length - 1]) + 6)
        .attr('y', left)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'end')
        .attr('dy', '-0.5em');
    }
  }
};
