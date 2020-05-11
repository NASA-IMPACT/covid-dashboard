'use strict';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

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

const middlewares = applyMiddleware(
  thunkMiddleware,
  logger
);

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(middlewares)
);

export default store;
