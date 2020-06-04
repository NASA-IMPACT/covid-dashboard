import { combineReducers } from 'redux';

import config from '../config';
import { makeActions, makeFetchThunk, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// SPOTLIGHT_SINGLE
// /////////////////////////////////////////////////////////////////////////////

const spotlightSingleActions = makeActions('SPOTLIGHT_SINGLE', true);

export function fetchSpotlightSingle (id) {
  return makeFetchThunk({
    url: `${config.api}/sites/${id}`,
    // cache: true,
    statePath: ['spotlight', 'single', id],
    requestFn: spotlightSingleActions.request.bind(null, id),
    receiveFn: spotlightSingleActions.receive.bind(null, id),
    mutator: (data) => {
      const indicatorGroups = [
        {
          id: 'g1',
          label: 'Group 1',
          prose: 'Some description about this data grouping. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur condimentum rutrum erat. Mauris neque erat, gravida ut orci a, feugiat viverra lacus. Aenean vehicula vitae ex eget varius.',
          indicators: []
        },
        {
          id: 'g2',
          label: 'Group 2',
          prose: 'Some description about this data grouping. Nullam in lectus in nibh mollis rhoncus at eget leo. Nulla lacus nisl, laoreet sit amet dapibus sed, pretium sed est. Duis rutrum faucibus ornare. Suspendisse in nunc ex.',
          indicators: []
        }
      ];

      data.indicators.forEach((ind, i) => {
        indicatorGroups[i % 2].indicators.push(ind.id);
      });

      data.indicators[0].attribution = 'Wayne Enterprises';
      data.indicators[0].prose = 'Some description about this data chart. Neugiat viverra lacus. Aenean vehicula vitae ex eget varius. Amet dapibus sed, pretium sed est. Duis rutrum faucibus ornare.';

      return {
        ...data,
        indicatorGroups
      };
    }
  });
}

const spotlightSingleReducer = makeAPIReducer('SPOTLIGHT_SINGLE', true);

// /////////////////////////////////////////////////////////////////////////////
// SPOTLIGHT_LIST
// /////////////////////////////////////////////////////////////////////////////

const spotlightActions = makeActions('SPOTLIGHT_LIST');

export function fetchSpotlightList () {
  return makeFetchThunk({
    url: `${config.api}/sites`,
    cache: true,
    requestFn: spotlightActions.request,
    receiveFn: spotlightActions.receive,
    mutator: d => d.sites
  });
}

const spotlightListReducer = makeAPIReducer('SPOTLIGHT_LIST');

// /////////////////////////////////////////////////////////////////////////////
// Export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  single: spotlightSingleReducer,
  list: spotlightListReducer
});
