import { format } from 'date-fns';

import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'co2',
  name: 'CO\u2082 (Avg)',
  type: 'raster-timeseries',
  timeUnit: 'day',
  domain: [
    '2020-01-01',
    '2020-07-16'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-mean/xco2_16day_mean.{date}.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r&color_formula=gamma r {gamma}`

    ]
  },
  exclusiveWith: ['agriculture', 'no2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: false,
  compare: {
    enabled: true,
    help: 'Compare with baseline',
    yearDiff: 0,
    mapLabel: date => `${format(date, 'dd MMM yyyy')}: Base vs Mean`,
    source: {
      type: 'raster',
      tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-base/xco2_16day_base.{date}.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r&color_formula=gamma r {gamma}`
      ]
    }
  },

  swatch: indicatorGroupColors['greenhouse-gas'],
  legend: {
    type: 'gradient-adjustable',
    min: '< 408 ppm',
    max: '> 419 ppm',
    stops: [
      '#313695',
      '#588cbf',
      '#a3d2e5',
      '#e8f6e8',
      '#fee89c',
      '#fba55c',
      '#e24932'
    ]
  },
  info: 'This layer shows the average background concentration of carbon dioxide (CO₂) in our atmosphere for 2020. Redder colors indicate more CO₂. Whiter colors indicate less CO₂.'
};
