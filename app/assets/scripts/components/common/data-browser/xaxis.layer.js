import * as d3 from 'd3';
import * as d3fc from '@d3fc/d3fc-axis';
import { css } from 'styled-components';

const styles = props => css`
  /* XAxis specific styles */
`;

export default {
  styles,
  init: ctx => {
    ctx.svg.append('g').attr('class', 'x axis');
  },

  update: ctx => {
    const { svg, xScale } = ctx;
    const { left, top } = ctx.margin;
    const { height } = ctx.getSize();
    const { timeUnit } = ctx.props;

    /**
     * Set a tick interval from timeUnit, default is every one month.
     */
    let tickInterval;
    switch (timeUnit) {
      case 'day':
        tickInterval = d3.timeDay.every(1);
        break;
      case 'year':
        tickInterval = d3.timeYear.every(1);
        break;
      default:
        tickInterval = d3.timeMonth.every(1);
    }

    const xAxis = d3fc.axisBottom(xScale)
      .ticks(tickInterval)
      .tickFormat(d3.timeFormat('%b \'%y'));

    svg.select('.x.axis')
      .attr('transform', `translate(${left},${height + top + 8})`)
      .call(xAxis);
  }
};
