'use strict';
import { combineReducers } from 'redux';

import appConfig from './app-config';
import adminAreas from './admin-areas';
import layerData from './layer-data';
import timeSeries from './time-series';

export const reducers = {
  appConfig,
  adminAreas,
  layerData,
  timeSeries
};

export default combineReducers(reducers);
