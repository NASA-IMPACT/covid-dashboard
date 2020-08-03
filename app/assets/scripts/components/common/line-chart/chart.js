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

import debugLayer from './debug.layer';
import dataBandsLayer from '../common-chart-utils/data-highlight-bands.layer';
import dataBaselineLayer from './data-baseline.layer';
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

  ${debugLayer.styles}
  ${dataBandsLayer.styles}
  ${dataBaselineLayer.styles}
  ${dataSeriesLayer.styles}
  ${bisectorLayer.styles}
  ${xaxisLayer.styles}
  ${yaxisLayer.styles}
`;

class DataBrowserChart extends React.Component {
  constructor (props) {
    super(props);
    this.margin = { top: 16, right: 32, bottom: 48, left: 48 };
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
      case 'bisector.move':
        this.setState({
          doc: payload.doc
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
    debugLayer.init(this);

    // Axis.
    xaxisLayer.init(this);
    yaxisLayer.init(this);

    dataBandsLayer.init(this);
    dataBaselineLayer.init(this);
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
      .scaleTime()
      .domain(props.xDomain)
      .range([0, width]);

    this.yScale = d3
      .scaleLinear()
      .domain(props.yDomain)
      .range([height, 10]);

    this.line = d3.line()
      .defined(d => d.value !== null)
      .x(d => this.xScale(utcDate(d.date)))
      .y(d => this.yScale(d.value));

    // ---------------------------------------------------
    // Size updates
    svg
      .attr('width', width + left + right)
      .attr('height', height + top + bottom);

    dataCanvas.attr('width', width).attr('height', height);

    debugLayer.update(this);
    dataBandsLayer.update(this);
    dataBaselineLayer.update(this);
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
      noBaseline,
      noBaselineConfidence,
      noIndicator,
      noIndicatorConfidence
    } = this.props;
    if (!this.dataCanvas || !doc) return;

    const docDate = utcDate(doc.date);
    const xPos = this.xScale(docDate);

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
                <LegendLabel swatch={themeVal('color.primary')}><span>Indicator {!noIndicatorConfidence && <small>(confidence)</small>}</span></LegendLabel>
                <dd>{round(doc.indicator)} {!noIndicatorConfidence && <small>({doc.indicator_conf_high} - {doc.indicator_conf_low})</small>}</dd>
              </>
            )}
            {!noBaseline && (
              <>
                <LegendLabel swatch={themeVal('color.base')}><span>Baseline {!noBaselineConfidence && <small>(confidence)</small>}</span></LegendLabel>
                <dd>{round(doc.baseline)} {!noBaselineConfidence && <small>({doc.baseline_conf_high} - {doc.baseline_conf_low})</small>}</dd>
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

DataBrowserChart.propTypes = {
  xDomain: T.array,
  yDomain: T.array,
  noBaseline: T.bool,
  noBaselineConfidence: T.bool,
  noIndicator: T.bool,
  noIndicatorConfidence: T.bool
};

export default DataBrowserChart;
