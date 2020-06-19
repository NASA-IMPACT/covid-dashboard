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
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/xco2_15day_mean.{date}.tif&resampling_method=bilinear&bidx=1&rescale=0.0004%2C0.00042&color_map=reds&color_formula=gamma r {gamma}`

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
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/xco2_15day_base.{date}.tif&resampling_method=bilinear&bidx=1&rescale=0.0004%2C0.00042&color_map=reds&color_formula=gamma r {gamma}`
      ]
    }
  },

  swatch: indicatorGroupColors['greenhouse-gases'],
  legend: {
    type: 'gradient-adjustable',
    min: 'less',
    max: 'more',
    stops: [
      '#FFFFFF',
      '#FF0000'
    ]
  },
  info: null
};
