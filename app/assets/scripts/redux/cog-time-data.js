
import { makeActions, fetchJSON, makeAPIReducer } from './reduxeed';
import { eachMonthOfInterval, format } from 'date-fns';

// /////////////////////////////////////////////////////////////////////////////
// COG_TIME_DATA
// /////////////////////////////////////////////////////////////////////////////

const cogTimeDataActions = makeActions('COG_TIME_DATA', true);

export const invalidateCogTimeData = cogTimeDataActions.invalidate;

export function fetchCogTimeData (id, timeframe, area) {
  return async function (dispatch) {
    dispatch(cogTimeDataActions.request(id));

    const { start, end } = timeframe;
    const months = eachMonthOfInterval({ start, end });
    const url = 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/timelapse';

    const requests = months.map(async date => {
      const reqDate = format(date, 'yyyyMM');

      try {
        const { body } = await fetchJSON(url, {
          method: 'POST',
          body: JSON.stringify({
            month: reqDate,
            geojson: area
          })
        });
        return {
          date: date.toISOString(),
          value: body.mean < 0 ? null : body.mean
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
