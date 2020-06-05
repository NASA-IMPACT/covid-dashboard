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
    .bisector-interact {
      stroke: ${themeVal('color.baseAlphaC')};
      stroke-width: 4px;
      stroke-linecap: round;
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

    const bisectorInteract = bisectorG.append('line')
      .attr('class', 'bisector-interact')
      .style('display', 'none');

    bisectorG.append('line')
      .attr('class', 'bisector-select')
      .style('display', 'none');
    // Using a foreign object is needed to include a div with the text.
    // The main reason for this is to be able to easily add a background to
    // the text.
    bisectorG.append('foreignObject')
      .attr('class', 'bisector-select-label')
      .attr('transform', 'rotate(-90)')
      .append('xhtml:div')
      .append('span')
      .text('Timeline date (closest)');

    bisectorG.append('rect')
      .attr('class', 'trigger-rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', function () {
        const xPos = d3.mouse(this)[0];
        const date = ctx.xScale.invert(xPos);
        const closestDataPoint = bisectByDate(ctx.props.data, date);
        bisectorInteract.style('display', '');
        ctx.onInternalAction('bisector.show', { doc: closestDataPoint });
      })
      .on('mouseout', function () {
        bisectorInteract.style('display', 'none');
        ctx.onInternalAction('bisector.hide');
      })
      .on('mousemove', function () {
        const xPos = d3.mouse(this)[0];
        const date = ctx.xScale.invert(xPos);
        const closestDataPoint = bisectByDate(ctx.props.data, date);
        const xPosSnap = ctx.xScale(utcDate(closestDataPoint.date));
        const { height } = ctx.getSize();
        bisectorInteract
          .attr('y2', 0)
          .attr('y1', height)
          .attr('x1', xPosSnap)
          .attr('x2', xPosSnap);
        ctx.onInternalAction('bisector.move', { doc: closestDataPoint });
      // })
      // .on('click', function () {
      });
  },

  update: ctx => {
    const { selectedDate } = ctx.props;

    const { width, height } = ctx.getSize();

    ctx.dataCanvas
      .select('.bisector')
      .raise()
      .style('display', '')
      .raise()
      .select('.trigger-rect')
      .attr('width', width)
      .attr('height', height);

    const domain = ctx.xScale.domain();
    if (selectedDate && isWithinInterval(selectedDate, { start: domain[0], end: domain[1] })) {
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
