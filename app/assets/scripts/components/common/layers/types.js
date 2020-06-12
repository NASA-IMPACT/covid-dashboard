import { format, sub } from 'date-fns';
import bbox from '@turf/bbox';

const prepDateSource = (source, date, timeUnit = 'month') => {
  const formats = {
    month: 'yyyyMM',
    day: 'yyyy_MM_dd'
  };

  return {
    ...source,
    tiles: source.tiles.map((t) => t.replace('{date}', format(date, formats[timeUnit])))
  };
};

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

const prepSource = (layerInfo, source, date, knobPos) => {
  if (layerInfo.legend.type === 'gradient-adjustable') {
    source = prepGammaSource(source, knobPos);
  }
  source = prepDateSource(source, date, layerInfo.timeUnit);
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

const replaceVectorData = (theMap, sourceId, data) => {
  theMap.getSource(sourceId).setData(data);
};

const toggleOrAddLayer = (mbMap, id, source, type, paint, beforeId) => {
  if (mbMap.getSource(id)) {
    mbMap.setLayoutProperty(id, 'visibility', 'visible');
  } else {
    mbMap.addSource(id, source);
    mbMap.addLayer(
      {
        id: id,
        type: type,
        source: id,
        layout: {},
        paint
      },
      beforeId
    );
  }
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
      const tiles = prepSource(layerInfo, source, date, knobPos).tiles;
      replaceRasterTiles(mbMap, id, tiles);

      // Update/init compare layer tiles.
      if (comparing) {
        const source5years = prepSource(layerInfo, source, sub(date, { years: 5 }), knobPos);
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
        mbMap.addSource(id, prepSource(layerInfo, source, date, layerInfo.knobCurrPos));
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
  },
  'inference-timeseries': {
    update: (ctx, layerInfo, prevProps) => {
      const { props, mbMap } = ctx;
      const { date } = props;
      const { id, source } = layerInfo;
      const vecId = `${id}-vector`;
      const rastId = `${id}-raster`;
      const { vector, raster } = source;

      const updateDate = date.toISOString().split('T')[0];
      vector.data = vector.data.replace('{date}', updateDate);
      raster.tiles = raster.tiles.map(tile => tile.replace('{date}', updateDate));
      replaceVectorData(mbMap, vecId, vector.data);
      replaceRasterTiles(mbMap, rastId, raster.tiles);
    },
    hide: (ctx, layerInfo) => {
      const { mbMap } = ctx;
      const { id } = layerInfo;

      const vecId = `${id}-vector`;

      const rastId = `${id}-raster`;
      if (mbMap.getSource(vecId)) {
        mbMap.setLayoutProperty(vecId, 'visibility', 'none');
      }
      if (mbMap.getSource(rastId)) {
        mbMap.setLayoutProperty(rastId, 'visibility', 'none');
      }
    },
    show: (ctx, layerInfo) => {
      const { mbMap } = ctx;
      const { id, source, domain } = layerInfo;
      const vecId = `${id}-vector`;
      const rastId = `${id}-raster`;
      const { vector, raster } = source;

      const inferPaint = {
        'line-color': '#ff0000',
        'line-opacity': 0.6,
        'line-width': 2
      };

      const initDate = domain[domain.length - 1].replace(/-/g, '_');
      vector.data = vector.data.replace('{date}', initDate);

      raster.tiles = raster.tiles.map(tile => tile.replace('{date}', initDate));

      toggleOrAddLayer(mbMap, vecId, vector, 'line', inferPaint, 'admin-0-boundary-bg');
      toggleOrAddLayer(mbMap, rastId, raster, 'raster', {}, vecId);

      fetch(vector.data)
        .then(res => res.json())
        .then(geo => {
          mbMap.fitBounds(bbox(geo));
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
