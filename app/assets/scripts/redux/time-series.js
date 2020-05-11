import { combineReducers } from 'redux';

import config from '../config';
import { makeActions, makeFetchThunk, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// TIMESERIES_DAILY
// /////////////////////////////////////////////////////////////////////////////

const {
  // invalidate: invalidateTimeSeriesDaily,
  request: requestTimeSeriesDaily,
  receive: receiveTimeSeriesDaily
} = makeActions('TIMESERIES_DAILY', true);

export function fetchTimeSeriesDaily (indicator, date) {
  const key = `${indicator}--${date}`;
  return makeFetchThunk({
    url: `${config.api}/indicators/${indicator}/daily/${date}.json`,
    cache: true,
    statePath: ['timeSeries', 'daily', key],
    requestFn: requestTimeSeriesDaily.bind(null, key),
    receiveFn: receiveTimeSeriesDaily.bind(null, key)
  });
}

const timeSeriesDailyReducer = makeAPIReducer('TIMESERIES_DAILY', true);

// /////////////////////////////////////////////////////////////////////////////
// TIMESERIES_OVERVIEW
// /////////////////////////////////////////////////////////////////////////////

const {
  // invalidate: invalidateTimeSeriesOverview,
  request: requestTimeSeriesOverview,
  receive: receiveTimeSeriesOverview
} = makeActions('TIMESERIES_OVERVIEW', true);

export function fetchTimeSeriesOverview (indicator) {
  return makeFetchThunk({
    url: `${config.api}/indicators/${indicator}/overview.json`,
    cache: true,
    statePath: ['timeSeries', 'overview', indicator],
    requestFn: requestTimeSeriesOverview.bind(null, indicator),
    receiveFn: receiveTimeSeriesOverview.bind(null, indicator)
  });
}

const timeSeriesOverviewReducer = makeAPIReducer('TIMESERIES_OVERVIEW', true);

// /////////////////////////////////////////////////////////////////////////////
// Export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  daily: timeSeriesDailyReducer,
  overview: timeSeriesOverviewReducer
});
