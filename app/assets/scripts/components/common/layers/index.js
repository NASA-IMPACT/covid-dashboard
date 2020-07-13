import get from 'lodash.get';

import no2 from './layer-no2';
import co2 from './layer-co2';
import co2Diff from './layer-co2-diff';
import population from './layer-population';
import nightlightsViirs from './layer-nightlights-viirs';
import nightlightsHd from './layer-nightlights-hd';
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
  detectionShip,
  waterChlorophyll,
  waterSpm
];

export default layers;

const layersBySpotlight = {
  be: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs'],
  du: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs'],
  gh: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs'],
  la: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'detection-ship'],
  sf: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'detection-ship', 'water-chlorophyll', 'water-spm'],
  tk: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs'],
  ny: ['no2', 'co2', 'co2-diff', 'nightlights-hd', 'nightlights-viirs', 'detection-ship', 'water-chlorophyll', 'water-spm']
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
        domain: ['2020-01-22', '2020-02-03', '2020-03-15', '2020-03-18', '2020-03-21', '2020-03-22', '2020-04-23', '2020-04-24', '2020-01-22', '2020-02-02', '2020-02-03', '2020-02-27', '2020-02-29', '2020-03-03', '2020-03-08', '2020-03-15', '2020-03-21', '2020-03-22', '2020-03-27', '2020-04-23', '2020-04-24']
      })
  },
  sf: {
    'nightlights-viirs': handleNightlightsViirs,
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020-01-22', '2020-02-03', '2020-02-27', '2020-02-29', '2020-03-08', '2020-03-10', '2020-03-11', '2020-03-27', '2020-04-21', '2020-03-15']
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
        domain: ['2020-01-01', '2020-01-08', '2020-01-15', '2020-01-22', '2020-01-29', '2020-02-05', '2020-02-12', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-11', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-22', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-05-27', '2020-06-03'],
        source: {
          ...l.source,
          tiles: l.source.tiles.map(t => t.replace('&rescale=-100%2C100', ''))
        }
      };
    }
  },
  ny: {
    'nightlights-viirs': handleNightlightsViirs,
    'water-chlorophyll': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-01-01', '2020-01-08', '2020-01-15', '2020-01-22', '2020-01-29', '2020-02-05', '2020-02-12', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-11', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-22', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-05-27', '2020-06-03', '2020-01-20', '2020-01-21', '2020-02-02', '2020-02-03', '2020-02-29', '2020-03-03', '2020-03-08', '2020-03-22']
      };
    },
    'detection-ship': (l, spotlightId) =>
      handleInferenceTimeseries(l, spotlightId, {
        domain: ['2020_01_20', '2020_02_02', '2020_02_03', '2020_01_22', '2020_03_22', '2020_02_29', '2020_03_08', '2020_01_21', '2020_03_18', '2020_03_03', '2020-01-20', '2020-01-21', '2020-03-15', '2020-03-18', '2020-03-22']
      }),
    'water-spm': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-01-01', '2020-01-08', '2020-01-15', '2020-01-22', '2020-01-29', '2020-02-05', '2020-02-12', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-11', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-22', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-05-27', '2020-06-03']
      };
    },
    'nightlights-hd': (l, spotlightId) => {
      return {
        ...l,
        // For NY, nightlights goes till June
        domain: [l.domain[0], '2020-06-01']
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

function handleNightlightsViirs (l, spotlightId) {
  const spotlightName = {
    be: 'Beijing',
    gh: 'EUPorts',
    du: 'EUPorts',
    la: 'LosAngeles',
    ny: 'NewYork',
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
