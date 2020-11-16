/**
 * How to add a new story page:
 * 1) Create a file for the page inside scripts/components/stories/.
 *    The name of the file should be `story-[name].js
 *    The file will have to export an object with the following properties:
 *    - id: string
 *    - name: string
 *
 *    TODO: Document
 *
 * 2) Import the page below.
 *
 * 3) Add the page to the stories array
 *
 */
import air from './story-air';
import climate from './story-climate';

const stories = [
  air,
  climate
];

export default stories;

export const getStory = (id) => stories.find((d) => d.id === id);
