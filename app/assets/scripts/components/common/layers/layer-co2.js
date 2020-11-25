import { format } from 'date-fns';

import config from '../../../config';

export default {
  id: 'co2',
  exclusiveWith: ['agriculture', 'no2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: false,
  compare: {
    enabled: true,
    help: 'Compare with baseline',
    mapLabel: date => `${format(date, 'dd MMM yyyy')}: Base vs Mean`,
    compareDate: date => date,
    source: {
      type: 'raster',
      tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-base/xco2_16day_base.{date}.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r&color_formula=gamma r {gamma}`
      ]
    }
  },
  info: 'This layer shows the average background concentration of carbon dioxide (CO₂) in our atmosphere for 2020. Redder colors indicate more CO₂. Whiter colors indicate less CO₂.'
};
