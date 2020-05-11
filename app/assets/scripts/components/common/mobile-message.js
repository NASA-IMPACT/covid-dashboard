import React, { Component } from 'react';
import styled from 'styled-components';

import App from './app';

import { reveal } from '../../styles/animation';
import { themeVal } from '../../styles/utils/general';
import collecticon from '../../styles/collecticons';
import { glsp } from '../../styles/utils/theme-values';

const Message = styled.div`
  height: 100%;
  background: ${themeVal('color.background')};
  display: flex;
  visibility: visible;
  opacity: 1;
  flex-flow: column nowrap;
  justify-content: center;
  padding: ${glsp(2)};
  text-align: center;
  animation: ${reveal} 0.48s ease 0s 1;


  ::before {
    ${collecticon('face-sad')}
    color: ${themeVal('color.baseAlphaD')};
    font-size: 3rem;
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp()};
  }
`;

class MobileMessage extends Component {
  render () {
    return (
      <App>
        <Message>
          <h2>We&apos;re sorry</h2>
          <p>This section of the tool is optimized for desktop and tablets in landscape mode.</p>
          <p>If your device is smaller than <strong>1024x768 pixels</strong>, please try exploring this section on your desktop or tablet in landscape mode.</p>
        </Message>
      </App>
    );
  }
}

MobileMessage.propTypes = {
};

export default MobileMessage;
