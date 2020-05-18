import no2 from './dataset-no2';
import population from './dataset-population';

const datasets = [no2, population];

export default datasets;

export const getDataset = (id) => datasets.find((d) => d.id === id);
