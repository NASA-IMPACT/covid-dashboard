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
  return makeFetchThunk({
    url: `${config.instance.api}/indicators/${id}/overview.json`,
    cache: true,
    statePath: ['layerData', id],
    requestFn: requestLayerData.bind(null, id),
    receiveFn: receiveLayerData.bind(null, id)
  });
}

export default makeAPIReducer('LAYER_DATA', true);
