import React from 'react';
import { PropTypes as T } from 'prop-types';
import { withTheme } from 'styled-components';

import { utcDate } from '../../utils/utils';

import LineChart from '../common/line-chart/chart';

// Extend the component previously created to change the background
// This is needed to see the achromic buttons.

const LineChartExample = ({ theme }) => {
  const xDomain = chartData.domain.date.map(utcDate);
  const yDomain = [0, 45];

  return (
    <React.Fragment>
      <h2>Line Chart</h2>
      <LineChart
        xDomain={xDomain}
        yDomain={yDomain}
        yUnit='mg/m2'
        data={chartData.data}
        highlightBands={chartData.highlightBands}
        // noBaseline
        // noBaselineConfidence
        // noIndicator
        // noIndicatorConfidence
      />
    </React.Fragment>
  );
};

LineChartExample.propTypes = {
  theme: T.object
};

export default withTheme(LineChartExample);

const chartData = {
  id: 'no2-15day',
  domain: {
    date: ['2019-01-01', '2020-05-01'],
    indicator: [6, 21]
  },
  highlightBands: [
    {
      label: 'Detection',
      interval: ['2019-12-01', '2019-12-31']
    },
    {
      label: 'Emergency state',
      interval: ['2020-01-16', '2020-03-15']
    }
  ],
  data: [
    {
      date: '2019-01-01',
      indicator: 13,
      indicator_conf_high: 16,
      indicator_conf_low: 10,
      baseline: 27,
      baseline_conf_high: 32,
      baseline_conf_low: 23
    },
    {
      date: '2019-02-01',
      indicator: 11,
      indicator_conf_high: 13,
      indicator_conf_low: 9,
      baseline: 25,
      baseline_conf_high: 29,
      baseline_conf_low: 22
    },
    {
      date: '2019-03-01',
      indicator: 14,
      indicator_conf_high: 16,
      indicator_conf_low: 12,
      baseline: 28,
      baseline_conf_high: 32,
      baseline_conf_low: 25
    },
    {
      date: '2019-04-01',
      indicator: 17,
      indicator_conf_high: 20,
      indicator_conf_low: 14,
      baseline: 31,
      baseline_conf_high: 36,
      baseline_conf_low: 27
    },
    {
      date: '2019-05-01',
      indicator: 6,
      indicator_conf_high: 7,
      indicator_conf_low: 5,
      baseline: 20,
      baseline_conf_high: 23,
      baseline_conf_low: 19
    },
    {
      date: '2019-06-01',
      indicator: 9,
      indicator_conf_high: 10,
      indicator_conf_low: 8,
      baseline: 23,
      baseline_conf_high: 26,
      baseline_conf_low: 21
    },
    {
      date: '2019-07-01',
      indicator: 8,
      indicator_conf_high: 9,
      indicator_conf_low: 8,
      baseline: 22,
      baseline_conf_high: 25,
      baseline_conf_low: 21
    },
    {
      date: '2019-08-01',
      indicator: 6,
      indicator_conf_high: 6,
      indicator_conf_low: 6,
      baseline: 20,
      baseline_conf_high: 22,
      baseline_conf_low: 19
    },
    {
      date: '2019-09-01',
      indicator: 7,
      indicator_conf_high: 8,
      indicator_conf_low: 5,
      baseline: 21,
      baseline_conf_high: 24,
      baseline_conf_low: 19
    },
    {
      date: '2019-10-01',
      indicator: 7,
      indicator_conf_high: 10,
      indicator_conf_low: 6,
      baseline: 21,
      baseline_conf_high: 26,
      baseline_conf_low: 19
    },
    {
      date: '2019-11-01',
      indicator: 17,
      indicator_conf_high: 22,
      indicator_conf_low: 15,
      baseline: 31,
      baseline_conf_high: 38,
      baseline_conf_low: 28
    },
    {
      date: '2019-12-01',
      indicator: 10,
      indicator_conf_high: 11,
      indicator_conf_low: 9,
      baseline: 24,
      baseline_conf_high: 27,
      baseline_conf_low: 22
    },
    {
      date: '2020-01-01',
      indicator: 21,
      indicator_conf_high: 25,
      indicator_conf_low: 15,
      baseline: 35,
      baseline_conf_high: 41,
      baseline_conf_low: 28
    },
    {
      date: '2020-02-01',
      indicator: 6,
      indicator_conf_high: 7,
      indicator_conf_low: 5,
      baseline: 20,
      baseline_conf_high: 23,
      baseline_conf_low: 19
    },
    {
      date: '2020-03-01',
      indicator: 9,
      indicator_conf_high: 9,
      indicator_conf_low: 6,
      baseline: 23,
      baseline_conf_high: 25,
      baseline_conf_low: 19
    },
    {
      date: '2020-04-01',
      indicator: 17,
      indicator_conf_high: 20,
      indicator_conf_low: 16,
      baseline: 31,
      baseline_conf_high: 36,
      baseline_conf_low: 29
    },
    {
      date: '2020-05-01',
      indicator: 9,
      indicator_conf_high: 10,
      indicator_conf_low: 7,
      baseline: 23,
      baseline_conf_high: 26,
      baseline_conf_low: 20
    }
  ]
};
