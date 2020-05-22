export default {
  environment: 'production',
  appTitle: 'COVID-19 Dashboard',
  appDescription: 'COVID-19 Dashboard',
  appVersion: 'v0.01',
  gaTrackingCode: null,
  mbToken: 'pk.eyJ1IjoiY292aWQtc3VwcG9ydCIsImEiOiJjazlhMTNweDIwMHd2M21venc1Nzdzdzh5In0.QZbkhaPpO9jRclw-dQWnDA',
  api: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1',
  map: {
    center: [0, 0],
    zoom: 2,
    minZoom: 1,
    maxZoom: 20,
    styleUrl: 'mapbox://styles/mapbox/light-v10'
  }
};
