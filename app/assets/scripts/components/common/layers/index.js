import get from 'lodash.get';

import no2 from './layer-no2';
import population from './layer-population';
import carCount from './layer-car-count';
import nightlightsViirs from './layer-nightlights-viirs';
import nightlightsHd from './layer-nightlights-hd';
import detectionShip from './layer-detection-ship';
import detectionMulti from './layer-detection-multiple';

const layers = [
  no2,
  population,
  carCount,
  nightlightsViirs,
  nightlightsHd,
  detectionShip,
  detectionMulti
];

export default layers;

const layersBySpotlight = {
  be: ['no2', 'nightlights-hd', 'nightlights-viirs', 'car-count'],
  du: ['no2', 'nightlights-hd', 'nightlights-viirs'],
  gh: ['no2', 'nightlights-hd', 'nightlights-viirs'],
  la: ['no2', 'nightlights-hd', 'nightlights-viirs', 'detection-multi'],
  sf: ['no2', 'nightlights-hd', 'nightlights-viirs', 'detection-ship'],
  tk: ['no2', 'nightlights-hd', 'nightlights-viirs']
};

const layerOverridesBySpotlight = {
  be: {
    'nightlights-viirs': handleNightlightsViirs
  },
  du: {
    'nightlights-viirs': handleNightlightsViirs
  },
  gh: {
    'nightlights-viirs': handleNightlightsViirs
  },
  la: {
    'nightlights-viirs': handleNightlightsViirs,
    'detection-multi': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-02', '2020-02-13']
      })
  },
  sf: {
    'nightlights-viirs': handleNightlightsViirs,
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-03-11']
      })
  },
  tk: {
    'nightlights-viirs': handleNightlightsViirs
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
  const layersToUse = ['no2', 'gibs-population'];
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
    be: 'Beijing',
    gh: 'EUPorts',
    du: 'EUPorts',
    la: 'LosAngeles',
    sf: 'SanFrancisco',
    tk: 'Tokyo'
  }[spotlightId];

  return {
    ...l,
    domain: l.domain.filter((d) => {
      if (spotlightName === 'Beijing') {
        const dates = ['2020-03-18'];
        return !dates.includes(d);
      } else if (spotlightName === 'EUPorts') {
        const dates = [
          '2020-05-05',
          '2020-05-07',
          '2020-05-11',
          '2020-05-13',
          '2020-05-16',
          '2020-05-18',
          '2020-05-19'
        ];
        return !dates.includes(d);
      }
      return true;
    }),
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
