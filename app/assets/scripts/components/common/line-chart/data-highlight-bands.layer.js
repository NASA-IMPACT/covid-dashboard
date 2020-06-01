import { css } from 'styled-components';

import { utcDate } from '../../../utils/utils';
import { themeVal } from '../../../styles/utils/general';
import { _rgba } from '../../../styles/utils/theme-values';

const styles = props => css`
  /* Data specific styles */
  .data-bands {
    .band {
      fill-opacity: 0.16;
      fill: ${themeVal('color.tertiary')};
    }

    .label {
      font-size: 0.875rem;
      fill: ${_rgba(themeVal('type.base.color'), 0.96)};
    }
  }
`;

export default {
  styles,
  init: ctx => {
    ctx.dataCanvas
      .append('g').attr('class', 'data-bands');
    ctx.dataCanvas
      .append('g').attr('class', 'data-bands-labels');
  },

  update: ctx => {
    const { dataCanvas, props, xScale } = ctx;
    if (!props.highlightBands) return;

    const { height } = ctx.getSize();
    // Limit data to existing date domain.
    const data = props.highlightBands;

    const bands = dataCanvas
      .select('.data-bands')
      .selectAll('.band')
      .data(data);

    // Remove old.
    bands.exit().remove();
    // Handle new.
    bands
      .enter()
      .append('rect')
      .attr('class', 'band')
      .merge(bands)
      // Update current.
      .attr('x', d => xScale(utcDate(d.interval[0])))
      .attr('y', 0)
      .attr('width', d => xScale(utcDate(d.interval[1])) - xScale(utcDate(d.interval[0])))
      .attr('height', height);

    const labels = dataCanvas
      .select('.data-bands-labels')
      .selectAll('.label')
      .raise()
      .data(data);

    // Remove old.
    labels.exit().remove();
    // Handle new.
    labels
      .enter()
      .append('text')
      .attr('class', 'label')
      .merge(labels)
      // Update current.
      .text(d => d.label)
      .attr('y', d => xScale(utcDate(d.interval[0])))
      .attr('x', 0)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'end')
      .attr('dy', '1.15em')
      .attr('dx', '-0.25em');
  }
};
