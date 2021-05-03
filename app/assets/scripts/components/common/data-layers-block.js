import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import get from 'lodash.get';

import {
  PanelBlock,
  PanelBlockHeader,
  PanelBlockTitle,
  PanelBlockBody,
  PanelBlockScroll
} from './panel-block';
import Layer from './layer';
import { Accordion } from './accordion';

const PanelBlockLayer = styled(PanelBlock)`
  flex: 2;
`;

class DataLayersBlock extends React.Component {
  render () {
    const { onAction, layers, mapLoaded } = this.props;

    return (
      <PanelBlockLayer>
        <PanelBlockBody>
          <PanelBlockScroll>
            <Accordion>
              {({ checkExpanded, setExpanded }) => (
                <ol>
                  {layers.map((l, idx) => (
                    <li key={l.id}>
                      <Layer
                        id={l.id}
                        label={l.name}
                        disabled={!mapLoaded}
                        type={l.type}
                        active={l.visible}
                        swatchColor={get(l, 'swatch.color')}
                        swatchName={get(l, 'swatch.name')}
                        dataOrder={l.dataOrder}
                        info={l.info}
                        legend={l.legend}
                        isExpanded={checkExpanded(idx)}
                        setExpanded={v => setExpanded(idx, v)}
                        onToggleClick={() => onAction('layer.toggle', l)}
                        onLegendKnobChange={(payload) => onAction('layer.legend-knob', { id: l.id, ...payload })}
                        knobPos={l.knobPos}
                        compareEnabled={!!l.compare}
                        compareActive={l.comparing}
                        compareHelp={get(l, 'compare.help')}
                        onCompareClick={() => onAction('layer.compare', l)}
                      />
                    </li>
                  ))}
                </ol>
              )}
            </Accordion>
          </PanelBlockScroll>
        </PanelBlockBody>
      </PanelBlockLayer>
    );
  }
}

DataLayersBlock.propTypes = {
  onAction: T.func,
  layers: T.array,
  mapLoaded: T.bool
};

export default DataLayersBlock;
