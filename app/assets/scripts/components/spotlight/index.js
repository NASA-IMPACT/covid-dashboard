import ssSanFrancisco from './ss-sf';
import ssLosAngeles from './ss-la';
import ssNewYork from './ss-ny';
import ssTokyo from './ss-tk';

const spotlightAreas = [
  ssSanFrancisco,
  ssLosAngeles,
  ssNewYork,
  ssTokyo
];

export default spotlightAreas;

export const getSpotlightArea = (id) => spotlightAreas.find((d) => d.id === id);
