
import { indicatorGroupColors } from '../../../styles/theme/theme.js';

export default {
  id: 'gibs-population',
  name: 'Population',
  type: 'raster',
  source: {
    type: 'raster',
    tiles: [
      'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/GPW_Population_Density_2020/default/2020-05-14T00:00:00Z/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png'
    ]
  },
  exclusiveWith: ['agriculture', 'no2', 'co2-diff', 'co2', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-ship', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  swatch: indicatorGroupColors.economic,
  legend: {
    type: 'gradient',
    min: 'less',
    max: 'more',
    stops: [
      '#FFEFCB',
      '#FBA54A',
      '#FB9F46',
      '#F35228',
      '#BD0026'
    ]
  },
  info: null
};
