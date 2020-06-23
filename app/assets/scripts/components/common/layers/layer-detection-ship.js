import config from '../../../config';
import { indicatorGroupColors } from '../../../styles/theme/theme';

export default {
  id: 'detection-ship',
  name: 'Shipping',
  type: 'inference-timeseries',
  domain: [
    '2020-03-11'
  ],
  source: {
    vector: {
      type: 'geojson',
      data: `${config.api}/detections/ship/{spotlightId}/{date}.geojson`
    },
    raster: {
      type: 'raster',
      tiles: [
        `${config.api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/planet/{spotlightId}-{date}.tif&resampling_method=nearest&bidx=1,2,3`
      ]
    }
  },
  exclusiveWith: ['no2', 'co2-diff', 'co2', 'gibs-population', 'car-count', 'nightlights-viirs', 'nightlights-hd', 'detection-multi', 'water-chlorophyll', 'water-spm'],
  enabled: false,
  swatch: indicatorGroupColors.economic,
  timeUnit: 'day',
  info: 'Ships detected each day in PlanetScope imagery are shown in red.'
};
