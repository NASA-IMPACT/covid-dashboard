import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'co2-diff',
  name: 'CO\u2082 (Diff)',
  type: 'raster-timeseries',
  timeUnit: 'day',
  domain: [
    '2020-01-01',
    '2020-04-16'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/xco2_15day_diff.{date}.tif&resampling_method=bilinear&bidx=1&rescale=-0.000001%2C0.000001&color_map=rdbu_r`
    ]
  },
  exclusiveWith: ['no2', 'no2-diff', 'co2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: false,
  swatch: indicatorGroupColors['greenhouse-gas'],
  legend: {
    type: 'gradient',
    min: '< -1 ppm',
    max: '> 1 ppm',
    stops: [
      '#3A88BD',
      '#C9E0ED',
      '#E4EEF3',
      '#FDDCC9',
      '#DD7059'
    ]
  },
  info: 'This layer shows changes in carbon dioxide (CO₂) levels during coronavirus lockdowns versus previous years. Redder colors indicate increases in CO₂. Bluer colors indicate lower levels of CO₂.'
};
