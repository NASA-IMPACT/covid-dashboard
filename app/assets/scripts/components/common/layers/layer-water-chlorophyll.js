import config from '../../../config';

export default {
  id: 'water-chlorophyll',
  name: 'Chlorophyll Anomaly',
  type: 'raster-timeseries',
  domain: [/* spotlight dependent */],
  timeUnit: 'day',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/oc3_chla_anomaly/anomaly-chl-{spotlightId}-{date}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r`
    ]
  },
  exclusiveWith: ['no2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-spm'],
  swatch: {
    color: '#B93138',
    name: 'Pale red'
  },
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
  info: null
};
