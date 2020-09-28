import config from '../config';
import { makeActions, makeFetchThunk, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// LAYER_DATA
// /////////////////////////////////////////////////////////////////////////////

const {
  // invalidate: invalidateLayerData,
  request: requestLayerData,
  receive: receiveLayerData
} = makeActions('LAYER_DATA', true);

export function fetchLayerData (id) {
  const result = makeFetchThunk({
    url: 'https://cumulus-map-internal.s3.amazonaws.com/cloud-optimized/collections/datasets.json',
    cache: true,
    statePath: ['layerData', id],
    requestFn: requestLayerData.bind(null, id),
    receiveFn: receiveLayerData.bind(null, id)
  });
  return result;
}

const layerDataReducer = makeAPIReducer('LAYER_DATA', true);

export default layerDataReducer;
