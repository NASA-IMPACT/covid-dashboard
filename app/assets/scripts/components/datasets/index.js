/**
 * How to add a new Dataset page:
 * 1) Create a file for the page inside scripts/components/datasets/.
 *    The name of the file should be `dataset-[name].js
 *    The file will have to export an object with the following properties:
 *    - id: string
 *    - color: string
 *    - name: string
 *    - LongForm: ReactComponent
 *
 *    The react component will dictate how the dataset page is rendered. If set
 *    to null, no page will be created for the dataset.
 *
 *    The file should look something like:
 *     const metadata = {
 *       id: 'no2',
 *       name: 'Nitrogen Dioxide',
 *       color: '#2276AC'
 *     };
 *
 *     class NO2LongForm extends React.Component {
 *       render () {
 *         return <p>This is the content for the no2 dataset</p>
 *       }
 *     }
 *
 *     export default {
 *       ...metadata,
 *       LongForm: NO2LongForm
 *     };
 *
 * 2) Import the page below.
 *
 * 3) Add the page to the datasets array
 *
 */
import no2 from './dataset-no2';
import population from './dataset-population';

const datasets = [
  no2,
  population
];

export default datasets;

export const getDataset = (id) => datasets.find((d) => d.id === id);
