import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'agriculture',
  name: 'Agriculture',
  type: 'raster-timeseries',
  timeUnit: 'day',
  domain: [
    '2020-01-28', '2020-02-28', '2020-03-28', '2020-04-28', '2020-05-28', '2020-06-28', '2020-07-28', '2020-08-28', '2020-09-28', '2020-10-28'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/agriculture/CropMonitor_{date}.tif&resampling_method=nearest&bidx=1&color_map=custom_cropmonitor`
    ]
  },
  exclusiveWith: ['no2', 'co2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: false,
  swatch: indicatorGroupColors.economic,
  legend: {
    type: 'categorical',
    stops: [
      { color: '#3C8EC4', label: 'Exceptional' },
      { color: '#6ECC51', label: 'Favourable' },
      { color: '#F3EF4F', label: 'Watch' },
      { color: '#DF6335', label: 'Poor' },
      { color: '#7E170E', label: 'Failure' },
      { color: '#777879', label: 'Out of season' },
      { color: '#794416', label: 'No data' }
    ]
  },
  info: null
};
