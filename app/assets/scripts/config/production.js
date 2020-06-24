// module exports is required to be able to load from gulpfile.
module.exports = {
  default: {
    environment: 'production',
    appTitle: 'COVID-19 Dashboard',
    appDescription: 'Although NASA can&apos;t see the novel #coronavirus from space, we can see how our response to it affects the environment. Explore the data using our new experimental dashboard.',
    gaTrackingCode: 'UA-170089104-1',
    twitterHandle: '@NASAEarthData',
    mbToken: 'pk.eyJ1IjoiY292aWQtbmFzYSIsImEiOiJja2F6eHBobTUwMzVzMzFueGJuczF6ZzdhIn0.8va1fkyaWgM57_gZ2rBMMg',
    api: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1',
    map: {
      center: [0, 0],
      zoom: 2,
      minZoom: 1,
      maxZoom: 20,
      styleUrl: 'mapbox://styles/covid-nasa/ckb01h6f10bn81iqg98ne0i2y'
    }
  }
};
