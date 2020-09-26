'use strict';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as asyncInitialState from 'redux-async-initial-state';
import { fetchJSON } from '../redux/reduxeed';
import reducer from '../redux';
import config from '../config';
const { environment } = config;

const initialState = {};

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => environment !== 'production'
});

const composeEnhancers =
  environment !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

// Load state function
// Should return promise that resolves application state
const loadStore = async function() {
  const url = 'https://cumulus-map-internal.s3.amazonaws.com/cloud-optimized/collections/imerg.json';

  const remoteLayers = await fetchJSON(url, { method: 'GET' }).then(response => {
    return response.body;
  });
  return combineReducers({ remoteLayers });
};

const middlewares = applyMiddleware(
  thunkMiddleware,
  logger,
  asyncInitialState.middleware(loadStore)
);

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(middlewares)
);

export default store;
