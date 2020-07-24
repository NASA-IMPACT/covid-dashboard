import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'no2-diff',
  name: 'NO\u2082 (Diff)',
  type: 'raster-timeseries',
  domain: [
    '2018-03-01',
    '2020-05-01'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMDifference/OMI_trno2_0.10x0.10_{date}_Col3_V4.nc.tif&resampling_method=bilinear&bidx=1&rescale=-0.000001%2C0.000001&color_map=rdbu_r&color_formula=gamma r {gamma}`
    ]
  },
  exclusiveWith: ['co2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm', 'no2'],
  enabled: false,
  swatch: indicatorGroupColors['air-quality'],
  legend: {
    type: 'gradient-adjustable',
    min: 'less',
    max: 'more',
    stops: [
      '#3A88BD',
      '#C9E0ED',
      '#E4EEF3',
      '#FDDCC9',
      '#DD7059'

    ]
  },
  info: 'Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.'
};
