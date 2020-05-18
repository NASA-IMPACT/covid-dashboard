import { format, sub } from 'date-fns';

const prepDateSource = (source, date) => ({
  ...source,
  tiles: source.tiles.map((t) => t.replace('{date}', format(date, 'yyyyMM')))
});

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

      if (
        prevProps.date &&
        date.getTime() === prevProps.date.getTime() &&
        compare === prevProps.compare
      ) { return; }

      if (mbMap.getSource(id)) {
        const tiles = prepDateSource(source, date).tiles;
        replaceRasterTiles(mbMap, id, tiles);

        if (compare) {
          const source5years = prepDateSource(source, sub(date, { years: 5 }));
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
        mbMap.addSource(id, prepDateSource(source, date));
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
