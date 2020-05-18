'use strict';
import { combineReducers } from 'redux';

import layerData from './layer-data';
import timeSeries from './time-series';
import cogTimeData from './cog-time-data';

export const reducers = {
  layerData,
  timeSeries,
  cogTimeData
};

export default combineReducers(reducers);
