import ssSanFrancisco from './ss-sf';
import ssLosAngeles from './ss-la';
import ssNewYork from './ss-ny';
import ssTokyo from './ss-tk';

const superSites = [
  ssSanFrancisco,
  ssLosAngeles,
  ssNewYork,
  ssTokyo
];

export default superSites;

export const getSuperSite = (id) => superSites.find((d) => d.id === id);
