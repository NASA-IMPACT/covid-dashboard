import React from 'react';
import T from 'prop-types';
import get from 'lodash.get';

import {
  PanelBlock,
  PanelBlockHeader,
  PanelBlockTitle,
  PanelBlockBody,
  PanelBlockScroll
} from '../common/panel-block';
import Layer from './layer';
import { Accordion } from '../common/accordion';

class DataLayersBlock extends React.Component {
  render () {
    const { onAction, layers, mapLoaded } = this.props;

    return (
      <PanelBlock>
        <PanelBlockHeader>
          <PanelBlockTitle>Data</PanelBlockTitle>
        </PanelBlockHeader>
        <PanelBlockBody>
          <PanelBlockScroll
            topShadowVariation='dark'
            bottomShadowVariation='dark'
          >
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
                        mapStyle={l.mapStyle}
                        info={l.info}
                        legend={l.legend}
                        isExpanded={checkExpanded(idx)}
                        setExpanded={v => setExpanded(idx, v)}
                        onToggleClick={() => onAction('layer.toggle', l)}
                      />
                    </li>
                  ))}
                </ol>
              )}
            </Accordion>
          </PanelBlockScroll>
        </PanelBlockBody>
      </PanelBlock>
    );
  }
}

DataLayersBlock.propTypes = {
  onAction: T.func,
  layers: T.array,
  mapLoaded: T.bool
};

export default DataLayersBlock;
