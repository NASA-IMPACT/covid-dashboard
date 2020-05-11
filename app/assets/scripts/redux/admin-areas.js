import { combineReducers } from 'redux';

import config from '../config';
import { makeActions, makeFetchThunk, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// ADMIN_AREAS
// /////////////////////////////////////////////////////////////////////////////

const {
  // invalidate: invalidateAdminAreas,
  request: requestAdminAreas,
  receive: receiveAdminAreas
} = makeActions('ADMIN_AREAS');

export function fetchAdminAreas () {
  return makeFetchThunk({
    url: `${config.instance.api}/features.json`,
    requestFn: requestAdminAreas,
    receiveFn: receiveAdminAreas
  });
}

const adminAreaListReducer = makeAPIReducer('ADMIN_AREAS');

// /////////////////////////////////////////////////////////////////////////////
// SINGLE_ADMIN_AREA
// /////////////////////////////////////////////////////////////////////////////

const {
  // invalidate: invalidateSingleAdminArea,
  request: requestSingleAdminArea,
  receive: receiveSingleAdminArea
} = makeActions('SINGLE_ADMIN_AREA', true);

export function fetchSingleAdminArea (id) {
  return makeFetchThunk({
    url: `${config.instance.api}/areas/${id}.json`,
    cache: true,
    statePath: ['adminAreas', 'single', id],
    requestFn: requestSingleAdminArea.bind(null, id),
    receiveFn: receiveSingleAdminArea.bind(null, id)
  });
}

const adminAreaSingleReducer = makeAPIReducer('SINGLE_ADMIN_AREA', true);

// /////////////////////////////////////////////////////////////////////////////
// GROUP_ADMIN_AREA
// /////////////////////////////////////////////////////////////////////////////

// Admin area groups are a way of dividing admin areas into buckets for analysis
// Grouping them by parent is a type of group, by region may be another.
// This gives us the flexibility of grouping admin areas through the api.
// Each group will have a children array which contains the ids of the admin
// areas that belong to it.

const {
  // invalidate: invalidateGroupsAdminArea,
  request: requestGroupsAdminArea,
  receive: receiveGroupsAdminArea
} = makeActions('GROUP_ADMIN_AREA', true);

export function fetchGroupsAdminArea (id) {
  return makeFetchThunk({
    url: `${config.instance.api}/${id}.json`,
    cache: true,
    statePath: ['adminAreas', 'groups', id],
    requestFn: requestGroupsAdminArea.bind(null, id),
    receiveFn: receiveGroupsAdminArea.bind(null, id)
  });
}

const adminAreaGroupsReducer = makeAPIReducer('GROUP_ADMIN_AREA', true);

// /////////////////////////////////////////////////////////////////////////////
// Export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  list: adminAreaListReducer,
  single: adminAreaSingleReducer,
  groups: adminAreaGroupsReducer
});
