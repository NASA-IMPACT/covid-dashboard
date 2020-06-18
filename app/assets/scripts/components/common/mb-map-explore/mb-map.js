import React from 'react';
import T from 'prop-types';
import styled, { withTheme } from 'styled-components';
import mapboxgl from 'mapbox-gl';
import CompareMbGL from 'mapbox-gl-compare';

import config from '../../../config';
import { layerTypes } from '../layers/types';
import { glsp } from '../../../styles/utils/theme-values';
import mbAoiDraw from './mb-aoi-draw';
import { round } from '../../../utils/format';
import ReactPopoverGl from './mb-popover';
import { createMbMarker } from './mb-popover/utils';
import Button from '../../../styles/button/button';
import { NavLink } from 'react-router-dom';

const {
  center,
  zoom: defaultZoom,
  minZoom,
  maxZoom,
  styleUrl
} = config.map;

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

class MbMap extends React.Component {
  constructor (props) {
    super(props);
    this.mapContainer = null;
    this.mbMap = null;
    this.mbDraw = null;

    this.state = {
      popover: {
        coords: null,
        spotlightId: null
      }
    };
  }

  componentDidMount () {
    // Mount the map on the net tick to prevent the right side gap.
    setTimeout(() => this.initMap(), 1);
  }

  componentDidUpdate (prevProps, prevState) {
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
    const currId = this.props.layers.map(l => l.id).join('.');
    const prevIds = prevProps.layers.map(l => l.id).join('.');
    if (currId !== prevIds) {
      this.props.activeLayers.forEach((layerId) => {
        const layerInfo = prevProps.layers.find((l) => l.id === layerId);
        const fns = layerTypes[layerInfo.type];
        if (fns) {
          return fns.hide(this, layerInfo, prevProps);
        }
        /* eslint-disable-next-line no-console */
        console.error('No functions found for layer type', layerInfo.type);
      });
    }

    if (prevProps.activeLayers !== activeLayers || comparing !== prevProps.comparing) {
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

  /**
   * Adds spotlight markers to mbMap and mbMapComparing. This functions uses
   * component state to control spotlights loading state, because maps will
   * finish loading at different times.
   */
  updateSpotlights () {
    // Check if spotlights are available
    const { spotlightList } = this.props;
    if (!spotlightList && !spotlightList.isReady()) return;

    // Get spotlights from API data
    const spotlights = spotlightList.getData();

    // Define a common function to add markers
    const addMarker = (spotlight, map) => {
      createMbMarker(map)
        .setLngLat(spotlight.center)
        .addTo(map)
        .onClick((coords) =>
          this.setState({ popover: { coords, spotlightId: spotlight.id } })
        );
    };

    // Add markers to mbMap, if not done yet
    if (this.mbMap) {
      spotlights.forEach((s) => {
        addMarker(s, this.mbMap);
      });
    }

    // Add markers to mbMapComparing, if not done yet
    if (this.mbMapComparing) {
      spotlights.forEach((s) => {
        addMarker(s, this.mbMapComparing);
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
    this.mbMapComparing.addControl(new mapboxgl.NavigationControl(), 'top-left');

    // Remove compass.
    document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove();

    if (this.props.enableLocateUser) {
      this.mbMapComparing.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }), 'top-left');
    }

    // Style attribution.
    this.mbMapComparing.addControl(new mapboxgl.AttributionControl({ compact: true }));

    this.mbMapComparing.once('load', () => {
      this.mbMapComparingLoaded = true;
      this.updateActiveLayers(prevProps);
      this.updateSpotlights();
    });

    this.compareControl = new CompareMbGL(this.mbMapComparing, this.mbMap, '#container');
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
      this.mbMap.addControl(new mapboxgl.NavigationControl(), 'top-left');

      // Remove compass.
      document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove();

      if (this.props.enableLocateUser) {
        this.mbMap.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }), 'top-left');
      }
    }

    // Style attribution
    this.mbMap.addControl(new mapboxgl.AttributionControl({ compact: true }));

    // Setup the AIO drawing functions.
    if (this.props.aoiState) {
      this.mbDraw = mbAoiDraw(this.mbMap);
      const { feature } = this.props.aoiState;
      this.mbDraw.setup(this.props.onAction, feature ? [feature] : null, this.props.theme);
    }

    this.mbMap.on('load', () => {
      this.props.onAction('map.loaded');

      if (this.props.comparing) {
        // Fake previous props to simulate the enabling of the compare option.
        this.enableCompare({
          ...this.props,
          comparing: false
        });
      }

      // If spotlight list is available on map mount, add it to the map
      const { spotlightList } = this.props;
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

  renderPopover () {
    const [spotlight] = this.props.spotlightList.getData().filter(
      (s) => s.id === this.state.popover.spotlightId
    );

    if (!spotlight) return null;

    return (
      <ReactPopoverGl
        mbMap={this.mbMap}
        lngLat={this.state.popover.coords}
        onClose={() => this.setState({ popover: {} })}
        suptitle='Spotlight'
        title={spotlight.label}
        content={
          <>
            <div>Minim veniam aliquip exercitation officia in.</div>
            <dl>
              <dt>22</dt>
              <dd>Indicator 1</dd>
            </dl>
            <dl>
              <dt>74%</dt>
              <dd>Indicator 2</dd>
            </dl>
            <dl>
              <dt>A+</dt>
              <dd>Indicator 3</dd>
            </dl>
          </>
        }
        footerContent={
          <Button element={NavLink} to={`/explore/${spotlight.id}`}>
            Go to area
          </Button>
        }
      />
    );
  }

  render () {
    return (
      <>
        {this.props.spotlightList &&
          this.mbMap &&
          this.state.popover.coords &&
          this.renderPopover()}
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
  disableControls: T.bool,
  spotlightList: T.object
};

export default withTheme(MbMap);
