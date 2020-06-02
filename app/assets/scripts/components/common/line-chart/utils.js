import * as d3 from 'd3';

import { utcDate } from '../../../utils/utils';

export function dataPoints (data) {
  let _yprop = 'value';
  let _klass = null;
  let _x = null;
  let _y = null;

  function main (context) {
    const points = context
      .selectAll(`.${_klass}`)
      .data(data);

    // Remove old.
    points.exit().remove();
    // Handle new.
    points
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('class', _klass)
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

  main.pointClass = _ => {
    _klass = _;
    return main;
  };

  return main;
}

export function confidenceLines (data) {
  let _accessor = v => v;
  let _accessorHigh = v => v;
  let _accessorLow = v => v;
  let _includeConfidence = true;
  let _x = null;
  let _y = null;

  function main (context) {
    const line = d3.line()
      .defined(d => d.value !== null)
      .x(d => _x(utcDate(d.date)))
      .y(d => _y(d.value));

    if (_includeConfidence) {
      const area = d3.area()
        .x(d => _x(utcDate(d.date)))
        .y0(d => _y(_accessorHigh(d)))
        .y1(d => _y(_accessorLow(d)));

      const baselineRange = context
        .selectAll('.range')
        .data([data]);

      // Remove old.
      baselineRange.exit().remove();
      // Handle new.
      baselineRange
        .enter()
        .append('path')
        .attr('class', 'range')
        .merge(baselineRange)
        // Update current.
        .attr('d', area);
    }

    // Create data array for all the lines: min, max, and base.
    // This allows us to reuse the line function and code.
    const mapData = accessor => data.map(d => ({
      date: d.date,
      value: accessor(d)
    }));
    let linesData = [
      { id: 'base', data: mapData(_accessor) }
    ];

    if (_includeConfidence) {
      linesData = [
        { id: 'max', data: mapData(_accessorHigh) },
        ...linesData,
        { id: 'min', data: mapData(_accessorLow) }
      ];
    }

    const lines = context
      .selectAll('.line')
      .data(linesData);

    // Remove old.
    lines.exit().remove();
    // Handle new.
    lines
      .enter()
      .append('path')
      .attr('class', d => `line ${d.id}`)
      .attr('fill', 'none')
      .merge(lines)
      // Update current.
      .attr('d', d => line(d.data));
  }

  main.accessor = _ => {
    _accessor = _;
    return main;
  };

  main.accessorHigh = _ => {
    _accessorHigh = _;
    return main;
  };

  main.accessorLow = _ => {
    _accessorLow = _;
    return main;
  };

  main.includeConfidence = _ => {
    _includeConfidence = _;
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
