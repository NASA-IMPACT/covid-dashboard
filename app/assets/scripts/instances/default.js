export default {
  appTitle: 'Placeholder title',
  appContext: 'Placeholder context',
  appDescription:
    'Placeholder app description',
  mbToken:
    'pk.eyJ1IjoiY292aWQtc3VwcG9ydCIsImEiOiJjazlhMTNweDIwMHd2M21venc1Nzdzdzh5In0.QZbkhaPpO9jRclw-dQWnDA',
  api: 'https://covid-support-api.s3.amazonaws.com/us',
  map: {
    center: [-99.5889, 38.1815],
    zoom: 4,
    styleUrl: 'mapbox://styles/covid-support/ck9e4n3cy07881ipgi968z1f2',
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
      id: 'cases-100k',
      label: 'Cases',
      swatch: {
        color: '#CA60C7',
        name: 'Fuchsia Pink'
      },
      exclusiveWith: [
        'mobility-index'
      ]
    },
    {
      // NOTE: For timeseries layers the id has to match the indicator name in the
      // api url.
      type: 'timeseries',
      id: 'mobility-index',
      label: 'Mobility index',
      swatch: {
        color: '#539F42',
        name: 'Green'
      },
      exclusiveWith: [
        'cases-100k',
        'svi',
        'pop_sqkm',
        'percent_over_65',
        'percent_black_aa'
      ]
    },
    {
      type: 'style-layers',
      id: 'svi',
      label: 'Social vulnerability index',
      enabled: true,
      swatch: {
        color: '#5991A6',
        name: 'Horizon'
      },
      description: 'Social vulnerability index 2018',
      source: 'CDC SVI',
      layerIds: ['static-adm2-SVI'],
      exclusiveWith: ['mobility-index']
    }
  ]
};
