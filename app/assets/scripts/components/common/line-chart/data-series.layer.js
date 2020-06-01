import * as d3 from 'd3';
import { css } from 'styled-components';

import { utcDate } from '../../../utils/utils';
import { themeVal } from '../../../styles/utils/general';
import { bisectorPoints } from './utils';

const styles = props => css`
  /* Data specific styles */
  .data-series {
    .line {
      stroke-width: 2px;
      stroke: ${themeVal('color.primary')};
    }
    .point {
      fill: ${themeVal('color.primary')};
    }

    .confidence-area {
      fill-opacity: 0.32;
      fill: ${themeVal('color.primary')};
    }

    .bisector-point {
      stroke: ${themeVal('color.primary')};
      stroke-width: 2px;
      fill: none;
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
    if (props.noIndicator) return;

    // Limit data to existing date domain.
    const data = props.data.map(d => ({
      date: d.date,
      value: d.indicator
    }));

    const dataSeries = dataCanvas.select('.data-series');

    if (!props.noIndicatorConfidence) {
      const area = d3.area()
        .x(d => xScale(utcDate(d.date)))
        .y0(d => yScale(d.indicator_conf_high))
        .y1(d => yScale(d.indicator_conf_low));

      const confidenceArea = dataSeries.selectAll('.confidence-area').data([props.data]);

      // Remove old.
      confidenceArea.exit().remove();
      // Handle new.
      confidenceArea
        .enter()
        .append('path')
        .attr('class', 'confidence-area')
        .merge(confidenceArea)
        // Update current.
        .attr('d', area);
    }

    const line = d3.line()
      .defined(d => d.value !== null)
      .x(d => xScale(utcDate(d.date)))
      .y(d => yScale(d.value));

    const lines = dataSeries.selectAll('.line').data([data]);

    // Remove old.
    lines.exit().remove();
    // Handle new.
    lines
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .merge(lines)
      // Update current.
      .attr('d', line);

    // Show the bisector point if needed.
    const bisectorPointData = ctx.state.bisecting ? [ctx.state.doc] : [];
    dataSeries.call(
      bisectorPoints(bisectorPointData)
        .x(xScale)
        .y(yScale)
        .yProp('indicator')
    );
  }
};
