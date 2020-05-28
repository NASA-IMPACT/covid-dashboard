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

    const xAxis = d3fc.axisBottom(xScale)
      .tickSize(0)
      .tickPadding(8)
      .ticks(4)
      .tickFormat(d3.timeFormat('%b %y\''));

    svg.select('.x.axis')
      .attr('transform', `translate(${left},${height + top + 8})`)
      .call(d3fc.axisLabelRotate(xAxis).labelRotate(0));
  }
};
