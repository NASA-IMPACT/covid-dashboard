import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { format, isBefore, sub } from 'date-fns';
import get from 'lodash.get';
import find from 'lodash.find';

import App from '../common/app';
import ExpMapPrimePanel from './prime-panel';
import ExpMapSecPanel from './sec-panel';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import MbMap from './mb-map';
import Timeline from './timeline';
import MapMessage from './map-message';

import { showGlobalLoading, hideGlobalLoading } from '../common/global-loading';
import { themeVal } from '../../styles/utils/general';
import {
  fetchTimeSeriesDaily as fetchTimeSeriesDailyAction,
  fetchTimeSeriesOverview as fetchTimeSeriesOverviewAction
} from '../../redux/time-series';
import { wrapApiResult, getFromState } from '../../redux/reduxeed';
import {
  fetchCogTimeData as fetchCogTimeDataAction,
  invalidateCogTimeData as invalidateCogTimeDataAction
} from '../../redux/cog-time-data';
import history from '../../utils/history';
import { utcDate } from '../../utils/utils';
import mapLayers from '../common/layers';
import { unionOverviewDateDomain } from '../../utils/date';

/**
 * Returns a feature with a polygon geometry made of the provided bounds.
 * If a feature is provided, the properties are maintained.
 *
 * @param {object} feature Feature to update
 * @param {object} bounds Bounds in NE/SW format
 */
const updateFeatureBounds = (feature, bounds) => {
  const {
    ne: [neLng, neLat],
    sw: [swLng, swLat]
  } = bounds;

  const coordinates = [
    [
      [swLng, neLat],
      [neLng, neLat],
      [neLng, swLat],
      [swLng, swLat],
      [swLng, neLat]
    ]
  ];

  return feature
    ? {
      ...feature,
      geometry: { type: 'Polygon', coordinates }
    }
    : {
      type: 'Feature',
      id: 'aoi-feature',
      properties: {},
      geometry: { type: 'Polygon', coordinates }
    };
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

class Home extends React.Component {
  constructor (props) {
    super(props);

    this.onPanelAction = this.onPanelAction.bind(this);
    this.onMapAction = this.onMapAction.bind(this);
    this.resizeMap = this.resizeMap.bind(this);

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

      aoi: {
        feature: null,
        drawing: false,
        selected: false,
        actionOrigin: null
      }
    };
  }

  componentWillUnmount () {
    this.props.invalidateCogTimeData();
  }

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

  getLayerState (id, prop) {
    const path = prop
      ? typeof prop === 'string' ? [id, prop] : [id, ...prop]
      : id;
    return get(this.state.layersState, path);
  }

  getLayersWithState () {
    const { activeLayers, layersState } = this.state;
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

  async requestCogData () {
    const {
      aoi: { feature }
    } = this.state;
    if (!feature) return;

    showGlobalLoading();
    // TODO: Change from hardcoded cog type and date
    const end = utcDate('2020-03-01');
    await this.props.fetchCogTimeData(
      'no2',
      {
        start: sub(end, { months: 11 }),
        end
      },
      feature
    );
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
        // this.getActiveTimeseriesLayers().forEach(l => {
        //   this.props.fetchTimeSeriesDaily(
        //     l.id,
        //     format(payload.date, 'yyyy-MM-dd')
        //   );
        // });
        break;
      case 'aoi.draw-click':
        // There can only be one selection (feature) on the map
        // If there's a feature toggle the selection.
        // If there's no feature toggle the drawing.
        this.setState((state) => {
          const selected = !!state.aoi.feature && !state.aoi.selected;
          return {
            aoi: {
              ...state.aoi,
              drawing: !state.aoi.feature && !state.aoi.drawing,
              selected,
              actionOrigin: selected ? 'panel' : null
            }
          };
        });
        break;
      case 'aoi.set-bounds':
        this.setState(
          (state) => ({
            aoi: {
              ...state.aoi,
              feature: updateFeatureBounds(state.aoi.feature, payload.bounds),
              actionOrigin: 'panel'
            }
          }),
          () => {
            this.requestCogData();
          }
        );
        break;
      case 'aoi.clear':
        this.setState(
          {
            aoi: {
              drawing: false,
              selected: false,
              feature: null,
              actionOrigin: null
            }
          },
          () => {
            this.props.invalidateCogTimeData();
          }
        );
        break;
    }
  }

  async onMapAction (action, payload) {
    switch (action) {
      case 'admin-area.click':
        history.push(`/areas/${payload.id}`);
        break;
      case 'map.loaded':
        {
          this.setState({ mapLoaded: true });
          // Enable default layers sequentially so they trigger needed actions.
          const layersToLoad = mapLayers.filter((l) => l.enabled);
          for (const l of layersToLoad) {
            await this.toggleLayer(l);
          }
        }
        break;
      case 'aoi.draw-finish':
        this.setState(
          (state) => ({
            aoi: {
              ...state.aoi,
              drawing: false,
              feature: payload.feature,
              actionOrigin: 'map'
            }
          }),
          () => {
            this.requestCogData();
          }
        );
        break;
      case 'aoi.selection':
        this.setState((state) => ({
          aoi: {
            ...state.aoi,
            selected: payload.selected,
            actionOrigin: payload.selected ? 'map' : null
          }
        }));
        break;
      case 'aoi.update':
        this.setState(
          (state) => ({
            aoi: {
              ...state.aoi,
              feature: payload.feature,
              actionOrigin: 'map'
            }
          }),
          () => {
            this.requestCogData();
          }
        );
        break;
    }
  }

  async toggleLayer (layer) {
    const { fetchTimeSeriesOverview } = this.props;
    const layerId = layer.id;

    const { activeLayers } = this.state;
    const isEnabled = activeLayers.includes(layerId);

    if (layer.type === 'timeseries') {
      // Check if there layer data for this layer.
      // If not, load the data and only enable the layer if successful.
      if (!isEnabled) {
        showGlobalLoading();
        const res = await fetchTimeSeriesOverview(layerId);
        // Before setting a new date see if it is available for all active
        // timeseries layers.
        const activeTSLayers = this.getActiveTimeseriesLayers()
          // Add the one we're about to enable in the format needed
          // by getTimeseriesOverviewData
          .concat({ id: layerId });
        const activeTSOverview = this.getTimeseriesOverviewData(activeTSLayers);
        // Compute date intersection between all the overviews.
        const dateDomain = unionOverviewDateDomain(activeTSOverview);

        // Use the max available date if current date is after it.
        const currDate = this.state.timelineDate;
        const nextDdate =
          currDate && isBefore(currDate, dateDomain[1])
            ? currDate
            : dateDomain[1];

        this.setState({ timelineDate: nextDdate });
        this.props.fetchTimeSeriesDaily(
          layer.id,
          format(nextDdate, 'yyyy-MM-dd')
        );
        hideGlobalLoading();
        if (res.error) return;
      }
    }

    if (layer.type === 'raster-timeseries') {
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
          timelineDate: utcDate(layer.domain[1]),
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

    // If we disable a layer we're comparing, disable the comparison as well.
    if (this.getLayerState(layer.id, 'comparing')) {
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
    const isEnabled = this.getLayerState(layer.id, 'comparing');

    if (isEnabled) {
      this.setLayerState(layer.id, {
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
        layersState[layer.id] = {
          ...layersState[layer.id],
          comparing: true
        };

        return { layersState };
      });
    }
  }

  getActiveTimeseriesLayers () {
    return mapLayers.filter(
      (l) =>
        l.type === 'raster-timeseries' && this.state.activeLayers.includes(l.id)
    );
  }

  getTimeseriesOverviewData (layers) {
    const { timeSeriesOverview } = this.props;
    return layers.map((l) => timeSeriesOverview[l.id]);
  }

  render () {
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
          <InpageBody>
            <ExploreCanvas>
              <ExpMapPrimePanel
                layers={layers}
                mapLoaded={this.state.mapLoaded}
                aoiState={this.state.aoi}
                onAction={this.onPanelAction}
                onPanelChange={this.resizeMap}
              />
              <ExploreCarto>
                <MapMessage active={this.state.aoi.drawing}>
                  <p>Draw an AOI on the map</p>
                </MapMessage>
                <MapMessage active={!this.state.aoi.drawing && isComparing && !!compareMessage}>
                  <p>{compareMessage}</p>
                </MapMessage>
                <MbMap
                  ref={this.mbMapRef}
                  onAction={this.onMapAction}
                  layers={layers}
                  activeLayers={this.state.activeLayers}
                  date={this.state.timelineDate}
                  aoiState={this.state.aoi}
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
              <ExpMapSecPanel
                tempNo2Data={this.props.no2CogTimeData}
                onPanelChange={this.resizeMap}
                // selectedAdminArea={adminAreaFeatId}
                // adminArea={currentAdminArea}
                // indicatorsConfig={get(
                //   appConfig.getData(),
                //   'staticIndicators.indicators',
                //   null
                // )}
              />
            </ExploreCanvas>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

Home.propTypes = {
  fetchTimeSeriesDaily: T.func,
  fetchTimeSeriesOverview: T.func,
  fetchCogTimeData: T.func,
  invalidateCogTimeData: T.func,
  timeSeriesOverview: T.object,
  no2CogTimeData: T.object
};

function mapStateToProps (state, props) {
  return {
    timeSeriesDaily: wrapApiResult(state.timeSeries.daily, true),
    timeSeriesOverview: wrapApiResult(state.timeSeries.overview, true),
    no2CogTimeData: wrapApiResult(getFromState(state, ['cogTimeData', 'no2']))
  };
}

const mapDispatchToProps = {
  fetchTimeSeriesDaily: fetchTimeSeriesDailyAction,
  fetchTimeSeriesOverview: fetchTimeSeriesOverviewAction,
  fetchCogTimeData: fetchCogTimeDataAction,
  invalidateCogTimeData: invalidateCogTimeDataAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
