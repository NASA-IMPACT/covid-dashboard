import { css } from 'styled-components';

import { utcDate } from '../../../utils/utils';
import { themeVal } from '../../../styles/utils/general';

const styles = props => css`
  /* Data specific styles */
  .data-bands {
    .band {
      fill-opacity: 0.16;
      fill: ${themeVal('color.tertiary')};
    }
  }
`;

export default {
  styles,
  init: ctx => {
    ctx.dataCanvas
      .append('g').attr('class', 'data-bands');
  },

  update: ctx => {
    const { dataCanvas, props, xScale } = ctx;
    if (!props.highlightBands) return;

    const { height } = ctx.getSize();
    // Limit data to existing date domain.
    const data = props.highlightBands;

    const dataContainer = dataCanvas.select('.data-bands');

    const bands = dataContainer.selectAll('.band').data(data);

    // Remove old.
    bands.exit().remove();
    // Handle new.
    bands
      .enter()
      .append('rect')
      .attr('class', 'band')
      .merge(bands)
      // Update current.
      .attr('x', d => xScale(utcDate(d[0])))
      .attr('y', 0)
      .attr('width', d => xScale(utcDate(d[1])) - xScale(utcDate(d[0])))
      .attr('height', height);
  }
};
