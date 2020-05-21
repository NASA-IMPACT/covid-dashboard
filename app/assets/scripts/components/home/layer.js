import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import { themeVal } from '../../styles/utils/general';
import { visuallyHidden, truncated } from '../../styles/helpers';
import { glsp } from '../../styles/utils/theme-values';
import { headingAlt } from '../../styles/type/heading';
import { formatThousands } from '../../utils/format';

import Prose from '../../styles/type/prose';
import { FormSwitch } from '../../styles/form/switch';
import Button from '../../styles/button/button';
import { AccordionFold } from '../common/accordion';
import GradientChart from '../common/gradient-legend-chart/chart';

const makeGradient = (stops) => {
  const d = 100 / stops.length - 1;
  const steps = stops.map((s, i) => `${s} ${i * d}%`);
  return `linear-gradient(to right, ${steps.join(', ')})`;
};

const printLegendVal = (val) => typeof val === 'number' ? formatThousands(val, { shorten: true }) : val;

const LayerSelf = styled(AccordionFold)`
  position: relative;
  box-shadow: 0 1px 0 0 ${themeVal('color.baseAlphaB')};
`;

const LayerHeader = styled.header`
  display: grid;
  grid-auto-columns: 1fr min-content;
  padding: ${glsp(0.5)} ${glsp()};
  grid-gap: ${glsp(0.5)};
`;

const LayerHeadline = styled.div`
  grid-row: 1;
  min-width: 0px;
`;

const LayerTitle = styled.h1`
  ${truncated()}
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0;
`;

const LayerSubtitle = styled.p`
  ${visuallyHidden()}
`;

const LayerSwatch = styled.span`
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  bottom: 0.125rem;
  width: 0.25rem;
  background: ${({ swatch }) => swatch || themeVal('color.primary')};
  border-radius: ${themeVal('shape.rounded')};

  > * {
    ${visuallyHidden()}
  }
`;

const LayerToolbar = styled.div`
  grid-row: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;

  > * {
    margin-top: -0.125rem;
  }

  > *:not(:first-child) {
    margin-left: ${glsp(0.25)};
  }
`;

const LayerLegend = styled.div`
  grid-row: 2;
  grid-column: 1 / span 2;

  dd {
    ${headingAlt()}
    font-size: 0.75rem;
    line-height: 1rem;
    display: flex;

    i {
      margin: 0 auto;
      opacity: 0;
    }
  }
`;

const LayerLegendGradientTrack = styled.dt`
  display: block;
  font-size: 0;
  height: 0.5rem;
  border-radius: ${themeVal('shape.rounded')};
  background: ${({ stops }) => makeGradient(stops)};
  margin: 0 0 ${glsp(1 / 8)} 0;
  box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaB')};
`;

const LayerLegendTitle = styled.h2`
  ${visuallyHidden()}
`;

const LayerBodyInner = styled(Prose)`
  position: relative;
  z-index: 8;
  box-shadow: inset 0 1px 0 0 ${themeVal('color.baseAlphaB')};
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.875rem;
  line-height: 1.25rem;
  backdrop-filter: saturate(48%);
  padding: ${glsp()};

  /* stylelint-disable-next-line */
  > * {
    margin-bottom: ${glsp(0.75)};
  }
`;

const typesSubtitles = {
  'feature-data': 'Data',
  timeseries: 'Timeseries'
};

class Layer extends React.Component {
  renderLegend () {
    const {
      dataOrder,
      legend,
      knobPos,
      onLegendKnobChange
    } = this.props;

    if (!legend) return null;

    let defaultStops;
    // Two default styles:
    // - highlight-high - where a high value needs to be highlighted (high % of 65+)
    // - highlight-low - where low values are highlighted (m2 living area per person)
    switch (dataOrder) {
      case ('highlight-low'):
        defaultStops = [
          'hsla(105, 91%, 67%, 0.69)',
          'hsla(173, 75%, 66%, 0.69)',
          'hsla(180, 92%, 56%, 0.68)',
          'hsla(188, 28%, 52%, 0.69)',
          'hsla(212, 54%, 42%, 0.63)'
        ];
        break;
      default:
        defaultStops = [
          'hsla(212, 54%, 42%, 0.63)',
          'hsla(188, 28%, 52%, 0.69)',
          'hsla(180, 92%, 56%, 0.68)',
          'hsla(173, 75%, 66%, 0.69)',
          'hsla(105, 91%, 67%, 0.69)'
        ];
    }

    const stops = legend.stops && legend.stops !== 'default'
      ? legend.stops
      : defaultStops;

    if (legend.type === 'gradient-adjustable') {
      return (
        <LayerLegend>
          <LayerLegendTitle>Legend</LayerLegendTitle>
          <dl>
            <dt>
              <GradientChart
                onAction={(a, p) => {
                  onLegendKnobChange(p);
                }}
                stops={stops}
                knobPos={knobPos !== undefined ? knobPos : 50}
              />
            </dt>
            <dd>
              <span>{printLegendVal(legend.min)}</span>
              <i> – </i>
              <span>{printLegendVal(legend.max)}</span>
            </dd>
          </dl>
        </LayerLegend>
      );
    }

    return (
      <LayerLegend>
        <LayerLegendTitle>Legend</LayerLegendTitle>
        <dl>
          <LayerLegendGradientTrack stops={stops}>Gradient</LayerLegendGradientTrack>
          <dd>
            <span>{printLegendVal(legend.min)}</span>
            <i> – </i>
            <span>{printLegendVal(legend.max)}</span>
          </dd>
        </dl>
      </LayerLegend>
    );
  }

  render () {
    const {
      id,
      label,
      type,
      disabled,
      active,
      swatchColor,
      swatchName,
      info,
      onToggleClick,
      isExpanded,
      setExpanded
    } = this.props;

    return (
      <LayerSelf
        forwardedAs='article'
        isFoldExpanded={isExpanded}
        setFoldExpanded={setExpanded}
        renderHeader={({ isFoldExpanded, setFoldExpanded }) => (
          <LayerHeader>
            <LayerHeadline>
              <LayerTitle title={label}>{label}</LayerTitle>
              <LayerSubtitle>{typesSubtitles[type] || 'Layer'}</LayerSubtitle>
              <LayerSwatch swatch={swatchColor}>
                <small>Color: {swatchName || 'Waikawa Gray'}</small>
              </LayerSwatch>
            </LayerHeadline>
            <LayerToolbar>
              <Button
                variation='base-plain'
                size='small'
                useIcon='circle-information'
                title='Show/hide layer info'
                hideText
                disabled={!info}
                active={isFoldExpanded}
                onClick={() => setFoldExpanded(!isFoldExpanded)}
              >
                <span>Info</span>
              </Button>
              <FormSwitch
                hideText
                name={`toggle-${id}`}
                disabled={disabled}
                checked={active}
                onChange={onToggleClick}
              >
                Toggle layer visibility
              </FormSwitch>
            </LayerToolbar>
            {this.renderLegend()}
          </LayerHeader>
        )}
        renderBody={() => (
          <LayerBodyInner>
            {info || <p>No info available for this layer.</p>}
          </LayerBodyInner>
        )}
      />
    );
  }
}

Layer.propTypes = {
  id: T.string,
  label: T.string,
  type: T.string,
  disabled: T.bool,
  active: T.bool,
  swatchColor: T.string,
  swatchName: T.string,
  dataOrder: T.string,
  info: T.node,
  legend: T.object,
  onToggleClick: T.func,
  isExpanded: T.bool,
  setExpanded: T.func,
  onLegendKnobChange: T.func,
  knobPos: T.number
};

export default Layer;
