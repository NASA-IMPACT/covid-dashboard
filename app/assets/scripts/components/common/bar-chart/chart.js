import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import * as d3 from 'd3';
import { rgba } from 'polished';
import { format } from 'date-fns';
import { PropTypes as T } from 'prop-types';

import SizeAwareElement from '../../common/size-aware-element';
import Popover from '../common-chart-utils/popover';

import { themeVal, stylizeFunction } from '../../../styles/utils/general';
import { headingAlt } from '../../../styles/type/heading';
import { utcDate } from '../../../utils/utils';
import { glsp } from '../../../styles/utils/theme-values';
import { round } from '../../../utils/format';

import dataBandsLayer from '../common-chart-utils/data-highlight-bands.layer';
import dataSeriesLayer from './data-series.layer';
import bisectorLayer from './bisector.layer';
import xaxisLayer from './xaxis.layer';
import yaxisLayer from '../common-chart-utils/yaxis.layer';

const _rgba = stylizeFunction(rgba);

const LegendPopover = styled(Popover)`
  padding: ${glsp(1, 1, 1, 1.75)};
  font-size: 0.875rem;

  dt {
    ${headingAlt()}
    font-size: 0.875rem;
    display: flex;
    align-items: center;
  }

  dd:not(:last-child) {
    margin-bottom: ${glsp(0.5)};
  }
`;

const LegendLabel = styled.dt`
  ::before {
    content: '';
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background: ${({ swatch }) => swatch};
    margin-left: -0.75rem;
    margin-right: 0.25rem;
    border-radius: ${themeVal('shape.ellipsoid')};
  }
`;

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
      fill: ${_rgba(themeVal('type.base.color'), 0.64)};
    }
  }

  ${dataBandsLayer.styles}
  ${dataSeriesLayer.styles}
  ${bisectorLayer.styles}
  ${xaxisLayer.styles}
  ${yaxisLayer.styles}
`;

class BarChart extends React.Component {
  constructor (props) {
    super(props);
    this.margin = { top: 16, right: 32, bottom: 56, left: 48 };
    // Control whether the chart was rendered.
    // The size aware element fires a onChange event once it is rendered
    // But at that time the chart is not ready yet so we can't update the size.
    this.initialized = false;

    this.container = null;
    this.svg = null;
    this.dataCanvas = null;

    this.resizeListener = this.resizeListener.bind(this);

    this.state = {
      bisecting: false,
      doc: null
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
          doc: payload.doc
        });
        break;
      case 'bisector.hide':
        this.setState({
          bisecting: false
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

    // Axis.
    xaxisLayer.init(this);
    yaxisLayer.init(this);

    dataBandsLayer.init(this);
    dataSeriesLayer.init(this);

    bisectorLayer.init(this);
  }

  updateChart () {
    const { top, bottom, right, left } = this.margin;
    const { width, height } = this.getSize();
    const { svg, dataCanvas, props } = this;

    // ---------------------------------------------------
    // Functions
    this.xScale = d3
      .scaleBand()
      .paddingInner(0.1)
      .domain(props.data.map(d => utcDate(d.date)))
      .range([0, width]);

    this.yScale = d3
      .scaleLinear()
      .domain([0, props.yDomain[1]])
      .range([height, 10]);

    // ---------------------------------------------------
    // Size updates
    svg
      .attr('width', width + left + right)
      .attr('height', height + top + bottom);

    dataCanvas.attr('width', width).attr('height', height);

    dataBandsLayer.update(this);
    dataSeriesLayer.update(this);

    bisectorLayer.update(this);

    // Axis.
    xaxisLayer.update(this);
    yaxisLayer.update(this);
  }

  renderPopover () {
    const { height, width } = this.getSize();
    const { bisecting, doc } = this.state;
    const {
      noIndicator
    } = this.props;
    if (!this.dataCanvas || !doc) return;

    const docDate = utcDate(doc.date);
    // Disregard the native popover margin in the bar chart case.
    const xPos = this.xScale(docDate) + this.xScale.bandwidth() / 2 - 8;

    const matrix = this.dataCanvas.node().getScreenCTM();
    if (!matrix) return;

    const offsetY = window.scrollY;
    const translatedMatrix = matrix.translate(xPos, 0);

    const popoverWidth = 160;
    const posY = translatedMatrix.f + offsetY + height / 2;
    const posX = translatedMatrix.e;

    const direction = posX + popoverWidth + 8 > matrix.e + width
      ? 'left'
      : 'right';

    const style = {
      width: popoverWidth + 'px',
      left: posX + 'px',
      top: posY + 'px'
    };

    return createPortal((
      <CSSTransition
        in={bisecting}
        appear
        unmountOnExit
        classNames='pop-chart'
        timeout={{ enter: 300, exit: 300 }}
      >
        <LegendPopover style={style} direction={direction}>
          <dl>
            <dt>Date</dt>
            <dd>{format(docDate, 'MMM dd, yyyy')}</dd>
            {!noIndicator && (
              <>
                <LegendLabel swatch={themeVal('color.primary')}><span>Indicator</span></LegendLabel>
                <dd>{round(doc.indicator)}</dd>
              </>
            )}
          </dl>
        </LegendPopover>
      </CSSTransition>
    ), document.querySelector('#app-container'));
  }

  render () {
    return (
      <>
        {this.renderPopover()}
        <ChartWrapper
          ref={el => {
            this.container = el;
          }}
          onChange={this.resizeListener}
        />
      </>
    );
  }
}

BarChart.propTypes = {
  yDomain: T.array,
  data: T.array,
  noIndicator: T.bool
};

export default BarChart;
