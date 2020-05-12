import no2 from './no2';

const datasets = [
  no2
];

export default datasets;

export const getDataset = id => datasets.find(d => d.id === id);
