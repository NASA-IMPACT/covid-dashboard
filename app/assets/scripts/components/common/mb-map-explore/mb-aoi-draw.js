import MapboxDraw from '@mapbox/mapbox-gl-draw';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';

import DirectSelectRectangle from './mgd-select-rectangle-mode';
import { isEqualObj } from '../../../utils/utils';

const modes = {
  ...MapboxDraw.modes,
  draw_rectangle: DrawRectangle,
  direct_select: DirectSelectRectangle
};

const computeDrawStyles = theme => [
  {
    id: 'gl-draw-polygon-fill-inactive',
    type: 'fill',
    filter: [
      'all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['!=', 'mode', 'static']
    ],
    paint: {
      'fill-color': theme.color.primary,
      'fill-outline-color': theme.color.primary,
      'fill-opacity': 0.16
    }
  },
  {
    id: 'gl-draw-polygon-fill-active',
    type: 'fill',
    filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    paint: {
      'fill-color': theme.color.primary,
      'fill-outline-color': theme.color.primary,
      'fill-opacity': 0.16
    }
  },
  {
    id: 'gl-draw-polygon-stroke-inactive',
    type: 'line',
    filter: [
      'all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['!=', 'mode', 'static']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': theme.color.primary,
      'line-width': 2
    }
  },
  {
    id: 'gl-draw-polygon-stroke-active',
    type: 'line',
    filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': theme.color.primary,
      'line-dasharray': [0.64, 2],
      'line-width': 2
    }
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-stroke-inactive',
    type: 'circle',
    filter: [
      'all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    paint: {
      'circle-radius': 6,
      'circle-color': '#fff'
    }
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-inactive',
    type: 'circle',
    filter: [
      'all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    paint: {
      'circle-radius': 4,
      'circle-color': theme.color.primary
    }
  },
  {
    id: 'gl-draw-point-stroke-active',
    type: 'circle',
    filter: [
      'all',
      ['==', '$type', 'Point'],
      ['==', 'active', 'true'],
      ['!=', 'meta', 'midpoint']
    ],
    paint: {
      'circle-radius': 8,
      'circle-color': '#fff'
    }
  },
  {
    id: 'gl-draw-point-active',
    type: 'circle',
    filter: [
      'all',
      ['==', '$type', 'Point'],
      ['!=', 'meta', 'midpoint'],
      ['==', 'active', 'true']
    ],
    paint: {
      'circle-radius': 6,
      'circle-color': theme.color.primary
    }
  }
];

export default function (mbMap) {
  let mbDraw = null;

  return {
    /**
     * Returns the Draw plugin instance.
     * @return MapboxDraw instance
     */
    getDraw: () => mbDraw,

    /**
     * Setup the Mapbox Draw plugin for AOI drawing with the needed
     * event listeners.
     *
     * @param {function} actionCb Callback function when event is fired.
     *   Signature (eventName, payload).
     *   Event are as follow:
     *   - *aoi.draw-finish* called with the newly drawn feature { feature: <object> }.
     *   - *aoi.selection* called with a payload with whether there's a feature
     *      selected or not { selected: <boolean> }
     *   - *aoi.update* called with the newly updated feature { feature: <object> }.
     */
    setup: (actionCb, features, theme) => {
      mbDraw = new MapboxDraw({
        modes: modes,
        displayControlsDefault: false,
        styles: computeDrawStyles(theme)
      });
      mbMap.addControl(mbDraw, 'top-left');

      mbMap.on('load', () => {
        mbMap
          .on('draw.create', e =>
            actionCb('aoi.draw-finish', { feature: e.features[0] })
          )
          .on('draw.selectionchange', e =>
            actionCb('aoi.selection', { selected: !!e.features.length })
          )
          .on('draw.update', e =>
            actionCb('aoi.update', { feature: e.features[0] })
          );
      });

      if (features && features.length) {
        mbDraw.set({
          type: 'FeatureCollection',
          features: features
        });
      }
    },

    /**
     * The update method gets called by react's componentDidUpdate with the
     * previous and current AOI state.
     *
     * @param {object} previous Previous AOI state.
     * @param {object} current Current AOI state.
     *
     * Both previous and current AOI state have the following properties.
     *  {
     *   drawing: <boolean>
     *   selected: <boolean>
     *   feature: <object>
     *  }
     */
    update: (previous = {}, current = {}) => {
      if (!mbDraw) return;

      const isPropFeatureDiff = !isEqualObj(current.feature, previous.feature);
      const currentMbDrawFeature = current.feature
        ? mbDraw.get(current.feature.id)
        : null;

      // Every time there's a feature change the props get updated.
      // If the current feature was deleted we want to remove it.
      if (isPropFeatureDiff && !current.feature) {
        mbDraw.deleteAll();

        // Wwe only want to update the feature if its value was modified
        // externally (via set bounds for example).
        // Whenever the feature is updated via draw we keep the internal mbDraw
        // state, avoiding unnecessary updates.
      } else if (
        isPropFeatureDiff &&
        !isEqualObj(current.feature, currentMbDrawFeature) &&
        current.feature
      ) {
        mbDraw.set({
          type: 'FeatureCollection',
          features: [current.feature]
        });
        mbDraw.changeMode('simple_select');
      }

      // Select the feature if the state changed.
      if (previous.selected !== current.selected) {
        if (current.selected && current.feature) {
          return mbDraw.changeMode('direct_select', {
            featureId: current.feature.id
          });
        } else {
          return mbDraw.changeMode('simple_select');
        }
      }

      // Start the drawing.
      if (previous.drawing !== current.drawing) {
        return mbDraw.changeMode(
          current.drawing ? 'draw_rectangle' : 'simple_select'
        );
      }
    }
  };
}
