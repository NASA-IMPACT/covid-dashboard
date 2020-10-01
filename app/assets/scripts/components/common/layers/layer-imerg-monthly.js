import { format } from 'date-fns';

import config from '../../../config';

import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'imerg-monthly',
  name: 'GPM IMERG Precipitation',
  type: 'raster-timeseries',
  timeUnit: 'month',
  domain: [
    '2000-06-01',
    '2020-05-31'
  ],
  source: {
    type: 'raster',
    tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=https://{config.BUCKET}.amazonaws.s3.com/cloud-optimized/GPM_3IMERGM/3B-MO.MS.MRG.3IMERG.{date}-S000000-E235959.tif&rescale=0%2C1&color_map=rdylbu_r&color_formula=gamma r {gamma}`

    ]
  },
  exclusiveWith: [''],
  enabled: false,
  compare: {
    enabled: true,
    help: 'Compare with baseline',
    yearDiff: 0,
    mapLabel: date => `${format(date, 'dd MMM yyyy')}: Base vs Mean`,
    source: {
      type: 'raster',
      tiles: [
      `${config.api}/{z}/{x}/{y}@1x?url=s3://cumulus-map-internal/cloud-optimized/GPM_3IMERGDF/3B-DAY.MS.MRG.3IMERG.{date}-S000000-E235959.V06.tif&rescale=0%2C100&color_map=rdylbu_r&color_formula=gamma r {gamma}`
      ]
    }
  },
  swatch: indicatorGroupColors['greenhouse-gas'],
  legend: {
    type: 'gradient-adjustable',
    min: '0 mm/hr',
    max: '100 mm/hr',
    stops: [
      '#313695',
      '#588cbf',
      '#a3d2e5',
      '#e8f6e8',
      '#fee89c',
      '#fba55c',
      '#e24932'
    ]
  },
  info: 'This layer shows the average background concentration of carbon dioxide (CO₂) in our atmosphere for 2020. Redder colors indicate more CO₂. Whiter colors indicate less CO₂.'
};
