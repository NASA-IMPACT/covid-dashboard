import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'water-spm',
  name: 'Turbidity',
  type: 'raster-timeseries',
  domain: [/* spotlight dependent */],
  timeUnit: 'day',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/spm_anomaly/anomaly-spm-{spotlightId}-{date}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r`
    ]
  },
  exclusiveWith: ['no2', 'co2-diff', 'co2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll'],
  swatch: indicatorGroupColors['water-quality'],
  legend: {
    type: 'gradient',
    min: 'less',
    max: 'more',
    stops: [
      '#3A88BD',
      '#C9E0ED',
      '#E4EEF3',
      '#FDDCC9',
      '#DE725B',
      '#67001F'
    ]
  },
  info: 'Turbidity refers to the amount of sediment or particles suspended in water. For this dataset, darker colors indicate more sediment and murkier water, while lighter colors indicate less sediment and clearer water.'
};
