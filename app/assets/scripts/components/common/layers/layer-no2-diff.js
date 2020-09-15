import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'no2-diff',
  name: 'NO\u2082 (Diff)',
  type: 'raster-timeseries',
  domain: [
    '2018-03-01',
    '2020-07-01'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMDifference/OMI_trno2_0.10x0.10_{date}_Col3_V4.nc.tif&resampling_method=bilinear&bidx=1&rescale=-3e15%2C3e15&color_map=rdbu_r`
    ]
  },
  exclusiveWith: ['co2', 'co2-diff', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm', 'no2'],
  enabled: false,
  swatch: indicatorGroupColors['air-quality'],
  legend: {
    type: 'gradient',
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
  info: 'This layer shows changes in nitrogen dioxide (NO₂) levels. Redder colors indicate increases in NO₂. Bluer colors indicate lower levels of NO₂.'
};
