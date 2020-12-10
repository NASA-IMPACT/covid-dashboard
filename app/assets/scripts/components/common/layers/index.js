import defaultsDeep from 'lodash.defaultsdeep';

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

const layerOverrides = [
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

// Store the layer data.
const layersDataBySpotlight = {};

export function getSpotlightLayers (spotlightId) {
  return layersDataBySpotlight[spotlightId];
}

export function getGlobalLayers () {
  return layersDataBySpotlight.global;
}

export const storeSpotlightLayers = (spotlightId, layers) => {
  // Overrides to the layer settings.
  const spotLayers = layers
    .map((layer) => {
      const base = layerOverrides.find(l => l.id === layer.id) || {};

      // The local changes are the default, and are replaced by new properties
      // that come from the api. The local updates will always take precedence.
      return defaultsDeep({}, base, layer);
    });

  layersDataBySpotlight[spotlightId] = spotLayers;
};
