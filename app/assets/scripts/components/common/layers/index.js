import get from 'lodash.get';

import imergMonthly from './layer-imerg-monthly';

const layers = [
  imergMonthly
];

export default layers;

const layersBySpotlight = {
  af: ['imergMonthly']
};

const layerOverridesBySpotlight = {
  af: {
    'nightlights-viirs': handleNightlightsViirs,
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-22', '2020-02-03', '2020-02-27', '2020-02-29', '2020-03-03', '2020-03-08', '2020-03-10', '2020-03-11', '2020-04-21']
      }),
    'water-chlorophyll': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-03-02', '2020-04-03', '2020-04-19', '2020-05-04', '2020-05-05', '2020-05-19', '2020-05-21', '2020-05-24', '2020-06-01', '2020-06-03', '2020-06-06', '2020-06-13', '2020-06-18', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-26', '2020-06-28', '2020-07-01', '2020-07-03', '2020-07-06', '2020-07-08', '2020-07-13']
      };
    },
    'water-spm': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-03-02', '2020-04-03', '2020-04-19', '2020-05-04', '2020-05-05', '2020-05-21', '2020-05-24', '2020-05-28', '2020-06-01', '2020-06-03', '2020-06-06', '2020-06-13', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-25', '2020-06-28', '2020-07-01', '2020-07-03']
      };
    }
  }
};

export function getSpotlightLayers (spotlightId) {
  const layersToUse = layersBySpotlight[spotlightId] || [];

  // Filter by the layers to include &
  // Replace the {site} property on the layers
  return layers
    .filter((l) => layersToUse.includes(l.id))
    .map((layer) => {
      let l = handleSpotlightId(layer, spotlightId);

      // Apply override function if it exists
      const overrideFn = get(layerOverridesBySpotlight, [spotlightId, l.id]);
      l = overrideFn ? overrideFn(l, spotlightId) : l;

      return l;
    });
}

export function getGlobalLayers () {
  const layersToUse = ['imerg-monthly'];
  return layers.filter((l) => layersToUse.includes(l.id));
}

// // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // //
// Layer helper functions below.

function handleSpotlightId (l, spotlightId) {
  // If we're dealing with a layer with a standard source, replace the
  // spotlightId in the source tiles. Other layers will be handled by the
  // override functions.
  const tiles = get(l, 'source.tiles');
  return tiles
    ? {
      ...l,
      source: {
        ...l.source,
        tiles: tiles.map((t) => t.replace('{spotlightId}', spotlightId))
      }
    }
    : l;
}

function handleNightlightsViirs (l, spotlightId) {
  const spotlightName = {
    af: 'Afrisar'
  }[spotlightId];

  return {
    ...l,
    domain: l.domain,
    source: {
      ...l.source,
      tiles: l.source.tiles.map((t) =>
        t.replace('{spotlightName}', spotlightName)
      )
    }
  };
}

function handleInferenceTimeseries (l, spotlightId, options) {
  return {
    ...l,
    domain: options.domain,
    source: {
      ...l.source,
      vector: {
        ...l.source.vector,
        data: l.source.vector.data.replace('{spotlightId}', spotlightId)
      },
      raster: {
        ...l.source.raster,
        tiles: l.source.raster.tiles
          .map(t => t.replace('{spotlightId}', spotlightId))
      }
    }
  };
}
