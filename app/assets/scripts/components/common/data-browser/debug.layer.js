import { css } from 'styled-components';

const styles = (props) => css`
  /* Debug specific styles */
  .data-canvas-debug {
    pointer-events: none;
    fill: red;
    fill-opacity: 0.16;
  }
`;

const enable = false;

export default {
  styles,
  init: (ctx) => {
    if (!enable) return null;

    const { left, top } = ctx.margin;
    ctx.svg
      .append('rect')
      .attr('class', 'data-canvas-debug')
      .attr('transform', `translate(${left},${top})`);
  },

  update: (ctx) => {
    if (!enable) return null;

    const { width, height } = ctx.getSize();
    ctx.svg
      .select('.data-canvas-debug')
      .attr('width', width)
      .attr('height', height);
  }
};
