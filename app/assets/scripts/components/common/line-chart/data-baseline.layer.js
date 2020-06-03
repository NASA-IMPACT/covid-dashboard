import { css } from 'styled-components';

import { themeVal } from '../../../styles/utils/general';
import { dataPoints, confidenceLines } from './utils';

const styles = props => css`
  /* Data specific styles */
  .data-baseline {
    .line {
      stroke: ${themeVal('color.secondary')};

      &.base {
        stroke-width: 2px;
        stroke-opacity: 0.48;
      }

      &.min, &.max {
        stroke-width: 1px;
        stroke-opacity: 0.16;
      }
    }

    .range {
      fill-opacity: 0.08;
      fill: ${themeVal('color.secondary')};
    }

    .bisector-point {
      stroke: ${themeVal('color.secondary')};
      stroke-width: 2px;
      fill: none;
    }
  }
`;

export default {
  styles,
  init: ctx => {
    ctx.dataCanvas
      .append('g').attr('class', 'data-baseline');
  },

  update: ctx => {
    const { dataCanvas, props, xScale, yScale } = ctx;
    if (props.noBaseline) return;

    const dataSeries = dataCanvas.select('.data-baseline');

    dataSeries.call(
      confidenceLines(props.data)
        .includeConfidence(!props.noBaselineConfidence)
        .x(xScale)
        .y(yScale)
        .accessor(d => d.baseline)
        .accessorHigh(d => d.baseline_conf_high)
        .accessorLow(d => d.baseline_conf_low)
    );

    // Show the bisector point if needed.
    const bisectorPointData = ctx.state.bisecting ? [ctx.state.doc] : [];
    dataSeries.call(
      dataPoints(bisectorPointData)
        .pointClass('bisector-point')
        .x(xScale)
        .y(yScale)
        .yProp('baseline')
    );
  }
};
