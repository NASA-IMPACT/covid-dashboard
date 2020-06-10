import { format, sub } from 'date-fns';

import config from '../../../config';

// Sample ML Data
import * as sampleData from './ship-2020-03-11T1647.json';

export default {
  id: 'sample-ml',
  name: 'Sample ML',
  description: 'Sample ML',
  type: 'inference',
  domain: [
    '2020-03-11'
  ],
  source: {
    vector: {
      type: 'geojson',
      data: sampleData
    },
    raster: {
      type: 'raster',
      tiles: [
        `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/planet/sf-2020_03_11.tif&resampling_method=nearest&bidx=1,2,3`
      ]
    },
    tiles: []
  },
  exclusiveWith: ['no2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd'],
  enabled: false,
  compare: {
    enabled: true,
    help: 'Compare with baseline (5 years ago)',
    mapLabel: date => `${format(sub(date, { years: 5 }), "MMM yy''")} — ${format(date, "MMM yy''")}`
  },
  swatch: {
    color: '#411073',
    name: 'Purple'
  }
};
