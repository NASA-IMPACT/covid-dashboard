import config from '../../../config';

export default {
  id: 'nightlights',
  name: 'Nightlights',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/viirs/sample/BMHD_Sample_Tokyo_cog.tif`
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
