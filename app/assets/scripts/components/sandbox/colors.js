import React from 'react';
import { PropTypes as T } from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { themeVal } from '../../styles/utils/general';

// Extend the component previously created to change the background
// This is needed to see the achromic buttons.

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1rem;
`;

const Color = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const ColorSquare = styled.div`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  border: 1px dashed #333;
  border-radius: ${themeVal('shape.rounded')};
  background: ${({ color }) => color};
`;

const ColorsExample = ({ theme }) => (
  <React.Fragment>
    <h2>Colors</h2>
    <ColorsGrid>
      {Object.keys(theme.color).map(key => (
        <Color key={key}>
          <ColorSquare color={theme.color[key]} />
          <strong>color.{key}</strong>
          <p>{theme.color[key]}</p>
        </Color>
      ))}
    </ColorsGrid>
  </React.Fragment>
);

ColorsExample.propTypes = {
  theme: T.object
};

export default withTheme(ColorsExample);
