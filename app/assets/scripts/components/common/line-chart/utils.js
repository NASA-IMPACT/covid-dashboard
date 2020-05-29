import { utcDate } from '../../../utils/utils';

export function bisectorPoints (data) {
  let _yprop = 'value';
  let _x = null;
  let _y = null;

  function main (context) {
    const points = context
      .selectAll('.bisector-point')
      .data(data);

    // Remove old.
    points.exit().remove();
    // Handle new.
    points
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('class', 'bisector-point')
      .merge(points)
      // Update current.
      .attr('cx', d => _x(utcDate(d.date)))
      .attr('cy', d => _y(d[_yprop]));
  }

  main.yProp = _ => {
    _yprop = _;
    return main;
  };

  main.x = _ => {
    _x = _;
    return main;
  };

  main.y = _ => {
    _y = _;
    return main;
  };

  return main;
}
