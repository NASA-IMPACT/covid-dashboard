import { format } from 'date-fns';

import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'co2',
  name: 'CO₂ Mean',
  description: '',
  type: 'raster-timeseries',
  timeUnit: 'day',
  domain: [
    '2020-01-01',
    '2020-04-16'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/xco2_15day_mean.{date}.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r&color_formula=gamma r {gamma}`

    ]
  },
  exclusiveWith: ['no2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: false,
  compare: {
    enabled: true,
    help: 'Compare with baseline',
    yearDiff: 0,
    mapLabel: date => `Base - Mean (${format(date, "dd MMM yy''")})`,
    source: {
      type: 'raster',
      tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/xco2_15day_base.{date}.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r&color_formula=gamma r {gamma}`
      ]
    }
  },

  swatch: indicatorGroupColors['greenhouse-gas'],
  legend: {
    type: 'gradient-adjustable',
    min: '< 408 ppm',
    max: '> 419 ppm',
    stops: [
      '#5D4FA2',
      '#2F75BE',
      '#6DC7A3',
      '#D7ED96',
      '#FFEA9B',
      '#FA894C',
      '#B11E4D'
    ]
  },
  info: null
};
