import React from 'react';
import styled from 'styled-components';
import T from 'prop-types';
import * as d3 from 'd3';

import SizeAwareElement from '../../common/size-aware-element';

import trackLayer from './track.layer';
import knobLayer from './knob.layer';

const ChartWrapper = styled.div`
  flex-grow: 1;
  margin: 0 -4px;

  svg {
    display: block;
    width: 100%;
    height: 1.25rem;
  }

  ${trackLayer.styles}
  ${knobLayer.styles}
`;

class DataBrowserChart extends React.Component {
  constructor (props) {
    super(props);
    this.margin = { top: 0, right: 8, bottom: 0, left: 8 };
    // Control whether the chart was rendered.
    // The size aware element fires a onChange event once it is rendered
    // But at that time the chart is not ready yet so we can't update the size.
    this.initialized = false;

    this.container = null;
    this.svg = null;
    this.dataCanvas = null;

    this.resizeListener = this.resizeListener.bind(this);

    this.trackSize = 8;
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

    // SVG definitions.
    this.svg.append('defs');

    this.dataCanvas = this.svg
      .append('g')
      .attr('class', 'data-canvas')
      .attr('transform', `translate(${left},${top})`);

    trackLayer.init(this);
    knobLayer.init(this);
  }

  updateChart () {
    const { top, bottom, right, left } = this.margin;
    const { width, height } = this.getSize();
    const { svg, dataCanvas } = this;

    // ---------------------------------------------------
    // Functions
    this.xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    // ---------------------------------------------------
    // Size updates
    svg
      .attr('width', width + left + right)
      .attr('height', height + top + bottom);

    dataCanvas.attr('width', width).attr('height', height);

    trackLayer.update(this);
    knobLayer.update(this);
  }

  render () {
    return (
      <SizeAwareElement
        element={ChartWrapper}
        trackSize={this.trackSize}
        id={this.props.id}
        ref={el => {
          this.container = el;
        }}
        onChange={this.resizeListener}
      />
    );
  }
}

DataBrowserChart.propTypes = {
  id: T.string
};

export default DataBrowserChart;
