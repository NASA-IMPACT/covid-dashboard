import get from 'lodash.get';

import no2 from './layer-no2';
import co2 from './layer-co2';
import co2Diff from './layer-co2-diff';
import population from './layer-population';
import nightlightsViirs from './layer-nightlights-viirs';
import nightlightsHd from './layer-nightlights-hd';
import nightlights500m from './layer-nightlights-500m';
import detectionShip from './layer-detection-ship';
import waterChlorophyll from './layer-water-chlorophyll';
import waterSpm from './layer-water-spm';

const layers = [
  no2,
  co2,
  co2Diff,
  population,
  nightlightsViirs,
  nightlightsHd,
  nightlights500m,
  detectionShip,
  waterChlorophyll,
  waterSpm
];

export default layers;

const spotlightNames = {
  be: 'Beijing',
  gh: 'EUPorts',
  du: 'EUPorts',
  la: 'LosAngeles',
  sf: 'SanFrancisco',
  tk: 'Tokyo',
  ny: 'NewYork'
};

const layersBySpotlight = {
  be: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs'],
  du: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs'],
  gh: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs'],
  la: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'detection-ship'],
  sf: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'detection-ship', 'water-chlorophyll', 'water-spm'],
  tk: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs'],
  ny: ['no2', 'co2', 'co2-diff', 'nightlights-500m', 'detection-ship', 'water-chlorophyll', 'water-spm']
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
      }),
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-22', '2020-03-15', '2020-03-18', '2020-03-21', '2020-03-22', '2020-04-23', '2020-04-24']
      })
  },
  sf: {
    'nightlights-viirs': handleNightlightsViirs,
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-03-10', '2020-03-11', '2020-03-15', '2020-03-18', '2020-04-21']
      }),
    'water-chlorophyll': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-03-02', '2020-04-03', '2020-04-19', '2020-05-04', '2020-05-05', '2020-05-19', '2020-05-21', '2020-05-24']
      };
    },
    'water-spm': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-03-02', '2020-04-03', '2020-04-19', '2020-05-04', '2020-05-05', '2020-05-19', '2020-05-21', '2020-05-24']
      };
    }
  },
  tk: {
    'nightlights-viirs': handleNightlightsViirs,
    'water-chlorophyll': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2018-01-03', '2018-01-10', '2018-01-17', '2018-01-24', '2018-01-31', '2018-02-14', '2018-02-21', '2018-03-07', '2018-03-14', '2018-03-28', '2018-04-04', '2018-04-11', '2018-04-18', '2018-04-25', '2018-05-02', '2018-05-09', '2018-05-16', '2018-05-30', '2018-06-20', '2018-06-27', '2018-07-04', '2018-07-11', '2018-07-18', '2018-07-25', '2018-08-01', '2018-08-08', '2018-08-22', '2018-09-05', '2018-09-12', '2018-09-19', '2018-09-26', '2018-10-03', '2018-10-17', '2018-10-24', '2018-11-07', '2018-11-14', '2018-11-21', '2018-11-28', '2018-12-12', '2018-12-19', '2018-12-26', '2019-01-02', '2019-01-09', '2019-01-16', '2019-01-23', '2019-01-30', '2019-02-13', '2019-02-27', '2019-03-06', '2019-03-13', '2019-03-20', '2019-03-27', '2019-04-03', '2019-04-10', '2019-05-08', '2019-05-15', '2019-05-22', '2019-05-29', '2019-06-12', '2019-06-19', '2019-07-24', '2019-07-31', '2019-08-07', '2019-08-14', '2019-08-21', '2019-08-28', '2019-09-04', '2019-09-11', '2019-09-25', '2019-10-02', '2019-10-09', '2019-10-23', '2019-10-30', '2019-11-06', '2019-11-13', '2019-11-20', '2019-11-27', '2019-12-11', '2019-12-18', '2019-12-25', '2020-01-01', '2020-01-08', '2020-01-15', '2020-01-29', '2020-02-05', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-06-03'],
        source: {
          ...l.source,
          tiles: l.source.tiles.map(t => t.replace('&rescale=-100%2C100', ''))
        }
      };
    }
  },
  ny: {
    'nightlights-500m': handleNightlights500m,
    'water-chlorophyll': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-01-01', '2020-01-08', '2020-01-15', '2020-01-22', '2020-01-29', '2020-02-05', '2020-02-12', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-11', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-22', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-05-27', '2020-06-03']
      };
    },
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-20', '2020-01-21', '2020-03-15', '2020-03-18', '2020-03-22']
      }),
    'water-spm': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-01-01', '2020-01-08', '2020-01-15', '2020-01-22', '2020-01-29', '2020-02-05', '2020-02-12', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-11', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-22', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-05-27', '2020-06-03']
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
  const layersToUse = ['no2', 'co2', 'co2-diff', 'gibs-population'];
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

function handleNightlights500m (l, spotlightId) {
  const spotlightName = spotlightNames[spotlightId];

  return {
    ...l,
    source: {
      ...l.source,
      tiles: l.source.tiles.map((t) =>
        t.replace('{spotlightName}', spotlightName)
      )
    }
  };
}

function handleNightlightsViirs (l, spotlightId) {
  const spotlightName = spotlightNames[spotlightId];

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
