import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'water-wq-gl-spm',
  name: 'Turbidity',
  type: 'raster-timeseries',
  domain: ['2020-01-01', '2020-01-08', '2020-01-15', '2020-01-22', '2020-01-29', '2020-02-05', '2020-02-12', '2020-02-19', '2020-02-26', '2020-03-04', '2020-03-11', '2020-03-18', '2020-03-25', '2020-04-01', '2020-04-08', '2020-04-15', '2020-04-22', '2020-04-29', '2020-05-06', '2020-05-13', '2020-05-20', '2020-05-27', '2020-06-03', '2020-06-10', '2020-06-17', '2020-06-24'],
  timeUnit: 'day',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/wq-greatlakes/sm_anomaly_wble_{date}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r`
    ]
  },
  exclusiveWith: [],
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
  info: 'Turbidity refers to the amount of sediment or particles suspended in water. Darker colors indicate more sediment and murkier water. Lighter colors indicate less sediment and clearer water.'
};
