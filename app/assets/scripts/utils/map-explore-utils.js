import get from 'lodash.get';
import { isWithinInterval, isEqual, format } from 'date-fns';

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
    _urlActiveLayers: [],
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
    mapLoaded: false,
    mapPos: null
  };
}

export function getCommonQsState () {
  return {
    map: {
      accessor: 'mapPos',
      default: null,
      hydrator: (v) => {
        if (!v) return null;
        const [lng, lat, zoom] = v.split(',').map(Number);
        return { lng, lat, zoom };
      },
      dehydrator: (v) => {
        if (!v) return null;
        const { lng, lat, zoom } = v;
        return [lng, lat, zoom].join(',');
      }
    },
    layers: {
      accessor: 'activeLayers',
      default: [],
      hydrator: (v) => v ? v.split(',') : null,
      dehydrator: (v) => v.join(',')
    },
    date: {
      accessor: 'timelineDate',
      default: null,
      hydrator: (v) => {
        const d = utcDate(v);
        return isNaN(d.getTime()) ? null : d;
      },
      dehydrator: (v) => v ? format(v, 'yyyy-MM-dd') : null
    },
    lState: {
      accessor: 'layersState',
      default: {},
      hydrator: (v) => {
        if (!v) return null;
        const pieces = v.split(',');
        return pieces.reduce((acc, piece) => {
          const [key, comparing, knob] = piece.split('|');
          return {
            ...acc,
            [key]: {
              comparing: Boolean(+comparing),
              knobPos: +knob,
              knobCurrPos: +knob
            }
          };
        }, {});
      },
      dehydrator: (v) => {
        // We only need to store the knob position and whether is comparing.
        // Store it as: id|comparing|position,id|comparing|position
        const state = Object.keys(v).reduce((acc, k) => {
          const { comparing, knobCurrPos } = v[k];
          return acc.concat([k, Number(!!comparing), knobCurrPos || 0].join('|'));
        }, []);

        return state.join(',');
      }
    }
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
export function getLayersWithState (layers) {
  const { activeLayers, layersState } = this.state;
  const mapLayers = layers || this.props.mapLayers;
  return mapLayers.map((l) => {
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
      toggleLayerCompare.call(this, payload);
      break;
    case 'layer.legend-knob':
      this.setLayerState(payload.id, layerState => ({
        knobPos: payload.value,
        // If the event was the end of a drag, set the current value for
        // the map to pick up.
        knobCurrPos: payload.end
          ? payload.value
          : layerState.knobCurrPos
      }), () => {
        this.updateUrlQS && this.updateUrlQS();
      });
      break;
    case 'date.set':
      this.setState({
        timelineDate: payload.date
      }, () => {
        this.updateUrlQS && this.updateUrlQS();
      });
      break;
    default:
      return false;
  }

  return true;
}

/**
 * Handles an action.
 * The function returns true if the action was handled, or false otherwise.
 * This can be used to extend the function and add more actions.
 *
 * @param {string} action The action to handle
 * @param {object} payload Action data
 */
export async function handleMapAction (action, payload) {
  switch (action) {
    case 'map.loaded':
      {
        this.setState({ mapLoaded: true });
        // Enable default layers sequentially so they trigger needed actions.
        const layersToLoad = this.props.mapLayers.filter((l) =>
          this.state._urlActiveLayers.includes(l.id)
        );
        for (const l of layersToLoad) {
          await this.toggleLayer(l);
          const isComparing = get(this.state, ['layersState', l.id, 'comparing']);
          // The compare should only be enabled if the state stored in the url
          // is true, or if there is no state in the url and the layer has the
          // compare enabled by default.
          // However if the comparison is already enabled, there's no need to
          // enable it again.
          const enableCompare = isComparing === undefined && get(l, 'compare.enabled');
          if (enableCompare) {
            toggleLayerCompare.call(this, l);
          }
        }
      }
      break;
    case 'map.move':
      this.setState({ mapPos: payload }, () => {
        this.updateUrlQS();
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
  const { exclusiveWith = [], id } = layer;
  const { activeLayers, layersState } = state;
  // Hide any layers that are not compatible with the current one.
  // This means that when this layer gets enabled some layers must be disabled.
  const isEnabled = activeLayers.includes(id);

  // If the layer is enabled is just a matter of removing it from the array.
  if (isEnabled) {
    return {
      activeLayers: activeLayers.filter((l) => l !== id)
    };
  }

  // Remove incompatible layers.
  const diff = activeLayers.filter(
    (v) => !exclusiveWith.includes(v)
  );

  // Disable the comparison on any exclusive layer.
  const newLayersState = exclusiveWith.reduce((acc, id) => {
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
 * Toggle the given layer
 * @param {object} layer Layer object
 * @param {function} cb callback after the state is updated.
 */
export function toggleLayerCommon (layer, cb) {
  const layerId = layer.id;
  const isEnabled = this.state.activeLayers.includes(layerId);

  if (layer.type === 'raster-timeseries' || layer.type === 'inference-timeseries') {
    toggleLayerRasterTimeseries.call(this, layer);
  }

  // If we disable a layer we're comparing, disable the comparison as well.
  if (isEnabled && this.getLayerState(layerId, 'comparing')) {
    toggleLayerCompare.call(this, layer);
  }

  this.setState(
    (state) => getUpdatedActiveLayersState(state, layer),
    cb
  );
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
    }, () => {
      this.updateUrlQS && this.updateUrlQS();
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
    }, () => {
      this.updateUrlQS && this.updateUrlQS();
    });
  }
}

function isDateInDomain (date, domain) {
  if (!date) return false;
  if (domain.length === 2) {
    // Start and end, check if between dates.
    const [s, e] = domain;
    return isWithinInterval(date, { start: utcDate(s), end: utcDate(e) });
  } else {
    return !!domain.find(d => isEqual(date, utcDate(d)));
  }
}

/**
 * Toggle the visibility for the raster timeseries layer
 * @param {object} layer Layer object
 */
export function toggleLayerRasterTimeseries (layer) {
  this.setState(state => {
    // Init the timeline date.
    const timelineDate = state.timelineDate &&
      isDateInDomain(state.timelineDate, layer.domain)
      ? state.timelineDate
      : utcDate(layer.domain[layer.domain.length - 1]);

    // Check if there's a knob value set. If not, means that this is the
    // first time it is enabled and we need to set a default.
    const knobCurrPos = get(state, ['layersState', layer.id, 'knobCurrPos'], null);
    const knobData = knobCurrPos === null && get(layer, ['legend', 'type']) === 'gradient-adjustable'
      ? {
        knobPos: 50,
        knobCurrPos: 50
      }
      : {};
    return {
      timelineDate,
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
