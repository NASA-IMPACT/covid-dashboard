export default {
  environment: 'production',
  appTitle: 'COVID-19 Dashboard',
  appDescription: 'COVID-19 Dashboard',
  appVersion: 'v0.01',
  gaTrackingCode: null,
  mbToken: 'pk.eyJ1IjoiY292aWQtc3VwcG9ydCIsImEiOiJjazlhMTNweDIwMHd2M21venc1Nzdzdzh5In0.QZbkhaPpO9jRclw-dQWnDA',
  api: 'https://covid-support-api.s3.amazonaws.com/us',
  map: {
    center: [0, 0],
    zoom: 2,
    minZoom: 1,
    maxZoom: 9,
    styleUrl: 'mapbox://styles/mapbox/light-v10'
  }
};
