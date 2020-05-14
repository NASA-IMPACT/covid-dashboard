import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { rgba } from 'polished';
import { PropTypes as T } from 'prop-types';

import SizeAwareElement from '../../common/size-aware-element';

import { themeVal, stylizeFunction } from '../../../styles/utils/general';
import { headingAlt } from '../../../styles/type/heading';

import debugLayer from './debug.layer';
import dataPointsLayer from './data-points.layer';
import xaxisLayer from './xaxis.layer';
import yaxisLayer from './yaxis.layer';

const _rgba = stylizeFunction(rgba);

const ChartWrapper = styled(SizeAwareElement)`
  flex-grow: 1;

  svg {
    display: block;
    width: 100%;
    height: 15rem;
  }

  .axis {
    .domain,
    .tick path {
      display: none;
    }

    text {
      ${headingAlt}
      font-size: 0.75rem;
      line-height: 1;
      background: red;
      fill: ${_rgba(themeVal('type.base.color'), 0.64)};
    }
  }

  ${debugLayer.styles}
  ${dataPointsLayer.styles}
  ${xaxisLayer.styles}
  ${yaxisLayer.styles}
`;

class DataBrowserChart extends React.Component {
  constructor (props) {
    super(props);
    this.margin = { top: 16, right: 32, bottom: 40, left: 64 };
    // Control whether the chart was rendered.
    // The size aware element fires a onChange event once it is rendered
    // But at that time the chart is not ready yet so we can't update the size.
    this.initialized = false;

    this.container = null;
    this.svg = null;
    this.dataCanvas = null;

    this.resizeListener = this.resizeListener.bind(this);
  }

  componentDidMount () {
    this.initChart();
    this.updateChart();
    this.initialized = true;
  }

  componentDidUpdate (prevProps, prevState) {
    this.updateChart();
  }

  resizeListener () {
    if (!this.initialized) return;
    this.updateChart();
  }

  getSize () {
    if (!this.container) return { width: 0, height: 0 };
    const { top, bottom, right, left } = this.margin;
    const { width, height } = this.container.getSize();
    return {
      width: parseInt(width, 10) - left - right,
      height: parseInt(height, 10) - top - bottom
    };
  }

  initChart () {
    const { top, left } = this.margin;
    const containerEl = this.container.elRef.current;

    this.svg = d3
      .select(containerEl)
      .append('svg')
      .attr('class', 'chart');

    this.dataCanvas = this.svg
      .append('g')
      .attr('class', 'data-canvas')
      .attr('transform', `translate(${left},${top})`);

    // Debug
    debugLayer.init(this);

    // Axis.
    xaxisLayer.init(this);
    yaxisLayer.init(this);

    dataPointsLayer.init(this);
  }

  updateChart () {
    const { top, bottom, right, left } = this.margin;
    const { width, height } = this.getSize();
    const { svg, dataCanvas, props } = this;

    // ---------------------------------------------------
    // Functions
    this.xScale = d3
      .scaleTime()
      .domain(props.xDomain)
      .range([0, width]);

    this.yScale = d3
      .scaleLinear()
      .domain(props.yDomain)
      .range([height, 10]);

    // ---------------------------------------------------
    // Size updates
    svg
      .attr('width', width + left + right)
      .attr('height', height + top + bottom);

    dataCanvas.attr('width', width).attr('height', height);

    debugLayer.update(this);
    dataPointsLayer.update(this);

    // Axis.
    xaxisLayer.update(this);
    yaxisLayer.update(this);
  }

  render () {
    return (
      <ChartWrapper
        swatch={this.props.swatch}
        ref={el => {
          this.container = el;
        }}
        onChange={this.resizeListener}
      />
    );
  }
}

DataBrowserChart.propTypes = {
  xDomain: T.array,
  yDomain: T.array,
  swatch: T.string
};

export default DataBrowserChart;
