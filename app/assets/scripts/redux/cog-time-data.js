import { eachMonthOfInterval, format, eachDayOfInterval } from 'date-fns';

import config from '../config';
import { makeActions, fetchJSON, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// COG_TIME_DATA
// /////////////////////////////////////////////////////////////////////////////

const cogTimeDataActions = makeActions('COG_TIME_DATA', true);

export const invalidateCogTimeData = cogTimeDataActions.invalidate;

export function fetchCogTimeData (id, timeframe, area) {
  return async function (dispatch) {
    dispatch(cogTimeDataActions.request(id));
    const { start, end, timeUnit } = timeframe;
    const dateFormat = timeUnit === 'month'
      ? 'yyyyMM'
      : 'yyyy.MM.dd';

    const interval = timeUnit === 'month'
      ? eachMonthOfInterval({ start, end })
      : eachDayOfInterval({ start, end });

    const url = `${config.api}/timelapse`;

    const requests = interval.map(async date => {
      const reqDate = format(date, dateFormat);

      try {
        const { body } = await fetchJSON(url, {
          method: 'POST',
          body: JSON.stringify({
            type: id,
            month: reqDate,
            geojson: area
          })
        });
        const v = id === 'co2'
          ? body.mean < 0 ? null : body.mean * 1000000
          : body.mean < 0 ? body.mean : body.mean;

        return {
          date: date.toISOString(),
          value: v
        };
      } catch (e) {
        return {
          date: date.toISOString(),
          value: null
        };
      }
    });

    const data = await Promise.all(requests);
    return dispatch(cogTimeDataActions.receive(id, data));
  };
}

const cogTimeDataReducer = makeAPIReducer('COG_TIME_DATA', true);

export default cogTimeDataReducer;
