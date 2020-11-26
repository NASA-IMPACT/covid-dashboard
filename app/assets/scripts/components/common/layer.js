import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { themeVal } from '../../styles/utils/general';
import { visuallyHidden, truncated } from '../../styles/helpers';
import { glsp } from '../../styles/utils/theme-values';
import { replaceSub2 } from '../../utils/format';

import Prose from '../../styles/type/prose';
import { FormSwitch } from '../../styles/form/switch';
import Button from '../../styles/button/button';
import { AccordionFold } from './accordion';
import LayerLegend from './layer-legend';

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

  sub {
    bottom: 0;
  }
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

const LayerBodyInner = styled(Prose)`
  position: relative;
  z-index: 8;
  box-shadow: inset 0 1px 0 0 ${themeVal('color.baseAlphaB')};
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.875rem;
  line-height: 1.25rem;
  backdrop-filter: saturate(48%);
  padding: ${glsp()};

  /* stylelint-disable-next-line no-descending-specificity */
  > * {
    margin-bottom: ${glsp(0.75)};
  }
`;

const typesSubtitles = {
  'feature-data': 'Data',
  timeseries: 'Timeseries'
};

class Layer extends React.Component {
  componentDidMount () {
    ReactTooltip.rebuild();
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
      compareEnabled,
      compareActive,
      compareHelp,
      onCompareClick,
      onToggleClick,
      dataOrder,
      legend,
      knobPos,
      onLegendKnobChange,
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
              <LayerTitle title={label}>{replaceSub2(label)}</LayerTitle>
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
              <Button
                variation={compareActive ? 'primary-plain' : 'base-plain'}
                size='small'
                useIcon='clock'
                title='Enable/disable layer compare'
                hideText
                disabled={disabled || !compareEnabled || !active}
                data-tip={compareHelp}
                active={compareActive}
                onClick={onCompareClick}
              >
                <span>Compare</span>
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
            <LayerLegend
              dataOrder={dataOrder}
              legend={legend}
              knobPos={knobPos}
              onLegendKnobChange={onLegendKnobChange}
              id={id}
            />
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
  knobPos: T.number,
  compareEnabled: T.bool,
  compareActive: T.bool,
  compareHelp: T.string,
  onCompareClick: T.func
};

export default Layer;
