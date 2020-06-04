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
    .point {
      fill: ${props.swatch};
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
    const { dataCanvas, xScale, props } = ctx;
    const { height } = ctx.getSize();

    const dataSeries = dataCanvas.select('.data-extent');

    const isDiscrete = props.xDomain.length > 2;

    // When we have more than 2 date points, we are showing the individual dates
    // that are available.
    // These are represented as circles. Continuous data is represented as
    // a line.
    if (isDiscrete) {
      dataSeries.selectAll('.line').style('display', 'none');
      const points = dataSeries.selectAll('.point').data(props.xDomain);

      // Remove old.
      points.exit().remove();
      // Handle new.
      points
        .enter()
        .append('circle')
        .attr('r', 4)
        .attr('class', 'point')
        .merge(points)
        // Update current.
        .style('display', '')
        .attr('cx', d => xScale(utcDate(d)))
        .attr('cy', d => height - 8);
    } else {
      dataSeries.selectAll('.poin').style('display', 'none');
      const dateDomain = xScale.domain();
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
        .style('display', '')
        .attr('x1', d => xScale(utcDate(d[0])))
        .attr('y1', height - 8)
        .attr('x2', d => xScale(utcDate(d[1])))
        .attr('y2', height - 8);
    }
  }
};
