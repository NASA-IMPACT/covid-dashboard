import React from 'react';
import T from 'prop-types';
import styled, { withTheme } from 'styled-components';
import mapboxgl from 'mapbox-gl';

import config from '../../config';
import { layerTypes } from './layer-types';
import MapboxControl from '../common/mapbox-react-control';
import { glsp } from '../../styles/utils/theme-values';

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

const MapContainer = styled.div`
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

class MbMap extends React.Component {
  constructor (props) {
    super(props);
    this.mapContainer = null;
    this.mbMap = null;

    this.adminAreaIdActive = null;
    this.adminAreaIdHover = null;
  }

  componentDidMount () {
    // Mount the map on the net tick to prevent the right side gap.
    setTimeout(() => this.initMap(), 1);
  }

  componentDidUpdate (prevProps, prevState) {
    const { activeLayers } = this.props;
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
            fns.update(this.mbMap, layerInfo, this.props);
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
        return fns.update(this.mbMap, layerInfo, this.props);
      }
    });
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

    this.mbMap.on('load', () => {
      this.props.onAction('map.loaded');
    });
  }

  render () {
    return (
      <MapContainer
        ref={(el) => {
          this.mapContainer = el;
        }}
      />
    );
  }
}

MbMap.propTypes = {
  onAction: T.func,
  activeLayers: T.array,
  layers: T.array,
  /* eslint-disable-next-line react/no-unused-prop-types */
  layerData: T.object
};

export default withTheme(MbMap);
