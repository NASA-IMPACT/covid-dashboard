import config from '../../../config';

// Sample ML Data
// import * as sampleData from './ship-2020-03-11T1647.json';
import * as sampleData from './ship-2020-03-11T1834.json';

export default {
  id: 'ship-detection',
  name: 'Ship Detection',
  description: 'Sample ML',
  type: 'inference-timeseries',
  domain: [
    '2019-03-11',
    '2020-04-02'
  ],
  source: {
    vector: {
      type: 'geojson',
      data: sampleData
    },
    raster: {
      type: 'raster',
      tiles: [
        `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/planet/sf_2020_03_11.tif&resampling_method=nearest&bidx=1,2,3`
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
