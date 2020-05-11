import React, { useRef, useEffect } from 'react';

import T from 'prop-types';
import styled from 'styled-components';

import * as d3 from 'd3';

import { glsp } from '../../styles/utils/theme-values';
import { themeVal } from '../../styles/utils/general';
import { truncated } from '../../styles/helpers';
import { headingAlt } from '../../styles/type/heading';

const dim = {
  width: 220,
  height: 125,
  top: 10,
  bottom: 20,
  left: 0,
  right: 10,
  yAxis: 10
};

const ChartTitle = styled.h4`
  ${truncated()}
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0 0 ${glsp(1 / 4)} 0;
`;

const ChartContainer = styled.svg`
  color: #dbdbdb;
  font-family: ${themeVal('type.base.family')};
  font-weight: ${themeVal('type.base.light')};

  path.axis {
    stroke: ${themeVal('color.baseAlphaB')};
  }

  path.data {
    stroke: #ffffff;
  }

  circle.data {
    fill: #ffffff;
  }

  g.axis:last-child {
    text-anchor: end;
  }

  text {
    ${headingAlt}
    font-size: 0.75rem;
    line-height: 1;
  }
`;

const computeDomain = (data) => {
  const [startDateStr, endDateStr] = d3.extent(data, o => {
    return o.date;
  });

  let [y, m, d] = startDateStr.split('-').map(v => parseInt(v));
  const dataStart = new Date(y, m - 1, d);
  [y, m, d] = endDateStr.split('-').map(v => parseInt(v));
  const dataEnd = new Date(y, m - 1, d);

  const start = new Date(dataStart);
  start.setDate(dataStart.getDate() - 10);
  const end = new Date(dataEnd);
  end.setDate(dataEnd.getDate() + 10);

  return { dataStart, dataEnd, start, end };
};

const createChartEls = (domain) => {
  const xAxis = g => g
    .attr('transform', `translate(0,${dim.height - dim.bottom})`)
    .attr('class', 'axis')
    .style('text-transform', 'uppercase')
    .call(d3.axisBottom(x)
      .tickValues([domain.dataStart, domain.dataEnd])
      .tickSize(0)
      .tickPadding(10)
      .tickFormat(d3.timeFormat('%b %d'))
    )
    .call(g => g.select('.domain').remove());

  const yAxis = g => g
    .attr('transform', `translate(${dim.yAxis},${dim.top})`)
    .attr('class', 'axis')
    .call(d3.axisLeft(y)
      .tickValues([1, 2])
      .tickFormat(d3.format('d'))
      .tickSize(0))
    .call(g => g.select('.domain').remove());

  const x = d3.scaleTime()
    .domain([domain.start, domain.end])
    .range([dim.left, dim.width - dim.right]);

  const y = d3.scaleLinear()
    .domain([0, 2]).nice()
    .range([dim.height - dim.bottom, dim.top]);

  const line = d3.line()
    .x(d => {
      const [y, m, day] = d.date.split('-').map(v => parseInt(v));
      return x(new Date(y, m - 1, day));
    })
    .y(d => y(d.value));

  return { xAxis, yAxis, x, y, line };
};

const drawChart = (dataObj, cont) => {
  if (dataObj && cont.current) {
    const { width, height } = dim;
    const { data } = dataObj;

    const domain = computeDomain(data);
    const { xAxis, yAxis, line } = createChartEls(domain);

    const svg = d3.select(cont.current)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    svg.append('g')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    [0, 1, 2].forEach(v => {
      svg.append('path')
        .datum([domain.start, domain.end].map(dateO => {
          const [m, d, y] = dateO.toLocaleDateString('en-US').split('/');
          const dateStr = `${y}-${m}-${d}`;

          return {
            date: dateStr, value: v
          };
        }))
        .attr('class', 'axis')
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('d', line);
    });

    svg.append('defs')
      .append('marker')
      .attr('id', 'dot')
      .attr('viewBox', [0, 0, 10, 10])
      .attr('refX', 5)
      .attr('refY', 5)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', 1.5)
      .attr('class', 'data');

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('class', 'data')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.25)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('marker-start', 'url(#dot)')
      .attr('marker-end', 'url(#dot)')
      .attr('d', line);
  }
};

const LineChart = props => {
  const { data, title } = props;

  if (!data.data) {
    return (
      <>
        {title && <ChartTitle>{title}</ChartTitle>}
        <p>No data for this area.</p>
      </>
    );
  }

  const container = useRef(null);
  useEffect(() => drawChart(data, container), [props.data, container.current]);

  return (
    <>
      {title && <ChartTitle>{title}</ChartTitle>}
      <ChartContainer
        ref={container}
        className='lineChart'
        width={dim.width}
        height={dim.height}
      />
    </>
  );
};

LineChart.propTypes = {
  data: T.shape({
    data: T.arrayOf(T.object),
    id: T.string
  }),
  title: T.string
};

export { LineChart };
