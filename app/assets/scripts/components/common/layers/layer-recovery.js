import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'recovery',
  name: 'Recovery Proxy Map',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-{spotlightId}.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24`
    ]
  },
  paint: {
    'raster-opacity': 0.9
  },
  exclusiveWith: ['agriculture', 'co2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: true,
  swatch: indicatorGroupColors.economic,
  info: 'Recovery Proxy Maps show areas with the greatest increase in car activity shaded in orange. Darker orange indicates areas of greater change.'
};
