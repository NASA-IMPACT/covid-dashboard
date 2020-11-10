export default {
  id: 'slowdown',
  paint: {
    'raster-opacity': 0.9
  },
  exclusiveWith: ['agriculture', 'co2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: true,
  info: 'Slowdown Proxy Maps show areas with the greatest reduction in car activity shaded in blue. Darker blues indicate areas of greater change.'
};
