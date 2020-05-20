import { format, sub } from 'date-fns';
import get from 'lodash.get';

const prepDateSource = (source, date) => ({
  ...source,
  tiles: source.tiles.map((t) => t.replace('{date}', format(date, 'yyyyMM')))
});

const prepGammaSource = (source, knobPos) => {
  // Gamma is calculated with the following scale:
  // domain: 0-100  range: 2-0
  // The higher the Knob, the lower the gamma.
  // This is a linear scale of type y = -mx + b
  // y = -0.02x + 2;

  return {
    ...source,
    tiles: source.tiles.map((t) => t.replace('{gamma}', -0.02 * knobPos + 2))
  };
};

const prepSource = (source, date, knobPos) => {
  source = prepDateSource(source, date);
  source = prepGammaSource(source, knobPos);
  return source;
};

const replaceRasterTiles = (theMap, sourceId, tiles) => {
  // https://github.com/mapbox/mapbox-gl-js/issues/2941
  // Set the tile url to a cache-busting url (to circumvent browser caching behaviour):
  theMap.getSource(sourceId).tiles = tiles;
  // Remove the tiles for a particular source
  theMap.style.sourceCaches[sourceId].clearTiles();
  // Load the new tiles for the current viewport (theMap.transform -> viewport)
  theMap.style.sourceCaches[sourceId].update(theMap.transform);
  // Force a repaint, so that the map will be repainted without you having to touch the map
  theMap.triggerRepaint();
};

export const layerTypes = {
  'raster-timeseries': {
    update: (ctx, layerInfo, prevProps) => {
      const { mbMap, mbMapComparing, props } = ctx;
      const { id, source } = layerInfo;
      const { date, compare } = props;

      const knobPos = get(props, ['layerData', id, 'knobCurrPos']);
      const knobPosPrev = get(prevProps, ['layerData', id, 'knobCurrPos']);

      if (
        prevProps.date &&
        date.getTime() === prevProps.date.getTime() &&
        compare === prevProps.compare &&
        knobPos === knobPosPrev
      ) { return; }

      if (mbMap.getSource(id)) {
        const tiles = prepSource(source, date, knobPos).tiles;

        replaceRasterTiles(mbMap, id, tiles);

        if (compare) {
          const source5years = prepSource(source, sub(date, { years: 5 }), knobPos);
          if (mbMapComparing.getSource(id)) {
            replaceRasterTiles(mbMapComparing, id, source5years.tiles);
          } else {
            // TODO: Waiting for a map to load should be decoupled from the layer types.
            mbMapComparing.once('load', () => {
              mbMapComparing.addSource(id, source5years);
              mbMapComparing.addLayer(
                {
                  id: id,
                  type: 'raster',
                  source: id
                },
                'admin-1-boundary-bg'
              );
            });
          }
        }
      }
    },
    hide: (ctx, layerInfo) => {
      const { mbMap } = ctx;
      const { id } = layerInfo;
      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'none');
      }
    },
    show: (ctx, layerInfo) => {
      const { mbMap, props } = ctx;
      const { id, source } = layerInfo;
      const { date } = props;

      if (!date) return;

      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'visible');
      } else {
        const knobPos = get(props, ['layerData', id, 'knobCurrPos']);
        mbMap.addSource(id, prepSource(source, date, knobPos));
        mbMap.addLayer(
          {
            id: id,
            type: 'raster',
            source: id
          },
          'admin-1-boundary-bg'
        );
      }
    }
  },
  raster: {
    hide: (ctx, layerInfo) => {
      const { mbMap } = ctx;
      const { id } = layerInfo;
      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'none');
      }
    },
    show: (ctx, layerInfo) => {
      const { mbMap } = ctx;
      const { id, source } = layerInfo;

      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'visible');
      } else {
        mbMap.addSource(id, source);
        mbMap.addLayer(
          {
            id: id,
            type: 'raster',
            source: id
          },
          'admin-1-boundary-bg'
        );
      }
    }
  }
};
