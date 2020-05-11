import ExampleLongForm from './long-form';

export default {
  id: 'example',
  name: 'Example dataset',
  description: 'Lorem ipsum',
  type: 'raster',
  source: {
    type: 'raster',
    url: 'mapbox://mapbox.satellite'
  },
  swatch: {
    color: '#539F42',
    name: 'Green'
  },
  legend: {
    type: 'gradient',
    min: 'less',
    max: 'more',
    stops: [
      'hsl(204, 76%, 50%)',
      'hsl(186, 76%, 78%)',
      'hsl(39, 88%, 52%)'
    ]
  },
  info: 'Some information about this layer.',
  longFormComponent: ExampleLongForm
};
