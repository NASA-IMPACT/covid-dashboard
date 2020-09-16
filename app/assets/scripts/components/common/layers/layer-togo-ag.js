
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
  info: null
};
