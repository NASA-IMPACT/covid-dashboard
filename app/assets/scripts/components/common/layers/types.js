import { format, sub } from 'date-fns';

const prepDateSource = (source, date) => ({
  ...source,
  tiles: source.tiles.map((t) => t.replace('{date}', format(date, 'yyyyMM')))
});

const prepGammaSource = (source, knobPos) => {
  // Gamma is calculated with the following scale:
  // domain: 0-100  range: 2-0.1
  // The higher the Knob, the lower the gamma.
  // This is a linear scale of type y = -mx + b
  // y = -0.02x + 2;

  return {
    ...source,
    tiles: source.tiles.map((t) => t.replace('{gamma}', -0.019 * knobPos + 2))
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
      const { mbMap, mbMapComparing, mbMapComparingLoaded, props } = ctx;
      const { id, source } = layerInfo;
      const prevLayerInfo = prevProps.layers.find(l => l.id === layerInfo.id);
      const { date, comparing } = props;

      const knobPos = layerInfo.knobCurrPos;
      const knobPosPrev = prevLayerInfo.knobCurrPos;

      // Do not update if:
      if (
        // There's no date defined.
        prevProps.date && date &&
        // Dates are the same
        date.getTime() === prevProps.date.getTime() &&
        // Knob position for gamma correction is the same.
        knobPos === knobPosPrev &&
        // Compare didn't change.
        comparing === prevProps.comparing
      ) return;

      // The source we're updating is not present.
      if (!mbMap.getSource(id)) return;

      // If we're comparing, and the compare map is not loaded.
      if (comparing && !mbMapComparingLoaded) return;

      // END update checks.

      // Update layer tiles.
      const tiles = prepSource(source, date, knobPos).tiles;
      replaceRasterTiles(mbMap, id, tiles);

      // Update/init compare layer tiles.
      if (comparing) {
        const source5years = prepSource(source, sub(date, { years: 5 }), knobPos);
        if (mbMapComparing.getSource(id)) {
          replaceRasterTiles(mbMapComparing, id, source5years.tiles);
        } else {
          mbMapComparing.addSource(id, source5years);
          mbMapComparing.addLayer(
            {
              id: id,
              type: 'raster',
              source: id
            },
            'admin-0-boundary-bg'
          );
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
        mbMap.addSource(id, prepSource(source, date, layerInfo.knobCurrPos));
        mbMap.addLayer(
          {
            id: id,
            type: 'raster',
            source: id
          },
          'admin-0-boundary-bg'
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
          'admin-0-boundary-bg'
        );
      }
    }
  }
};
