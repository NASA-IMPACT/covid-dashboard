import * as d3 from 'd3';
import { css } from 'styled-components';

const styles = props => css`
  .track {
    stroke-width: ${({ trackSize }) => trackSize}px;
    stroke: ${({ id }) => `url(#trackGradient-${id})`};
    stroke-linecap: round;
  }
`;

export default {
  styles,
  init: ctx => {
    ctx.dataCanvas
      .append('g').attr('class', 'track-layer')
      .append('line')
      .attr('class', 'track');

    ctx.svg.select('defs')
      .append('linearGradient')
      .attr('id', `trackGradient-${ctx.props.id}`)
      .attr('gradientUnits', 'userSpaceOnUse');
  },

  update: ctx => {
    const { dataCanvas, props, trackSize } = ctx;
    const { width, height } = ctx.getSize();

    // The change of the midpoint (from base) changes all the stops.
    const midPointDiff = (props.knobPos - 50) / 100;
    // Create a scale for the stops. The input value will be a position from
    // 0 - 1, which correspond to the original position of the color stop.
    // As the midpoint changes the position of the color stops will change
    // according to their original place and the midpoint delta.
    // Example
    // 1st stop: 25%
    // 2nd stop: 50%
    // 3rd stop: 75%
    // If the midpoint moves from 50 to 75, its position increased 1.5 times,
    // but the stops cannot increase 1.5 times, otherwise the 75% would go over.
    // The scale takes care of keeping the values bound to the domain.
    const stopScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([Math.max(0, midPointDiff), Math.min(1, 1 + midPointDiff)]);

    const trackGradient = ctx.svg.select(`#trackGradient-${ctx.props.id}`);

    // Set the gradient size so it matched the element is being used on.
    // Used in conjunction with gradientUnits='userSpaceOnUse'
    // https://stackoverflow.com/questions/21638169/svg-line-with-gradient-stroke-wont-display-straight
    trackGradient
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', width)
      .attr('y2', height);

    // We always need at lest 3 stops, since the first and last are fixed it's
    // the middle one that moved and makes the gradient shift.
    // When we only have 2, we need to infer the middle one.
    let stops = props.stops;
    if (stops.length === 2) {
      const stopsScale = d3.scaleLinear()
        .domain([0, 100])
        .range(stops);

      stops = [
        stops[0],
        stopsScale(50),
        stops[1]
      ];
    }

    const gradientStops = trackGradient.selectAll('.stop').data(stops);
    // Remove old.
    gradientStops.exit().remove();
    // Handle new.
    gradientStops
      .enter()
      .append('stop')
      .attr('class', 'stop')
      .attr('stop-opacity', 1)
      .attr('stop-color', d => d)
      .merge(gradientStops)
      // Update current.
      .attr('offset', (d, i, all) => {
        const count = all.length - 1;
        const pointOriginalPosition = 1 / count * i;
        return stopScale(pointOriginalPosition);
      });

    const gradientTrack = dataCanvas.select('.track');

    gradientTrack
      .attr('x1', 0)
      // Half the size of the line.
      .attr('y1', height - trackSize / 2)
      .attr('x2', width)
      // Half the size of the line.
      .attr('y2', height - trackSize / 2);
  }
};
