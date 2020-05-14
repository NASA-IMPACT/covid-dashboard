import no2 from './no2';
import population from './population';

const datasets = [no2, population];

export default datasets;

export const getDataset = (id) => datasets.find((d) => d.id === id);

export const superSitesList = [
  { id: 'la', label: 'Los Angeles', center: [-118.25, 34.05] },
  { id: 'ny', label: 'New York', center: [-73.944, 40.661] },
  { id: 'sf', label: 'San Francisco', center: [-122.416389, 37.7775] },
  { id: 'tk', label: 'Tokyo', center: [139.692222, 35.689722] }
];
