import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import styled, { css } from 'styled-components';
import { Transition } from 'react-transition-group';

import { themeVal } from '../../styles/utils/general';
import { glsp } from '../../styles/utils/theme-values';

const fadeDuration = 240;

const Message = styled.div`
  position: absolute;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, 0);
  padding: ${glsp(1 / 2, 1)};
  background: #fff;
  box-shadow: 0 0 4px 4px ${themeVal('color.baseAlphaA')};
  border-radius: ${themeVal('shape.rounded')};

  transition: all ${fadeDuration}ms ease-in-out;
  ${({ show }) => show ? css`
    visibility: visible;
    top: 2rem;
    opacity: 1;
  ` : css`
    visibility: hidden;
    top: 0;
    opacity: 0;
  `}
`;

class DrawMessage extends Component {
  render () {
    return (
      <Transition
        in={this.props.drawing}
        timeout={fadeDuration}
      >
        {state => (
          <Message show={state === 'entered' || state === 'entering'}>
            <p>Draw an AOI on the map</p>
          </Message>
        )}
      </Transition>
    );
  }
}

DrawMessage.propTypes = {
  drawing: T.bool
};

export default DrawMessage;
