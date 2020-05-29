import config from '../../../config';

export default {
  id: 'car-count',
  name: 'Car count',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/ALOS_SAMPLE/alos2-s1-beijing_2019_12_10.tif&resampling_method=nearest&bidx=1&rescale=0%2C65536`
    ]
  },
  exclusiveWith: ['no2'],
  // swatch: {
  //   color: '#F55E2C',
  //   name: 'Orange'
  // },
  legend: {
    type: 'gradient',
    min: 'less',
    max: 'more',
    stops: [
      '#111111',
      '#eeeeee'
    ]
  },
  info: null
};
