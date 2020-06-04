import { combineReducers } from 'redux';

import config from '../config';
import { makeActions, makeFetchThunk, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// INDICATOR_GROUPS
// /////////////////////////////////////////////////////////////////////////////

const indicatorGroupsActions = makeActions('INDICATOR_GROUPS');

export function fetchIndicatorGroups () {
  return makeFetchThunk({
    url: `${config.api}/indicator_groups`,
    cache: true,
    requestFn: indicatorGroupsActions.request,
    receiveFn: indicatorGroupsActions.receive,
    mutator: d => d.groups
  });
}

const indicatorGroupsReducer = makeAPIReducer('INDICATOR_GROUPS');

// /////////////////////////////////////////////////////////////////////////////
// Export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  groups: indicatorGroupsReducer
});
