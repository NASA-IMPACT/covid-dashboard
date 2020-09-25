import { format } from 'date-fns';

import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'no2',
  name: 'NO\u2082',
  type: 'raster-timeseries',
  domain: [
    '2018-03-01',
    '2020-08-01'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRM/OMI_trno2_0.10x0.10_{date}_Col3_V4.nc.tif&resampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2&color_formula=gamma r {gamma}`
    ]
  },
  exclusiveWith: ['agriculture', 'no2-diff', 'co2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: true,
  compare: {
    enabled: true,
    help: 'Compare with baseline (5 previous years)',
    mapLabel: date => `Baseline vs ${format(date, 'MMM yyyy')}`,
    yearDiff: 2,
    timeUnit: 'monthOnly',
    source: {
      type: 'raster',
      tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMBaseline/OMI_trno2_0.10x0.10_Baseline_{date}_Col3_V4.nc.tif&esampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2&color_formula=gamma r {gamma}`
      ]
    }
  },
  swatch: indicatorGroupColors['air-quality'],
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
  info: 'Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.'
};
