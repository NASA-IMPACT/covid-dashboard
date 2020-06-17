import config from '../../../config';

export default {
  id: 'detection-ship',
  name: 'Ship Detections',
  description: 'Ship detections by machine learning',
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
    }
  },
  exclusiveWith: ['no2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: false,
  swatch: {
    color: '#411073',
    name: 'Purple'
  },
  timeUnit: 'day'

};
