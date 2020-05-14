import React from 'react';
import T from 'prop-types';
import styled, { withTheme } from 'styled-components';
import mapboxgl from 'mapbox-gl';
import CompareMbGL from 'mapbox-gl-compare';

import MapboxControl from '../common/mapbox-react-control';

import config from '../../config';
import { layerTypes } from './layer-types';
import { glsp } from '../../styles/utils/theme-values';
import mbAoiDraw from './mb-aoi-draw';

const {
  center,
  zoom,
  minZoom,
  maxZoom,
  styleUrl,
  logos
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

    this.adminAreaIdActive = null;
    this.adminAreaIdHover = null;
  }

  componentDidMount () {
    // Mount the map on the net tick to prevent the right side gap.
    setTimeout(() => this.initMap(), 1);
  }

  componentDidUpdate (prevProps, prevState) {
    const { activeLayers, compare } = this.props;
    if (prevProps.activeLayers !== activeLayers) {
      const toRemove = prevProps.activeLayers.filter(
        (l) => !activeLayers.includes(l)
      );
      const toAdd = activeLayers.filter(
        (l) => !prevProps.activeLayers.includes(l)
      );

      toRemove.forEach((layerId) => {
        const layerInfo = this.props.layers.find((l) => l.id === layerId);
        const fns = layerTypes[layerInfo.type];
        if (fns) {
          return fns.hide(this.mbMap, layerInfo, this.props);
        }
        /* eslint-disable-next-line no-console */
        console.error('No functions found for layer type', layerInfo.type);
      });

      toAdd.forEach(async (layerId) => {
        const layerInfo = this.props.layers.find((l) => l.id === layerId);
        const fns = layerTypes[layerInfo.type];
        if (fns) {
          fns.show(this.mbMap, layerInfo, this.props);
          if (fns.update) {
            fns.update(this.mbMap, layerInfo, this.props, prevProps);
          }
          return;
        }
        /* eslint-disable-next-line no-console */
        console.error('No functions found for layer type', layerInfo.type);
      });
    }

    // Update all active layers
    activeLayers.forEach((layerId) => {
      const layerInfo = this.props.layers.find((l) => l.id === layerId);
      const fns = layerTypes[layerInfo.type];
      if (fns && fns.update) {
        return fns.update(this.mbMap, layerInfo, this.props, prevProps);
      }
    });

    // Compare Maps
    if (compare !== prevProps.compare) {
      if (compare) {
        this.mbMap.resize();
        this.mbMapComparing = new mapboxgl.Map({
          attributionControl: false,
          container: this.mapContainer2,
          center: center,
          zoom: zoom || 5,
          minZoom: minZoom || 4,
          maxZoom: maxZoom || 9,
          style: styleUrl,
          pitchWithRotate: false,
          // renderWorldCopies: false,
          dragRotate: false,
          logoPosition: 'bottom-left'
        });

        this.compareControl = new CompareMbGL(this.mbMap, this.mbMapComparing, '#container');
      } else {
        if (this.compareControl) {
          this.compareControl.remove();
          this.mbMapComparing.remove();
        }
      }
    }

    // Handle aoi state props update.
    if (this.mbDraw) {
      this.mbDraw.update(prevProps.aoiState, this.props.aoiState);
    }
  }

  initMap () {
    this.mbMap = new mapboxgl.Map({
      attributionControl: false,
      container: this.mapContainer,
      center: center,
      zoom: zoom || 5,
      minZoom: minZoom || 4,
      maxZoom: maxZoom || 9,
      style: styleUrl,
      pitchWithRotate: false,
      // renderWorldCopies: false,
      dragRotate: false,
      logoPosition: 'bottom-left'
    });

    if (logos) {
      const mapLogosControl = new MapboxControl((props, state) => (
        <div className='partner-logos'>
          {logos.map((l) => (
            <a
              key={l.id}
              href={l.url}
              title={`Visit ${l.label}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={l.src} alt={`${l.label} logo`} />
            </a>
          ))}
        </div>
      ));

      this.mbMap.addControl(mapLogosControl, 'bottom-left');

      mapLogosControl.render(this.props, this.state);
    }

    // Disable map rotation using right click + drag.
    this.mbMap.dragRotate.disable();

    // Disable map rotation using touch rotation gesture.
    this.mbMap.touchZoomRotate.disableRotation();

    // Add zoom controls.
    this.mbMap.addControl(new mapboxgl.NavigationControl(), 'top-left');

    // Style attribution
    this.mbMap.addControl(new mapboxgl.AttributionControl({ compact: true }));

    // Remove compass.
    document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove();

    // Setup the AIO drawing functions.
    if (this.props.aoiState) {
      this.mbDraw = mbAoiDraw(this.mbMap);
      const { feature } = this.props.aoiState;
      this.mbDraw.setup(this.props.onAction, feature ? [feature] : null, this.props.theme);
    }

    this.mbMap.on('load', () => {
      this.props.onAction('map.loaded');
    });
  }

  render () {
    return (
      <MapsContainer id='container'>
        <SingleMapContainer
          ref={(el) => {
            this.mapContainer2 = el;
          }}
        />
        <SingleMapContainer
          ref={(el) => {
            this.mapContainer = el;
          }}
        />
      </MapsContainer>
    );
  }
}

MbMap.propTypes = {
  onAction: T.func,
  compare: T.bool,
  activeLayers: T.array,
  layers: T.array,
  /* eslint-disable-next-line react/no-unused-prop-types */
  layerData: T.object
};

export default withTheme(MbMap);
