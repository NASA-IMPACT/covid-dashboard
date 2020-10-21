import get from 'lodash.get';

import no2 from './layer-no2';
import no2Diff from './layer-no2-diff';
import co2 from './layer-co2';
import co2Diff from './layer-co2-diff';
import population from './layer-population';
import nightlightsViirs from './layer-nightlights-viirs';
import nightlightsHd from './layer-nightlights-hd';
import detectionShip from './layer-detection-ship';
import recovery from './layer-recovery';
import slowdown from './layer-slowdown';
import waterChlorophyll from './layer-water-chlorophyll';
import waterSpm from './layer-water-spm';
import agriculture from './layer-agriculture';
import waterGlChl from './layer-wq-gl-chl';
import waterGlSpm from './layer-wq-gl-spm';
import detectionPlane from './layer-detection-plane';
import agTogo from './layer-togo-ag';

const layers = [
  no2,
  no2Diff,
  co2,
  co2Diff,
  population,
  nightlightsViirs,
  nightlightsHd,
  detectionShip,
  recovery,
  slowdown,
  waterChlorophyll,
  waterSpm,
  agriculture,
  waterGlChl,
  waterGlSpm,
  detectionPlane,
  agTogo
];

export default layers;

const layersBySpotlight = {
  be: ['no2', 'no2-diff', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'slowdown', 'recovery', 'detection-plane'],
  du: ['no2', 'no2-diff', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'slowdown', 'recovery'],
  gh: ['no2', 'no2-diff', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'slowdown', 'recovery'],
  la: ['no2', 'no2-diff', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'agriculture', 'slowdown', 'detection-ship', 'detection-plane', 'recovery'],
  sf: ['no2', 'no2-diff', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'agriculture', 'slowdown', 'recovery', 'detection-ship', 'detection-plane', 'water-chlorophyll', 'water-spm'],
  tk: ['no2', 'no2-diff', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'recovery', 'detection-plane'],
  ny: ['no2', 'no2-diff', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'slowdown', 'detection-ship', 'detection-plane', 'water-chlorophyll', 'water-spm', 'recovery'],
  togo: ['togo-ag'],
  wble: ['water-wq-gl-chl', 'water-wq-gl-spm']
};

const layerOverridesBySpotlight = {
  be: {
    'nightlights-viirs': handleNightlightsViirs,
    'detection-plane': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-09', '2020-01-12', '2020-01-14', '2020-02-10', '2020-02-18', '2020-03-12', '2020-03-13', '2020-03-19', '2020-04-11', '2020-05-05', '2020-05-14']
      })

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
        domain: ['2020-01-01', '2020-01-06', '2020-01-07', '2020-01-09', '2020-01-10', '2020-01-12', '2020-01-13', '2020-01-14', '2020-01-17', '2020-01-18', '2020-01-19', '2020-01-22', '2020-01-23', '2020-01-24', '2020-01-27', '2020-01-28', '2020-01-29', '2020-01-30', '2020-01-31', '2020-02-02', '2020-02-03', '2020-02-27', '2020-02-29', '2020-03-03', '2020-03-08', '2020-03-15', '2020-03-21', '2020-03-22', '2020-03-27', '2020-04-23', '2020-04-24', '2020-05-01', '2020-05-02', '2020-05-03', '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-07', '2020-05-08', '2020-05-09', '2020-05-11', '2020-05-12', '2020-05-13', '2020-05-14', '2020-05-15', '2020-05-16', '2020-05-17', '2020-05-19', '2020-05-20', '2020-05-21']
      }),
    'detection-plane': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-10', '2020-01-14', '2020-02-01', '2020-02-03', '2020-03-22', '2020-04-15', '2020-04-21', '2020-05-04', '2020-05-05']
      })
  },
  sf: {
    'nightlights-viirs': handleNightlightsViirs,
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-02', '2020-01-03', '2020-01-05', '2020-01-07', '2020-01-10', '2020-01-11', '2020-01-12', '2020-01-13', '2020-01-14', '2020-01-17', '2020-01-18', '2020-01-23', '2020-01-27', '2020-01-30', '2020-01-31', '2020-05-01', '2020-05-03', '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-07', '2020-05-08', '2020-01-02', '2020-01-03', '2020-01-05', '2020-01-07', '2020-01-10', '2020-01-11', '2020-01-12', '2020-01-13', '2020-01-14', '2020-01-17', '2020-01-18', '2020-01-22', '2020-01-23', '2020-01-27', '2020-01-30', '2020-01-31', '2020-02-03', '2020-02-27', '2020-02-29', '2020-03-03', '2020-03-08', '2020-03-10', '2020-03-11', '2020-04-21', '2020-05-01', '2020-05-03', '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-07', '2020-05-08', '2020-05-09', '2020-05-15', '2020-05-16', '2020-05-17', '2020-05-19', '2020-05-20', '2020-05-21']
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
    },
    'detection-plane': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-11', '2020-01-12', '2020-01-13', '2020-02-06', '2020-02-07', '2020-02-10', '2020-02-15', '2020-02-18', '2020-02-20', '2020-03-09', '2020-03-10', '2020-03-12', '2020-03-19', '2020-04-02', '2020-04-03', '2020-04-07', '2020-04-15', '2020-04-22', '2020-05-04', '2020-05-05', '2020-05-07', '2020-05-19']
      })
  },
  tk: {
    'nightlights-viirs': handleNightlightsViirs,
    'water-chlorophyll': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2018-01-03', '2018-01-10', '2018-01-17', '2018-01-24', '2018-01-31', '2018-02-14', '2018-02-21', '2018-03-07', '2018-03-14', '2018-03-28', '2018-04-04', '2018-04-11', '2018-04-18', '2018-04-25', '2018-05-02', '2018-05-09', '2018-05-16', '2018-05-30', '2018-06-20', '2018-06-27', '2018-07-04', '2018-07-11', '2018-07-18', '2018-07-25', '2018-08-01', '2018-08-08', '2018-08-22', '2018-09-05', '2018-09-12', '2018-09-19', '2018-09-26', '2018-10-03', '2018-10-17', '2018-10-24', '2018-11-07', '2018-11-14', '2018-11-21', '2018-11-28', '2018-12-12', '2018-12-19', '2018-12-26', '2019-01-02', '2019-01-09', '2019-01-16', '2019-01-23', '2019-01-30', '2019-02-13', '2019-02-27', '2019-03-06', '2019-03-13', '2019-03-20', '2019-03-27', '2019-04-03', '2019-04-10', '2019-05-08', '2019-05-15', '2019-05-22', '2019-05-29', '2019-06-12', '2019-06-19', '2019-07-24', '2019-07-31', '2019-08-07', '2019-08-14', '2019-08-21', '2019-08-28', '2019-09-04', '2019-09-11', '2019-09-25', '2019-10-02', '2019-10-09', '2019-10-23', '2019-10-30', '2019-11-06', '2019-11-13', '2019-11-20', '2019-11-27', '2019-12-11', '2019-12-18', '2019-12-25', '2020-01-01', '2020-01-08', '2020-01-15', '2020-01-29', '2020-02-05', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-06-03', '2020-06-10', '2020-06-13', '2020-07-25', '2020-08-01', '2020-08-08', '2020-08-15'],
        source: {
          ...l.source,
          tiles: l.source.tiles.map(t => t.replace('&rescale=-100%2C100', ''))
        }
      };
    },
    'detection-plane': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-19', '2020-02-01', '2020-02-10', '2020-02-05', '2020-03-12', '2020-03-18', '2020-03-19', '2020-04-09', '2020-04-10', '2020-04-22', '2020-04-23', '2020-05-02', '2020-05-17']
      })
  },

  ny: {
    'nightlights-viirs': handleNightlightsViirs,
    'water-chlorophyll': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-01-01', '2020-01-08', '2020-01-15', '2020-01-22', '2020-01-29', '2020-02-05', '2020-02-12', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-11', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-22', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-05-27', '2020-06-03', '2020-06-10', '2020-06-17', '2020-06-24', '2020-07-01', '2020-07-08', '2020-07-15', '2020-07-22', '2020-07-29', '2020-08-05', '2020-08-12', '2020-09-02', '2020-09-09', '2020-09-16', '2020-09-23', '2020-09-30']
      };
    },
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-02', '2020-01-09', '2020-01-11', '2020-01-16', '2020-01-17', '2020-01-19', '2020-01-23', '2020-01-24', '2020-01-30', '2020-05-02', '2020-05-05', '2020-01-02', '2020-01-09', '2020-01-11', '2020-01-16', '2020-01-17', '2020-01-19', '2020-01-20', '2020-01-21', '2020-01-22', '2020-01-23', '2020-01-24', '2020-01-30', '2020-02-02', '2020-02-03', '2020-02-29', '2020-03-08', '2020-03-18', '2020-03-22', '2020-03-27', '2020-05-02', '2020-05-05', '2020-05-09', '2020-05-10', '2020-05-13', '2020-05-14', '2020-05-16', '2020-05-19', '2020-05-20', '2020-05-21']
      }),
    'water-spm': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-01-01', '2020-01-08', '2020-01-15', '2020-01-22', '2020-01-29', '2020-02-05', '2020-02-12', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-11', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-22', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-05-27', '2020-06-03', '2020-06-10', '2020-06-17', '2020-06-24', '2020-07-01', '2020-07-08', '2020-07-15', '2020-07-22', '2020-07-29', '2020-08-05', '2020-08-12', '2020-09-02', '2020-09-09', '2020-09-16', '2020-09-23', '2020-09-30']
      };
    },
    'nightlights-hd': (l, spotlightId) => {
      return {
        ...l,
        // For NY, nightlights goes till June
        domain: [l.domain[0], '2020-06-01']
      };
    },
    'detection-plane': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-16', '2020-01-20', '2020-02-17', '2020-02-19', '2020-03-09', '2020-03-15', '2020-04-06', '2020-04-15', '2020-05-05', '2020-05-14']
      })
  }
};

export function getSpotlightLayers(spotlightId) {
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

export function getGlobalLayers() {
  const layersToUse = ['no2', 'no2-diff', 'co2', 'co2-diff', 'gibs-population', 'agriculture'];
  return layers.filter((l) => layersToUse.includes(l.id));
}

// // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // //
// Layer helper functions below.

function handleSpotlightId(l, spotlightId) {
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

function handleNightlightsViirs(l, spotlightId) {
  const spotlightName = spotlightId === 'du' || spotlightId === 'gh'
    ? 'EUPorts'
    : spotlightId;

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

function handleInferenceTimeseries(l, spotlightId, options) {
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
