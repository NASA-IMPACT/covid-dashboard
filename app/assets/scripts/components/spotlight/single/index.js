import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import get from 'lodash.get';
import find from 'lodash.find';

import App from '../../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../../styles/inpage';
import MbMap from '../../global/mb-map';
import UhOh from '../../uhoh';
import LineChart from '../../common/line-chart/chart';
import DataLayersBlock from '../../global/data-layers-block';

import { themeVal } from '../../../styles/utils/general';
import Panel, { PanelHeadline, PanelTitle } from '../../common/panel';
import { glsp } from '../../../styles/utils/theme-values';
import { fetchSpotlightSingle as fetchSpotlightSingleAction } from '../../../redux/spotlight';
import { wrapApiResult, getFromState } from '../../../redux/reduxeed';
import { showGlobalLoading, hideGlobalLoading } from '../../common/global-loading';
import { utcDate } from '../../../utils/utils';

import allMapLayers from '../../common/layers';
import MapMessage from '../../global/map-message';
import Timeline from '../../global/timeline';

const layersBySpotlight = {
  be: ['no2', 'car-count']
};

const ExploreCanvas = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: min-content 1fr min-content;
  overflow: hidden;

  > * {
    grid-row: 1;
  }
`;

const ExploreCarto = styled.section`
  position: relative;
  height: 100%;
  background: ${themeVal('color.baseAlphaA')};
  display: grid;
  grid-template-rows: 1fr auto;
`;

const PrimePanel = styled(Panel)`
  width: 18rem;
`;

const SecPanel = styled(Panel)`
  width: 24rem;
`;

const PanelBodyInner = styled.div`
  padding: ${glsp()};
`;

class SpotlightAreasSingle extends React.Component {
  constructor (props) {
    super(props);
    this.resizeMap = this.resizeMap.bind(this);
    this.onMapAction = this.onMapAction.bind(this);
    this.onPanelAction = this.onPanelAction.bind(this);
    // Ref to the map component to be able to trigger a resize when the panels
    // are shown/hidden.
    this.mbMapRef = React.createRef();

    this.state = {
      activeLayers: [],
      // Additional data that needs to be tracked for the map layers, like the
      // knob position on a adjustable gradient legend.
      // Values will be objects keyed by the layer id.
      layersState: {
        // id: {
        //   comparing: bool
        //   knosPos: number
        //   knobCurrPos: number
        // }
      },
      timelineDate: null,
      mapLoaded: false,
    };
  }

  componentDidMount () {
    this.requestSpotlight();
  }

  componentDidUpdate (prevProps, prevState) {
    const { spotlightId } = this.props.match.params;
    if (spotlightId !== prevProps.match.params.spotlightId) {
      this.requestSpotlight();
    }
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
  setLayerState (id, data, cb) {
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
  getLayerState (id, prop) {
    const path = prop
      ? typeof prop === 'string' ? [id, prop] : [id, ...prop]
      : id;
    return get(this.state.layersState, path);
  }

  /**
   * Returns the layer list, merging the visibility state and any other data
   * stored for each layer in the layer state.
   */
  getLayersWithState () {
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

  resizeMap () {
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

  async requestSpotlight () {
    showGlobalLoading();
    await this.props.fetchSpotlightSingle(this.props.match.params.spotlightId);
    hideGlobalLoading();
  }

  onPanelAction (action, payload) {
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
    }
  }

  async onMapAction (action, payload) {
    switch (action) {
      case 'map.loaded': {
        const spotlightData = this.props.spotlight.getData();
        this.mbMapRef.current.mbMap.fitBounds(spotlightData.bounding_box);
        this.setState({ mapLoaded: true });
        // Enable default layers sequentially so they trigger needed actions.
        const layersToLoad = this.props.mapLayers.filter((l) => l.enabled);
        for (const l of layersToLoad) {
          await this.toggleLayer(l);
        }
        break;
      }
    }
  }

  async toggleLayer (layer) {
    const layerId = layer.id;

    const { activeLayers } = this.state;
    const isEnabled = activeLayers.includes(layerId);

    if (layer.type === 'raster-timeseries') {
      this.setState(state => {
        // Check if there's a knob value set. If not, means that this is the
        // first time it is enabled and we need to set a default.
        const knobCurrPos = get(state, ['layersState', layerId, 'knobCurrPos'], null);
        const knobData = knobCurrPos === null
          ? {
            knobPos: 50,
            knobCurrPos: 50
          }
          : {};
        return {
          timelineDate: utcDate(layer.domain[1]),
          layersState: {
            ...state.layersState,
            [layerId]: {
              ...state.layersState[layerId],
              ...knobData
            }
          }
        };
      });
    }

    // If we disable a layer we're comparing, disable the comparison as well.
    if (this.getLayerState(layerId, 'comparing')) {
      this.toggleLayerCompare(layer);
    }

    // Hide any layers that are not compatible with the current one.
    // This means that when this layer gets enabled some layers must be disabled.
    const exclusiveWithLayers = layer.exclusiveWith || [];

    // remove to make them toggleable
    this.setState((state) => {
      if (isEnabled) {
        return {
          activeLayers: state.activeLayers.filter((l) => l !== layerId)
        };
      }

      // Remove incompatible layers.
      const diff = state.activeLayers.filter(
        (v) => !exclusiveWithLayers.includes(v)
      );
      return {
        activeLayers: [...diff, layerId]
      };
    });
  }

  toggleLayerCompare (layer) {
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

  getActiveTimeseriesLayers () {
    return this.props.mapLayers.filter(
      (l) =>
        l.type === 'raster-timeseries' && this.state.activeLayers.includes(l.id)
    );
  }

  render () {
    const { spotlight, mapLayers } = this.props;

    if (spotlight.hasError()) return <UhOh />;

    const spotlightData = spotlight.getData();
    const layers = this.getLayersWithState();
    const activeTimeseriesLayers = this.getActiveTimeseriesLayers();

    // Check if there's any layer that's comparing.
    const comparingLayer = find(layers, 'comparing');
    const isComparing = !!comparingLayer;

    const mapLabel = get(comparingLayer, 'compare.mapLabel');
    const compareMessage = isComparing && mapLabel
      ? typeof mapLabel === 'function' ? mapLabel(this.state.timelineDate) : mapLabel
      : '';

    return (
      <App>
        <Inpage isMapCentric>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Map</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          {spotlight.isReady() && (
            <InpageBody>
              <ExploreCanvas>
                <PrimePanel
                  collapsible
                  direction='left'
                  onPanelChange={this.resizeMap}
                  headerContent={
                    <PanelHeadline>
                      <h2>{spotlightData.label}</h2>
                    </PanelHeadline>
                  }
                  bodyContent={
                    <DataLayersBlock
                      layers={layers}
                      mapLoaded={this.state.mapLoaded}
                      onAction={this.onPanelAction}
                    />
                  }
                />
                <ExploreCarto>
                  <MapMessage active={isComparing && !!compareMessage}>
                    <p>{compareMessage}</p>
                  </MapMessage>
                  <MbMap
                    ref={this.mbMapRef}
                    onAction={this.onMapAction}
                    layers={layers}
                    activeLayers={this.state.activeLayers}
                    date={this.state.timelineDate}
                    aoiState={null}
                    comparing={isComparing}
                  />
                  <Timeline
                    isActive={!!activeTimeseriesLayers.length}
                    layers={activeTimeseriesLayers}
                    date={this.state.timelineDate}
                    onAction={this.onPanelAction}
                    onSizeChange={this.resizeMap}
                  />
                </ExploreCarto>
                <SecPanel
                  collapsible
                  direction='right'
                  onPanelChange={this.resizeMap}
                  headerContent={
                    <PanelHeadline>
                      <PanelTitle>Insights</PanelTitle>
                    </PanelHeadline>
                  }
                  bodyContent={
                    <PanelBodyInner>
                      {spotlightData.indicators.length ? spotlightData.indicators.map(ind => {
                        const xDomain = ind.domain.date.map(utcDate);
                        const yDomain = ind.domain.indicator;

                        return (
                          <React.Fragment key={ind.id}>
                            <h2>{ind.id}</h2>
                            <LineChart
                              xDomain={xDomain}
                              yDomain={yDomain}
                              data={ind.data}
                              // highlightBands={chartData.highlightBands}
                              noBaseline
                              noBaselineConfidence
                              noIndicatorConfidence
                            />
                          </React.Fragment>
                        );
                      }) : (
                        <p>Detailed information for the area being viewed and/or interacted by the user.</p>
                      )}
                    </PanelBodyInner>
                  }
                />
              </ExploreCanvas>
            </InpageBody>
          )}
        </Inpage>
      </App>
    );
  }
}

SpotlightAreasSingle.propTypes = {
  fetchSpotlightSingle: T.func,
  spotlight: T.object,
  match: T.object
};

function mapStateToProps (state, props) {
  const { spotlightId } = props.match.params;
  const layersToUse = layersBySpotlight[spotlightId] || [];
  return {
    mapLayers: allMapLayers.filter(l => layersToUse.includes(l.id)),
    spotlight: wrapApiResult(getFromState(state, ['spotlight', 'single', spotlightId]))
  };
}

const mapDispatchToProps = {
  fetchSpotlightSingle: fetchSpotlightSingleAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightAreasSingle);
