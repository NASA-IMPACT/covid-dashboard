import React from 'react';
import styled from 'styled-components';
import T from 'prop-types';

import LayerLegend from '../../common/layer-legend';
import Heading from '../../../styles/type/heading';
import collecticon from '../../../styles/collecticons';

import { glsp } from '../../../styles/utils/theme-values';
import {
  getMapLayers
} from './utils';
import { replaceSub2 } from '../../../utils/format';

const MapLayerLegend = styled.div`
  display: grid;
  grid-gap: ${glsp(0.5)};
`;

export const LayerInfo = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: ${glsp(0.5)};
  font-size: 0.875rem;
  padding-top: ${glsp(0.5)};

  &::before {
    ${collecticon('circle-information')}
    grid-column: 1;
    grid-row: 1;
  }

  p {
    grid-row: 1;
  }
`;

const AboutData = ({ visual, id }) => {
  // If there are no visuals there's nothing to do.
  if (!visual) return;

  let layersWithLegend = [];

  if (visual.type === 'map-layer') {
    const { layers = [], spotlight } = visual.data;

    const mapLayers = getMapLayers(spotlight, layers);
    // Map the layer ids to layer definition objects.
    layersWithLegend = layers
      .map((l, idx) => {
        if (typeof l === 'string') {
          const layerDef = mapLayers.find((layer) => layer.id === l);
          if (!layerDef) {
            throw new Error(
              `Layer definition not found for story layer with id [${l}]`
            );
          }
          return layerDef;
        }
        return l;
      })
      .filter((l) => !!l.legend);
  }

  if (visual.type === 'multi-map' && visual.data.legend) {
    const { legend, name, info } = visual.data;
    layersWithLegend = [{
      id: id,
      legend,
      info,
      name: name || 'Multi map'
    }];
  }

  if (!layersWithLegend.length && !visual.about) return null;

  return (
    <MapLayerLegend>
      <Heading as='h2' size='medium'>
        About the data
      </Heading>
      {layersWithLegend.map((l) => {
        const { type } = l.legend;
        const legend = {
          ...l.legend,
          // We don't have adjustable gradients here, so convert to normal one.
          type: type === 'gradient-adjustable' ? 'gradient' : type
        };
        return (
          <div key={l.id}>
            <Heading as='h3' size='small'>
              {replaceSub2(l.name)}
            </Heading>
            <LayerLegend dataOrder={l.dataOrder} legend={legend} id={l.id} />
            <LayerInfo>
              <p>{l.info}</p>
            </LayerInfo>
          </div>
        );
      })}
      {visual.about}
    </MapLayerLegend>
  );
};

AboutData.propTypes = {
  id: T.string,
  visual: T.shape({
    type: T.string,
    about: T.node,
    data: T.shape({
      spotlight: T.string,
      layers: T.array,
      legend: T.object,
      item: T.object,
      name: T.string,
      info: T.node
    })
  })
};

export default AboutData;
