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
  worldviewFilter,
  countryFilter,
  logos
} = config.map;
const { sourceUrl, sourceLayer } = config.boundaries.polygons;

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
    const { activeLayers, selectedAdminArea } = this.props;
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

    if (prevProps.selectedAdminArea !== selectedAdminArea) {
      // Unselect if selected.
      if (this.adminAreaIdActive) {
        this.setAdminFeatureSelected(this.adminAreaIdActive, false);
      }
      // Select if new id
      if (selectedAdminArea) {
        this.adminAreaIdActive = selectedAdminArea;
        this.setAdminFeatureSelected(this.adminAreaIdActive, true);
      }
    }
  }

  setAdminFeatureHover (id, hover) {
    this.mbMap.setFeatureState(
      { source: 'base-boundaries', sourceLayer: sourceLayer, id },
      { hover }
    );
  }

  setAdminFeatureSelected (id, selected) {
    this.mbMap.setFeatureState(
      { source: 'base-boundaries', sourceLayer: sourceLayer, id },
      { selected }
    );
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
      this.initBoundariesLayers();
      this.props.onAction('map.loaded');
    });

    this.mbMap.on('mouseenter', 'boundaries-fill', (e) => {
      this.mbMap.getCanvas().style.cursor = 'pointer';
    });

    this.mbMap.on('mouseleave', 'boundaries-fill', () => {
      this.mbMap.getCanvas().style.cursor = '';
      if (this.adminAreaIdHover) {
        this.setAdminFeatureHover(this.adminAreaIdHover, false);
      }
    });

    this.mbMap.on('mousemove', 'boundaries-fill', (e) => {
      if (e.features.length > 0) {
        if (this.adminAreaIdHover) {
          this.setAdminFeatureHover(this.adminAreaIdHover, false);
        }
        this.adminAreaIdHover = e.features[0].id;
        this.setAdminFeatureHover(this.adminAreaIdHover, true);
      }
    });

    this.mbMap.on('click', 'boundaries-fill', (e) => {
      this.props.onAction('admin-area.click', e.features[0]);
    });
  }

  initBoundariesLayers () {
    // Add source for the base boundaries
    this.mbMap.addSource('base-boundaries', {
      type: 'vector',
      url: sourceUrl
    });

    const { color } = this.props.theme;

    this.mbMap.addLayer(
      {
        id: 'boundaries-fill',
        type: 'fill',
        source: 'base-boundaries',
        'source-layer': sourceLayer,
        filter: ['all', worldviewFilter, countryFilter],
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            color.primary,
            ['boolean', ['feature-state', 'selected'], false],
            color.primary,
            color.baseDark
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            ['boolean', ['feature-state', 'selected'], false],
            1,
            0.08
          ]
        }
      },
      'admin-1-boundary'
    );

    this.mbMap.addLayer(
      {
        id: 'boundaries-border',
        type: 'line',
        source: 'base-boundaries',
        'source-layer': sourceLayer,
        filter: ['all', worldviewFilter, countryFilter],
        paint: {
          'line-color': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            '#FFF',
            color.baseDark
          ],
          'line-opacity': 0.64,
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            2,
            1
          ]
        }
      },
      'admin-1-boundary'
    );

    if (this.props.selectedAdminArea) {
      this.adminAreaIdActive = this.props.selectedAdminArea;
      this.setAdminFeatureSelected(this.adminAreaIdActive, true);
    }
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
  theme: T.object,
  layers: T.array,
  /* eslint-disable-next-line react/no-unused-prop-types */
  layerData: T.object,
  selectedAdminArea: T.string
};

export default withTheme(MbMap);
