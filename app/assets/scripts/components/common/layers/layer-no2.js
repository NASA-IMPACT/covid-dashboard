import { format, sub } from 'date-fns';

import config from '../../../config';

export default {
  id: 'no2',
  name: 'Nitrogen dioxide',
  description: 'Acute harm due to NO<sub>2</sub> exposure is only likely to arise in occupational settings. Direct exposure to the skin can cause irritations and burns.',
  type: 'raster-timeseries',
  domain: [
    '2019-03-01',
    '2020-03-01'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRM/OMI_trno2_0.10x0.10_{date}_Col3_V4.nc.tif&resampling_method=bilinear&bidx=1&rescale=0%2C1e16&color_map=custom_no2&color_formula=gamma r {gamma}`
    ]
  },
  exclusiveWith: ['gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection'],
  enabled: true,
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
    ]
  },
  info: 'Higher nitrogen dioxide (NO2) levels, associated with higher levels of travel and economic activity, are indicated by the darker colors on the map. Lighter colors indicate lower levels of NO2 and less activity.'
};
