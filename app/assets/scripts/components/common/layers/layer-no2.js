import { format, sub } from 'date-fns';

import config from '../../../config';

export default {
  id: 'no2',
  exclusiveWith: ['agriculture', 'no2-diff', 'co2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: true,
  compare: {
    enabled: true,
    help: 'Compare with baseline (2 previous years)',
    mapLabel: date => `Baseline vs ${format(date, 'MMM yyyy')}`,
    compareDate: date => sub(date, { years: 2 }),
    timeUnit: 'monthOnly',
    source: {
      type: 'raster',
      tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMBaseline/OMI_trno2_0.10x0.10_Baseline_{date}_Col3_V4.nc.tif&esampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2&color_formula=gamma r {gamma}`
      ]
    }
  },
  info: 'Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.'
};
