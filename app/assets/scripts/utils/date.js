import { isAfter, isBefore } from 'date-fns';

import { utcDate } from './utils';

/**
 * The different timeseries overviews have different date domains.
 * To ensure that the data is displayed correctly the intersection of the
 * domains is computed.
 *
 * @param {array} overview Array with timeseries overview data
 */
export const intersectOverviewDateDomain = (overview) => {
  return overview.reduce((acc, o) => {
    const agg = o.getData().aggregate;
    const domain = [agg[0].date, agg[agg.length - 1].date].map((d) =>
      utcDate(d)
    );
    return acc === null
      ? domain
      : [
        isAfter(domain[0], acc[0]) ? domain[0] : acc[0],
        isBefore(domain[1], acc[1]) ? domain[1] : acc[1]
      ];
  }, null);
};

/**
 * The different timeseries overviews have different date domains.
 * Compute the union of different date domains
 *
 * @param {array} overview Array with timeseries overview data
 */
export const unionOverviewDateDomain = (overview) => {
  return overview.reduce((acc, o) => {
    const agg = o.getData().aggregate;
    const domain = [agg[0].date, agg[agg.length - 1].date].map((d) =>
      utcDate(d)
    );
    return acc === null
      ? domain
      : [
        isBefore(domain[0], acc[0]) ? domain[0] : acc[0],
        isAfter(domain[1], acc[1]) ? domain[1] : acc[1]
      ];
  }, null);
};
