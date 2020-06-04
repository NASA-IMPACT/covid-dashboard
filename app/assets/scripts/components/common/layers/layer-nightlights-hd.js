import config from '../../../config';

export default {
  id: 'nightlights-hd',
  name: 'Nightlights HD',
  type: 'raster-timeseries',
  timeUnit: 'month',
  domain: [
    '2020-01-01',
    '2020-05-01'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/BMHD_30M_MONTHLY/BMHD_VNP46A2_{spotlightId}_{date}_cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3`
    ]
  },
  exclusiveWith: ['no2', 'gibs-population', 'car-count', 'nightlights-viirs'],
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
