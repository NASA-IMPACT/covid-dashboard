import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'water-chlorophyll',
  name: 'Chlorophyll',
  type: 'raster-timeseries',
  domain: [/* spotlight dependent */],
  timeUnit: 'day',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/oc3_chla_anomaly/anomaly-chl-{spotlightId}-{date}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r`
    ]
  },
  exclusiveWith: ['agriculture', 'no2', 'co2-diff', 'co2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-spm'],
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
  info: 'Chlorophyll is an indicator of algae growth. Redder colors indicate increases in chlorophyll-a and worse water quality. Bluer colors indicate decreases in chlorophyll-a and improved water quality. White areas indicate no change.'
};
