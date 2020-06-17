import get from 'lodash.get';
import { eachWeekOfInterval, format } from 'date-fns';

import { utcDate } from '../../../utils/utils';

import no2 from './layer-no2';
import population from './layer-population';
import carCount from './layer-car-count';
import nightlightsViirs from './layer-nightlights-viirs';
import nightlightsHd from './layer-nightlights-hd';
import detectionShip from './layer-detection-ship';
import detectionMulti from './layer-detection-multiple';
import waterChlorophyll from './layer-water-chlorophyll';
import waterSpm from './layer-water-spm';

const layers = [
  no2,
  population,
  carCount,
  nightlightsViirs,
  nightlightsHd,
  detectionShip,
  detectionMulti,
  waterChlorophyll,
  waterSpm
];

export default layers;

const layersBySpotlight = {
  be: ['no2', 'nightlights-hd', 'nightlights-viirs', 'car-count'],
  du: ['no2', 'nightlights-hd', 'nightlights-viirs'],
  gh: ['no2', 'nightlights-hd', 'nightlights-viirs'],
  la: ['no2', 'nightlights-hd', 'nightlights-viirs', 'detection-multi'],
  sf: ['no2', 'nightlights-hd', 'nightlights-viirs', 'detection-ship', 'water-chlorophyll', 'water-spm'],
  tk: ['no2', 'nightlights-hd', 'nightlights-viirs', 'water-chlorophyll'],
  ny: ['water-chlorophyll']
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
      }),
    'water-chlorophyll': (l, spotlightId) => {
      return {
        ...l,
        domain: ['2020-03-02', '2020-04-03', '2020-04-19', '2020-05-04', '2020-05-05', '2020-05-19', '2020-05-21', '2020-05-24']
      };
    }
  },
  tk: {
    'nightlights-viirs': handleNightlightsViirs,
    'water-chlorophyll': (l, spotlightId) => {
      // Generate dates - weekly on wednesday.
      const dates = eachWeekOfInterval({
        start: utcDate('2017-12-27'),
        end: utcDate('2020-06-10')
      }, { weekStartsOn: 3 });

      return {
        ...l,
        domain: dates.map(d => format(d, 'yyyy-MM-dd')),
        source: {
          ...l.source,
          tiles: l.source.tiles.map(t => t.replace('&rescale=-100%2C100', ''))
        }
      };
    }
  },
  ny: {
    'water-chlorophyll': (l, spotlightId) => {
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
