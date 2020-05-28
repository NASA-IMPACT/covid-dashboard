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
    ['2019-03-01', '2019-05-01'],
    ['2020-01-01', '2020-02-01']
  ],
  data: [
    {
      date: '2019-01-01',
      indicator: 13,
      cMax: 16,
      cMin: 10,
      baseline: 27,
      baselineMax: 32,
      baselineMin: 23
    },
    {
      date: '2019-02-01',
      indicator: 11,
      cMax: 13,
      cMin: 9,
      baseline: 25,
      baselineMax: 29,
      baselineMin: 22
    },
    {
      date: '2019-03-01',
      indicator: 14,
      cMax: 16,
      cMin: 12,
      baseline: 28,
      baselineMax: 32,
      baselineMin: 25
    },
    {
      date: '2019-04-01',
      indicator: 17,
      cMax: 20,
      cMin: 14,
      baseline: 31,
      baselineMax: 36,
      baselineMin: 27
    },
    {
      date: '2019-05-01',
      indicator: 6,
      cMax: 7,
      cMin: 5,
      baseline: 20,
      baselineMax: 23,
      baselineMin: 19
    },
    {
      date: '2019-06-01',
      indicator: 9,
      cMax: 10,
      cMin: 8,
      baseline: 23,
      baselineMax: 26,
      baselineMin: 21
    },
    {
      date: '2019-07-01',
      indicator: 8,
      cMax: 9,
      cMin: 8,
      baseline: 22,
      baselineMax: 25,
      baselineMin: 21
    },
    {
      date: '2019-08-01',
      indicator: 6,
      cMax: 6,
      cMin: 6,
      baseline: 20,
      baselineMax: 22,
      baselineMin: 19
    },
    {
      date: '2019-09-01',
      indicator: 7,
      cMax: 8,
      cMin: 5,
      baseline: 21,
      baselineMax: 24,
      baselineMin: 19
    },
    {
      date: '2019-10-01',
      indicator: 7,
      cMax: 10,
      cMin: 6,
      baseline: 21,
      baselineMax: 26,
      baselineMin: 19
    },
    {
      date: '2019-11-01',
      indicator: 17,
      cMax: 22,
      cMin: 15,
      baseline: 31,
      baselineMax: 38,
      baselineMin: 28
    },
    {
      date: '2019-12-01',
      indicator: 10,
      cMax: 11,
      cMin: 9,
      baseline: 24,
      baselineMax: 27,
      baselineMin: 22
    },
    {
      date: '2020-01-01',
      indicator: 21,
      cMax: 25,
      cMin: 15,
      baseline: 35,
      baselineMax: 41,
      baselineMin: 28
    },
    {
      date: '2020-02-01',
      indicator: 6,
      cMax: 7,
      cMin: 5,
      baseline: 20,
      baselineMax: 23,
      baselineMin: 19
    },
    {
      date: '2020-03-01',
      indicator: 9,
      cMax: 9,
      cMin: 6,
      baseline: 23,
      baselineMax: 25,
      baselineMin: 19
    },
    {
      date: '2020-04-01',
      indicator: 17,
      cMax: 20,
      cMin: 16,
      baseline: 31,
      baselineMax: 36,
      baselineMin: 29
    },
    {
      date: '2020-05-01',
      indicator: 9,
      cMax: 10,
      cMin: 7,
      baseline: 23,
      baselineMax: 26,
      baselineMin: 20
    }
  ]
};
