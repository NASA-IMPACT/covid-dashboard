import NO2LongForm from './long-form';

export default {
  id: 'no2',
  name: 'Nitrogen dioxide',
  description: 'Acute harm due to NO2 exposure is only likely to arise in occupational settings. Direct exposure to the skin can cause irritations and burns.',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      'https://xsmt29iqqb.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3%3A%2F%2Fcovid-eo-data%2FOMNO2d_HRD%2F2020_05_04_NO2TropCS30_Col3_V4.hdf5.cog.tif&resampling_method=nearest&bidx=1&rescale=-5000000000000000%2C20000000000000000&color_map=magma'
    ]
  },
  swatch: {
    color: '#539F42',
    name: 'Green'
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
