import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'slowdown',
  name: 'Slowdown Proxy Maps',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/slowdown_proxy_map/{spotlightId}.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24`
    ]
  },
  paint: {
    'raster-opacity': 0.9
  },
  exclusiveWith: ['agriculture', 'co2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: true,
  swatch: indicatorGroupColors.economic,
  info: 'Slowdown Proxy Maps show areas with the greatest reduction in car activity shaded in blue. Darker blues indicate areas of greater change.'
};
