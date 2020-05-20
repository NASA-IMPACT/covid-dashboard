import * as d3 from 'd3';
import { css } from 'styled-components';

const styles = props => css`
  .knob {
    pointer-events: none;
    fill: #fff;
  }

  .knob-ghost {
    fill: #fff;
    fill-opacity: 0.32;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;

export default {
  styles,
  init: ctx => {
    const controls = ctx.dataCanvas.append('g')
      .attr('class', 'controls');

    controls.append('circle')
      .attr('class', 'knob-ghost')
      .attr('r', 6);

    controls.append('circle')
      .attr('class', 'knob')
      .attr('r', 3);
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
      .attr('cx', xScale(props.knobPos))
      .attr('cy', height - trackSize / 2);

    dataCanvas.select('.knob-ghost')
      .attr('cx', xScale(props.knobPos))
      .attr('cy', height - trackSize / 2)
      .call(dragger);
  }
};
