import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import bbox from '@turf/bbox';
import { sub } from 'date-fns';
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
import MbMap from '../common/mb-map-explore/mb-map';
import Timeline from '../common/timeline';
import MapMessage from '../common/map-message';

import { showGlobalLoading, hideGlobalLoading } from '../common/global-loading';
import { themeVal } from '../../styles/utils/general';
import { wrapApiResult } from '../../redux/reduxeed';
import {
  fetchCogTimeData as fetchCogTimeDataAction,
  invalidateCogTimeData as invalidateCogTimeDataAction
} from '../../redux/cog-time-data';
import { utcDate } from '../../utils/utils';
import allMapLayers from '../common/layers';
import {
  setLayerState,
  getLayerState,
  getLayersWithState,
  resizeMap,
  getInitialMapExploreState,
  handlePanelAction,
  getActiveTimeseriesLayers,
  getCommonQsState,
  handleMapAction,
  toggleLayerCommon
} from '../../utils/map-explore-utils';
import QsState from '../../utils/qs-state';
import { round } from '../../utils/format';

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

class GlobalExplore extends React.Component {
  constructor (props) {
    super(props);
    // Functions from helper file.
    this.setLayerState = setLayerState.bind(this);
    this.getLayerState = getLayerState.bind(this);
    this.getLayersWithState = getLayersWithState.bind(this);
    this.getActiveTimeseriesLayers = getActiveTimeseriesLayers.bind(this);
    this.resizeMap = resizeMap.bind(this);

    this.onPanelAction = this.onPanelAction.bind(this);
    this.onMapAction = this.onMapAction.bind(this);

    // Ref to the map component to be able to trigger a resize when the panels
    // are shown/hidden.
    this.mbMapRef = React.createRef();

    // Set query state definition for url state storing.
    const common = getCommonQsState(props);
    common.layers.default = props.mapLayers
      .filter((l) => l.enabled)
      .map((l) => l.id);
    this.qsState = new QsState({
      ...common,
      bbox: {
        accessor: 'aoi.feature',
        default: null,
        hydrator: (box) => {
          if (!box) return null;
          // Feature from bbox.
          const b = box.split(',').map(Number);
          if (b.some(isNaN)) return null;
          return updateFeatureBounds(null, {
            ne: [b[2], b[3]],
            sw: [b[0], b[1]]
          });
        },
        dehydrator: (feat) => {
          // bbox from feature.
          if (!feat) return null;
          return bbox(feat)
            .map((v) => round(v, 5))
            .join(',');
        }
      }
    });

    // The active layers can only be enabled once the map loads. The toggle
    // layer method checks the state to see what layers are enabled so we can't
    // store the active layers from the url in the same property, otherwise
    // they'd be disabled.
    // They get temporarily stored in another property and once the map loads
    // the layers are enabled and stored in the correct property.
    const { activeLayers, ...urlState } = this.qsState.getState(
      props.location.search.substr(1)
    );

    this.state = {
      ...getInitialMapExploreState(),
      ...urlState,

      aoi: {
        ...urlState.aoi,
        drawing: false,
        selected: false,
        actionOrigin: null
      },
      _urlActiveLayers: activeLayers
    };
  }

  componentWillUnmount () {
    this.props.invalidateCogTimeData();
  }

  updateUrlQS () {
    const qString = this.qsState.getQs(this.state);
    this.props.history.push({ search: qString });
  }

  async requestCogData () {
    const {
      aoi: { feature }
    } = this.state;
    const activeLayers = this.getActiveTimeseriesLayers();

    if (!feature || !activeLayers.length) return;

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
    // Returns true if the action was handled.
    handlePanelAction.call(this, action, payload);

    switch (action) {
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
            this.updateUrlQS();
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
            this.updateUrlQS();
            this.props.invalidateCogTimeData();
          }
        );
        break;
    }
  }

  async onMapAction (action, payload) {
    // Returns true if the action was handled.
    handleMapAction.call(this, action, payload);

    switch (action) {
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
            this.updateUrlQS();
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
            this.updateUrlQS();
            this.requestCogData();
          }
        );
        break;
    }
  }

  async toggleLayer (layer) {
    toggleLayerCommon.call(this, layer, () => {
      this.updateUrlQS();
      this.requestCogData();
    });
  }

  render () {
    const { spotlightList } = this.props;
    const layers = this.getLayersWithState();
    const activeTimeseriesLayers = this.getActiveTimeseriesLayers();

    // Check if there's any layer that's comparing.
    const comparingLayer = find(layers, 'comparing');
    const isComparing = !!comparingLayer;

    const mapLabel = get(comparingLayer, 'compare.mapLabel');
    const compareMessage =
      isComparing && mapLabel
        ? typeof mapLabel === 'function'
          ? mapLabel(this.state.timelineDate)
          : mapLabel
        : '';

    return (
      <App hideFooter>
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
                spotlightList={spotlightList}
              />
              <ExploreCarto>
                <MapMessage active={this.state.aoi.drawing}>
                  <p>Draw an AOI on the map</p>
                </MapMessage>
                <MapMessage
                  active={
                    !this.state.aoi.drawing && isComparing && !!compareMessage
                  }
                >
                  <p>{compareMessage}</p>
                </MapMessage>
                <MbMap
                  ref={this.mbMapRef}
                  position={this.state.mapPos}
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
                aoiFeature={this.state.aoi.feature}
                cogTimeData={this.props.cogTimeData}
                layers={activeTimeseriesLayers}
                onPanelChange={this.resizeMap}
              />
            </ExploreCanvas>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

GlobalExplore.propTypes = {
  fetchCogTimeData: T.func,
  invalidateCogTimeData: T.func,
  mapLayers: T.array,
  cogTimeData: T.object,
  spotlightList: T.object,
  location: T.object,
  history: T.object
};

function mapStateToProps (state, props) {
  const layersToUse = ['no2', 'gibs-population'];

  return {
    spotlightList: wrapApiResult(state.spotlight.list),
    mapLayers: allMapLayers.filter((l) => layersToUse.includes(l.id)),
    cogTimeData: wrapApiResult(state.cogTimeData, true)
  };
}

const mapDispatchToProps = {
  fetchCogTimeData: fetchCogTimeDataAction,
  invalidateCogTimeData: invalidateCogTimeDataAction
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalExplore);
