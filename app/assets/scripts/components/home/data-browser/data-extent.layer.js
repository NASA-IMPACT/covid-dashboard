import { css } from 'styled-components';

import { utcDate } from '../../../utils/utils';

const styles = props => css`
  /* Data specific styles */
  .data-extent {
    .line {
      stroke-width: 8px;
      stroke: ${props.swatch};
      stroke-linecap: round;
    }
  }
`;

export default {
  styles,
  init: ctx => {
    ctx.dataCanvas
      .append('g').attr('class', 'data-extent');
  },

  update: ctx => {
    const { dataCanvas, xScale } = ctx;
    const { height } = ctx.getSize();
    // Limit data to existing date domain.
    const dateDomain = xScale.domain();
    const dataSeries = dataCanvas.select('.data-extent');

    const lines = dataSeries.selectAll('.line').data([dateDomain]);

    // Remove old.
    lines.exit().remove();
    // Handle new.
    lines
      .enter()
      .append('line')
      .attr('class', 'line')
      .attr('fill', 'none')
      .merge(lines)
      // Update current.
      .attr('x1', d => xScale(utcDate(d[0])))
      .attr('y1', height - 8)
      .attr('x2', d => xScale(utcDate(d[1])))
      .attr('y2', height - 8);
  }
};
