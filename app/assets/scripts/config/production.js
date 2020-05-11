export default {
  environment: 'production',
  appTitle: 'COVID-19 Dashboard',
  appDescription: 'COVID-19 Dashboard',
  gaTrackingCode: null,
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
  }
};
