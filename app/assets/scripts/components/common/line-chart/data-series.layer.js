import { css } from 'styled-components';

import { themeVal } from '../../../styles/utils/general';
import { dataPoints, confidenceLines } from './utils';

const styles = props => css`
  /* Data specific styles */
  .data-series {
    .line {
      stroke: ${themeVal('color.primary')};

      &.base {
        stroke-width: 2px;
      }

      &.min, &.max {
        stroke-width: 1px;
        stroke-opacity: 0.16;
      }
    }

    .range {
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

    const dataSeries = dataCanvas.select('.data-series');

    dataSeries.call(
      confidenceLines(props.data)
        .includeConfidence(!props.noIndicatorConfidence)
        .x(xScale)
        .y(yScale)
        .accessor(d => d.indicator)
        .accessorHigh(d => d.indicator_conf_high)
        .accessorLow(d => d.indicator_conf_low)
    );

    // Show the bisector point if needed.
    const bisectorPointData = ctx.state.bisecting ? [ctx.state.doc] : [];
    dataSeries.call(
      dataPoints(bisectorPointData)
        .pointClass('bisector-point')
        .x(xScale)
        .y(yScale)
        .yProp('indicator')
    );
  }
};
