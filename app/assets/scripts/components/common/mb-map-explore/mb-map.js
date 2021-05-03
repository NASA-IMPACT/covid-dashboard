import React from 'react';
import T from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import mapboxgl from 'mapbox-gl';
import CompareMbGL from 'mapbox-gl-compare';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import config from '../../../config';
import { fetchSpotlightSingle as fetchSpotlightSingleAction } from '../../../redux/spotlight';
import { wrapApiResult } from '../../../redux/reduxeed';
import { layerTypes } from '../layers/types';
import { glsp } from '../../../styles/utils/theme-values';
import mbAoiDraw from './mb-aoi-draw';
import { round } from '../../../utils/format';
import { createMbMarker } from './mb-popover/utils';
import { getSpotlightLayers } from '../layers';
import MapboxControl from '../mapbox-react-control';

import ReactPopoverGl from './mb-popover';
import Button from '../../../styles/button/button';
import Prose from '../../../styles/type/prose';
import Dl from '../../../styles/type/definition-list';
import LayerControlDropdown from './map-layer-control';

const { center, zoom: defaultZoom, minZoom, maxZoom, styleUrl } = config.map;

// Set mapbox token.
mapboxgl.accessToken = config.mbToken;
localStorage.setItem('MapboxAccessToken', config.mbToken);

const MapsContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;

  /* Styles to accommodate the partner logos */
  .mapboxgl-ctrl-bottom-left {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    > .mapboxgl-ctrl {
      margin: 0 ${glsp(0.5)} 0 0;
    }
  }

  .partner-logos {
    display: flex;
    img {
      display: block;
      height: 3rem;
    }

    a {
      display: block;
    }

    > *:not(:last-child) {
      margin: 0 ${glsp(0.5)} 0 0;
    }
  }
`;

const SingleMapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PopoverDetails = styled(Dl)`
  dt {
    font-size: 0.75rem;
    line-height: 1;
    margin: 0;
    margin-bottom: ${glsp(0.25)};

    &:not(:first-child) {
      margin-top: ${glsp(0.75)};
    }
  }
  dd {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0;
    padding-left: ${glsp(0.25)};
  }
`;

const SpotlightNavLink = styled(NavLink)`
  &,
  &:visited {
    color: inherit;
  }
`;

class MbMap extends React.Component {
  constructor (props) {
    super(props);
    this.mapContainer = null;
    this.mbMap = null;
    this.mbDraw = null;

    this.state = {
      overlayState: {
        spotlightMarkers: true
      },
      popover: {
        coords: null,
        spotlightId: null
      }
    };

    // Store markers to be able to remove them.
    this.spotlightMarkersList = [];

    this.handleOverlayChange = this.handleOverlayChange.bind(this);
  }

  componentDidMount () {
    // Mount the map on the net tick to prevent the right side gap.
    setTimeout(() => this.initMap(), 1);
  }

  componentDidUpdate (prevProps, prevState) {
    // Manually trigger render of detached react components.
    this.overlayDropdownControl &&
      this.overlayDropdownControl.render(this.props, this.state);
    this.overlayDropdownControlCompare &&
      this.overlayDropdownControlCompare.render(this.props, this.state);

    const { activeLayers, comparing, spotlightList } = this.props;

    // Compare Maps
    if (comparing !== prevProps.comparing) {
      if (comparing) {
        this.enableCompare(prevProps);
      } else {
        if (this.compareControl) {
          this.compareControl.remove();
          this.compareControl = null;
          this.mbMapComparing.remove();
          this.mbMapComparing = null;
          this.mbMapComparingLoaded = false;
        }
      }
    }

    // Technical debt: The activeLayers and layers prop depend on eachother,
    // but they get updated at different times.
    // This leads to problems when finding a given layer in the layers array.
    // We can safely assume that when the layers array change, all the active
    // layers should be hidden.
    const currId = this.props.layers.map((l) => l.id).join('.');
    const prevIds = prevProps.layers.map((l) => l.id).join('.');
    if (currId !== prevIds) {
      // The 'layers' update before the 'activeLayers', therefore we have to
      // check the current 'activeLayers' against the previous 'layers'. However
      // when the 'layers' update, the prevProps.activeLayers will be the same
      // as this.props.activeLayers. By using the prevProps.activeLayers we fix
      // the problem when 'layers' update at the same time as 'activeLayers'
      // which happens for the stories.
      prevProps.activeLayers.forEach((layerId) => {
        const layerInfo = prevProps.layers.find((l) => l.id === layerId);
        const fns = layerTypes[layerInfo.type];
        if (fns) {
          return fns.hide(this, layerInfo, prevProps);
        }
        /* eslint-disable-next-line no-console */
        console.error('No functions found for layer type', layerInfo.type);
      });
    }

    if (
      prevProps.activeLayers !== activeLayers ||
      comparing !== prevProps.comparing
    ) {
      const toRemove = prevProps.activeLayers.filter(
        (l) => !activeLayers.includes(l)
      );
      const toAdd = activeLayers.filter(
        (l) => !prevProps.activeLayers.includes(l)
      );

      toRemove.forEach((layerId) => {
        const layerInfo = this.props.layers.find((l) => l.id === layerId);
        if (!layerInfo) return;
        const fns = layerTypes[layerInfo.type];
        if (fns) {
          return fns.hide(this, layerInfo, prevProps);
        }
        /* eslint-disable-next-line no-console */
        console.error('No functions found for layer type', layerInfo.type);
      });

      toAdd.forEach(async (layerId) => {
        const layerInfo = this.props.layers.find((l) => l.id === layerId);
        if (!layerInfo) return;
        const fns = layerTypes[layerInfo.type];
        if (fns) {
          fns.show(this, layerInfo, prevProps);
          if (fns.update) {
            fns.update(this, layerInfo, prevProps);
          }
          return;
        }
        /* eslint-disable-next-line no-console */
        console.error('No functions found for layer type', layerInfo.type);
      });
    }

    // Update mapLayers if changed
    const { spotlightMarkers } = this.state.overlayState;
    if (prevState.overlayState.spotlightMarkers !== spotlightMarkers) {
      if (spotlightMarkers) {
        this.updateSpotlights();
      } else {
        this.spotlightMarkersList.forEach(m => m.remove());
        this.spotlightMarkersList = [];
        this.setState({ popover: {} });
      }
    }

    // Update all active layers.
    this.updateActiveLayers(prevProps);

    // Handle aoi state props update.
    if (this.mbDraw) {
      this.mbDraw.update(prevProps.aoiState, this.props.aoiState);
    }

    // If spotlightList is active and was made available, add it to the map
    if (
      spotlightList &&
      spotlightList.isReady() &&
      !prevProps.spotlightList.isReady()
    ) {
      this.updateSpotlights();
    }
  }

  handleOverlayChange (id) {
    this.setState(state => ({
      // Replace the array index with the negated value.
      overlayState: Object.assign({}, state.overlayState, {
        [id]: !state.overlayState[id]
      })
    }));
  }

  /**
   * Adds spotlight markers to mbMap and mbMapComparing. This functions uses
   * component state to control spotlights loading state, because maps will
   * finish loading at different times.
   */
  updateSpotlights () {
    // Check if spotlights are available
    const { spotlightList } = this.props;
    if (!spotlightList || !spotlightList.isReady()) return;

    // Get spotlights from API data
    const spotlights = spotlightList.getData();

    // Define a common function to add markers
    const addMarker = (spotlight, map) => {
      return createMbMarker(map, { color: this.props.theme.color.primary })
        .setLngLat(spotlight.center)
        .addTo(map)
        .onClick((coords) => {
          this.props.fetchSpotlightSingle(spotlight.id);
          this.setState({ popover: { coords, spotlightId: spotlight.id } });
        });
    };

    // Add markers to mbMap, if not done yet
    if (this.mbMap) {
      spotlights.forEach((s) => {
        const m = addMarker(s, this.mbMap);
        this.spotlightMarkersList.push(m);
      });
    }

    // Add markers to mbMapComparing, if not done yet
    if (this.mbMapComparing) {
      spotlights.forEach((s) => {
        const m = addMarker(s, this.mbMapComparing);
        this.spotlightMarkersList.push(m);
      });
    }
  }

  enableCompare (prevProps) {
    this.mbMap.resize();
    this.mbMapComparing = new mapboxgl.Map({
      attributionControl: false,
      container: this.mapContainerComparing,
      center: this.mbMap.getCenter(),
      zoom: this.mbMap.getZoom(),
      minZoom: minZoom || 4,
      maxZoom: maxZoom || 9,
      style: styleUrl,
      pitchWithRotate: false,
      dragRotate: false,
      logoPosition: 'bottom-left'
    });

    // Add zoom controls.
    this.mbMapComparing.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Remove compass.
    document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove();

    if (this.props.enableLocateUser) {
      this.mbMapComparing.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }),
        'top-left'
      );
    }

    if (this.props.enableOverlayControls) {
      this.overlayDropdownControlCompare = new MapboxControl(
        (props, state) => this.renderOverlayDropdown(props, state)
      );

      this.mbMapComparing.addControl(this.overlayDropdownControlCompare, 'top-left');
      // Initial rendering.
      this.overlayDropdownControlCompare.render(this.props, this.state);
    }

    // Style attribution.
    this.mbMapComparing.addControl(
      new mapboxgl.AttributionControl({ compact: true })
    );

    this.mbMapComparing.once('load', () => {
      this.mbMapComparingLoaded = true;
      this.updateActiveLayers(prevProps);
      this.updateSpotlights();
    });

    this.compareControl = new CompareMbGL(
      this.mbMapComparing,
      this.mbMap,
      '#container'
    );
  }

  updateActiveLayers (prevProps) {
    this.props.activeLayers.forEach((layerId) => {
      const layerInfo = this.props.layers.find((l) => l.id === layerId);
      if (!layerInfo) return;
      const fns = layerTypes[layerInfo.type];
      if (fns && fns.update) {
        return fns.update(this, layerInfo, prevProps);
      }
    });
  }

  initMap () {
    const { lng, lat, zoom } = this.props.position || {
      lng: center[0],
      lat: center[1],
      zoom: defaultZoom
    };

    this.mbMap = new mapboxgl.Map({
      attributionControl: false,
      container: this.mapContainer,
      center: [lng, lat],
      zoom: zoom || 5,
      minZoom: minZoom || 4,
      maxZoom: maxZoom || 9,
      style: styleUrl,
      pitchWithRotate: false,
      dragRotate: false,
      logoPosition: 'bottom-left'
    });

    // Disable map rotation using right click + drag.
    this.mbMap.dragRotate.disable();

    // Disable map rotation using touch rotation gesture.
    this.mbMap.touchZoomRotate.disableRotation();

    if (!this.props.disableControls) {
      // Add zoom controls.
      this.mbMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Remove compass.
      document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove();

      if (this.props.enableLocateUser) {
        this.mbMap.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          }),
          'top-left'
        );
      }

      if (this.props.enableOverlayControls) {
        this.overlayDropdownControl = new MapboxControl(
          (props, state) => this.renderOverlayDropdown(props, state)
        );

        this.mbMap.addControl(this.overlayDropdownControl, 'top-left');
        // Initial rendering.
        this.overlayDropdownControl.render(this.props, this.state);
      }
    }

    // Style attribution
    this.mbMap.addControl(new mapboxgl.AttributionControl({ compact: true }));

    // Setup the AIO drawing functions.
    if (this.props.aoiState) {
      this.mbDraw = mbAoiDraw(this.mbMap);
      const { feature } = this.props.aoiState;
      this.mbDraw.setup(
        this.props.onAction,
        feature ? [feature] : null,
        this.props.theme
      );
    }

    this.mbMap.on('load', () => {
      const allProps = this.props;
      const { spotlightList, comparing, onAction } = allProps;
      onAction('map.loaded');

      if (comparing) {
        // Fake previous props to simulate the enabling of the compare option.
        this.enableCompare({
          ...allProps,
          comparing: false
        });
      }

      // If spotlight list is available on map mount, add it to the map
      if (spotlightList && spotlightList.isReady()) {
        this.updateSpotlights(spotlightList.getData());
      }
    });

    this.mbMap.on('moveend', (e) => {
      this.props.onAction('map.move', {
        // The existence of originalEvent indicates that it was not caused by
        // a method call.
        userInitiated: Object.prototype.hasOwnProperty.call(e, 'originalEvent'),
        lng: round(this.mbMap.getCenter().lng, 4),
        lat: round(this.mbMap.getCenter().lat, 4),
        zoom: round(this.mbMap.getZoom(), 2)
      });
    });
  }

  renderOverlayDropdown (props, state) {
    return (
      <ThemeProvider theme={props.theme}>
        <LayerControlDropdown
          overlayState={state.overlayState}
          handleOverlayChange={this.handleOverlayChange}
        />
      </ThemeProvider>
    );
  }

  renderPopover () {
    const { spotlightId } = this.state.popover;

    let spotlight = {};

    if (spotlightId) {
      const { getData, isReady } = this.props.spotlight[spotlightId];
      spotlight = isReady() ? getData() : {};
    }

    const truncateArray = (arr, count) => {
      if (!arr) return [];
      if (arr.length <= count) return arr;
      return [
        // We always want to have count items. If there are more show, count - 1
        // and "more".
        ...arr.slice(0, count - 1),
        {
          id: 'other',
          name: <em>and {arr.length - (count - 1)} more</em>
        }
      ];
    };

    const spotlightLayers = getSpotlightLayers(spotlightId);
    const layersToShow = truncateArray(spotlightLayers, 3);

    return (
      <ReactPopoverGl
        mbMap={this.mbMap}
        lngLat={this.state.popover.coords}
        onClose={() => this.setState({ popover: {} })}
        offset={[38, 3]}
        suptitle='Area'
        title={
          spotlight.id ? (
            <SpotlightNavLink
              to={`/explore/${spotlight.id}`}
              title={`Visit ${spotlight.label} page`}
            >
              {spotlight.label}
            </SpotlightNavLink>
          ) : (
            'Loading'
          )
        }
        content={
          spotlight.id && (
            <Prose>
              <PopoverDetails>
                <dt>Layers</dt>
                {layersToShow.map(({ id, name }) => (
                  <dd key={id}>{name}</dd>
                ))}
              </PopoverDetails>
            </Prose>
          )
        }
        footerContent={
          <Button
            variation='primary-raised-dark'
            element={NavLink}
            to={`/explore/${spotlightId}`}
            title={`Visit ${spotlight.label} page`}
            useIcon={['chevron-right--small', 'after']}
          >
            Explore area
          </Button>
        }
      />
    );
  }

  render () {
    return (
      <>
        {this.mbMap && this.renderPopover()}
        <MapsContainer id='container'>
          <SingleMapContainer
            ref={(el) => {
              this.mapContainerComparing = el;
            }}
          />
          <SingleMapContainer
            ref={(el) => {
              this.mapContainer = el;
            }}
          />
        </MapsContainer>
      </>
    );
  }
}

MbMap.propTypes = {
  onAction: T.func,
  theme: T.object,
  position: T.object,
  aoiState: T.object,
  comparing: T.bool,
  activeLayers: T.array,
  layers: T.array,
  enableLocateUser: T.bool,
  enableOverlayControls: T.bool,
  disableControls: T.bool,
  spotlightList: T.object,
  spotlight: T.object,
  fetchSpotlightSingle: T.func
};

function mapStateToProps (state) {
  return {
    spotlight: wrapApiResult(state.spotlight.single, true)
  };
}

const mapDispatchToProps = {
  fetchSpotlightSingle: fetchSpotlightSingleAction
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(withTheme(MbMap));
