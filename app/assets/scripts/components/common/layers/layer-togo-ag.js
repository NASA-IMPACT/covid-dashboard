
import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'togo-ag',
  name: 'Agriculture',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/Togo/togo_cropland_v7-1_cog_v2.tif&resampling_method=bilinear&bidx=1&rescale=0%2C1&color_map=inferno`
    ]
  },
  enabled: true,
  exclusiveWith: [],
  swatch: indicatorGroupColors.agriculture,
  legend: {
    type: 'gradient',
    min: 'low',
    max: 'high',
    stops: [
      '#000000',
      '#1a0b40',
      '#4b0c6b',
      '#791c6d',
      '#a42c60',
      '#cf4446',
      '#ed6825',
      '#fb9b06',
      '#f6d13c',
      '#fbfda2'
    ]
  },
  info: 'Dark purple colors indicate lower probability of cropland while lighter yellow colors indicate higher probability of cropland within each pixel.'
};
