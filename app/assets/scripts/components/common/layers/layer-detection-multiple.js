import config from '../../../config';

export default {
  id: 'detection-multi',
  name: 'Multiple Detections',
  description: 'Multiple detections by machine learning',
  type: 'inference-timeseries',
  domain: [
    '2020-03-11'
  ],
  source: {
    vector: {
      type: 'geojson',
      data: `${config.api}/detections/multiple/{spotlightId}/{date}.geojson`
    },
    raster: {
      type: 'raster',
      tiles: [
        `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/planet_mosaic/{spotlightId}_{date}.tif&resampling_method=nearest&bidx=1,2,3`
      ]
    }
  },
  exclusiveWith: ['no2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship'],
  enabled: false,
  swatch: {
    color: '#411073',
    name: 'Purple'
  },
  timeUnit: 'day'

};
