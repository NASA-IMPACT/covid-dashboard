import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import styled, { keyframes } from 'styled-components';

import { themeVal } from '../../styles/utils/general';
import collecticon from '../../styles/collecticons';

// Minimum time the loading is visible.
const MIN_TIME = 512;
// Since we have a minimum display time we use a timeout to hide it if
// when the hide method is called the time isn't over yet. However, if in
// the mean time the loading is shown again we need to clear the timeout.
let hideTimeout = null;

// Once the component is mounted we store it to be able to access it from
// the outside.
let theGlobalLoading = null;

// Store the amount of global loading calls so we can keep it visible until
// all were hidden.
let theGlobalLoadingCount = 0;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: flex;

  &::before {
    ${collecticon('arrow-spin-cw')}
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);
    font-size: 3rem;
    color: inherit;
  }
`;

const GlobalLoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9997;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  cursor: not-allowed;
  background: ${themeVal('color.silk')};

  &.overlay-loader-enter {
    transform: translate3d(0, 0, 0);
    transition: opacity 0.32s ease 0s, visibility 0.32s linear 0s;
    opacity: 0;
    visibility: hidden;

    &.overlay-loader-enter-active {
      opacity: 1;
      visibility: visible;
    }
  }

  &.overlay-loader-exit {
    transition: opacity 0.32s ease 0s, visibility 0.32s linear 0s;
    opacity: 1;
    visibility: visible;

    &.overlay-loader-exit-active {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

const Message = styled.p`
  margin-top: ${themeVal('layout.space')};
`;

export class GlobalLoading extends React.Component {
  constructor (props) {
    super(props);
    this.componentAddedBodyClass = false;

    this.state = {
      showTimestamp: 0, // eslint-disable-line
      message: '', // eslint-disable-line
      revealed: false
    };

    if (theGlobalLoading !== null) {
      throw new Error(
        '<GlobalLoading /> component was already mounted. Only 1 is allowed.'
      );
    }
    theGlobalLoading = this;
  }

  componentDidMount () {
    const { revealed } = this.state;
    this.toggleBodyClass(revealed);
  }

  componentDidUpdate () {
    const { revealed } = this.state;
    this.toggleBodyClass(revealed);
  }

  componentWillUnmount () {
    this.toggleBodyClass(false);
    theGlobalLoading = null;
  }

  toggleBodyClass (revealed) {
    const bd = document.getElementsByTagName('body')[0]; // eslint-disable-line
    if (revealed) {
      this.componentAddedBodyClass = true;
      bd.classList.add('unscrollable-y');
    } else if (this.componentAddedBodyClass) {
      // Only act if the class was added by this component.
      this.componentAddedBodyClass = false;
      setTimeout(() => {
        bd.classList.remove('unscrollable-y');
      }, 300);
    }
  }

  render () {
    const { revealed, message } = this.state;

    return createPortal(
      <CSSTransition
        in={revealed}
        unmountOnExit
        appear
        classNames='overlay-loader'
        timeout={{ enter: 300, exit: 300 }}
      >
        <GlobalLoadingWrapper>
          <Spinner />
          {message && <Message>{message}</Message>}
        </GlobalLoadingWrapper>
      </CSSTransition>,
      document.body
    ); // eslint-disable-line
  }
}

/**
 * Show a global loading.
 * The loading has a minimum visible time defined by the MIN_TIME constant.
 * This will prevent flickers in the interface when the action is very fast.
 * @param  {number} count Define how many loadings to show. This will not
 *                        show multiple loadings on the page but will increment
 *                        a counter. This is helpful when there are many actions
 *                        that require a loading.
 *                        The global loading will only be dismissed once all
 *                        counters shown are hidden.
 *                        Each function call will increment the counter.
 *                        Default 1
 * @param {boolean} force Sets the count to the given value without incrementing
 *                        Default false
 * @param {string} message Sets an optional message to display. Default to empty.
 *
 * @example
 * showGlobalLoading()
 * // Counter set to 1
 * showGlobalLoading(3)
 * // Counter set to 4
 * hideGlobalLoading()
 * // Counter is now 3
 * hideGlobalLoading(3)
 * // Counter is now 0 and the loading is dismissed.
 */
export function showGlobalLoading (count = 1, force = false, message = '') {
  return new Promise(resolve => {
    if (theGlobalLoading === null) {
      throw new Error('<GlobalLoading /> component not mounted');
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    theGlobalLoadingCount = force ? count : theGlobalLoadingCount + count;

    theGlobalLoading.setState({
      showTimestamp: Date.now(),
      message,
      revealed: true
    });

    resolve();
  });
}

/**
 * Utility method to show the global loading with the message as the first
 * parameter.
 *
 * @see showGlobalLoading()
 */
export function showGlobalLoadingMessage (message, count = 1, force = false) {
  return showGlobalLoading(count, force, message);
}

/**
 * Hides a global loading
 * @param  {Number} count Define how many loadings to hide. Using 0 or any
 *                        negative number will immediately dismiss the loading
 *                        without waiting for the minimum display time.
 *                        Default 1
 * @param {boolean} force Sets the count to the given value without decrementing
 *
 * @example
 * showGlobalLoading()
 * // Counter set to 1
 * showGlobalLoading(3)
 * // Counter set to 4
 * hideGlobalLoading()
 * // Counter is now 3
 * hideGlobalLoading(3)
 * // Counter is now 0 and the loading is dismissed.
 */
export function hideGlobalLoading (count = 1, force = false) {
  return new Promise(resolve => {
    if (theGlobalLoading === null) {
      throw new Error('<GlobalLoading /> component not mounted');
    }

    if (typeof count === 'function') {
      cb = count; // eslint-disable-line
      count = 1; // eslint-disable-line
    }
    const hide = () => {
      theGlobalLoading.setState({ revealed: false });
      resolve();
    };

    // Using 0 or negative numbers results in the loading being
    // immediately dismissed.
    if (count < 1) {
      theGlobalLoadingCount = 0;
      return hide();
    }

    // Decrement counter by given amount without going below 0.
    theGlobalLoadingCount = Math.max(
      0,
      force ? count : theGlobalLoadingCount - count
    );

    const time = theGlobalLoading.state.showTimestamp;
    const diff = Date.now() - time;
    if (diff >= MIN_TIME) {
      if (theGlobalLoadingCount === 0) return hide();
    } else {
      hideTimeout = setTimeout(() => {
        if (theGlobalLoadingCount === 0) return hide();
      }, MIN_TIME - diff);
    }
  });
}
