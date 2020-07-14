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
import media from '../../styles/utils/media-queries';
import { wrapApiResult } from '../../redux/reduxeed';
import {
  fetchCogTimeData as fetchCogTimeDataAction,
  invalidateCogTimeData as invalidateCogTimeDataAction
} from '../../redux/cog-time-data';
import { utcDate } from '../../utils/utils';
import { getGlobalLayers } from '../common/layers';
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

  ${media.mediumDown`
    ${({ panelPrime, panelSec }) => {
      if (panelPrime && !panelSec) {
        return 'grid-template-columns: min-content 0 0;';
      }

      if (!panelPrime && panelSec) {
        return 'grid-template-columns: 0 0 min-content;';
      }
    }}
  `}

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
  min-width: 0;
  overflow: hidden;
`;

const dateMax = (...args) =>
  args.reduce((curr, d) => (curr.getTime() > d.getTime() ? curr : d));

const cogLayers = {
  no2: {
    title: <>NO<sub>2</sub> Concentration</>,
    unit: <>molecules/cm<sup>2</sup></>
  },
  co2: {
    title: <>CO<sub>2</sub> Concentration</>,
    unit: 'ppm'
  }
};

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
      _urlActiveLayers: activeLayers,
      panelPrime: false,
      panelSec: false,
      // Init dates for cog data according to a default.
      cogDateRanges: Object.keys(cogLayers).reduce((acc, id) => {
        const l = props.mapLayers.find(l => l.id === id);
        const timeUnit = l.timeUnit || 'month';

        const end = utcDate(l.domain[l.domain.length - 1]);
        const domainStart = utcDate(l.domain[0]);
        const start = timeUnit === 'month'
          ? dateMax(sub(end, { months: 11 }), domainStart)
          : dateMax(sub(end, { months: 2 }), domainStart);

        return {
          ...acc,
          [id]: {
            start, end
          }
        };
      }, {})
    };
  }

  componentWillUnmount () {
    this.props.invalidateCogTimeData();
  }

  onPanelChange (panel, revealed) {
    this.setState({ [panel]: revealed });
  }

  updateUrlQS () {
    const qString = this.qsState.getQs(this.state);
    this.props.history.push({ search: qString });
  }

  async requestCogData () {
    const {
      aoi: { feature },
      cogDateRanges
    } = this.state;
    const activeLayers = this.getActiveTimeseriesLayers()
      .filter(l => !!cogLayers[l.id]);

    if (!feature || !activeLayers.length) return;

    showGlobalLoading();
    await Promise.all(activeLayers.map(l => {
      const cogDate = cogDateRanges[l.id];
      return this.props.fetchCogTimeData(
        l.id,
        {
          start: cogDate.start,
          end: cogDate.end,
          timeUnit: l.timeUnit || 'month'
        },
        feature
      );
    }));
    hideGlobalLoading();
  }

  async requestSingleCogData (id) {
    const {
      aoi: { feature },
      cogDateRanges
    } = this.state;

    showGlobalLoading();
    const cogLayerSettings = cogLayers[id];
    const cogDate = cogDateRanges[id];
    await this.props.fetchCogTimeData(
      id,
      {
        start: cogDate.start,
        end: cogDate.end,
        dateFormat: cogLayerSettings.dateFormat
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
      case 'cog.date-range':
        this.setState(state => ({
          cogDateRanges: {
            ...state.cogDateRanges,
            [payload.id]: payload.date
          }
        }), () => this.requestSingleCogData(payload.id));
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

  toggleLayer (layer) {
    toggleLayerCommon.call(this, layer, () => {
      this.updateUrlQS();
      this.requestCogData();
    });
  }

  render () {
    const { spotlightList } = this.props;
    const layers = this.getLayersWithState();
    const activeTimeseriesLayers = this.getActiveTimeseriesLayers();
    const activeCogTimeseriesLayers = activeTimeseriesLayers
      .filter(l => !!cogLayers[l.id]);

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
            <ExploreCanvas panelPrime={this.state.panelPrime} panelSec={this.state.panelSec}>
              <ExpMapPrimePanel
                layers={layers}
                mapLoaded={this.state.mapLoaded}
                aoiState={this.state.aoi}
                onAction={this.onPanelAction}
                onPanelChange={({ revealed }) => {
                  this.resizeMap();
                  this.onPanelChange('panelPrime', revealed);
                }}
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
                  enableLocateUser
                  enableOverlayControls
                  spotlightList={spotlightList}
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
                cogDateRanges={this.state.cogDateRanges}
                cogLayersSettings={cogLayers}
                layers={activeCogTimeseriesLayers}
                onAction={this.onPanelAction}
                onPanelChange={({ revealed }) => {
                  this.resizeMap();
                  this.onPanelChange('panelSec', revealed);
                }}
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
  return {
    spotlightList: wrapApiResult(state.spotlight.list),
    mapLayers: getGlobalLayers(),
    cogTimeData: wrapApiResult(state.cogTimeData, true)
  };
}

const mapDispatchToProps = {
  fetchCogTimeData: fetchCogTimeDataAction,
  invalidateCogTimeData: invalidateCogTimeDataAction
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalExplore);
