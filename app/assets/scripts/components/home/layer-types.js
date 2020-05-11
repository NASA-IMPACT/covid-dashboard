import config from '../../config';
const { worldviewFilter, countryFilter } = config.instance.map;
const { polygons, centroids } = config.instance.boundaries;

// Timeseries specific functions.
// These layers are quite complex and layer definition is different for each one.
const timeseriesLayers = {
  // Layer Id
  cases: {
    update: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      // Get the data for this layer.
      const layerData = props.activeTimeSeriesData.find(ts => ts.id === id);

      if (!mbMap.getLayer(id) || !layerData) {
        return;
      }

      if (layerData.error) {
        // Hide everything and bail out.
        this.hide(mbMap, layerInfo, props);
        return;
      } else if (layerData.data.length) {
        // Show layers and update.
        this.show(mbMap, layerInfo, props);
      }

      const ftStateKey = `value-${id}`;

      // Set the value on each feature to then use for coloring.
      layerData.data.forEach((row) => {
        const id = row.feature_id;

        mbMap.setFeatureState(
          { source: 'base-centroids', sourceLayer: centroids.sourceLayer, id },
          { [ftStateKey]: row.value }
        );
      });
    },
    hide: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      if (mbMap.getLayer(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'none');
      }
    },
    show: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      if (mbMap.getLayer(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'visible');
      } else {
        if (!mbMap.getSource('base-centroids')) {
          mbMap.addSource('base-centroids', {
            type: 'vector',
            url: centroids.sourceUrl
          });
        }

        const ftStateKey = `value-${id}`;

        mbMap.addLayer({
          id,
          type: 'circle',
          source: 'base-centroids',
          'source-layer': centroids.sourceLayer,
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['to-number', ['feature-state', ftStateKey], 0],
              0,
              0,
              layerInfo.max * 0.33,
              12.5,
              layerInfo.max * 0.66,
              25,
              layerInfo.max,
              50
            ],
            'circle-color': 'hsla(297, 89%, 40%, 0.23)',
            'circle-opacity': 0.60,
            'circle-stroke-color': 'hsla(45, 3%, 96%, 0.75)',
            'circle-stroke-width': 1,
            'circle-stroke-opacity': 0.88
          }
        });
      }
    }
  },
  // Layer Id
  'mobility-index': {
    update: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      // Get the data for this layer.
      const layerData = props.activeTimeSeriesData.find(ts => ts.id === id);

      if (!mbMap.getLayer(`${id}-fill`) || !layerData) {
        return;
      }

      if (layerData.error) {
        // Hide everything and bail out.
        this.hide(mbMap, layerInfo, props);
        return;
      } else if (layerData.data.length) {
        // Show layers and update.
        this.show(mbMap, layerInfo, props);
      }

      const ftStateKey = `value-${id}`;

      // Set the value on each feature to then use for coloring.
      layerData.data.forEach((row) => {
        const id = row.feature_id;
        mbMap.setFeatureState(
          { source: 'base-boundaries', sourceLayer: polygons.sourceLayer, id },
          { [ftStateKey]: row.value }
        );
      });
    },
    hide: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      if (mbMap.getLayer(`${id}-fill`)) {
        mbMap.setLayoutProperty(`${id}-fill`, 'visibility', 'none');
      }
    },
    show: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      if (mbMap.getLayer(`${id}-fill`)) {
        mbMap.setLayoutProperty(`${id}-fill`, 'visibility', 'visible');
      } else {
        const ftStateKey = `value-${id}`;
        // Add the layer before the cases layer if it exists
        const beforeLayer = mbMap.getLayer('cases')
          ? 'cases'
          : 'settlement-subdivision-label';

        mbMap.addLayer({
          id: `${id}-fill`,
          type: 'fill',
          source: 'base-boundaries',
          'source-layer': polygons.sourceLayer,
          filter: ['all', worldviewFilter, countryFilter],
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['to-number', ['feature-state', ftStateKey], 0],
              0,
              '#FFFFFF',
              0.01,
              'hsl(204, 76%, 50%)',
              0.5,
              'hsl(186, 76%, 78%)',
              1,
              'hsl(0, 2%, 100%)',
              1.5,
              'hsl(39, 89%, 77%)',
              2,
              'hsl(39, 88%, 52%)'
            ],
            'fill-opacity': 0.60
          }
        }, beforeLayer);
      }
    }
  }
};

export const layerTypes = {
  // timeseries are layers have time data that must be updated.
  timeseries: {
    update: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      if (!timeseriesLayers[id]) {
        /* eslint-disable-next-line no-console */
        console.error('Timeseries layer definition not found for id:', id);
        return;
      }
      timeseriesLayers[id].update.call(this, mbMap, layerInfo, props);
    },
    hide: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      if (!timeseriesLayers[id]) {
        /* eslint-disable-next-line no-console */
        console.error('Timeseries layer definition not found for id:', id);
        return;
      }
      timeseriesLayers[id].hide.call(this, mbMap, layerInfo, props);
    },
    show: function (mbMap, layerInfo, props) {
      const { id } = layerInfo;
      if (!timeseriesLayers[id]) {
        /* eslint-disable-next-line no-console */
        console.error('Timeseries layer definition not found for id:', id);
        return;
      }
      timeseriesLayers[id].show.call(this, mbMap, layerInfo, props);
    }
  },
  // style-layers are layers that come from the style directly. We only
  // hide/show them based on the user interactions.
  'style-layers': {
    hide: (mbMap, layerInfo, props) => {
      // Layers from style. Just hide.
      layerInfo.layerIds.forEach((l) => {
        mbMap.setLayoutProperty(l, 'visibility', 'none');
      });
    },
    show: (mbMap, layerInfo, props) => {
      // Layers from style. Just hide.
      layerInfo.layerIds.forEach((l) => {
        mbMap.setLayoutProperty(l, 'visibility', 'visible');
      });
    }
  },

  // Feature data refers to data that has to be downloaded and matched against
  // the mapbox boundaries.
  'feature-data': {
    hide: (mbMap, layerInfo, props) => {
      const { id } = layerInfo;
      if (mbMap.getLayer(`${id}-boundary-fill`)) {
        mbMap.setLayoutProperty(`${id}-boundary-fill`, 'visibility', 'none');
      }
    },
    show: (mbMap, layerInfo, props) => {
      const { id } = layerInfo;
      if (mbMap.getLayer(`${id}-boundary-fill`)) {
        mbMap.setLayoutProperty(`${id}-boundary-fill`, 'visibility', 'visible');
      } else {
        const ftStateKey = `value-${id}`;
        // Since the layer will only become active if the data has loaded
        // it is safe to assume the data is available.
        const featureData = props.layerData[id].getData();

        // Set the value on each feature to then use for coloring.
        featureData.data.forEach((row) => {
          const id = row.feature_id;
          mbMap.setFeatureState(
            { source: 'base-boundaries', sourceLayer: polygons.sourceLayer, id },
            { [ftStateKey]: row.value }
          );
        });

        let paintDefinition;
        // Two default styles:
        // - pos-neg - where a high value needs to be highlighted (high % of 65+)
        // - neg-pos - where low values are highlighted (m2 living area per person)
        switch (layerInfo.mapStyle) {
          case ('neg-pos'):
            paintDefinition = {
              'fill-color': [
                'case',
                ['!=', ['typeof', ['feature-state', ftStateKey]], 'number'],
                '#FFFFFF',
                [
                  'interpolate',
                  ['linear'],
                  ['to-number', ['feature-state', ftStateKey], 0],
                  layerInfo.min,
                  'hsla(105, 91%, 67%, 0.69)',
                  (layerInfo.max - layerInfo.min) * 0.25 + layerInfo.min,
                  'hsla(173, 75%, 66%, 0.69)',
                  (layerInfo.max - layerInfo.min) * 0.5 + layerInfo.min,
                  'hsla(180, 92%, 56%, 0.68)',
                  (layerInfo.max - layerInfo.min) * 0.75 + layerInfo.min,
                  'hsla(188, 28%, 52%, 0.69)',
                  layerInfo.max,
                  'hsla(212, 54%, 42%, 0.63)'
                ]
              ],
              'fill-opacity': [
                'case',
                ['!=', ['typeof', ['feature-state', ftStateKey]], 'number'],
                0.32,
                0.62
              ],
              'fill-outline-color': 'hsla(0, 0%, 100%, 0.31)'
            };
            break;
          default:
            paintDefinition = {
              'fill-color': [
                'case',
                ['!=', ['typeof', ['feature-state', ftStateKey]], 'number'],
                '#FFFFFF',
                [
                  'interpolate',
                  ['linear'],
                  ['to-number', ['feature-state', ftStateKey], 0],
                  layerInfo.min,
                  'hsla(212, 54%, 42%, 0.63)',
                  (layerInfo.max - layerInfo.min) * 0.25 + layerInfo.min,
                  'hsla(188, 28%, 52%, 0.69)',
                  (layerInfo.max - layerInfo.min) * 0.5 + layerInfo.min,
                  'hsla(180, 92%, 56%, 0.68)',
                  (layerInfo.max - layerInfo.min) * 0.75 + layerInfo.min,
                  'hsla(173, 75%, 66%, 0.69)',
                  layerInfo.max,
                  'hsla(105, 91%, 67%, 0.69)'
                ]
              ],
              'fill-opacity': [
                'case',
                ['!=', ['typeof', ['feature-state', ftStateKey]], 'number'],
                0.32,
                0.62
              ],
              'fill-outline-color': 'hsla(0, 0%, 100%, 0.31)'
            };
        }

        mbMap.addLayer({
          id: `${id}-boundary-fill`,
          type: 'fill',
          source: 'base-boundaries',
          'source-layer': polygons.sourceLayer,
          filter: ['all', worldviewFilter, countryFilter],
          paint: paintDefinition
        }, 'settlement-subdivision-label');
      }
    }
  },

  raster: {
    hide: (mbMap, layerInfo, props) => {
      const { id } = layerInfo;
      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'none');
      }
    },
    show: (mbMap, layerInfo, props) => {
      const { id, source } = layerInfo;
      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'visible');
      } else {
        mbMap.addSource(id, source);
        mbMap.addLayer({
          id: id,
          type: 'raster',
          source: id
        }, 'admin-1-boundary-bg');
      }
    }
  }
};
