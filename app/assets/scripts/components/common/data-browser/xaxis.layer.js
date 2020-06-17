import * as d3 from 'd3';
import * as d3fc from '@d3fc/d3fc-axis';
import { css } from 'styled-components';
import { differenceInMonths } from 'date-fns';

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
    const { height, width } = ctx.getSize();

    // Calculate max tick count from element width
    const minTickSpacing = 80; // in pixels
    const maxTickCount = Math.floor(width / minTickSpacing);

    // Calculate ideal tick count from number of months in domain
    const [startDate, endDate] = ctx.getXDomain();
    const tickCount = differenceInMonths(endDate, startDate);

    const xAxis = d3fc.axisBottom(xScale)
      .ticks(Math.min(tickCount, maxTickCount))
      .tickFormat(d3.timeFormat('%b \'%y'));

    svg.select('.x.axis')
      .attr('transform', `translate(${left},${height + top + 8})`)
      .call(xAxis);
  }
};
