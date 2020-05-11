import React from 'react';
import styled from 'styled-components';

import { themeVal } from '../utils/general';
import { divide, multiply } from '../utils/math';
import { stackSkin } from '../skins';

const BWindowFrame = styled.div`
  ${stackSkin()}
  display: flex;
  flex-flow: column nowrap;

  ::before, ::after {
    content: '';
    background: ${themeVal('color.smoke')};
  }
  
  ::before {
    content: '•••';
    color: #fff;
    padding-left: ${divide(themeVal('layout.space'), 2)};
    height: ${multiply(themeVal('layout.space'), 1.5)};
    border-radius: ${themeVal('shape.rounded')} ${themeVal('shape.rounded')} 0 0;
    display: flex;
    align-items: center;
    font-size: 2.25rem;
    line-height: 1rem;
    letter-spacing: 0.05em;
  }
  
  ::after {
    height: ${divide(themeVal('layout.space'), 2)};
    border-radius: 0 0 ${themeVal('shape.rounded')} ${themeVal('shape.rounded')};
  }
`;

export const BrowserFramedImg = (props) => {
  return (
    <BWindowFrame>
      <img {...props} />
    </BWindowFrame>
  );
};
