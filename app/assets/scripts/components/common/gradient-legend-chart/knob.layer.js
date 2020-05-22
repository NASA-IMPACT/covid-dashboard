import * as d3 from 'd3';
import { css } from 'styled-components';
import { tint } from 'polished';

import { themeVal, stylizeFunction } from '../../../styles/utils/general';

const _tint = stylizeFunction(tint);

const styles = props => css`
  .knob {
    fill: #fff;
    stroke: ${_tint(0.48, themeVal('color.base'))};
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;

const knobSize = 10;
const knobTip = knobSize * 1.5;
const knobPoints = [
  [0, 0],
  [knobSize, 0],
  [knobSize, knobSize],
  [knobSize / 2, knobTip],
  [0, knobSize],
  [0, 0]
];

export default {
  styles,
  init: ctx => {
    const controls = ctx.dataCanvas.append('g')
      .attr('class', 'controls');

    const knob = d3.line();

    controls.append('path')
      .attr('class', 'knob')
      .attr('d', knob(knobPoints));
  },

  update: ctx => {
    const { dataCanvas, props, xScale, trackSize } = ctx;
    const { width, height } = ctx.getSize();

    const dragEvent = (end) => {
      const newPos = Math.max(0, Math.min(d3.event.x, width));
      ctx.props.onAction('knob.set', {
        value: Math.round(xScale.invert(newPos)),
        end
      });
    };

    const dragger = d3.drag()
      .on('drag', () => dragEvent())
      .on('end', () => dragEvent(true));

    dataCanvas.select('.knob')
      .attr('transform', `translate(${xScale(props.knobPos) - knobSize / 2}, ${height - trackSize / 2 - knobTip})`)
      .call(dragger);
  }
};
