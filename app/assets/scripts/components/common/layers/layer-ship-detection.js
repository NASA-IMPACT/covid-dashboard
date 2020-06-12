import config from '../../../config';

export default {
  id: 'ship-detection',
  name: 'Ship Detection',
  description: 'Sample ML',
  type: 'inference-timeseries',
  domain: [
    '2020-03-11'
  ],
  source: {
    vector: {
      type: 'geojson',
      data: `${config.api}/detections/ship/{spotlightId}/{date}.geojson`
    },
    raster: {
      type: 'raster',
      tiles: [
        `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/planet/{spotlightId}_{date}.tif&resampling_method=nearest&bidx=1,2,3`
      ]
    },
    tiles: []
  },
  exclusiveWith: ['no2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd'],
  enabled: false,
  swatch: {
    color: '#411073',
    name: 'Purple'
  }
};
