import get from 'lodash.get';

import { utcDate } from './utils';

/*
  The function exported by this file are to be understood as mixins for any
  component that implements map layer management. This is the case of the global
  and spotlight pages. There was some code duplication and time restrictions
  didn't allow for a full refactor. These functions need the component content
  to work, so they have either to be bound or invoked with call
*/

export function getInitialMapExploreState () {
  return {
    activeLayers: [],
    // Additional data that needs to be tracked for the map layers, like the
    // knob position on a adjustable gradient legend.
    // Values will be objects keyed by the layer id.
    layersState: {
      // id: {
      //   comparing: bool
      //   knobPos: number
      //   knobCurrPos: number
      // }
    },
    timelineDate: null,
    mapLoaded: false
  };
}

/**
 * Sets the state of a give layer in the component state.
 * Works exactly like setState, but for a specific layer data.
 *
 * @param {string} id If of the layer for which to update data
 * @param {mixed} data Object with data to merge or function. If a function is
 *                provided, it will be called with the current data. It should
 *                return an object which will be merged with the existent data
 * @param {funct} cb Callback to execute after setting state.
 */
export function setLayerState (id, data, cb) {
  this.setState(state => {
    const currentState = state.layersState[id] || {};
    return {
      layersState: {
        ...state.layersState,
        [id]: {
          ...currentState,
          ...(typeof data === 'function' ? data(currentState) : data)
        }
      }
    };
  }, () => cb && cb());
}

/**
 * Returns the layer state for a given layer id, or a specific state path
 * if second parameter is provided.
 *
 * @param {string} id Layer for which to get the state.
 * @param {mixed} prop Path to a specific prop (optional). Used lodash.get
 */
export function getLayerState (id, prop) {
  const path = prop
    ? typeof prop === 'string' ? [id, prop] : [id, ...prop]
    : id;
  return get(this.state.layersState, path);
}

/**
 * Returns the layer list, merging the visibility state and any other data
 * stored for each layer in the layer state.
 */
export function getLayersWithState () {
  const { activeLayers, layersState } = this.state;
  return this.props.mapLayers.map((l) => {
    // Get additional propertied from the layerData array.
    const extra = layersState[l.id] || {};
    return {
      ...l,
      visible: activeLayers.includes(l.id),
      ...extra
    };
  });
}

/**
 * Invokes the map (and comparing map - if enabled) resize method.
 */
export function resizeMap () {
  const component = this.mbMapRef.current;
  if (component) {
    // Delay execution to give the panel animation time to finish.
    setTimeout(() => {
      component.mbMap.resize();
      // Also resize the compare map if it exists.
      if (component.mbMapComparing) {
        component.mbMapComparing.resize();
      }
    }, 200);
  }
}

/**
 * Handles an action.
 * The function returns true if the action was handled, or false otherwise.
 * This can be used to extend the function and add more actions.
 *
 * @param {string} action The action to handle
 * @param {object} payload Action data
 */
export function handlePanelAction (action, payload) {
  switch (action) {
    case 'layer.toggle':
      this.toggleLayer(payload);
      break;
    case 'layer.compare':
      this.toggleLayerCompare(payload);
      break;
    case 'layer.legend-knob':
      this.setLayerState(payload.id, layerState => ({
        knobPos: payload.value,
        // If the event was the end of a drag, set the current value for
        // the map to pick up.
        knobCurrPos: payload.end
          ? payload.value
          : layerState.knobCurrPos
      }));
      break;
    case 'date.set':
      this.setState({
        timelineDate: payload.date
      });
      break;
    default:
      return false;
  }

  return true;
}

/**
 * Computes the new activeLayers state after enabling or disabling a layer.
 * @param {object} state The component state
 * @param {object} layer Layer data
 */
export function getUpdatedActiveLayersState (state, layer) {
  const { exclusiveWith, id } = layer;
  const { activeLayers, layersState } = state;
  // Hide any layers that are not compatible with the current one.
  // This means that when this layer gets enabled some layers must be disabled.
  const exclusiveWithLayers = exclusiveWith || [];
  const isEnabled = activeLayers.includes(id);

  // If the layer is enabled is just a matter of removing it from the array.
  if (isEnabled) {
    return {
      activeLayers: activeLayers.filter((l) => l !== id)
    };
  }

  // Remove incompatible layers.
  const diff = activeLayers.filter(
    (v) => !exclusiveWithLayers.includes(v)
  );

  // Disable the comparison on any exclusive layer.
  const newLayersState = exclusiveWithLayers.reduce((acc, id) => {
    return get(layersState, [id, 'comparing'])
      ? {
        ...acc,
        [id]: {
          ...acc[id],
          comparing: false
        }
      }
      : acc;
  }, state.layersState);

  return {
    activeLayers: [...diff, id],
    layersState: newLayersState
  };
}

/**
 * Toggle the compare for the given layer
 * @param {object} layer Layer object
 */
export function toggleLayerCompare (layer) {
  const layerId = layer.id;
  const isComparing = this.getLayerState(layerId, 'comparing');

  if (isComparing) {
    this.setLayerState(layerId, {
      comparing: false
    });
  } else {
    this.setState(state => {
      // Disable compare on all other layers.
      // Having a object with settings makes it very fast to access, but it is
      // harder to apply changes across all objects.
      const layersState = Object.keys(state.layersState).reduce((acc, id) => ({
        ...acc,
        [id]: {
          ...acc[id],
          comparing: false
        }
      }), state.layersState);

      // Set current as active
      layersState[layerId] = {
        ...layersState[layerId],
        comparing: true
      };

      return { layersState };
    });
  }
}

/**
 * Toggle the visibility for the raster timeseries layer
 * @param {object} layer Layer object
 */
export function toggleLayerRasterTimeseries (layer) {
  this.setState(state => {
    // Check if there's a knob value set. If not, means that this is the
    // first time it is enabled and we need to set a default.
    const knobCurrPos = get(state, ['layersState', layer.id, 'knobCurrPos'], null);
    const knobData = knobCurrPos === null
      ? {
        knobPos: 50,
        knobCurrPos: 50
      }
      : {};
    return {
      timelineDate: utcDate(layer.domain[layer.domain.length - 1]),
      layersState: {
        ...state.layersState,
        [layer.id]: {
          ...state.layersState[layer.id],
          ...knobData
        }
      }
    };
  });
}

/**
 * Returns timeseries data that are active
 */
export function getActiveTimeseriesLayers () {
  return this.props.mapLayers.filter(
    (l) =>
      l.type.includes('timeseries') && this.state.activeLayers.includes(l.id)
  );
}
