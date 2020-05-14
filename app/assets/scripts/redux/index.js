'use strict';
import { combineReducers } from 'redux';

import appConfig from './app-config';
import adminAreas from './admin-areas';
import layerData from './layer-data';
import timeSeries from './time-series';
import cogTimeData from './cog-time-data';

export const reducers = {
  appConfig,
  adminAreas,
  layerData,
  timeSeries,
  cogTimeData
};

export default combineReducers(reducers);
