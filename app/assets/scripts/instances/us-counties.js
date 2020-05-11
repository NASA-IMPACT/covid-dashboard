import React from 'react';
import Heading from '../styles/type/heading';

export default {
  mbToken: 'pk.eyJ1IjoiY292aWQtc3VwcG9ydCIsImEiOiJjazlhMTNweDIwMHd2M21venc1Nzdzdzh5In0.QZbkhaPpO9jRclw-dQWnDA',
  api: 'https://covid-support-api.s3.amazonaws.com/us',
  map: {
    center: [-99.5889, 38.1815],
    zoom: 4,
    minZoom: 4,
    maxZoom: 9,
    styleUrl: 'mapbox://styles/mapbox/light-v10',
    worldviewFilter: [
      'any',
      ['==', 'all', ['get', 'worldview']],
      ['in', 'US', ['get', 'worldview']]
    ],
    countryFilter: ['==', 'US', ['get', 'iso_3166_1']]
  },
  boundaries: {
    polygons: {
      sourceUrl: 'mapbox://mapbox.boundaries-adm2-v3',
      sourceLayer: 'boundaries_admin_2'
    },
    centroids: {
      sourceUrl: 'mapbox://mapbox.boundaries-admPoints-v3',
      sourceLayer: 'points_admin_2'
    }
  },
  // To set a layer as enabled by default use `enabled:true` on the layer conf.
  mapLayers: [
    {
      // NOTE: For timeseries layers the id has to match the indicator name in the
      // api url.
      type: 'timeseries',
      id: 'mobility-index',
      label: 'Movement index',
      swatch: {
        color: '#539F42',
        name: 'Green'
      },
      legend: {
        // TODO: Improve legend when more types are defined.
        type: 'gradient',
        min: 'less',
        max: 'more',
        // The stops are manually updated to legend and layer styles.
        stops: [
          'hsl(204, 76%, 50%)',
          'hsl(186, 76%, 78%)',
          'hsl(0, 2%, 100%)',
          'hsl(39, 89%, 77%)',
          'hsl(39, 88%, 52%)'
        ]
      },
      info: (
        <>
          <Heading size='small' as='h2'>Description</Heading>
          <p>The Mobility Index is a daily measurement of movement (normalized by day of the week), where 1.0 represented normal activity. A score less than 1.0 indicates lower than normal movement, and a score great than 1.0 increase higher than normal movement.</p>
          <Heading size='small' as='h2'>Source</Heading>
          <p>Mapbox Movement</p>
        </>
      ),
      exclusiveWith: [
        'cases',
        'svi',
        'pop_sqkm',
        'percent_over_65',
        'percent_black_aa'
      ]
    },
    {
      type: 'style-layers',
      id: 'pop_sqkm',
      label: 'Population',
      swatch: {
        color: '#35B3CE',
        name: 'Scooter'
      },
      description: 'Population in Sq KM 2018',
      source: 'US Census',
      layerIds: ['static-adm2-pop_sqkm'],
      exclusiveWith: ['mobility-index']
    }
  ]
};
