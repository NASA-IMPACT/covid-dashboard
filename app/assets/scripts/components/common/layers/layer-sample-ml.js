import { format, sub } from 'date-fns';

// import config from '../../../config';

// Sample ML Data
import * as sampleData from './ship-2020-03-11T1647.json';

export default {
  id: 'sample-ml',
  name: 'Sample ML',
  description: 'Sample ML',
  type: 'vector',
  /* domain: [
    '2019-03-01',
    '2020-03-01'
  ], */
  source: {
    type: 'geojson',
    data: sampleData,
    tiles: []
  },
  // exclusiveWith: ['gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd'],
  enabled: false,
  compare: {
    enabled: true,
    help: 'Compare with baseline (5 years ago)',
    mapLabel: date => `${format(sub(date, { years: 5 }), "MMM yy''")} — ${format(date, "MMM yy''")}`
  },
  swatch: {
    color: '#411073',
    name: 'Purple'
  },
  legend: {
    /*
    type: 'gradient-adjustable',
    min: 'less',
    max: 'more',
    stops: [
      '#99c5e0',
      '#f9eaa9',
      '#f7765d',
      '#c13b72',
      '#461070',
      '#050308'
    ] */
  }
};
