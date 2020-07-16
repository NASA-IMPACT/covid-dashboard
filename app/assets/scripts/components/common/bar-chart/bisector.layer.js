import * as d3 from 'd3';
import { css } from 'styled-components';
import { isWithinInterval } from 'date-fns';

import { themeVal } from '../../../styles/utils/general';
import { utcDate, bisectByDate } from '../../../utils/utils';
import { _rgba } from '../../../styles/utils/theme-values';

const styles = props => css`
  /* Bisector specific styles */
  .bisector {
    &:hover {
      cursor: pointer;
    }
    .bisector-select {
      stroke: ${themeVal('color.baseAlphaD')};
      stroke-width: 2px;
      stroke-linecap: round;
    }
    .bisector-select-label {
      font-size: 0.625rem;
      font-weight: ${themeVal('type.base.bold')};

      span {
        background-color: ${_rgba(themeVal('color.surface'), 0.80)};
      }
    }
  }
`;

export default {
  styles,
  init: ctx => {
    const bisectorG = ctx.dataCanvas
      .append('g')
      .attr('class', 'bisector');

    bisectorG
      .append('g')
      .attr('class', 'interactive-bars');

    bisectorG.append('line')
      .attr('class', 'bisector-select')
      .style('pointer-events', 'none')
      .style('display', 'none');
    // Using a foreign object is needed to include a div with the text.
    // The main reason for this is to be able to easily add a background to
    // the text.
    bisectorG.append('foreignObject')
      .attr('class', 'bisector-select-label')
      .style('pointer-events', 'none')
      .attr('transform', 'rotate(-90)')
      .append('xhtml:div')
      .append('span')
      .text('Timeline date (closest)');
  },

  update: ctx => {
    const { dataCanvas, props, xScale } = ctx;
    const { selectedDate } = ctx.props;
    const { height } = ctx.getSize();

    const interactiveBars = dataCanvas.select('.bisector .interactive-bars');

    // Append the rectangles for the bar chart
    const bars = interactiveBars.selectAll('.bar')
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
      .style('fill-opacity', 0)
      .style('pointer-events', 'all')
      .attr('x', d => xScale(utcDate(d.date)))
      .attr('width', xScale.bandwidth())
      .attr('y', 0)
      .attr('height', height)
      .on('mouseover', function () {
        const bar = d3.select(this);
        ctx.onInternalAction('bisector.show', { doc: bar.datum() });
      })
      .on('mouseout', function () {
        d3.select(this).style('fill-opacity', 0);
        ctx.onInternalAction('bisector.hide');
      })
      .on('mousemove', function () {
        d3.select(this).style('fill-opacity', 0.16);
      });

    const domain = ctx.xScale.domain();
    if (selectedDate && isWithinInterval(selectedDate, { start: domain[0], end: domain[domain.length - 1] })) {
      const closestDataPoint = bisectByDate(ctx.props.data, selectedDate);
      const xPos = ctx.xScale(utcDate(closestDataPoint.date));

      ctx.dataCanvas.select('.bisector-select')
        .style('display', '')
        .attr('y2', 0)
        .attr('y1', height)
        .attr('x1', xPos)
        .attr('x2', xPos);

      ctx.dataCanvas.select('.bisector-select-label')
        .style('display', '')
        .attr('x', -height)
        .attr('y', xPos + 2)
        .attr('width', height)
        .attr('height', 16);
    } else {
      ctx.dataCanvas.select('.bisector-select').style('display', 'none');
      ctx.dataCanvas.select('.bisector-select-label').style('display', 'none');
    }
  }
};
