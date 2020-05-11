import example from './example';

const datasets = [
  example
];

export default datasets;

export const getDataset = id => datasets.find(d => d.id === id);
