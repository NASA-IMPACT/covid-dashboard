import React from 'react';
import { createPortal } from 'react-dom';
import { PropTypes as T } from 'prop-types';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import * as d3 from 'd3';
import { rgba } from 'polished';
import { format } from 'date-fns';

import SizeAwareElement from '../size-aware-element';

import { themeVal, stylizeFunction } from '../../../styles/utils/general';
import { headingAlt } from '../../../styles/type/heading';

import debugLayer from './debug.layer';
import dataPointsLayer from './data-points.layer';
import dataExtentLayer from './data-extent.layer';
import bisectorLayer from './bisector.layer';
import xaxisLayer from './xaxis.layer';
import yaxisLayer from './yaxis.layer';
import Popover from './popover';

const _rgba = stylizeFunction(rgba);

const ChartWrapper = styled(SizeAwareElement)`
  flex-grow: 1;
  min-width: 50rem;

  svg {
    display: block;
    width: 100%;
    height: 5rem;
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
  /* ${dataPointsLayer.styles} */
  ${dataExtentLayer.styles}
  ${bisectorLayer.styles}
  ${xaxisLayer.styles}
  /* ${yaxisLayer.styles} */
`;

const formatDate = (date, interval) => {
  if (interval === 'day') {
    return format(date, 'dd MMMM yyyy');
  } else {
    return format(date, 'MMMM yyyy');
  }
};

class DataBrowserChart extends React.Component {
  constructor (props) {
    super(props);
    this.margin = { top: 16, right: 32, bottom: 40, left: 32 };
    // Control whether the chart was rendered.
    // The size aware element fires a onChange event once it is rendered
    // But at that time the chart is not ready yet so we can't update the size.
    this.initialized = false;

    this.container = null;
    this.svg = null;
    this.dataCanvas = null;

    this.resizeListener = this.resizeListener.bind(this);
    this.getXDomain = this.getXDomain.bind(this);

    this.state = {
      bisecting: false,
      xPos: null,
      xPosDate: null
    };
  }

  componentDidMount () {
    this.initChart();
    this.updateChart();
    this.initialized = true;
  }

  componentDidUpdate (prevProps, prevState) {
    this.updateChart();
  }

  onInternalAction (action, payload) {
    switch (action) {
      case 'bisector.show':
        this.setState({
          bisecting: true,
          xPos: payload.x,
          xPosDate: payload.date
        });
        break;
      case 'bisector.hide':
        this.setState({
          bisecting: false
        });
        break;
      case 'bisector.move':
        this.setState({
          xPos: payload.x,
          xPosDate: payload.date
        });
        break;
    }
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

  getXDomain () {
    const { xDomain } = this.props;
    return [
      xDomain[0],
      xDomain[xDomain.length - 1]
    ];
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

    // dataPointsLayer.init(this);
    dataExtentLayer.init(this);
    bisectorLayer.init(this);
  }

  updateChart () {
    const { top, bottom, right, left } = this.margin;
    const { width, height } = this.getSize();
    const { svg, dataCanvas, getXDomain } = this;

    // ---------------------------------------------------
    // Functions
    this.xScale = d3
      .scaleTime()
      .domain(getXDomain())
      .range([0, width]);

    // ---------------------------------------------------
    // Size updates
    svg
      .attr('width', width + left + right)
      .attr('height', height + top + bottom);

    dataCanvas.attr('width', width).attr('height', height);

    debugLayer.update(this);
    // dataPointsLayer.update(this);
    dataExtentLayer.update(this);
    bisectorLayer.update(this);

    // Axis.
    xaxisLayer.update(this);
  }

  renderPopover () {
    const { bisecting, xPos, xPosDate } = this.state;
    if (!this.dataCanvas || !xPosDate) return;

    const matrix = this.dataCanvas.node().getScreenCTM()
      .translate(xPos, 0);

    const popoverWidth = 160;
    const posY = matrix.f;
    const posX = matrix.e;

    const style = {
      left: posX + 'px',
      top: posY + 'px'
    };

    const direction = posX - popoverWidth / 2 < 0
      ? 'right'
      : posX + popoverWidth / 2 > document.body.clientWidth
        ? 'left'
        : 'none';

    return createPortal((
      <CSSTransition
        in={bisecting}
        appear={true}
        unmountOnExit={true}
        classNames='pop-chart'
        timeout={{ enter: 300, exit: 300 }}
      >
        <Popover style={style} direction={direction}>
          {formatDate(xPosDate, this.props.timeUnit)}
        </Popover>
      </CSSTransition>
    ), document.querySelector('#app-container'));
  }

  render () {
    return (
      <>
        {this.renderPopover()}
        <ChartWrapper
          swatch={this.props.swatch}
          ref={el => {
            this.container = el;
          }}
          onChange={this.resizeListener}
        />
      </>
    );
  }
}

DataBrowserChart.propTypes = {
  timeUnit: T.string,
  xDomain: T.array,
  swatch: T.string
};

export default DataBrowserChart;
