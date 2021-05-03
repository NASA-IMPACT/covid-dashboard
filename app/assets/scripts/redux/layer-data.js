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

export default makeAPIReducer('LAYER_DATA', true);
