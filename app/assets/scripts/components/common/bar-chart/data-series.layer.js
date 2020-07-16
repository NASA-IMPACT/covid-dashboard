import { css } from 'styled-components';

import { themeVal } from '../../../styles/utils/general';
import { utcDate } from '../../../utils/utils';

const styles = props => css`
  /* Data specific styles */
  .data-series {
    .bar {
      fill: ${themeVal('color.primary')};
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
    const { height } = ctx.getSize();
    if (props.noIndicator) return;

    const dataSeries = dataCanvas.select('.data-series');

    // Append the rectangles for the bar chart
    const bars = dataSeries.selectAll('.bar')
      .data(props.data);

    // Remove old.
    bars.exit().remove();
    // Handle new.
    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .merge(bars)
      // Update current.
      .attr('x', d => xScale(utcDate(d.date)))
      .attr('width', xScale.bandwidth())
      .attr('y', d => yScale(d.indicator))
      .attr('height', d => height - yScale(d.indicator));
  }
};
