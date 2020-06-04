import config from '../../../config';

export default {
  id: 'nightlights-day',
  name: 'Nightlights Daily',
  type: 'raster-timeseries',
  timeUnit: 'day',
  domain: [
    '2020-01-01',
    '2020-06-01'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/BM_500M_DAILY/VNP46A2_V011.h05v05.{date}.5000.76.68_44.97_V30_cog.tif&resampling_method=bilinear&bidx=1&rescale=0%2C100&color_map=viridis`
    ]
  },
  exclusiveWith: ['no2'],
  swatch: {
    color: '#f2a73a',
    name: 'Gold'
  },
  legend: {
    type: 'gradient',
    min: 'less',
    max: 'more',
    stops: [
      '#08041d',
      '#1f0a46',
      '#52076c',
      '#f57c16',
      '#f7cf39'
    ]
  },
  info: null
};
