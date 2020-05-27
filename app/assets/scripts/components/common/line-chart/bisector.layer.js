import * as d3 from 'd3';
import { css } from 'styled-components';

import { themeVal } from '../../../styles/utils/general';
import { utcDate } from '../../../utils/utils';

const bisectByDate = (data, date) => {
  // Define bisector function. Is used to find where this date would fin in the
  // data array
  const bisect = d3.bisector(data => (new Date(data.date)).getTime()).left;
  const mouseDate = date.getTime();
  // Returns the index to the current data item.
  const i = bisect(data, mouseDate);

  if (i === 0) {
    return data[i];
  } else if (i === data.length) {
    return data[i - 1];
  } else {
    const docR = data[i];
    const docL = data[i - 1];
    const deltaL = mouseDate - (new Date(docL.date)).getTime();
    const deltaR = (new Date(docR.date)).getTime() - mouseDate;
    return deltaL > deltaR
      ? docR
      : docL;
  }
};

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
      stroke: ${themeVal('color.base')};
      stroke-width: 4px;
      stroke-linecap: round;
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

    // bisectorG.append('line')
    //   .attr('class', 'bisector-select');

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
    // const { selectedDate } = ctx.props;

    const { width, height } = ctx.getSize();

    ctx.dataCanvas
      .select('.bisector')
      .style('display', '')
      .raise()
      .select('.trigger-rect')
      .attr('width', width)
      .attr('height', height);

    // const xPos = ctx.xScale(selectedDate);

    // ctx.dataCanvas.select('.bisector-select')
    //   .attr('y2', 0)
    //   .attr('y1', height)
    //   .attr('x1', xPos)
    //   .attr('x2', xPos);
  }
};
