import { combineReducers } from 'redux';

import config from '../config';
import { makeActions, makeFetchThunk, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// SPOTLIGHT_SINGLE
// /////////////////////////////////////////////////////////////////////////////

const spotlightSingleActions = makeActions('SPOTLIGHT_SINGLE', true);

export function fetchSpotlightSingle (id) {
  return makeFetchThunk({
    url: `${config.api}/sites/${id}`,
    // cache: true,
    statePath: ['spotlight', 'single', id],
    requestFn: spotlightSingleActions.request.bind(null, id),
    receiveFn: spotlightSingleActions.receive.bind(null, id)
  });
}

const spotlightSingleReducer = makeAPIReducer('SPOTLIGHT_SINGLE', true);

// /////////////////////////////////////////////////////////////////////////////
// SPOTLIGHT_LIST
// /////////////////////////////////////////////////////////////////////////////

const spotlightActions = makeActions('SPOTLIGHT_LIST');

export function fetchSpotlightList () {
  return makeFetchThunk({
    url: `${config.api}/sites`,
    cache: true,
    requestFn: spotlightActions.request,
    receiveFn: spotlightActions.receive,
    mutator: d => d.sites
  });
}

const spotlightListReducer = makeAPIReducer('SPOTLIGHT_LIST');

// /////////////////////////////////////////////////////////////////////////////
// Export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  single: spotlightSingleReducer,
  list: spotlightListReducer
});
