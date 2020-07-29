import React from 'react';
import { PropTypes as T } from 'prop-types';
import { withTheme } from 'styled-components';

import BarChart from '../common/bar-chart/chart';

const BarChartExample = ({ theme }) => {
  const yDomain = [0, 45];

  return (
    <React.Fragment>
      <h2>Bar Chart</h2>
      <BarChart
        yDomain={yDomain}
        yUnit='Ships'
        data={chartData.data}
      />
    </React.Fragment>
  );
};

BarChartExample.propTypes = {
  theme: T.object
};

export default withTheme(BarChartExample);

const chartData = {
  id: 'ships',
  data: [
    {
      date: '2019-01-01',
      indicator: 13
    },
    {
      date: '2019-02-01',
      indicator: 11
    },
    {
      date: '2019-03-01',
      indicator: 14
    },
    {
      date: '2019-04-01',
      indicator: 17
    },
    {
      date: '2019-05-01',
      indicator: 6
    },
    {
      date: '2019-06-01',
      indicator: 9
    },
    {
      date: '2019-07-01',
      indicator: 8
    },
    {
      date: '2019-08-01',
      indicator: 6
    },
    {
      date: '2019-09-01',
      indicator: 7
    },
    {
      date: '2019-10-01',
      indicator: 7
    },
    {
      date: '2019-11-01',
      indicator: 17
    },
    {
      date: '2019-12-01',
      indicator: 10
    },
    {
      date: '2020-01-01',
      indicator: 21
    },
    {
      date: '2020-02-01',
      indicator: 6
    },
    {
      date: '2020-03-01',
      indicator: 9
    },
    {
      date: '2020-04-01',
      indicator: 17
    },
    {
      date: '2020-05-01',
      indicator: 9
    }
  ]
};
