'use strict';
import { combineReducers } from 'redux';

import layerData from './layer-data';
import timeSeries from './time-series';
import cogTimeData from './cog-time-data';
import spotlight from './spotlight';
import indicators from './indicators';

export const reducers = {
  layerData,
  timeSeries,
  cogTimeData,
  spotlight,
  indicators
};

export default combineReducers(reducers);
