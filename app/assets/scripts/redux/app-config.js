import config from '../config';
import { makeActions, makeFetchThunk, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// CONFIG
// /////////////////////////////////////////////////////////////////////////////

const {
  // invalidate: invalidateConfig,
  request: requestConfig,
  receive: receiveConfig
} = makeActions('CONFIG');

export function fetchConfig () {
  return makeFetchThunk({
    url: `${config.api}/config.json`,
    requestFn: requestConfig,
    receiveFn: receiveConfig
  });
}

export default makeAPIReducer('CONFIG');
