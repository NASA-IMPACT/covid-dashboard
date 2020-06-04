import config from '../../../config';

export default {
  id: 'car-count',
  name: 'Car count',
  type: 'raster-timeseries',
  domain: ['2019-12-10', '2020-01-05', '2020-01-12', '2020-01-19', '2020-01-24', '2020-01-29', '2020-02-05', '2020-02-10', '2020-02-17', '2020-02-18', '2020-02-22', '2020-03-05', '2020-03-12', '2020-03-17', '2020-03-24', '2020-03-29', '2020-03-31', '2020-04-05', '2020-04-17', '2020-04-28', '2020-04-29', '2020-05-07'],
  timeUnit: 'day',
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/ALOS_SAMPLE/alos2-s1-beijing_{date}.tif&resampling_method=nearest&bidx=1&rescale=1%2C65536`
    ]
  },
  exclusiveWith: ['no2'],
  swatch: {
    color: '#666666',
    name: 'Grey'
  },
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
