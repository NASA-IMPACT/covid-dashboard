import { utcDate } from '../../../utils/utils';

const styles = props => '';

const bandColors = [
  '#ff000020',
  '#00ff0020',
  '#0000ff20',
  '#ffff0020'
];

const bandColorDefault = '#00000020';

export const getBandColor = (idx) => bandColors[idx] || bandColorDefault;

export default {
  styles,
  init: ctx => {
    ctx.dataCanvas
      .append('g').attr('class', 'data-bands');
  },

  update: ctx => {
    const { dataCanvas, props, xScale } = ctx;
    if (!props.highlightBands) return;

    const { height } = ctx.getSize();
    // Limit data to existing date domain.
    const data = props.highlightBands;

    const bands = dataCanvas
      .select('.data-bands')
      .selectAll('.band')
      .data(data);

    // Remove old.
    bands.exit().remove();
    // Handle new.
    bands
      .enter()
      .append('rect')
      .attr('class', 'band')
      .merge(bands)
      // Update current.
      .attr('fill', (d, i) => getBandColor(i))
      .attr('x', d => xScale(utcDate(d.interval[0])))
      .attr('y', 0)
      .attr('width', d => xScale(utcDate(d.interval[1])) - xScale(utcDate(d.interval[0])))
      .attr('height', height);
  }
};
