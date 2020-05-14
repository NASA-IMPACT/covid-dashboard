import NO2LongForm from './long-form';

export default {
  id: 'no2',
  name: 'Nitrogen dioxide',
  description: 'Acute harm due to NO2 exposure is only likely to arise in occupational settings. Direct exposure to the skin can cause irritations and burns.',
  type: 'raster-timeseries',
  domain: [
    '2004-10-01',
    '2020-03-01'
  ],
  source: {
    type: 'raster',
    tiles: [
      'https://xsmt29iqqb.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRM/OMI_trno2_0.10x0.10_{date}_Col3_V4.nc.tif&resampling_method=nearest&bidx=1&rescale=0%2C20000000000000000&color_map=magma'
    ]
  },
  swatch: {
    color: '#411073',
    name: 'Purple'
  },
  legend: {
    type: 'gradient',
    min: 'less',
    max: 'more',
    stops: [
      '#150d37',
      '#3e0f72',
      '#711f81',
      '#FEC88C'
    ]
  },
  info: 'Acute harm due to NO2 exposure is only likely to arise in occupational settings. Direct exposure to the skin can cause irritations and burns.',
  longFormComponent: NO2LongForm
};
