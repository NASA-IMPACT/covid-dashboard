/**
 * How to add a new indicator page:
 * 1) Create a file for the page inside scripts/components/indicators/.
 *    The name of the file should be `indicator-[name].js
 *    The file will have to export an object with the following properties:
 *    - id: string
 *    - color: string
 *    - name: string
 *    - LongForm: ReactComponent
 *
 *    The react component will dictate how the indicator page is rendered. If set
 *    to null, no page will be created for the indicator.
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
 *         return <p>This is the content for the no2 indicator</p>
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
 * 3) Add the page to the indicators array
 *
 */
import agriculture from './indicator-agriculture';
import no2 from './indicator-no2';
import co2 from './indicator-co2';
import bm from './indicator-nightlights';
import population from './indicator-population';
import waterQuality from './indicator-water-quality';
import shipping from './indicator-shipping';
import caco from './indicator-cars-and-construction';
import wqGreatLakes from './indicator-wq-great-lakes';

const indicators = [
  caco,
  co2,
  agriculture,
  bm,
  no2,
  population,
  shipping,
  waterQuality,
  wqGreatLakes
];

export default indicators;

export const getIndicator = (id) => indicators.find((d) => d.id === id);
