import config from '../../../config';
import { indicatorGroupColors } from '../../../styles/theme/theme';

export default {
  id: 'detection-plane',
  name: 'Planes',
  type: 'inference-timeseries',
  domain: [
    '2020-01-01',
    '2020-04-30'
  ],
  source: {
    vector: {
      type: 'geojson',
      data: `${config.api}/detections/plane/{spotlightId}/{date}.geojson`
    },
    raster: {
      type: 'raster',
      tiles: [
        `${config.api}/planet/{z}/{x}/{y}?date={date}&site={spotlightId}`
      ]
    }
  },
  exclusiveWith: ['agriculture', 'no2', 'no2-diff', 'co2-diff', 'co2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: false,
  swatch: indicatorGroupColors.economic,
  timeUnit: 'day',
  info: 'Planes detected each day in PlanetScope imagery are shown in red.'
};
